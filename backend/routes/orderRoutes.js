import { Router } from "express";
import {
    createOrder,
    getGuestOrders,
    getAllOrders,
    updatePaymentStatus
} from "../controllers/orderControllers.js";
import { auth } from "../middlewares/authentication.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.post("/", auth, createOrder);
router.get("/my-orders", auth, getGuestOrders);
router.get("/", auth, isAdmin, getAllOrders);
router.patch("/:id/payment-status", auth, isAdmin, updatePaymentStatus);

export default router;
