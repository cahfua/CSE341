import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is missing. Check Render Environment Variables.");
}

const client = new MongoClient(uri);

// ✅ keep DEFAULT export for your existing code (events.js)
export default client;

// ✅ helper to get the database
export const getDb = () => {
  const dbName = process.env.DB_NAME;
  if (!dbName) {
    throw new Error("DB_NAME is missing. Check Render Environment Variables.");
  }
  return client.db(dbName);
};
