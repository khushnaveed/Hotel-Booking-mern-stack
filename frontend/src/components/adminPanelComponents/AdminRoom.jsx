import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext.jsx";
export default function AdminRoom() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [newRoom, setNewRoom] = useState({
    title: "",
    slug: "",
    descOverview: "",
    defaultPrice: "",
    images: ["", "", "", "", ""],
    additionalDetails: {
      maxPersons: "",
      bed: "",
      view: ""
    }
  });
  const { currency } = useCurrency();
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [editedRoom, setEditedRoom] = useState({});
  const [expandedRoomIds, setExpandedRoomIds] = useState([]);

  const toggleReadMore = (roomId) => {
    setExpandedRoomIds((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId]
    );
  };
  const baseUrl =
    import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    setLoading(true);
    axios
      .get(baseUrl + "/room")
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
    let data = {
      title: newRoom.title,
      slug: newRoom.slug.toLowerCase().replace(/\s+/g, "-"),
      images: newRoom.images.filter(Boolean),
      descOverview: newRoom.descOverview,
      defaultPrice: parseFloat(newRoom.defaultPrice),
      additionalDetails: {
        maxPersons: newRoom.additionalDetails.maxPersons,
        bed: newRoom.additionalDetails.bed,
        view: newRoom.additionalDetails.view
      }
    };
    axios
      .post(baseUrl + "/room", data, {
        headers: { token: localStorage.getItem("token") }
      })
      .then(() => {
        setNewRoom({
          title: "",
          slug: "",
          descOverview: "",
          defaultPrice: "",
          images: ["", "", "", "", ""],
          additionalDetails: {
            maxPersons: "",
            bed: "",
            view: ""
          }
        });
        fetchRooms();
      })
      .catch((err) => console.error("Create failed:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(baseUrl + `/room/${id}`, {
        headers: { token: localStorage.getItem("token") }
      })
      .then(() => fetchRooms())
      .catch((err) => console.error("Delete failed:", err));
  };

  const startEditing = (room) => {
    const filledImages = [...(room.images || [])];
    while (filledImages.length < 5) filledImages.push("");

    setEditingRoomId(room._id);
    setEditedRoom({
      title: room.title,
      descOverview: room.descOverview,
      defaultPrice: room.defaultPrice,
      images: filledImages,
      additionalDetails: {
        maxPersons: room.additionalDetails?.maxPersons || "",
        bed: room.additionalDetails?.bed || "",
        view: room.additionalDetails?.view || ""
      }
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedRoom({ ...editedRoom, [name]: value });
  };

  const handleEditSave = (id) => {
    axios
      .patch(
        baseUrl + `/room/${id}`,
        {
          title: editedRoom.title,
          descOverview: editedRoom.descOverview,
          defaultPrice: parseFloat(editedRoom.defaultPrice),
          images: editedRoom.images.filter(Boolean),
          additionalDetails: {
            maxPersons: editedRoom.additionalDetails.maxPersons,
            bed: editedRoom.additionalDetails.bed,
            view: editedRoom.additionalDetails.view
          }
        },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then(() => {
        setEditingRoomId(null);
        fetchRooms();
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div className="p-6 rounded-lg bg-gray-50 min-h-screen">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#8E7037]">
          <p className="text-sm font-medium text-gray-500">Total Rooms</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{rooms.length}</p>
        </div>
      </div>
      <h2 className="text-3xl rounded-lg font-semibold text-gray-800 mb-6">
        Room Management ({rooms.length} rooms)
      </h2>
      <div className="bg-white  p-6 shadow-lg mb-10 space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Create New Room</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Title */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Title"
              value={newRoom.title}
              onChange={(e) => setNewRoom({ ...newRoom, title: e.target.value })}
              className="w-full border-gray-300 p-3 shadow-sm placeholder:text-sm placeholder:whitespace-normal"
            />
          </div>


          <div className="w-full">
            <input
              type="text"
              placeholder="Slug"
              value={newRoom.slug}
              onChange={(e) => setNewRoom({ ...newRoom, slug: e.target.value })}
              className="w-full border-gray-300 p-3 shadow-sm placeholder:text-sm placeholder:whitespace-normal"
            />
          </div>


          <div className="w-full col-span-1 sm:col-span-2">
            <input
              type="text"
              placeholder="Overview"
              value={newRoom.descOverview}
              onChange={(e) =>
                setNewRoom({ ...newRoom, descOverview: e.target.value })
              }
              className="w-full border-gray-300 p-3 shadow-sm placeholder:text-sm placeholder:whitespace-normal"
            />
          </div>


          <div className="w-full">
            <input
              type="number"
              placeholder="Default Price"
              value={newRoom.defaultPrice}
              onChange={(e) =>
                setNewRoom({ ...newRoom, defaultPrice: e.target.value })
              }
              className="w-full border-gray-300 p-3 shadow-sm placeholder:text-sm placeholder:whitespace-normal"
            />
          </div>


          {newRoom.images.map((url, index) => (
            <div className="w-full" key={index}>
              <input
                type="text"
                placeholder={`Image URL ${index + 1}`}
                value={url}
                onChange={(e) => {
                  const updatedImages = [...newRoom.images];
                  updatedImages[index] = e.target.value;
                  setNewRoom({ ...newRoom, images: updatedImages });
                }}
                className="w-full border-gray-300 p-3 shadow-sm placeholder:text-sm placeholder:whitespace-normal"
              />
            </div>
          ))}

          <h3 className="text-xl font-bold text-gray-800 col-span-1 sm:col-span-2 mt-4">
            Additional Details
          </h3>
          <div className="w-full">
            <input
              name="maxPersons"
              type="number"
              placeholder="Max Persons"
              value={newRoom.additionalDetails.maxPersons}
              onChange={(e) =>
                setNewRoom({
                  ...newRoom,
                  additionalDetails: {
                    ...newRoom.additionalDetails,
                    maxPersons: e.target.value
                  }
                })
              }
              className="w-full border-gray-300 p-3 shadow-sm placeholder:text-sm placeholder:whitespace-normal"
            />
          </div>
          <div className="w-full">
            <input
              name="bed"
              type="text"
              placeholder="Bed Type"
              value={newRoom.additionalDetails.bed}
              onChange={(e) =>
                setNewRoom({
                  ...newRoom,
                  additionalDetails: {
                    ...newRoom.additionalDetails,
                    bed: e.target.value
                  }
                })
              }
              className="w-full border-gray-300 p-3 shadow-sm placeholder:text-sm placeholder:whitespace-normal"
            />
          </div>

          <div className="w-full">
            <input
              name="view"
              type="text"
              placeholder="View"
              value={newRoom.additionalDetails.view}
              onChange={(e) =>
                setNewRoom({
                  ...newRoom,
                  additionalDetails: {
                    ...newRoom.additionalDetails,
                    view: e.target.value
                  }
                })
              }
              className="w-full border-gray-300 p-3 shadow-sm placeholder:text-sm placeholder:whitespace-normal"
            />
          </div>
        </div>

        <button
          onClick={handleCreate}
          className="bg-[#8E7037] text-white px-6 py-2 hover:bg-white hover:text-[#8E7037] border border-[#8E7037] transition-all duration-200"
        >
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
              className="bg-white p-6 shadow-lg flex flex-col md:flex-row gap-4 md:items-center transition-transform hover:scale-105"
            >
              <img
                src={room.images?.[0]}
                alt={room.title}
                className="w-full md:w-28 h-28 object-cover"
              />
              {editingRoomId === room._id ? (
                <div className="flex-1 space-y-3">
                  <input
                    name="title"
                    value={editedRoom.title}
                    onChange={handleEditChange}
                    className="w-full border-gray-300 p-3 shadow-sm"
                  />
                  <input
                    name="descOverview"
                    value={editedRoom.descOverview}
                    onChange={handleEditChange}
                    className="w-full border-gray-300 p-3 shadow-sm"
                  />
                  <input
                    name="defaultPrice"
                    type="number"
                    value={editedRoom.defaultPrice}
                    onChange={handleEditChange}
                    className="w-full border-gray-300 p-3 shadow-sm"
                  />
                  {editedRoom.images?.map((url, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Image URL ${index + 1}`}
                      value={url}
                      onChange={(e) => {
                        const updatedImages = [...editedRoom.images];
                        updatedImages[index] = e.target.value;
                        setEditedRoom({ ...editedRoom, images: updatedImages });
                      }}
                      className="w-full border-gray-300 p-3 shadow-sm"
                    />
                  ))}
                  <input
                    name="bed"
                    placeholder="Bed Type"
                    value={editedRoom.additionalDetails?.bed || ""}
                    onChange={(e) =>
                      setEditedRoom({
                        ...editedRoom,
                        additionalDetails: {
                          ...editedRoom.additionalDetails,
                          bed: e.target.value
                        }
                      })
                    }
                    className="w-full border-gray-300 p-3 shadow-sm"
                  />
                  <input
                    name="view"
                    placeholder="View"
                    value={editedRoom.additionalDetails?.view || ""}
                    onChange={(e) =>
                      setEditedRoom({
                        ...editedRoom,
                        additionalDetails: {
                          ...editedRoom.additionalDetails,
                          view: e.target.value
                        }
                      })
                    }
                    className="w-full border-gray-300 p-3 shadow-sm"
                  />

                  <div className="flex flex-col md:flex-row justify-end gap-2 pt-2 w-full">
                    <button
                      onClick={() => handleEditSave(room._id)}
                      className="bg-[#8E7037] text-white px-6 py-2 hover:bg-white hover:border hover:border-[#8E7037] hover:text-[#8E7037]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingRoomId(null)}
                      className="bg-gray-300 text-gray-800 px-6 py-2 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 text-gray-800">
                  <h3 className="text-xl font-semibold">{room.title}</h3>
                  <p className={`text-gray-600 text-justify ${expandedRoomIds.includes(room._id) ? '' : 'line-clamp-2'}`}>
                    {room.descOverview}
                  </p>
                  <button
                    onClick={() => toggleReadMore(room._id)}
                    className="text-sm text-blue-600 hover:underline mt-1"
                  >
                    {expandedRoomIds.includes(room._id) ? 'Read less' : 'Read more'}
                  </button>
                  <div className="mt-4">
                    <p className="text-sm mt-1">💶 Price: {room.defaultPrice} {currencySymbols[currency]} </p>
                    <p className="text-sm mt-1">Max Persons: {room?.additionalDetails?.maxPersons}</p>
                    <p className="text-sm mt-1">Bed Type: {room?.additionalDetails?.bed}</p>
                    <p className="text-sm mt-1">View: {room?.additionalDetails?.view}</p>
                  </div>
                </div>
              )}
              <div className="ml-4 space-x-2">
                {!editingRoomId && (
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Pencil
                      onClick={() => startEditing(room)}
                      className="text-yellow-600 cursor-pointer hover:scale-110 transition-transform"
                      size={18}
                    />
                    <Trash2
                      onClick={() => handleDelete(room._id)}
                      className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
                      size={18}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
