import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is missing. Check Render Environment Variables.");
}

const client = new MongoClient(uri);
let connected = false;

export default client;

export const connectDb = async () => {
  if (connected) return;
  await client.connect();
  connected = true;
};

export const getDb = () => {
  const dbName = process.env.DB_NAME;
  if (!dbName) {
    throw new Error("DB_NAME is missing. Check Render Environment Variables.");
  }
  return client.db(dbName);
};
