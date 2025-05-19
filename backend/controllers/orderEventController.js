import OrderEventModel from "../models/orderEventSchema.js";
import Event from "../models/eventsSchema.js";

export const createOrderEvent = async (req, res) => {
  try {
    const { guestId, roomsBooking,
      orderTotalAmount, } = req.body;

    /* if (!eventsBooking || !Array.isArray(eventsBooking)) {
      return res.status(400).json({ message: "Invalid events booking data." });
    } */

    /* let orderTotalAmount = 0;
    const populatedEvents = await Promise.all(
      eventsBooking.map(async (item) => {
        const event = await Event.findById(item.eventId);
        if (!event) throw new Error(`Event with ID ${item.eventId} not found`);

        const totalPrice = event.price * (item.quantity || 1);
        orderTotalAmount += totalPrice;

        return {
          eventId: event._id,
          title: { en: event.title.en },
          image: event.image,
          date: event.date,
          price: event.price,
          quantity: item.quantity || 1,
          totalPrice,
        };
      })
    ); */
console.log(roomsBooking,"testing event orders")
    const newOrder = new OrderEventModel({
      guestId,
      eventsBooking: roomsBooking.map(item=>({...item,title:{en:item.title}})),
      orderTotalAmount,
    });
console.log(newOrder)
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
      "name email"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrderEvents = async (req, res) => {
  try {
    const orders = await OrderEventModel.find({ guestId: req.user._id });
    res.status(200).json(orders);
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
