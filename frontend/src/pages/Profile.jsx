import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuestContext } from "../context/GuestContext.jsx";
import axios from "axios";

const Profile = () => {
  const { logout, guest } = useContext(GuestContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/api/bookings/my-bookings", {
          withCredentials: true,
        });
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
        setBookings([]); 
      }
    };

    if (guest?._id) {
      fetchBookings();
    }
  }, [guest]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Your Profile
        </h1>
        <div className="space-y-4 text-gray-700 text-base">
          <p>
            <strong>First Name:</strong> {guest.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {guest.lastName}
          </p>
          <p>
            <strong>Email:</strong> {guest.email}
          </p>
          <p>
            <strong>Phone:</strong> {guest.phonenumber || "Not provided"}
          </p>
          <p>
            <strong>Address:</strong> {guest.address || "Not provided"}
          </p>
          <p>
            <strong>City:</strong> {guest.city || "Not provided"}
          </p>
          <p>
            <strong>Zip Code:</strong> {guest.zipcode || "Not provided"}
          </p>
          <p>
            <strong>Country:</strong> {guest.country || "Not provided"}
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Your Bookings</h2>
        {Array.isArray(bookings) && bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="border border-gray-200 rounded-md p-4 mb-4 text-sm"
            >
              <p>
                <strong>Hotel:</strong> {booking.hotelName || "N/A"}
              </p>
              <p>
                <strong>Check-in:</strong> {booking.checkInDate?.slice(0, 10)}
              </p>
              <p>
                <strong>Check-out:</strong> {booking.checkOutDate?.slice(0, 10)}
              </p>
              <p>
                <strong>Guests:</strong> {booking.numGuests || "N/A"}
              </p>
              <p>
                <strong>Total Price:</strong> ${booking.totalPrice || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm">No bookings yet.</p>
        )}

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-[#8E7037] text-white py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
