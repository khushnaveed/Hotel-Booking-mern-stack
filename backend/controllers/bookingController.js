import bookingSchema from "../models/bookingSchema.js";
import GuestModel from "../models/guestSchema.js";
import jwt from "jsonwebtoken"; // if you're using JWT

//create booking
export async function createBooking(req, res) {
  try {
    const { payment, cartItems, subtotal, taxes, total } = req.body;

    // Basic validation
    if (!payment) {
      return res
        .status(400)
        .json({ error: "Guest and payment information are required." });
    }

    const newBooking = new bookingSchema({
      payment,
      cartItems,
      subtotal,
      taxes,
      total,
    });

    const savedBooking = await newBooking.save();
    const guest = await GuestModel.findById(req.guest._id);
    guest.bookings.push(savedBooking._id);
    await guest.save();
    res.status(201).json({
      message: "Booking created successfully",
      bookingId: savedBooking._id,
      bookingReference: savedBooking.bookingReference,
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

//get booking
export async function getBooking(req, res) {
  try {
    const { bookingReference } = req.params; // Booking reference passed as URL parameter (e.g., /bookings/:bookingReference)

    // Validate that the booking reference is provided
    if (!bookingReference) {
      return res.status(400).json({ error: "Booking reference is required." });
    }

    // Fetch the booking using the booking reference
    const booking = await bookingSchema.findOne({ bookingReference });

    // If booking not found, return an error
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    // Check if the guest is authorized to view this booking (i.e., the guest is the one who created it)
    /* const guest = await GuestModel.findById(req.guest._id);
    if (!guest) {
      return res.status(404).json({ error: "Guest not found." });
    } */

    // Check if the booking belongs to the guest
    /*  if (!guest.bookings.includes(booking._id.toString())) {
      return res.status(403).json({ error: "You are not authorized to view this booking." });
    } */

    // Return the booking details
    res.status(200).json({
      message: "Booking retrieved successfully",
      booking,
    });
  } catch (error) {
    console.error("Error retrieving booking:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Get all bookings
// controller.js

export async function getBookings(req, res) {
  try {
    // Fetch the booking using the booking reference
    const booking = await bookingSchema.find();

    // If booking not found, return an error
    if (!booking) {
      return res.status(404).json({ error: "Bookings not found." });
    }

    res.status(200).json({
      message: "Booking retrieved successfully",
      booking,
    });
  } catch (error) {
    console.error("Error retrieving booking:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
