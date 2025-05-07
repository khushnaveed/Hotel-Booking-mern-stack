import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  title: {
    en: {
      type: String,
      required: true,
    },
  },
  image: {
    type: String,
    required: true,
  },
  excerpt: {
    en: {
      type: String,
      required: true,
    },
  },
  showCountdown: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "USD", 
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
