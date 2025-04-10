import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  showCountdown: {
    type: Boolean,
    default: false // optional field, only used in one event
  }
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
