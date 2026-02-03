import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is missing. Check environment variables.");
}

const client = new MongoClient(uri);

let db;

export async function connectDb() {
  if (db) return db;

  await client.connect();
  db = client.db(process.env.DB_NAME);
  console.log("✅ Connected to MongoDB");
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call connectDb first.");
  }
  return db;
}
