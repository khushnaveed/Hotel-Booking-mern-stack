import { Router } from "express"
import { createRoom, deleteRoom, getAllRooms, getAvailableRooms, getRoomBySlug, updateRoom } from "../controllers/roomControlers.js"
import { isAdmin } from "../middlewares/isAdmin.js"
import { auth } from "../middlewares/authentication.js"
const router = Router()
router.get("/available", getAvailableRooms)
router.post("/", auth, isAdmin, createRoom)
router.get("/:slug", getRoomBySlug);
router.get("/", getAllRooms)
//router.get("/available", getAvailableRooms)
router.patch("/:slug", auth, isAdmin, updateRoom)
router.delete("/:slug", auth, isAdmin, deleteRoom)

export default router