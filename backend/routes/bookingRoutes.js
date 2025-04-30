// routes/bookingRoutes.js
import express from "express";
import { createBooking } from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/bookings - create a booking
router.post("/", createBooking);

export default router;
