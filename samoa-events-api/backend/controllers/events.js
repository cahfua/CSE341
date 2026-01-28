import client from '../db/connect.js';
import { ObjectId } from 'mongodb';

const dbName = process.env.DB_NAME || 'samoaEventsDb';

export const getAllEvents = async (req, res) => {
  const db = client.db(dbName);
  const events = await db.collection('events').find().toArray();
  res.status(200).json(events);
};

export const getEventById = async (req, res) => {
  const db = client.db(dbName);
  const event = await db
    .collection('events')
    .findOne({ _id: new ObjectId(req.params.id) });

  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.status(200).json(event);
};

export const createEvent = async (req, res) => {
  const db = client.db(dbName);
  const result = await db.collection('events').insertOne(req.body);
  res.status(201).json(result);
};

export const updateEvent = async (req, res) => {
  const db = client.db(dbName);
  await db.collection('events').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.status(204).send();
};

export const deleteEvent = async (req, res) => {
  const db = client.db(dbName);
  await db.collection('events').deleteOne({
    _id: new ObjectId(req.params.id)
  });
  res.status(204).send();
};
