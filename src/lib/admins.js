import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import "server-only";
import { parseAdminCredentials } from "./adminCredentials";
import { getMongoDatabase } from "./mongodb";

const ADMIN_COLLECTION = "admins";

export async function authenticateAdmin(credentials) {
  const parsedCredentials = parseAdminCredentials(credentials);

  if (!parsedCredentials) {
    return null;
  }

  const database = await getMongoDatabase();
  const admin = await database.collection(ADMIN_COLLECTION).findOne({
    email: parsedCredentials.email,
    role: "admin",
    status: "active",
  });

  if (!admin?.passwordHash) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(
    parsedCredentials.password,
    admin.passwordHash,
  );

  if (!passwordMatches) {
    return null;
  }

  return {
    id: admin._id.toString(),
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };
}

export async function findActiveAdminById(adminId) {
  if (!ObjectId.isValid(adminId)) {
    return null;
  }

  const database = await getMongoDatabase();
  return database.collection(ADMIN_COLLECTION).findOne(
    {
      _id: new ObjectId(adminId),
      role: "admin",
      status: "active",
    },
    {
      projection: {
        name: 1,
        email: 1,
        role: 1,
        status: 1,
      },
    },
  );
}
