import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReservationHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5005/order/my-orders", {
          headers: { token },
        });

        if (response.data.success) {
          setOrders(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch orders.");
        }
      } catch (err) {
        setError("Error fetching orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-6 text-lg font-medium text-gray-700">Loading your reservation history...</div>;
  if (error) return <div className="text-center text-red-500 py-6">{error}</div>;
  if (orders.length === 0) return <div className="text-center py-6 text-gray-500">No reservations found yet.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white  shadow-md p-6 mb-10 border border-gray-100 transition hover:shadow-lg"
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
              <div
                key={i}
                className="bg-gray-50  p-4 border border-gray-200"
              >
                 
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
    </div>
  );
}

/**import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ReservationHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5005/order/my-orders", {
          headers: {
            token: token,
          },
        });

        if (response.data.success) {
          setOrders(response.data.data);
        }  else {
          console.log("Unexpected response:", response.data);
          setError(response.data.message || "Failed to fetch orders.");
        }
        
      } catch (err) {
        setError("Error fetching orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;
  if (orders.length === 0) return <div>No reservations found.</div>;

  return (
    <div>
      <h1>Reservation History</h1>
      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            marginBottom: "2rem",
            border: "1px solid #ccc",
            padding: "1rem",
          }}
        >
          <h2>Order ID: {order._id}</h2>
          <p>Order Total Amount: ${order.orderTotalAmount}</p>
          <p>Payment Status: {order.paymentStatus}</p>
          <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>

          <h3>Rooms Booked:</h3>
          <ul>
            {order.roomsBooking.map((room, i) => (
              <li key={i}>
                <p>
                  <strong>{room.title}</strong>
                </p>
                <p>
                  Arrival: {new Date(room.arrivalDate).toLocaleDateString()}
                </p>
                <p>
                  Departure: {new Date(room.departureDate).toLocaleDateString()}
                </p>
                <p>
                  Adults: {room.numAdults}, Children: {room.numChildren}
                </p>
                <p>Total Price: ${room.totalPrice}</p>
                <p>Nights: {room.nights}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
*/