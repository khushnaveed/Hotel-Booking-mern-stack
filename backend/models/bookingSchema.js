import { Schema, model } from "mongoose";

const cartItemSchema = new Schema(
  {
    slug: { type: String, required: true },
    title: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    totalPrice: { type: Number },

    // Optional for hotel bookings
    arrivalDate: { type: String },
    departureDate: { type: String },
    numAdults: { type: Number },
    numChildren: { type: Number },
    nights: { type: Number },
    selectedPackages: { type: [Schema.Types.Mixed], default: [] },
  },
  { _id: false }
);

const bookingSchema = new Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return `BK-${Math.floor(100000 + Math.random() * 900000)}`;
      },
    },
   /**  guest: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String },
      city: { type: String },
      country: { type: String },
      zipCode: { type: String },
    },*/
    payment: {
      method: { type: String, required: true },
      transactionId: { type: String, required: true },
    },
    cartItems: {
      type: [cartItemSchema],
      required: true,
      validate: [arr => arr.length > 0, "Cart cannot be empty"]
    },
    subtotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Booking", bookingSchema);
