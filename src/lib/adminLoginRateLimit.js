import "server-only";
import {
  ADMIN_LOGIN_ATTEMPT_LIMIT,
  ADMIN_LOGIN_BLOCK_MS,
  createAdminLoginRateLimitKey,
  getRetryAfterSeconds,
} from "./adminLoginRateLimitPolicy";
import { getMongoDatabase } from "./mongodb";

const LOGIN_ATTEMPT_COLLECTION = "admin_login_attempts";
let indexesPromise;

async function getLoginAttemptCollection() {
  const database = await getMongoDatabase();
  const collection = database.collection(LOGIN_ATTEMPT_COLLECTION);

  if (!indexesPromise) {
    indexesPromise = Promise.all([
      collection.createIndex({ key: 1 }, { unique: true }),
      collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    ]);
  }

  await indexesPromise;
  return collection;
}

function getRateLimitKey(credentials, request) {
  return createAdminLoginRateLimitKey(
    credentials,
    request,
    process.env.AUTH_SECRET,
  );
}

export async function getAdminLoginRateLimitStatus(credentials, request) {
  const collection = await getLoginAttemptCollection();
  const key = getRateLimitKey(credentials, request);
  const attempt = await collection.findOne(
    { key },
    { projection: { blockedUntil: 1 } },
  );

  const retryAfterSeconds = getRetryAfterSeconds(attempt?.blockedUntil);
  return {
    blocked: retryAfterSeconds > 0,
    retryAfterSeconds,
  };
}

async function updateFailedAttempt(collection, key, now, allowUpsert) {
  const windowCutoff = new Date(now.getTime() - ADMIN_LOGIN_BLOCK_MS);
  const blockedUntil = new Date(now.getTime() + ADMIN_LOGIN_BLOCK_MS);
  const resetWindow = {
    $lte: [
      { $ifNull: ["$windowStartedAt", new Date(0)] },
      windowCutoff,
    ],
  };

  return collection.findOneAndUpdate(
    { key },
    [
      {
        $set: {
          key,
          attempts: {
            $cond: [
              resetWindow,
              1,
              { $add: [{ $ifNull: ["$attempts", 0] }, 1] },
            ],
          },
          windowStartedAt: {
            $cond: [resetWindow, now, "$windowStartedAt"],
          },
          updatedAt: now,
        },
      },
      {
        $set: {
          blockedUntil: {
            $cond: [
              { $gte: ["$attempts", ADMIN_LOGIN_ATTEMPT_LIMIT] },
              blockedUntil,
              null,
            ],
          },
          expiresAt: {
            $cond: [
              { $gte: ["$attempts", ADMIN_LOGIN_ATTEMPT_LIMIT] },
              blockedUntil,
              {
                $dateAdd: {
                  startDate: "$windowStartedAt",
                  unit: "millisecond",
                  amount: ADMIN_LOGIN_BLOCK_MS,
                },
              },
            ],
          },
        },
      },
    ],
    {
      upsert: allowUpsert,
      returnDocument: "after",
      projection: { attempts: 1, blockedUntil: 1 },
    },
  );
}

export async function recordFailedAdminLogin(credentials, request) {
  const collection = await getLoginAttemptCollection();
  const key = getRateLimitKey(credentials, request);
  const now = new Date();
  let attempt;

  try {
    attempt = await updateFailedAttempt(collection, key, now, true);
  } catch (error) {
    if (error?.code !== 11000) throw error;
    attempt = await updateFailedAttempt(collection, key, now, false);
  }

  const retryAfterSeconds = getRetryAfterSeconds(attempt?.blockedUntil, now);
  return {
    blocked: retryAfterSeconds > 0,
    retryAfterSeconds,
  };
}

export async function clearFailedAdminLogins(credentials, request) {
  const collection = await getLoginAttemptCollection();
  const key = getRateLimitKey(credentials, request);
  await collection.deleteOne({ key });
}
