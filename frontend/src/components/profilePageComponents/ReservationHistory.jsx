import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReservationHistory() {
  const [roomOrders, setRoomOrders] = useState([]);
  const [eventOrders, setEventOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const [roomRes, eventRes] = await Promise.all([
          axios.get(baseUrl + "/order/my-orders", { headers: { token } }),
          axios.get(baseUrl + "/order-events/my-orders", { headers: { token } }), // <-- fixed path
        ]);
        

        if (roomRes.data.success) setRoomOrders(roomRes.data.data);
        if (eventRes.data.success) setEventOrders(eventRes.data.data);
      } catch (err) {
        setError("Error fetching reservation history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-6 text-lg font-medium text-gray-700">Loading your reservation history...</div>;
  if (error) return <div className="text-center text-red-500 py-6">{error}</div>;
  const hasRoomOrders = roomOrders.length > 0;
  const hasEventOrders = eventOrders.length > 0;
  
  if (!hasRoomOrders && !hasEventOrders)
    return <div className="text-center py-6 text-gray-500">No reservations found yet.</div>;
  

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {roomOrders.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-[#8E7037] mb-6">Room Reservations</h2>
          {roomOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md p-6 mb-10 border border-gray-100"
            >
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-[#8E7037]">Order ID: <span className="text-gray-800">{order._id}</span></h2>
                <div className="mt-2 text-sm text-gray-600">
                  <p><span className="font-medium text-gray-800">Total Amount:</span> <span className="text-green-600 font-semibold">${order.orderTotalAmount}</span></p>
                  <p><span className="font-medium text-gray-800">Payment Status:</span> {order.paymentStatus}</p>
                  <p><span className="font-medium text-gray-800">Created At:</span> {new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <h3 className="text-md font-medium text-[#8E7037] border-b border-gray-200 pb-2 mb-4">Booked Room(s)</h3>

              <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2">
                {order.roomsBooking.map((room, i) => (
                  <div key={i} className="bg-gray-50 p-4 border border-gray-200">
                    <p className="font-semibold text-[#8E7037] mb-2">{room.title}</p>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p><span className="font-medium">Arrival:</span> {new Date(room.arrivalDate).toLocaleDateString()}</p>
                      <p><span className="font-medium">Departure:</span> {new Date(room.departureDate).toLocaleDateString()}</p>
                      <p><span className="font-medium">Guests:</span> {room.numAdults} Adults, {room.numChildren} Children</p>
                      <p><span className="font-medium">Nights:</span> {room.nights}</p>
                      <p><span className="font-medium text-green-700">Total Price:</span> ${room.totalPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {eventOrders.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-[#8E7037] mb-6">Event Reservations</h2>
          {eventOrders.map(order => (
            <div key={order._id} className="bg-white shadow-md p-6 mb-10 border border-gray-100">
              <h3 className="text-lg font-semibold text-[#8E7037] mb-2">Order ID: {order._id}</h3>
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium">Created At:</span> {new Date(order.createdAt).toLocaleString()}
              </p>

              <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2">
                {order.eventsBooking.map((event, index) => (
                  <div key={index} className="bg-gray-50 p-4 border border-gray-200">
                    <p className="font-semibold text-[#8E7037] mb-2">{event.title?.en}</p>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p><span className="font-medium">Quantity:</span> {event.quantity}</p>
                      <p><span className="font-medium text-green-700">Total Price:</span> ${event.totalPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

    </div>
  );
}
