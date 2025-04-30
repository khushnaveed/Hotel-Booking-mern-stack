import { Router } from "express"
import { createRoom, getAllRooms, getAvailableRooms, getRoomBySlug } from "../controllers/roomControlers.js"
//import { isAdmin } from "../middlewares/isAdmin.js"
const router = Router()
//router.get("/:slug", getRoomBySlug);
router.post("/create", createRoom)
router.get("/", getAllRooms)
//test
router.get("/available", getAvailableRooms)
router.get("/:slug", getRoomBySlug);

export default router