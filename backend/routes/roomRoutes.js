import { Router } from "express"
import { createRoom, getRoomBySlug } from "../controllers/roomControlers.js"
const router = Router()
router.get("/:slug", getRoomBySlug);
router.post("/create", createRoom)




export default router