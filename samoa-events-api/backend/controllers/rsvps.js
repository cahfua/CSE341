import { ObjectId } from "mongodb";
import { getDb } from "../db/connect.js";

const collection = () => getDb().collection("rsvps");

export const getAllRsvps = async (req, res) => {
  try {
    const result = await collection().find().toArray();
    res.status(200).json(result);
  } catch (err) {
    console.error("getAllRsvps error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRsvpById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const result = await collection().findOne({ _id: new ObjectId(req.params.id) });
    if (!result) return res.status(404).json({ message: "RSVP not found" });

    res.status(200).json(result);
  } catch (err) {
    console.error("getRsvpById error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createRsvp = async (req, res) => {
  try {
    const { eventId, firstName, lastName, phone, partySize, notes } = req.body;

    if (!eventId || !firstName || !lastName || !phone || partySize === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid eventId" });
    }

    if (typeof partySize !== "number" || partySize < 1) {
      return res.status(400).json({ message: "partySize must be >= 1" });
    }

    const doc = {
      eventId: new ObjectId(eventId), 
      firstName,
      lastName,
      phone,
      partySize,
      notes: notes || "",
      createdAt: new Date(),
    };

    const result = await collection().insertOne(doc);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error("createRsvp error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateRsvp = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const { eventId, firstName, lastName, phone, partySize, notes } = req.body;

    if (!eventId || !firstName || !lastName || !phone || partySize === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid eventId" });
    }

    if (typeof partySize !== "number" || partySize < 1) {
      return res.status(400).json({ message: "partySize must be >= 1" });
    }

    const doc = {
      eventId: new ObjectId(eventId),
      firstName,
      lastName,
      phone,
      partySize,
      notes: notes || "",
      updatedAt: new Date(),
    };

    const result = await collection().updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: doc }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "RSVP not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error("updateRsvp error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteRsvp = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const result = await collection().deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "RSVP not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error("deleteRsvp error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
