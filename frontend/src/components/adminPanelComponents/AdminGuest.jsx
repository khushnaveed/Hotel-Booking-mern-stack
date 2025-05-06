import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

const AdminGuest = () => {
  const [guests, setGuests] = useState([]);
  const [editingGuestId, setEditingGuestId] = useState(null);
  const [editedGuest, setEditedGuest] = useState({});

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5005/guest", {
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
      await axios.delete(`http://localhost:5005/guest/${id}`, {
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
        `http://localhost:5005/guest/${editingGuestId}`,
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
      {/* Total Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]">
          <p className="text-sm font-medium text-gray-500">Total Guests</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            {guests.length}
          </p>
        </div>
      </div>

      {/* Table with horizontal scroll */}
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Table Header */}
          <div className="grid grid-cols-10 gap-2 bg-[#f8efe0] text-[#8E7037] font-semibold px-4 py-3 rounded-t-lg mb-2 text-sm">
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

          {/* Guest Rows */}
          {guests.map((guest) => (
            <div
              key={guest._id}
              className="grid grid-cols-10 gap-2   sm:grid-cols-10 items-center bg-white p-4 mb-2 rounded-lg shadow text-sm"
            >
              {editingGuestId === guest._id ? (
                <>
                  <input
                    type="text"
                    name="firstName"
                    value={editedGuest.firstName}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={editedGuest.lastName}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                 
                  <input
                    type="text"
                    name="country"
                    value={editedGuest.country}
                    onChange={handleInputChange}
                    className="border p-2 rounded "
                  />
                  <input
                    type="text"
                    name="city"
                    value={editedGuest.city}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="phonenumber"
                    value={editedGuest.phonenumber}
                    onChange={handleInputChange}
                    className="border p-2 rounded "
                  />
                  <input
                    type="text"
                    name="zipcode"
                    value={editedGuest.zipcode}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedGuest.email}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                    <input
                    type="text"
                    name="role"
                    value={editedGuest.role}
                    onChange={handleInputChange}
                    className="border p-2 rounded"
                  />
                  <div className="flex gap-2 col-span-2">
                    <button
                      onClick={updateGuest}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingGuestId(null)}
                      className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
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
                 <span className="truncate break-words">{guest.phonenumber}</span>

                  <span>{guest.zipcode}</span>
                  <span className="truncate break-words" >{guest.email}</span>
                  <span className="whitespace-nowrap">{guest.role}</span>

                  <div className="flex gap-4 col-span-2 justify-center">
                    <Pencil
                      onClick={() => startEditing(guest)}
                      className="text-yellow-600 cursor-pointer hover:scale-110 transition-transform"
                      size={20}
                    />
                    <Trash2
                      onClick={() => deleteGuest(guest._id)}
                      className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
                      size={20}
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
