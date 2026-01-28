import express from "express";
import {
  getAllRsvps,
  getRsvpById,
  createRsvp,
  updateRsvp,
  deleteRsvp,
} from "../controllers/rsvps.js";

const router = express.Router();

router.get("/", getAllRsvps);
router.get("/:id", getRsvpById);
router.post("/", createRsvp);
router.put("/:id", updateRsvp);
router.delete("/:id", deleteRsvp);

export default router;
