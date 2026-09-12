import { MongoClient } from "mongodb";
import "server-only";

const globalForMongo = globalThis;

function getMongoClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (process.env.NODE_ENV === "development") {
    if (!globalForMongo.__dualModeMongoClientPromise) {
      globalForMongo.__dualModeMongoClientPromise = new MongoClient(uri).connect();
    }

    return globalForMongo.__dualModeMongoClientPromise;
  }

  if (!globalForMongo.__dualModeProductionMongoClientPromise) {
    globalForMongo.__dualModeProductionMongoClientPromise = new MongoClient(
      uri,
    ).connect();
  }

  return globalForMongo.__dualModeProductionMongoClientPromise;
}

export async function getMongoDatabase() {
  const databaseName = process.env.MONGODB_DB;

  if (!databaseName) {
    throw new Error("MONGODB_DB is not configured.");
  }

  const client = await getMongoClient();
  return client.db(databaseName);
}

export async function getMongoClient() {
  return getMongoClientPromise();
}
