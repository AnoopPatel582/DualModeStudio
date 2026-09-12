import process from "node:process";
import { createInterface } from "node:readline/promises";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import { z } from "zod";

const adminInputSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(12).max(128),
});

function readMaskedInput(prompt) {
  if (!process.stdin.isTTY || !process.stdin.setRawMode) {
    throw new Error("Run this command in an interactive terminal.");
  }

  process.stdout.write(prompt);
  process.stdin.setEncoding("utf8");
  process.stdin.setRawMode(true);
  process.stdin.resume();

  return new Promise((resolve, reject) => {
    let value = "";

    function cleanup() {
      process.stdin.off("data", handleInput);
      process.stdin.setRawMode(false);
      process.stdin.pause();
    }

    function handleInput(character) {
      if (character === "\u0003") {
        cleanup();
        process.stdout.write("\n");
        reject(new Error("Administrator creation cancelled."));
        return;
      }

      if (character === "\r" || character === "\n") {
        cleanup();
        process.stdout.write("\n");
        resolve(value);
        return;
      }

      if (character === "\u0008" || character === "\u007f") {
        if (value.length > 0) {
          value = value.slice(0, -1);
          process.stdout.write("\b \b");
        }
        return;
      }

      if (!character.startsWith("\u001b")) {
        value += character;
        process.stdout.write("*");
      }
    }

    process.stdin.on("data", handleInput);
  });
}

async function collectAdminInput() {
  const terminal = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const name = await terminal.question("Administrator name: ");
  const email = await terminal.question("Administrator email: ");
  terminal.close();

  const password = await readMaskedInput("Administrator password: ");
  const confirmation = await readMaskedInput("Confirm password: ");

  if (password !== confirmation) {
    throw new Error("The passwords do not match.");
  }

  return adminInputSchema.parse({ name, email, password });
}

async function createAdmin() {
  const uri = process.env.MONGODB_URI;
  const databaseName = process.env.MONGODB_DB;

  if (!uri || !databaseName) {
    throw new Error("MONGODB_URI and MONGODB_DB must be configured in .env.local.");
  }

  const adminInput = await collectAdminInput();
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const admins = client.db(databaseName).collection("admins");
    await admins.createIndex({ email: 1 }, { unique: true });

    const existingAdmin = await admins.findOne({ email: adminInput.email });

    if (existingAdmin) {
      throw new Error("An administrator with this email already exists.");
    }

    const now = new Date();
    const passwordHash = await bcrypt.hash(adminInput.password, 12);

    await admins.insertOne({
      name: adminInput.name,
      email: adminInput.email,
      passwordHash,
      role: "admin",
      status: "active",
      createdAt: now,
      updatedAt: now,
    });

    console.log(`Administrator created successfully for ${adminInput.email}.`);
  } finally {
    await client.close();
  }
}

createAdmin().catch((error) => {
  if (error instanceof z.ZodError) {
    console.error("Invalid administrator details:");
    for (const issue of error.issues) {
      console.error(`- ${issue.path.join(".")}: ${issue.message}`);
    }
  } else {
    console.error(error.message);
  }

  process.exit(1);
});
