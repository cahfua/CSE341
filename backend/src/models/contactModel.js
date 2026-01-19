const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

const collectionName = "contacts";

const getAll = async () => {
  const db = getDb();
  return await db.collection(collectionName).find().toArray();
};

const getById = async (id) => {
  const db = getDb();
  return await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
};

const create = async (contact) => {
  const db = getDb();
  const result = await db.collection(collectionName).insertOne(contact);
  return result.insertedId;
};

const update = async (id, contact) => {
  const db = getDb();
  const result = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: contact });

  return result.matchedCount > 0;
};

const remove = async (id) => {
  const db = getDb();
  const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};