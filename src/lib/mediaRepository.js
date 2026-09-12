import "server-only";
import { randomUUID } from "node:crypto";
import { ObjectId } from "mongodb";
import { getMongoClient } from "@/lib/mongodb";

const MEDIA_COLLECTION = "media";
let indexesPromise;

function getDatabase(client) {
  const databaseName = process.env.MONGODB_DB;

  if (!databaseName) {
    throw new Error("MONGODB_DB is not configured.");
  }

  return client.db(databaseName);
}

function serializeMedia(media) {
  return {
    id: media._id.toString(),
    title: media.title,
    mediaType: media.mediaType,
    videoUrl: media.videoUrl,
    description: media.description,
    thumbnail: media.thumbnail,
    portfolio: media.portfolio,
    homepage: media.homepage,
    status: media.status,
    createdAt: media.createdAt.toISOString(),
    updatedAt: media.updatedAt.toISOString(),
  };
}

async function ensureMediaIndexes(collection) {
  if (!indexesPromise) {
    indexesPromise = Promise.all([
      collection.createIndex({ status: 1, createdAt: -1 }),
      collection.createIndex({
        status: 1,
        "portfolio.enabled": 1,
        "portfolio.category": 1,
        "portfolio.order": 1,
      }),
      collection.createIndex({
        status: 1,
        "homepage.enabled": 1,
        "homepage.section": 1,
        "homepage.order": 1,
      }),
    ]);
  }

  return indexesPromise;
}

async function closePlacementGap(
  collection,
  placementName,
  placement,
  session,
) {
  if (!placement.enabled) return;

  const groupingField = placementName === "portfolio" ? "category" : "section";

  await collection.updateMany(
    {
      status: "active",
      [`${placementName}.enabled`]: true,
      [`${placementName}.${groupingField}`]: placement[groupingField],
      [`${placementName}.order`]: { $gt: placement.order },
    },
    { $inc: { [`${placementName}.order`]: -1 } },
    { session },
  );
}

async function openPlacementPosition(
  collection,
  placementName,
  placement,
  session,
) {
  if (!placement.enabled) return;

  const groupingField = placementName === "portfolio" ? "category" : "section";

  await collection.updateMany(
    {
      status: "active",
      [`${placementName}.enabled`]: true,
      [`${placementName}.${groupingField}`]: placement[groupingField],
      [`${placementName}.order`]: { $gte: placement.order },
    },
    { $inc: { [`${placementName}.order`]: 1 } },
    { session },
  );
}

function toObjectId(value) {
  return ObjectId.isValid(value) ? new ObjectId(value) : null;
}

export async function listMedia(status = "active") {
  const client = await getMongoClient();
  const collection = getDatabase(client).collection(MEDIA_COLLECTION);
  await ensureMediaIndexes(collection);

  const filter = status === "all" ? {} : { status };
  const media = await collection
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray();

  return media.map(serializeMedia);
}

export async function listPortfolioMedia() {
  const client = await getMongoClient();
  const collection = getDatabase(client).collection(MEDIA_COLLECTION);
  await ensureMediaIndexes(collection);

  const media = await collection
    .find({
      status: "active",
      "portfolio.enabled": true,
    })
    .sort({ "portfolio.order": 1, createdAt: 1 })
    .toArray();

  return media.map(serializeMedia);
}

export async function listHomepageMedia() {
  const client = await getMongoClient();
  const collection = getDatabase(client).collection(MEDIA_COLLECTION);
  await ensureMediaIndexes(collection);

  const media = await collection
    .find({
      status: "active",
      mediaType: "video",
      "homepage.enabled": true,
    })
    .sort({ "homepage.order": 1, createdAt: 1 })
    .toArray();

  return media.map(serializeMedia);
}

export async function createMedia(mediaInput, adminId) {
  const client = await getMongoClient();
  const collection = getDatabase(client).collection(MEDIA_COLLECTION);
  await ensureMediaIndexes(collection);

  const session = client.startSession();
  let createdMedia;

  try {
    await session.withTransaction(async () => {
      await openPlacementPosition(
        collection,
        "portfolio",
        mediaInput.portfolio,
        session,
      );
      await openPlacementPosition(
        collection,
        "homepage",
        mediaInput.homepage,
        session,
      );

      const now = new Date();
      const document = {
        ...mediaInput,
        status: "active",
        createdBy: new ObjectId(adminId),
        updatedBy: new ObjectId(adminId),
        createdAt: now,
        updatedAt: now,
      };

      const result = await collection.insertOne(document, { session });
      createdMedia = { ...document, _id: result.insertedId };
    });
  } finally {
    await session.endSession();
  }

  return serializeMedia(createdMedia);
}

