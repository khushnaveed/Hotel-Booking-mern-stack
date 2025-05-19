import { Schema, model } from "mongoose";
const orderSchema = new Schema({
    guestId: { type: Schema.Types.ObjectId, ref: "Guest" },
    roomsBooking: [{
        slug: { type: String },
        title: { type: String },
        images: [{ type: String }],
        arrivalDate: { type: Date },
        departureDate: { type: Date },
        numAdults: { type: Number },
        numChildren: { type: Number },
        totalPrice: { type: Number },
        nights: { type: Number },
    }],

    orderTotalAmount: { type: Number },
    paymentStatus: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
});
const OrderModel = model("Order", orderSchema)
export default OrderModel;
