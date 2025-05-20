import OrderEventModel from "../models/orderEventSchema.js";

export const createOrderEvent = async (req, res) => {
  try {
    const { guestId, roomsBooking,
      orderTotalAmount, } = req.body;

const newOrder = new OrderEventModel({
  guestId,
  eventsBooking: roomsBooking.map(item => ({
    eventId: item.eventId, 
    title: { en: item.title },
    image: item.image,
    price: item.price,
    quantity: item.quantity || 1,
    totalPrice: item.totalPrice,
  })),
  orderTotalAmount,
});

try{
  const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
}catch(err){
  console.log(err)
}
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrderEvents = async (req, res) => {
  try {
    const orders = await OrderEventModel.find().populate(
      "guestId",
      "email"
    );
    res.json({ success: true, data: orders });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrderEvents = async (req, res) => {
  try {
    const orders = await OrderEventModel.find({ guestId: req.guest._id }).populate("eventsBooking.eventId");
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateOrderEventPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await OrderEventModel.findByIdAndUpdate(
      orderId,
      { paymentStatus: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrderEvent = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await OrderEventModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
