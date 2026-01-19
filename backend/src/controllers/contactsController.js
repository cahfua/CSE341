const { ObjectId } = require("mongodb");
const contactModel = require("../models/contactModel");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.getAll();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingleContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid contact id" });
    }

    const contact = await contactModel.getById(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PART 2: POST
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newId = await contactModel.create({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    res.status(201).json({ id: newId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PART 2: PUT
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid contact id" });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // all fields required (rubric)
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updated = await contactModel.update(id, {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    if (!updated) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PART 2: DELETE
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid contact id" });
    }

    const deleted = await contactModel.remove(id);

    if (!deleted) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};