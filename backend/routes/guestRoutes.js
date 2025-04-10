import { Router } from "express"
import { auth } from "../middlewares/authentication.js";
import { getAllguests, getGuestById, addNewGuest, updateGuest, deleteGuest, loginGuest, confirmEmail} from "../controllers/guestController.js";
import { validators } from "../middlewares/guests-validator.js";

const router=Router()

router.get("/", auth,getAllguests );  
router.get("/:id",auth, getGuestById);
router.put("/:id", auth, updateGuest);
router.delete("/:id",deleteGuest );
router.post("/register", validators,addNewGuest);
router.get("/confirm-email/:token", confirmEmail); // Confirm email route

router.post("/login", loginGuest); 



export default router ;