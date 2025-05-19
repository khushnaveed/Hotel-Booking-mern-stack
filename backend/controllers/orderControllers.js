import OrderModel from "../models/orderRoomSchema.js";
import OrderEventModel from "../models/orderEventSchema.js";

export const createOrder = async (req, res, next) => {
  try {
    const { roomsBooking, orderTotalAmount, paymentStatus } = req.body;

    if (!roomsBooking || roomsBooking.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain either a room booking or event tickets",
      });
    }

    const newOrder = new OrderModel({
      guestId: req.guest._id,
      roomsBooking: roomsBooking || null,
      orderTotalAmount,
      paymentStatus,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, data: savedOrder });
  } catch (err) {
    next(err);
  }
};

export const getGuestOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find({ guestId: req.guest._id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find().populate("guestId", "email");
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const updatePaymentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { paymentStatus: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, data: updatedOrder });
  } catch (err) {
    next(err);
  }
};


export const getAllOrdersCombined = async (req, res, next) => {
  try {
    const roomOrders = await OrderModel.find().populate("guestId", "email");
    const eventOrders = await OrderEventModel.find().populate("guestId", "email");

    const combinedOrders = [...roomOrders, ...eventOrders].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    res.json({ success: true, data: combinedOrders });
  } catch (err) {
    next(err);
  }
};
