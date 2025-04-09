import { Schema, model } from "mongoose";
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
export default RoomModel