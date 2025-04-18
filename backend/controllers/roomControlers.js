
import RoomModel from "../models/roomsSchema.js";

// GET: Get room by slug
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
//GET:Get all rooms
export const getAllRooms = async (req, res, next) => {
    try {

        const rooms = await RoomModel.find();

        if (rooms) {
            res.json({ success: true, data: rooms });
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
            pricing,
            defaultPrice,
            packages,
            ratings,
            calendar
        } = req.body;

        const newRoom = new RoomModel({
            title,
            slug,
            images,
            descOverview,
            pricing: pricing || [],
            defaultPrice: defaultPrice || 100,
            packages: packages || [],
            ratings: ratings || [],
            calendar: calendar || []
        });

        const savedRoom = await newRoom.save();
        res.status(201).json({ success: true, data: savedRoom });
    } catch (err) {
        console.error("Error creating room:", err);
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};
