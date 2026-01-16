const { ObjectId } = require("mongodb");
const { getContactsCollection } = require("../models/contactModel");

async function getAllContacts(req, res) {
  try {
    const contactsCol = await getContactsCollection();
    const contacts = await contactsCol.find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getSingleContact(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid contact id" });
    }

    const contactsCol = await getContactsCollection();
    const contact = await contactsCol.findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getAllContacts, getSingleContact };
