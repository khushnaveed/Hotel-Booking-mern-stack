// routes/bookingRoutes.js
import express from "express";
import { createBooking, getBooking } from "../controllers/bookingController.js";
import { auth } from "../middlewares/authentication.js";

const router = express.Router();

// POST /api/bookings - create a booking
router.post("/", auth, createBooking);

// POST /api/bookings - create a booking
router.get("/:bookingReference", getBooking);

export default router;
