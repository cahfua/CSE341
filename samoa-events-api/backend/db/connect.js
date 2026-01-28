import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db;

export const connectDb = async () => {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri) throw new Error("MONGODB_URI is missing");
  if (!dbName) throw new Error("DB_NAME is missing");

  const client = new MongoClient(uri);
  await client.connect();

  db = client.db(dbName);
  console.log(`✅ Connected to MongoDB database: ${dbName}`);

  return db;
};

export const getDb = () => {
  if (!db) throw new Error("DB not initialized. Call connectDb() first.");
  return db;
};
