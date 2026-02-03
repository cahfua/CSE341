import { ObjectId } from "mongodb";
import { getDb } from "../db/connect.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await getDb().collection("events").find().toArray();
    res.status(200).json(events);
  } catch (err) {
    console.error("getAllEvents error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const event = await getDb()
      .collection("events")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (err) {
    console.error("getEventById error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, location, eventDate } = req.body;

    if (!title || !location || !eventDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await getDb().collection("events").insertOne({
      ...req.body,
      createdAt: new Date()
    });

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error("createEvent error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const result = await getDb().collection("events").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error("updateEvent error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const result = await getDb().collection("events").deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error("deleteEvent error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