export async function updateMedia(mediaId, mediaInput, adminId) {
  const mediaObjectId = toObjectId(mediaId);
  const adminObjectId = toObjectId(adminId);

  if (!mediaObjectId || !adminObjectId) return null;

  const client = await getMongoClient();
  const collection = getDatabase(client).collection(MEDIA_COLLECTION);
  await ensureMediaIndexes(collection);

  const session = client.startSession();
  let updatedMedia = null;

  try {
    await session.withTransaction(async () => {
      const currentMedia = await collection.findOne(
        { _id: mediaObjectId, status: "active" },
        { session },
      );

      if (!currentMedia) return;

      await closePlacementGap(
        collection,
        "portfolio",
        currentMedia.portfolio,
        session,
      );
      await closePlacementGap(
        collection,
        "homepage",
        currentMedia.homepage,
        session,
      );
      await openPlacementPosition(
        collection,
        "portfolio",
        mediaInput.portfolio,
        session,
      );
      await openPlacementPosition(
        collection,
        "homepage",
        mediaInput.homepage,
        session,
      );

      const now = new Date();
      const result = await collection.findOneAndUpdate(
        { _id: mediaObjectId, status: "active" },
        {
          $set: {
            ...mediaInput,
            updatedBy: adminObjectId,
            updatedAt: now,
          },
        },
        { returnDocument: "after", session },
      );

      updatedMedia = result;
    });
  } finally {
    await session.endSession();
  }

  return updatedMedia ? serializeMedia(updatedMedia) : null;
}

export async function setMediaStatus(mediaId, nextStatus, adminId) {
  const mediaObjectId = toObjectId(mediaId);
  const adminObjectId = toObjectId(adminId);

  if (!mediaObjectId || !adminObjectId) return null;

  const client = await getMongoClient();
  const collection = getDatabase(client).collection(MEDIA_COLLECTION);
  await ensureMediaIndexes(collection);

  const session = client.startSession();
  let updatedMedia = null;

  try {
    await session.withTransaction(async () => {
      const currentMedia = await collection.findOne(
        { _id: mediaObjectId, deletionToken: { $exists: false } },
        { session },
      );

      if (!currentMedia) return;

      if (currentMedia.status === nextStatus) {
        updatedMedia = currentMedia;
        return;
      }

      if (nextStatus === "archived") {
        if (currentMedia.status !== "active") return;

        await closePlacementGap(
          collection,
          "portfolio",
          currentMedia.portfolio,
          session,
        );
        await closePlacementGap(
          collection,
          "homepage",
          currentMedia.homepage,
          session,
        );
      } else {
        if (currentMedia.status !== "archived") return;

        await openPlacementPosition(
          collection,
          "portfolio",
          currentMedia.portfolio,
          session,
        );
        await openPlacementPosition(
          collection,
          "homepage",
          currentMedia.homepage,
          session,
        );
      }

      const result = await collection.findOneAndUpdate(
        { _id: mediaObjectId, status: currentMedia.status },
        {
          $set: {
            status: nextStatus,
            updatedBy: adminObjectId,
            updatedAt: new Date(),
          },
        },
        { returnDocument: "after", session },
      );

      updatedMedia = result;
    });
  } finally {
    await session.endSession();
  }

  return updatedMedia ? serializeMedia(updatedMedia) : null;
}

export async function claimArchivedMediaForDeletion(mediaId) {
  const mediaObjectId = toObjectId(mediaId);

  if (!mediaObjectId) return null;

  const client = await getMongoClient();
  const collection = getDatabase(client).collection(MEDIA_COLLECTION);
  await ensureMediaIndexes(collection);

  const deletionToken = randomUUID();
  const staleBefore = new Date(Date.now() - 10 * 60 * 1000);
  const media = await collection.findOneAndUpdate(
    {
      _id: mediaObjectId,
      status: "archived",
      $or: [
        { deletionToken: { $exists: false } },
        { deletionStartedAt: { $lt: staleBefore } },
      ],
    },
    {
      $set: {
        deletionToken,
        deletionStartedAt: new Date(),
      },
    },
    { returnDocument: "after" },
  );

  if (!media) return null;

  return {
    deletionToken,
    media: serializeMedia(media),
  };
}

export async function releaseMediaDeletionClaim(mediaId, deletionToken) {
  const mediaObjectId = toObjectId(mediaId);

  if (!mediaObjectId) return false;

  const client = await getMongoClient();
  const collection = getDatabase(client).collection(MEDIA_COLLECTION);
  const result = await collection.updateOne(
    { _id: mediaObjectId, status: "archived", deletionToken },
    { $unset: { deletionToken: "", deletionStartedAt: "" } },
  );

  return result.modifiedCount === 1;
}

export async function deleteClaimedMedia(mediaId, deletionToken) {
  const mediaObjectId = toObjectId(mediaId);

  if (!mediaObjectId) return false;

  const client = await getMongoClient();
  const collection = getDatabase(client).collection(MEDIA_COLLECTION);
  const result = await collection.deleteOne({
    _id: mediaObjectId,
    status: "archived",
    deletionToken,
  });

  return result.deletedCount === 1;
}
