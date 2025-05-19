import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { auth } from "../middlewares/authentication.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", auth, isAdmin, createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
