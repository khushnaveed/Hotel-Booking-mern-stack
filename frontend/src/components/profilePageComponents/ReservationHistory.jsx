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
