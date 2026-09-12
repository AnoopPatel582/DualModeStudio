import { existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";
import { createJiti } from "jiti";
import { MongoClient } from "mongodb";
import { buildStaticMediaRecords } from "./lib/static-media-migration.mjs";

const APPLY_FLAG = "--apply";
const MAX_THUMBNAIL_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const jiti = createJiti(import.meta.url);
const { portfolioData } = jiti(
  path.join(projectDirectory, "src/lib/portfolioData.js"),
);
const { worksLandscape, worksReels } = jiti(
  path.join(projectDirectory, "src/lib/worksData.js"),
);

function requireEnvironment(name) {
  const value = process.env[name]?.trim();

  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function localThumbnailPath(source) {
  const publicRoot = path.join(projectDirectory, "public");
  const resolvedPath = path.resolve(publicRoot, source.replace(/^\/+/, ""));
  const relativePath = path.relative(publicRoot, resolvedPath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error(`Thumbnail path escapes the public directory: ${source}`);
  }

  return resolvedPath;
}

async function validateLocalThumbnail(source) {
  const filePath = localThumbnailPath(source);
  const extension = path.extname(filePath).toLowerCase();

  if (!ALLOWED_EXTENSIONS.has(extension)) {
    throw new Error(`Unsupported thumbnail format: ${source}`);
  }

  if (!existsSync(filePath)) {
    throw new Error(`Thumbnail file does not exist: ${source}`);
  }

  const fileStats = await stat(filePath);

  if (fileStats.size === 0 || fileStats.size > MAX_THUMBNAIL_BYTES) {
    throw new Error(`Thumbnail must be between 1 byte and 10 MB: ${source}`);
  }

  return filePath;
}

async function uploadStaticThumbnail(record, assetFolder) {
  const filePath = await validateLocalThumbnail(record.thumbnailSource);
  const fileName = path.basename(filePath, path.extname(filePath));
  const publicId = `static-portfolio-${fileName}`;
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "image",
    asset_folder: assetFolder,
    public_id: publicId,
    overwrite: true,
    invalidate: true,
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

async function main() {
  const applyChanges = process.argv.includes(APPLY_FLAG);
  const unknownArguments = process.argv
    .slice(2)
    .filter((argument) => argument !== APPLY_FLAG);

  if (unknownArguments.length > 0) {
    throw new Error(`Unknown argument: ${unknownArguments.join(", ")}`);
  }

  const mongoUri = requireEnvironment("MONGODB_URI");
  const databaseName = requireEnvironment("MONGODB_DB");
  const records = buildStaticMediaRecords(
    portfolioData,
    worksLandscape,
    worksReels,
  );

  for (const record of records) {
    if (record.thumbnailSource) {
      await validateLocalThumbnail(record.thumbnailSource);
    }
  }

  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const collection = client.db(databaseName).collection("media");
    const legacyKeys = records.map((record) => record.legacyKey);
    const existingRecords = await collection
      .find(
        { legacyKey: { $in: legacyKeys } },
        { projection: { legacyKey: 1 } },
      )
      .toArray();
    const existingKeys = new Set(
      existingRecords.map((record) => record.legacyKey),
    );
    const pendingRecords = records.filter(
      (record) => !existingKeys.has(record.legacyKey),
    );
    const categoryCounts = Object.fromEntries(
      [...new Set(records.map((record) => record.portfolio.category))].map(
        (category) => [
          category,
          records.filter((record) => record.portfolio.category === category)
            .length,
        ],
      ),
    );

    console.log(
      JSON.stringify(
        {
          mode: applyChanges ? "apply" : "dry-run",
          activeStaticRecords: records.length,
          categories: categoryCounts,
          homepagePlacements: records.filter(
            (record) => record.homepage.enabled,
          ).length,
          cloudinaryUploadsRequired: pendingRecords.filter(
            (record) => record.thumbnailSource,
          ).length,
          existingMigrationRecords: existingKeys.size,
          recordsToInsert: pendingRecords.length,
        },
        null,
        2,
      ),
    );

    if (!applyChanges) {
      console.log("Dry run complete. No MongoDB or Cloudinary data was changed.");
      return;
    }

    const cloudName = requireEnvironment("CLOUDINARY_CLOUD_NAME");
    const apiKey = requireEnvironment("CLOUDINARY_API_KEY");
    const apiSecret = requireEnvironment("CLOUDINARY_API_SECRET");
    const assetFolder = requireEnvironment("CLOUDINARY_FOLDER");
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    await collection.createIndex(
      { legacyKey: 1 },
      {
        unique: true,
        partialFilterExpression: { legacyKey: { $type: "string" } },
      },
    );

    let insertedRecords = 0;
    let uploadedThumbnails = 0;

    for (const record of pendingRecords) {
      let thumbnail = null;

      if (record.thumbnailSource) {
        thumbnail = await uploadStaticThumbnail(record, assetFolder);
        uploadedThumbnails += 1;
      }

      const { thumbnailSource, ...mediaRecord } = record;
      void thumbnailSource;
      const now = new Date();
      const result = await collection.updateOne(
        { legacyKey: record.legacyKey },
        {
          $setOnInsert: {
            ...mediaRecord,
            thumbnail,
            status: "active",
            migrationSource: "static-v1",
            createdAt: now,
            updatedAt: now,
          },
        },
        { upsert: true },
      );

      insertedRecords += result.upsertedCount;
    }

    console.log(
      JSON.stringify(
        {
          migrationComplete: true,
          insertedRecords,
          uploadedThumbnails,
          skippedExistingRecords: existingKeys.size,
        },
        null,
        2,
      ),
    );
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(`Static media migration failed: ${error.message}`);
  process.exitCode = 1;
});
