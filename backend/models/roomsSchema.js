import { Schema, model } from "mongoose";

const ratingSchema = new Schema({
    value: { type: Number, min: 0, max: 5, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String }
}, { _id: false });

const calendarSchema = new Schema({
    note: { type: String, required: true },
    type: { type: String, enum: ["blackout", "promotion", "policy"], required: true }
}, { _id: false });

const roomSchema = new Schema({

    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: [{ type: String, required: true }],
    descOverview: { type: String },
    ratings: [ratingSchema],
    calendar: [calendarSchema],
    bookings: [{
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true }
    }],
    pricing: [{
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        price: { type: Number, required: true }
    }],
    defaultPrice: { type: Number, default: 100 },
    packages: [{ type: String }],
    additionalDetails: {}, 
    type:{type:String, default:"room"}
});

const RoomModel = model("Rooms", roomSchema);
export default RoomModel;
