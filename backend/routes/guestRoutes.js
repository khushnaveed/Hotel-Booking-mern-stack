import { Router } from "express"
import { auth } from "../middlewares/authentication.js";
import { getAllguests, getGuestById, addNewGuest, updateGuest,
     deleteGuest, loginGuest, confirmEmail, forgotPassword, resetPassword, verifyguesttoken} from "../controllers/guestController.js";
import { validators } from "../middlewares/guests-validator.js";
import { isAdmin } from "../middlewares/isAdmin.js";


const router=Router()

router.get("/", auth,isAdmin, getAllguests );  
router.get("/verifytoken",auth, verifyguesttoken)
router.get("/:id",auth, getGuestById);
router.put("/:id", auth, updateGuest);
router.delete("/:id",deleteGuest );
router.post("/register", validators,addNewGuest);
router.get("/confirm-email/:token", confirmEmail); // Confirm email route

router.post("/login", loginGuest); 
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);




export default router ;