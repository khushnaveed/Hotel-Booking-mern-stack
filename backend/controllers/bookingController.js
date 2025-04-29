import bookingSchema from "../models/bookingSchema.js";

export async function createBooking(req, res) {
  try {
    const guest = new bookingSchema(req.body);
    await guest.save();
    res.status(201).json({ success: true, message: "Guest saved", guest });
  } catch (err) {
    console.error("❌ Guest Save Error:", err);
    res.status(500).json({ success: false, message: "Failed to save guest", error: err.message });
  }
}
