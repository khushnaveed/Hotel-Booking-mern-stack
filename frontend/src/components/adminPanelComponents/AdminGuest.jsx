import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

const AdminGuest = () => {
  const [guests, setGuests] = useState([]);
  const [editingGuestId, setEditingGuestId] = useState(null);
  const [editedGuest, setEditedGuest] = useState({});
  const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(baseUrl + "/guest", {
        headers: { token },
      });
      setGuests(res.data.data);
    } catch (err) {
      console.error("Error fetching guests:", err);
    }
  };

  const deleteGuest = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(baseUrl + `/guest/${id}`, {
        headers: { token },
      });
      fetchGuests();
    } catch (err) {
      console.error("Error deleting guest:", err);
    }
  };

  const startEditing = (guest) => {
    setEditingGuestId(guest._id);
    setEditedGuest({ ...guest });
  };

  const handleInputChange = (e) => {
    setEditedGuest({ ...editedGuest, [e.target.name]: e.target.value });
  };

  const updateGuest = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        baseUrl + `/guest/${editingGuestId}`,
        editedGuest,
        { headers: { token } }
      );
      setEditingGuestId(null);
      fetchGuests();
    } catch (err) {
      console.error("Error updating guest:", err);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]">
          <p className="text-sm font-medium text-gray-500">Total Guests</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {guests.length}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-10 gap-2 bg-[#f8efe0] text-[#8E7037] font-semibold px-4 py-3  mb-2 text-sm">
            <span>First Name</span>
            <span>Last Name</span>
            <span>Country</span>
            <span>City</span>
            <span>Phone</span>
            <span>Zip</span>
            <span>Email</span>
            <span>role</span>
            <span className="col-span-2 text-center">Actions</span>
          </div>

          {guests.map((guest) => (
            <div
              key={guest._id}
              className="grid grid-cols-10 gap-2  hover:bg-gray-50 sm:grid-cols-10 items-center bg-white p-4 mb-2  shadow text-sm"
            >
              {editingGuestId === guest._id ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={editedGuest.firstName}
                    readonly
                    className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={editedGuest.lastName}
                    readonly
                    className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
                  />

                  <input
                    type="text"
                    name="country"
                    value={editedGuest.country}
                    readonly
                    className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
                  />
                  <input
                    type="text"
                    name="city"
                    value={editedGuest.city}
                    readonly
                    className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
                  />
                  <input
                    type="text"
                    name="phonenumber"
                    value={editedGuest.phonenumber}
                    readonly
                    className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
                  />
                  <input
                    type="text"
                    name="zipcode"
                    value={editedGuest.zipcode}
                    readonly
                    className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedGuest.email}
                    readonly
                    className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
                  />
                  <input
                    type="text"
                    name="role"
                    value={editedGuest.role}
                    onChange={handleInputChange}
                    className="border-gray-300 p-3 shadow-sm w-full bg-gray-100"
                  />
                  <div className="flex gap-2 col-span-2">
                    <button
                      onClick={updateGuest}
                      className="bg-[#8E7037] w-18 text-white px-3 py-1 hover:bg-white hover:border hover:border-[#8E7037] hover:text-[#8E7037]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingGuestId(null)}
                      className="bg-white w-18 border border-[#8E7037] text-[#8E7037] px-3 py-1  hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span>{guest.firstName}</span>
                  <span>{guest.lastName}</span>
                  <span>{guest.country}</span>
                  <span className="truncate break-words">{guest.city}</span>
                  <span className="truncate break-words">
                    {guest.phonenumber}
                  </span>

                  <span>{guest.zipcode}</span>
                  <span className="truncate break-words">{guest.email}</span>
                  <span className="whitespace-nowrap">{guest.role}</span>

                  <div className="flex gap-4 col-span-2 justify-center">
                    <Pencil
                      onClick={() => startEditing(guest)}
                      className="text-yellow-600 cursor-pointer hover:scale-110 transition-transform"
                      size={18}
                    />
                    <Trash2
                      onClick={() => deleteGuest(guest._id)}
                      className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
                      size={18}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGuest;
