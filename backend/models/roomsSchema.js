/* import { Schema, model } from "mongoose";
const roomSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    images: [{ type: String, required: true }],
    descOverview: { type: String },

    rating: { type: Number, min: 0, max: 5, default: 0 },
    calendar: { type: [Date], default: [] },
    // price: { type: Number },
    // New: pricing array (custom price based on date)
    pricing: [
        {
            startDate: { type: Date, required: true },
            endDate: { type: Date },
            price: { type: Number, required: true }
        }
    ],
    defaultPrice: { type: Number },
    package: { type: String, timestamps: true, enum: ["Free breakfast,Pool access, Daily housekeeping, Welcome drink,Welcome drink,Work desk,Complimentary Wi-Fi,Laundry service,Free bottled water,Kids stay free,Cribs on request,Entertainment system,Room service,Balcony access,Mini fridge,Queen bed,Dedicated concierge,Private chef,Helipad access,Luxury bath products"] },


})
const RoomModel = model("Rooms", roomSchema)
export default RoomModel */

import { Schema, model } from "mongoose";

// Sub-schema for ratings with time-based description
const ratingSchema = new Schema({
    value: { type: Number, min: 0, max: 5, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String }
}, { _id: false });

// Optional calendar event (e.g. blackout or promo dates)
const calendarSchema = new Schema({
    note: { type: String, required: true },
    type: { type: String, enum: ["blackout", "promotion", "policy"], required: true }
}, { _id: false });

const roomSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },

    images: [{ type: String, required: true }],
    descOverview: { type: String },

    // New structured ratings array
    ratings: [ratingSchema],

    // Optional calendar for room-specific events
    calendar: [calendarSchema],

    // Pricing based on date range
    pricing: [{
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        price: { type: Number, required: true }
    }],

    // Default fallback price if no date match
    defaultPrice: { type: Number, default: 100 },

    // Amenities/Packages as an array
    packages: [{ type: String }]
});

const RoomModel = model("Rooms", roomSchema);
export default RoomModel;
