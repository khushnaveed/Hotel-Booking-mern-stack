// routes/bookingRoutes.js
import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import { auth } from "../middlewares/authentication.js";

const router = express.Router();

// POST /api/bookings - create a booking
router.post("/", auth, createBooking);

export default router;
