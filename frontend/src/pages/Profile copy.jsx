import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GuestContext } from "../context/GuestContext.jsx";

const Profile = () => {
  const { logout, guest } = useContext(GuestContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
console.log(guest)
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
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
