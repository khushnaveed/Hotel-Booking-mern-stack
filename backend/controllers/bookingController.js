import bookingSchema from "../models/bookingSchema.js";
import GuestModel from "../models/guestSchema.js";

export async function createBooking(req, res) {
  try {
    const { payment, cartItems, subtotal, taxes, total } = req.body;

    // Basic validation
    if ( !payment) {
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
    const guest= await GuestModel.findById(req.guest._id)
    guest.bookings.push(savedBooking._id)
    await guest.save()
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
