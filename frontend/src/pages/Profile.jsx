import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GuestContext } from "../context/GuestContext.jsx";

const Profile = () => {
  const { guest, logout, loading, isLoggedIn } = useContext(GuestContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <div>Loading...</div>;
  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return (
    <div className="relative w-full h-screen">
      <img
        src="https://img.freepik.com/premium-photo/luxury-hotel-entrance-with-water-fountain_1287986-20413.jpg"
        alt="Royal Grand Hotel"
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 max-w-lg w-full text-left bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">User Profile</h1>

        <div className="space-y-2 text-gray-700">
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
            <strong>Phone:</strong> {guest.phonenumber}
          </p>
          <p>
            <strong>Address:</strong> {guest.address}
          </p>
          <p>
            <strong>City:</strong> {guest.city}
          </p>
          <p>
            <strong>Zip Code:</strong> {guest.zipcode}
          </p>
          <p>
            <strong>Country:</strong> {guest.country}
          </p>
        </div>

        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
