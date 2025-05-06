import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    en: {
      type: String,
      required: true,  // Ensure 'en' is a string
    },
  },
  image: {
    type: String,
    required: true,
  },
  excerpt: {
    en: {
      type: String,  // Make sure it's a string, not a Map
      required: true,
    },
  },
  showCountdown: {
    type: Boolean,
    default: false, // Optional field
  },
  price: {
    type: Number,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
