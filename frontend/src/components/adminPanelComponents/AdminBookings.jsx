import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarCheck,
  CalendarX,
  Users,
  Moon,
  Receipt,
  Ticket,
  Calendar,
} from "lucide-react";

export default function ReservationHistory() {
  const [roomOrders, setRoomOrders] = useState([]);
  const [eventOrders, setEventOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("rooms");
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
          axios.get(baseUrl + "/order", { headers: { token } }),
          axios.get(baseUrl + "/order-events", {
            headers: { token },
          }),
        ]);

        if (roomRes.data.success) {
          const sortedRooms = roomRes.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setRoomOrders(sortedRooms);
        }

        if (eventRes.data.success) {
          const sortedEvents = eventRes.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setEventOrders(sortedEvents);
        }
      } catch (err) {
        setError("Error fetching reservation history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="text-center py-6 text-lg font-medium text-gray-700">
        Loading your reservation history...
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 py-6">{error}</div>;

  const filteredRoomOrders = roomOrders
    .map((order) => ({
      ...order,
      roomsBooking: order.roomsBooking.filter((r) => r.arrivalDate),
    }))
    .filter((order) => order.roomsBooking.length > 0);

  const hasRoomOrders = filteredRoomOrders.length > 0;
  const hasEventOrders = eventOrders.length > 0;

  if (!hasRoomOrders && !hasEventOrders)
    return (
      <div className="text-center py-6 text-gray-500">
        No reservations found yet.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]">
          <p className="text-sm font-medium text-gray-500">
            Total Room Bookings
          </p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {roomOrders.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]">
          <p className="text-sm font-medium text-gray-500">
            Total Event Bookings
          </p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {eventOrders.length}
          </p>
        </div>
      </div>

      <div className="flex gap-4 border-b mb-6">
        <button
          onClick={() => setActiveTab("rooms")}
          className={`px-4 py-2 font-medium ${
            activeTab === "rooms"
              ? "text-[#8E7037] border-b-2 border-[#8E7037]"
              : "text-gray-500"
          }`}
        >
          Room Reservations
        </button>
        <button
          onClick={() => setActiveTab("events")}
          className={`px-4 py-2 font-medium ${
            activeTab === "events"
              ? "text-[#8E7037] border-b-2 border-[#8E7037]"
              : "text-gray-500"
          }`}
        >
          Event Reservations
        </button>
      </div>

      {activeTab === "rooms" && (
        <div className="space-y-6">
          {filteredRoomOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow p-6 border border-gray-100"
            >
              <div className="mb-4 space-y-1">
                <p className="text-lg font-semibold text-[#8E7037]">
                  Booking ID: <span className="text-gray-800">{order._id}</span>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Total:</span>{" "}
                  <span className="text-green-600 font-semibold">
                    ${order.orderTotalAmount}
                  </span>{" "}
                  | <span className="font-medium">Status:</span>{" "}
                  {order.paymentStatus}
                </p>
                <p className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar size={16} className="text-[#8E7037]" />
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(order.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                {order.roomsBooking.map((room, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 p-4 border border-gray-200 w-full sm:w-[48%] lg:w-[32%]"
                  >
                    <p className="font-semibold text-[#8E7037] mb-2">
                      {room.title}
                    </p>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p className="flex items-center gap-2">
                        <CalendarCheck size={16} className="text-[#8E7037]" />
                        <strong>Check-in:</strong>{" "}
                        {new Date(room.arrivalDate).toLocaleDateString()}
                      </p>
                      <p className="flex items-center gap-2">
                        <CalendarX size={16} className="text-[#8E7037]" />
                        <strong>Check-out:</strong>{" "}
                        {new Date(room.departureDate).toLocaleDateString()}
                      </p>
                      <p className="flex items-center gap-2">
                        <Users size={16} className="text-[#8E7037]" />
                        <strong>Guests:</strong> {room.numAdults} Adults,{" "}
                        {room.numChildren} Children
                      </p>
                      <p className="flex items-center gap-2">
                        <Moon size={16} className="text-[#8E7037]" />
                        <strong>Nights:</strong> {room.nights}
                      </p>
                      <p className="flex items-center gap-2 text-green-700 font-medium">
                        <Receipt size={16} className="text-green-700" />
                        Total: ${room.totalPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "events" && (
        <div className="space-y-6">
          {eventOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow p-6 border border-gray-100"
            >
              <div className="mb-4 space-y-1">
                <p className="text-lg font-semibold text-[#8E7037]">
                  Booking ID: <span className="text-gray-800">{order._id}</span>
                </p>
                <p className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar size={16} className="text-[#8E7037]" />
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                {order.eventsBooking.map((event, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 border border-gray-200 w-full sm:w-[48%] lg:w-[32%]"
                  >
                    <p className="font-semibold text-[#8E7037] mb-2">
                      {event.title?.en}
                    </p>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p className="flex items-center gap-2">
                        <Ticket size={16} className="text-[#8E7037]" />
                        <strong>Quantity:</strong> {event.quantity}
                      </p>
                      <p className="flex items-center gap-2 text-green-700 font-medium">
                        <Receipt size={16} className="text-green-700" />
                        Total: ${event.totalPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
