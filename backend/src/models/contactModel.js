const { getDb } = require("../db/connect");

async function getContactsCollection() {
  const db = await getDb();
  return db.collection("contacts");
}

module.exports = { getContactsCollection };
