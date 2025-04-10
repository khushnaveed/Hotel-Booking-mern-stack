import { Schema, model } from "mongoose";

const guestSchema = new Schema({
  userName:        { type: String, required: true },
  email:           { type: String, required: true, unique: true },
  password:        { type: String, required: true, minlength: [6, "Password must be at least 6 characters long."],
  },
  confirmPassword: { type: String, required: false }
});

const GuestModel = model("Guest", guestSchema);

export default GuestModel;
