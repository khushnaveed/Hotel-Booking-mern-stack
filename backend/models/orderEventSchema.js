import { Schema, model } from "mongoose";

const orderEventSchema = new Schema({
  guestId: { type: Schema.Types.ObjectId, ref: "Guest" },
  eventsBooking: [
    {
      eventId: { type: Schema.Types.ObjectId, ref: "Event" },
      title: {
        en: { type: String, required: true },
      },
      image: { type: String },
      date: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 1 },
      totalPrice: { type: Number },
    },
  ],
  orderTotalAmount: { type: Number },
  paymentStatus: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const OrderEventModel = model("OrderEvent", orderEventSchema);
export default OrderEventModel;
