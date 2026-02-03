import client from "../db/connect.js";
import { ObjectId } from "mongodb";

const dbName = process.env.DB_NAME || "samoaEventsDb";

const eventsCollection = () => client.db(dbName).collection("events");

const isValidDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value); // YYYY-MM-DD
const isValidTime = (value) => /^\d{2}:\d{2}$/.test(value); // HH:MM

const validateEvent = (body) => {
  const {
    title,
    description,
    location,
    village,
    island,
    eventDate,
    startTime,
    endTime,
    organizerName,
    contactPhone,
  } = body || {};

  // Required fields
  if (
    !title ||
    !description ||
    !location ||
    !village ||
    !island ||
    !eventDate ||
    !startTime ||
    !endTime ||
    !organizerName ||
    !contactPhone
  ) {
    return { ok: false, message: "Missing required fields" };
  }

  if (!isValidDate(eventDate)) {
    return { ok: false, message: "eventDate must be YYYY-MM-DD" };
  }

  if (!isValidTime(startTime) || !isValidTime(endTime)) {
    return { ok: false, message: "startTime and endTime must be HH:MM" };
  }

  // phone format check
  if (!/^[0-9+\-\s()]{7,}$/.test(contactPhone)) {
    return { ok: false, message: "contactPhone must be a valid phone format" };
  }

  return { ok: true };
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await eventsCollection().find().toArray();
    res.status(200).json(events);
  } catch (err) {
    console.error("getAllEvents error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    // prevents 500 for bad ids
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const event = await eventsCollection().findOne({ _id: new ObjectId(id) });

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
    const validation = validateEvent(req.body);
    if (!validation.ok) {
      return res.status(400).json({ message: validation.message });
    }

    const doc = {
      ...req.body,
      createdAt: new Date(),
    };

    const result = await eventsCollection().insertOne(doc);

    // return new id
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    console.error("createEvent error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const validation = validateEvent(req.body);
    if (!validation.ok) {
      return res.status(400).json({ message: validation.message });
    }

    const doc = {
      ...req.body,
      updatedAt: new Date(),
    };

    const result = await eventsCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: doc }
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
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const result = await eventsCollection().deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error("deleteEvent error:", err);
    res.status(500).json({ message: "Server error" });
  }
};