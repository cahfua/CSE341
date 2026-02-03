import express from "express";
import {
  getAllRsvps,
  getRsvpById,
  createRsvp,
  updateRsvp,
  deleteRsvp,
} from "../controllers/rsvps.js";

import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", getAllRsvps);
router.get("/:id", getRsvpById);

router.post("/", requireAuth, createRsvp);
router.put("/:id", requireAuth, updateRsvp);
router.delete("/:id", requireAuth, deleteRsvp);

export default router;