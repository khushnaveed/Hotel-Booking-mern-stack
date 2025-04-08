import RoomModel from "../models/roomsSchema.js";
import { generatePricing } from "../utils/generatePricing.js";
//GET all rooms
/* export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await RoomModel.find()
        res.send({ sucsess: true, data: rooms })
    } catch (err) {
        next(err)
    }

} */

//GET each room
export const getRoomBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const room = await RoomModel.findOne({ slug });

        if (room) {
            res.json({ success: true, data: room });
        } else {
            res.status(404).json({ success: false, message: "Room not found" });
        }
    } catch (err) {
        next(err);
    }
};

// POST: Create a new room
export const createRoom = async (req, res, next) => {
    try {
        const {
            title,
            slug,
            images,
            descOverview,
            price,
            rate,
            package: pkg
        } = req.body;

        const newRoom = new RoomModel({
            title,
            slug,
            images,
            descOverview,
            pricing,
            rating,
            package: pkg,
            pricing: generatePricing(price), // <-- 💡 Apply generated pricing
        });

        const savedRoom = await newRoom.save();
        res.status(201).json({ success: true, data: savedRoom });
    } catch (err) {
        next(err);
    }
};
