import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  title: {
    type: Map,
    of: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  excerpt: {
    type: Map,
    of: String,
    required: true
  },
  showCountdown: {
    type: Boolean,
    default: false // optional field, only used in one event
  },
  price: {
    type: Number,
    required: true
  }
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
