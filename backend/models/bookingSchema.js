import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true },
  phone:     { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("Booking", bookingSchema);
