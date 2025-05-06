import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminRoom() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [newRoom, setNewRoom] = useState({
    title: "",
    slug: "",
    descOverview: "",
    defaultPrice: "",
    image: ""
  });
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [editedRoom, setEditedRoom] = useState({});

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    setLoading(true);
    axios
      .get("http://localhost:5005/room")
      .then((response) => {
        setRooms(response.data.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const handleCreate = () => {
    axios
      .post("http://localhost:5005/room", {
        title: newRoom.title,
        slug: newRoom.slug.toLowerCase().replace(/\s+/g, "-"),
        images: [newRoom.image],
        descOverview: newRoom.descOverview,
        defaultPrice: parseFloat(newRoom.defaultPrice),
      }, { headers: { "token": localStorage.getItem("token") } })
      .then(() => {
        setNewRoom({
          title: "",
          slug: "",
          descOverview: "",
          defaultPrice: "",
          image: ""
        }, { headers: { "token": localStorage.getItem("token") } });
        fetchRooms();
      })
      .catch((err) => console.error("Create failed:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5005/room/${id}`, {
        headers: { token: localStorage.getItem("token") }
      })
      .then(() => fetchRooms())
      .catch((err) => console.error("Delete failed:", err));
  };

  const startEditing = (room) => {
    setEditingRoomId(room._id);
    setEditedRoom({
      title: room.title,
      descOverview: room.descOverview,
      defaultPrice: room.defaultPrice,
      image: room.images?.[0] || ""
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedRoom({ ...editedRoom, [name]: value });
  };

  const handleEditSave = (id) => {
    axios
      .patch(`http://localhost:5005/room/${id}`, {
        title: editedRoom.title,
        descOverview: editedRoom.descOverview,
        defaultPrice: parseFloat(editedRoom.defaultPrice),
        images: [editedRoom.image],
      }, {
        headers: { "token": localStorage.getItem("token") }
      })
      .then(() => {
        setEditingRoomId(null);
        fetchRooms();
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Room Management ({rooms.length} rooms)
      </h2>

      <div className="bg-white p-6 -xl shadow-lg mb-10 space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Create New Room</h3>
        <div className="grid grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Title"
            value={newRoom.title}
            onChange={(e) =>
              setNewRoom({ ...newRoom, title: e.target.value })
            }
            className="border-gray-300  p-3 shadow-sm w-full"
          />
          <input
            type="text"
            placeholder="Slug"
            value={newRoom.slug}
            onChange={(e) =>
              setNewRoom({ ...newRoom, slug: e.target.value })
            }
            className="border-gray-300  p-3 shadow-sm w-full"
          />
          <input
            type="text"
            placeholder="Overview"
            value={newRoom.descOverview}
            onChange={(e) =>
              setNewRoom({ ...newRoom, descOverview: e.target.value })
            }
            className="border-gray-300  p-3 shadow-sm w-full col-span-2"
          />
          <input
            type="number"
            placeholder="Default Price"
            value={newRoom.defaultPrice}
            onChange={(e) =>
              setNewRoom({ ...newRoom, defaultPrice: e.target.value })
            }
            className="border-gray-300  p-3 shadow-sm w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newRoom.image}
            onChange={(e) =>
              setNewRoom({ ...newRoom, image: e.target.value })
            }
            className="border-gray-300  p-3 shadow-sm w-full"
          />
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-6 py-2  hover:bg-[#8E7037] transition-all duration-200">
          Create Room
        </button>
      </div>

      {loading ? (
        <p>Loading rooms...</p>
      ) : error ? (
        <p className="text-red-600">Error fetching rooms.</p>
      ) : rooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        <div className="space-y-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white p-6  shadow-lg flex justify-between items-center transition-transform hover:scale-105">
              <img
                src={room.images?.[0]}
                alt={room.title}
                className="w-28 h-28 object-cover  mr-6"
              />
              {editingRoomId === room._id ? (
                <div className="flex-1 space-y-3">
                  <input
                    name="title"
                    value={editedRoom.title}
                    onChange={handleEditChange}
                    className="w-full border-gray-300  p-3 shadow-sm"
                  />
                  <input
                    name="descOverview"
                    value={editedRoom.descOverview}
                    onChange={handleEditChange}
                    className="w-full border-gray-300  p-3 shadow-sm"
                  />
                  <input
                    name="defaultPrice"
                    type="number"
                    value={editedRoom.defaultPrice}
                    onChange={handleEditChange}
                    className="w-full border-gray-300  p-3 shadow-sm"
                  />
                  <input
                    name="image"
                    value={editedRoom.image}
                    onChange={handleEditChange}
                    className="w-full border-gray-300  p-3 shadow-sm"
                  />
                  <div className="flex justify-end gap-4 pt-2">
                    <button
                      onClick={() => handleEditSave(room._id)}
                      className="bg-green-600 text-white px-6 py-2  hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingRoomId(null)}
                      className="bg-gray-300 text-gray-800 px-6 py-2  hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 text-gray-800">
                  <h3 className="text-xl font-semibold">{room.title}</h3>
                  <p className="text-gray-600">{room.descOverview}</p>
                  <p className="text-sm mt-1">💶 Price: {room.defaultPrice} €</p>
                </div>
              )}
              <div className="ml-4 space-x-2">
                {!editingRoomId && (
                  <>
                    {/*  <button
                      onClick={() => startEditing(room)}
                      className="bg-yellow-500 text-white px-6 py-2  hover:bg-yellow-600">
                      Edit
                    </button> */}
                    <button
                      onClick={() => startEditing(room)}
                      className="text-yellow-500 text-xl hover:text-yellow-600"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    {/* <button
                      onClick={() => handleDelete(room._id)}
                      className="bg-red-500 text-white px-6 py-2  hover:bg-red-600">
                      Delete
                    </button> */}
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="text-red-500 text-xl hover:text-red-600"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
