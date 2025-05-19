import { Router } from "express";
import {
  createOrderEvent,
  getAllOrderEvents,
  getMyOrderEvents,
  updateOrderEventPaymentStatus,
  deleteOrderEvent,
} from "../controllers/orderEventController.js";
import { auth } from "../middlewares/authentication.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.post("/", auth, createOrderEvent);
router.get("/my-orders", auth, getMyOrderEvents);
router.get("/", auth, isAdmin, getAllOrderEvents);
router.patch(
  "/:orderId/payment-status",
  auth,
  isAdmin,
  updateOrderEventPaymentStatus
);
router.delete("/:orderId", auth, deleteOrderEvent);

export default router;
