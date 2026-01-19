const { MongoClient } = require("mongodb");

let db;

const initDb = async (callback) => {
  if (db) {
    console.log("DB is already initialized");
    return callback(null, db);
  }

  const uri = process.env.MONGODB_URI || process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri || !dbName) {
    return callback(new Error("Missing MONGODB_URI or DB_NAME environment variables"));
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    callback(null, db);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  if (!db) throw Error("DB not initialized");
  return db;
};

module.exports = { initDb, getDb };