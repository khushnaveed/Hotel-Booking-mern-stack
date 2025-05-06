
import RoomModel from "../models/roomsSchema.js";

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
            calendar: calendar || [],

            // bookings: bookings || []

        });

        const savedRoom = await newRoom.save();
        res.status(201).json({ success: true, data: savedRoom });
    } catch (err) {
        console.error("Error creating room:", err);
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};



export const getAvailableRooms = async (req, res, next) => {
    try {
        const { start, end } = req.query;
        const startDate = new Date(start);
        const endDate = new Date(end);

        const availableRooms = await RoomModel.find({
            bookings: {
                $not: {
                    $elemMatch: {
                        checkIn: { $lt: endDate },
                        checkOut: { $gt: startDate }
                    }
                }
            }
        });

        res.json({ success: true, data: availableRooms });
    } catch (err) {
        next(err);
    }
};

export const updateRoom = async (req, res, next) => {
    try {
        console.log(req.body, req.params.slug)
        const updatedRoom = await RoomModel.findByIdAndUpdate(req.params.slug, req.body, { new: true });
        if (!updatedRoom) return res.status(404).json({ success: false, message: "Room not found" });
        res.json({ success: true, data: updatedRoom });
    } catch (err) {
        next(err);
    }
};

export const deleteRoom = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const deletedRoom = await RoomModel.findOneAndDelete({ _id: slug });
        if (!deletedRoom) return res.status(404).json({ success: false, message: "Room not found" });
        res.json({ success: true, message: "Room deleted successfully" });
    } catch (err) {
        next(err);
    }
};


