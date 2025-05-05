import React, { useEffect, useState } from "react";
import axios from "axios";

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
      fetchGuests(); // Refresh list
    } catch (err) {
      console.error("Error updating guest:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">  Guest List ({guests.length} guests)
      </h2>
      {guests.map((guest) => (
        <div
          key={guest._id}
          className="bg-white p-6 mb-6 rounded-xl shadow-lg flex justify-between items-center transition-transform hover:scale-105"
        >
          {editingGuestId === guest._id ? (
         <div className="w-full space-y-8">
         <div className="flex gap-6">
           <div className="flex-1">
             <label className="block text-sm font-medium text-gray-700">First Name:</label>
             <input
               type="text"
               name="firstName"
               value={editedGuest.firstName}
               onChange={handleInputChange}
               className="w-full border-gray-300 rounded-lg p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
             />
           </div>
           <div className="flex-1">
             <label className="block text-sm font-medium text-gray-700">Last Name:</label>
             <input
               type="text"
               name="lastName"
               value={editedGuest.lastName}
               onChange={handleInputChange}
               className="w-full border-gray-300 rounded-lg p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
             />
           </div>
         </div>
       
         <div className="flex gap-6">
           <div className="flex-1">
             <label className="block text-sm font-medium text-gray-700">Email:</label>
             <input
               type="email"
               name="email"
               value={editedGuest.email}
               onChange={handleInputChange}
               className="w-full border-gray-300 rounded-lg p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
             />
           </div>
           <div className="flex-1">
             <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
             <input
               type="text"
               name="phonenumber"
               value={editedGuest.phonenumber}
               onChange={handleInputChange}
               className="w-full border-gray-300 rounded-lg p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
             />
           </div>
         </div>
       
         <div className="flex gap-6">
           <div className="flex-1">
             <label className="block text-sm font-medium text-gray-700">City:</label>
             <input
               type="text"
               name="city"
               value={editedGuest.city}
               onChange={handleInputChange}
               className="w-full border-gray-300 rounded-lg p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
             />
           </div>
           <div className="flex-1">
             <label className="block text-sm font-medium text-gray-700">Zip Code:</label>
             <input
               type="text"
               name="zipcode"
               value={editedGuest.zipcode}
               onChange={handleInputChange}
               className="w-full border-gray-300 rounded-lg p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
             />
           </div>
         </div>
       
         <div>
           <label className="block text-sm font-medium text-gray-700">Address:</label>
           <input
             type="text"
             name="address"
             value={editedGuest.address}
             onChange={handleInputChange}
             className="w-full border-gray-300 rounded-lg p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
           />
         </div>
       
         <div>
           <label className="block text-sm font-medium text-gray-700">Role:</label>
           <select
             name="role"
             value={editedGuest.role}
             onChange={handleInputChange}
             className="w-full border-gray-300 rounded-lg p-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
           >
             <option value="guest">Guest</option>
             <option value="admin">Admin</option>
           </select>
         </div>

         <div className="flex justify-end gap-6 mt-8">
           <button
             onClick={updateGuest}
             className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-200"
           >
             Save Changes
           </button>
           <button
             onClick={() => setEditingGuestId(null)}
             className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all duration-200"
           >
             Cancel
           </button>
         </div>
       </div>
       
          ) : (
            <div className="flex-1 text-gray-800">
              <p className="text-lg font-semibold">{guest.firstName} {guest.lastName}</p>
              <p className="text-gray-600">{guest.email}</p>
              <p className="text-gray-600">{guest.phonenumber}</p>
              <p className="text-gray-600">{guest.address}, {guest.city}, {guest.zipcode}, {guest.country}</p>
              <p className="text-sm text-gray-500">Role: {guest.role}</p>
            </div>
          )}

<div className="ml-4 space-x-2">
      {!editingGuestId && (
        <>
          <button
            onClick={() => startEditing(guest)}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition-all duration-200 "
          >
            Edit
          </button>
          <button
            onClick={() => deleteGuest(guest._id)}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            Delete
          </button>
        </>
      )}
    </div>
        </div>
      ))}
    </div>
  );
};

export default AdminGuest;
