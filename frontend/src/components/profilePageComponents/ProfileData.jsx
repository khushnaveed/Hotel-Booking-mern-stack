import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Phone, MapPin, Pencil } from "lucide-react";

const ProfileData = ({ guest }) => {
  const labelClass = " text-gray-500";
  const valueClass = "border-gray-300 mt-2 p-3 shadow-sm w-full";

  const [isEditing, setIsEditing] = useState(false);
  const [editedGuest, setEditedGuest] = useState({
    firstName: guest?.firstName || "",
    lastName: guest?.lastName || "",
    phonenumber: guest?.phonenumber || "",
    address: guest?.address || "",
    city: guest?.city || "",
    zipcode: guest?.zipcode || "",
    country: guest?.country || "",
  });
  const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGuest({ ...editedGuest, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(baseUrl +`/guest/${guest._id}`, editedGuest, {
        headers: { token },
      });
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      console.error("Error updating guest:", err);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-[#8E7037]" />
            <p className={labelClass}>First Name</p>
          </div>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={editedGuest.firstName}
              onChange={handleInputChange}
              className="border-gray-300 p-3 shadow-sm w-full bg-gray-100 mt-2"
            />
          ) : (
            <p className={valueClass}>{guest?.firstName || "Not provided"}</p>
          )}
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-[#8E7037]" />
            <p className={labelClass}>Last Name</p>
          </div>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={editedGuest.lastName}
              onChange={handleInputChange}
              className="border-gray-300 p-3 shadow-sm w-full bg-gray-100 mt-2"
            />
          ) : (
            <p className={valueClass}>{guest?.lastName || "Not provided"}</p>
          )}
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-[#8E7037]" />
            <p className={labelClass}>Email</p>
          </div>
          <p className={valueClass}>{guest?.email || "Not provided"}</p>
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-[#8E7037]" />
            <p className={labelClass}>Phone</p>
          </div>
          {isEditing ? (
            <input
              type="text"
              name="phonenumber"
              value={editedGuest.phonenumber}
              onChange={handleInputChange}
              className="border-gray-300 p-3 shadow-sm w-full bg-gray-100 mt-2"
            />
          ) : (
            <p className={valueClass}>{guest?.phonenumber || "Not provided"}</p>
          )}
        </div>
      </div>

      <div className="mt-8 border-t pt-6">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="h-4 w-4 text-[#8E7037]" />
          <p className=" font-semibold text-[#8E7037]">Address</p>
        </div>
        {isEditing ? (
          <input
            type="text"
            name="address"
            value={editedGuest.address}
            onChange={handleInputChange}
            className="border-gray-300 p-3 shadow-sm w-full bg-gray-100 mt-2"
          />
        ) : (
          <p className={valueClass}>{guest?.address || "Not provided"}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <p className={labelClass}>City</p>
            {isEditing ? (
              <input
                type="text"
                name="city"
                value={editedGuest.city}
                onChange={handleInputChange}
                className="border-gray-300 p-3 shadow-sm w-full bg-gray-100 mt-2"
              />
            ) : (
              <p className={valueClass}>{guest?.city || "Not provided"}</p>
            )}
          </div>
          <div>
            <p className={labelClass}>Zip Code</p>
            {isEditing ? (
              <input
                type="text"
                name="zipcode"
                value={editedGuest.zipcode}
                onChange={handleInputChange}
                className="border-gray-300 p-3 shadow-sm w-full bg-gray-100 mt-2"
              />
            ) : (
              <p className={valueClass}>{guest?.zipcode || "Not provided"}</p>
            )}
          </div>
          <div>
            <p className={labelClass}>Country</p>
            {isEditing ? (
              <input
                type="text"
                name="country"
                value={editedGuest.country}
                onChange={handleInputChange}
                className="border-gray-300 p-3 shadow-sm w-full bg-gray-100 mt-2"
              />
            ) : (
              <p className={valueClass}>{guest?.country || "Not provided"}</p>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-4 flex gap-4 justify-end">
          <button
            onClick={handleUpdate}
            className="bg-[#8E7037] w-20 text-white px-4 py-2 hover:bg-white hover:border hover:border-[#8E7037] hover:text-[#8E7037] transition duration-300"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-white w-20 text-[#8E7037] border border-[#8E7037] px-4 py-2 hover:bg-gray-200 transition duration-300"
          >
            Cancel
          </button>
        </div>
      )}

      {!isEditing && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#8E7037] flex text-white px-4 py-2  hover:bg-white hover:text-[#8E7037] hover:border hover:border-[#8E7037] transition duration-300"
          >
            <Pencil size={16} className="mr-2 m-1" />
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileData;
