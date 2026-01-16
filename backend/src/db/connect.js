const { MongoClient } = require("mongodb");

let client;

async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing");

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }

  const dbName = process.env.DB_NAME || "contactsDb";
  return client.db(dbName);
}

module.exports = { getDb };
