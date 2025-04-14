import { Router } from "express"
import { createRoom, getAllRooms, getRoomBySlug } from "../controllers/roomControlers.js"
const router = Router()
router.get("/:slug", getRoomBySlug);
router.post("/create", createRoom)
router.get("/", getAllRooms)



export default router