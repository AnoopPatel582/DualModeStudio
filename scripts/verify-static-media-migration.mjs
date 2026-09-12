import { v2 as cloudinary } from "cloudinary";
import { MongoClient } from "mongodb";

const EXPECTED_CATEGORIES = {
  "Long Form Video": 23,
  Podcast: 6,
  "Short Form Video": 21,
  Thumbnails: 14,
};

function requireEnvironment(name) {
  const value = process.env[name]?.trim();

  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function hasSequentialOrders(records, placementName) {
  const groupingField = placementName === "portfolio" ? "category" : "section";
  const groups = new Map();

  for (const record of records) {
    const placement = record[placementName];
    if (!placement.enabled) continue;

    const group = placement[groupingField];
    const orders = groups.get(group) || [];
    orders.push(placement.order);
    groups.set(group, orders);
  }

  return [...groups.values()].every((orders) => {
    const sortedOrders = orders.toSorted((left, right) => left - right);
    return sortedOrders.every((order, index) => order === index + 1);
  });
}

async function main() {
  const mongoUri = requireEnvironment("MONGODB_URI");
  const databaseName = requireEnvironment("MONGODB_DB");
  const cloudName = requireEnvironment("CLOUDINARY_CLOUD_NAME");
  const apiKey = requireEnvironment("CLOUDINARY_API_KEY");
  const apiSecret = requireEnvironment("CLOUDINARY_API_SECRET");
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const records = await client
      .db(databaseName)
      .collection("media")
      .find({ migrationSource: "static-v1" })
      .toArray();

    assert(records.length === 64, `Expected 64 records; found ${records.length}.`);
    assert(
      new Set(records.map((record) => record.legacyKey)).size === 64,
      "Migration keys are not unique.",
    );

    const categoryCounts = Object.fromEntries(
      Object.keys(EXPECTED_CATEGORIES).map((category) => [
        category,
        records.filter(
          (record) => record.portfolio.category === category,
        ).length,
      ]),
    );

    assert(
      JSON.stringify(categoryCounts) === JSON.stringify(EXPECTED_CATEGORIES),
      `Category totals are incorrect: ${JSON.stringify(categoryCounts)}`,
    );
    assert(
      hasSequentialOrders(records, "portfolio"),
      "Portfolio positions are not sequential within each category.",
    );
    assert(
      hasSequentialOrders(records, "homepage"),
      "Homepage positions are not sequential within each section.",
    );

    const homepageCounts = {
      landscape: records.filter(
        (record) =>
          record.homepage.enabled && record.homepage.section === "landscape",
      ).length,
      reel: records.filter(
        (record) =>
          record.homepage.enabled && record.homepage.section === "reel",
      ).length,
    };
    assert(
      homepageCounts.landscape === 4 && homepageCounts.reel === 4,
      `Homepage totals are incorrect: ${JSON.stringify(homepageCounts)}`,
    );

    const thumbnails = records.filter(
      (record) => record.portfolio.category === "Thumbnails",
    );
    assert(
      thumbnails.every(
        (record) =>
          record.thumbnail?.url?.startsWith("https://res.cloudinary.com/") &&
          record.thumbnail?.publicId,
      ),
      "One or more thumbnail records lack a Cloudinary URL or public ID.",
    );

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    const cloudinaryResult = await cloudinary.api.resources_by_ids(
      thumbnails.map((record) => record.thumbnail.publicId),
      { resource_type: "image" },
    );
    assert(
      cloudinaryResult.resources.length === 14,
      `Expected 14 Cloudinary assets; found ${cloudinaryResult.resources.length}.`,
    );

    console.log(
      JSON.stringify(
        {
          verified: true,
          mongodbRecords: records.length,
          categories: categoryCounts,
          homepage: homepageCounts,
          cloudinaryAssets: cloudinaryResult.resources.length,
          portfolioOrdersSequential: true,
          homepageOrdersSequential: true,
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
  console.error(`Static media verification failed: ${error.message}`);
  process.exitCode = 1;
});
