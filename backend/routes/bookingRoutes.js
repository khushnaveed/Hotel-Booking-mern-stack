// routes/bookingRoutes.js
import express from "express";
import { createBooking, getBooking, getBookings } from "../controllers/bookingController.js";
import { auth } from "../middlewares/authentication.js";

const router = express.Router();

// POST /api/bookings - create a booking
router.post("/", auth, createBooking);

// POST /api/bookings/bookingReference - get a booking
router.get("/:bookingReference", getBooking);

// GET /api/bookings - get all booking
router.get("/", getBookings);


export default router;
