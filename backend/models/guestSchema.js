import { Schema, model } from "mongoose";

const guestSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bookings:[{type: Schema.Types.ObjectId, ref:"Booking"}],
  phonenumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 format
      },
      message: (props) =>
        `${props.value} is not a valid international phone number!`,
    },
  },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String, required: true },
  country: { type: String, required: true },
  password: {
    unique: true,
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long."],
  },
  // confirmPassword is not saved to DB

  role: { type: String, enum: ["admin","guest"], default: "guest" },
});

const GuestModel = model("Guest", guestSchema);

export default GuestModel;
