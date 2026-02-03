import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from "../controllers/events.js";

import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);

// protected write routes
router.post("/", requireAuth, createEvent);
router.put("/:id", requireAuth, updateEvent);
router.delete("/:id", requireAuth, deleteEvent);

export default router;