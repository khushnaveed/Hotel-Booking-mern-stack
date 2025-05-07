import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function AdminEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    excerpt: "",
    date: "",
    price: "",
    image: "",
    showCountdown: false,
  });
  const [editingEventId, setEditingEventId] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    setLoading(true);
    axios
      .get("http://localhost:5005/events")
      .then((response) => {
        setEvents(response.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const handleCreate = () => {
    axios
      .post(
        "http://localhost:5005/events",
        {
          title: { en: newEvent.title },
          excerpt: { en: newEvent.excerpt },
          image: newEvent.image,
          price: Number(newEvent.price),
          date: new Date(newEvent.date).toISOString(),
          showCountdown: newEvent.showCountdown,
        },

        { headers: { token: localStorage.getItem("token") } }
      )
      .then(() => {
        setNewEvent({
          title: "",
          excerpt: "",
          date: "",
          price: "",
          image: "",
          showCountdown: false,
        });
        fetchEvents();
      })
      .catch((err) => console.error("Create failed:", err));
  };

  /* try {
      const eventToCreate = {
          id: uuidv4(),
        title: { en: newEvent.title },
        excerpt: { en: newEvent.excerpt },
        image: newEvent.image,
        price: Number(newEvent.price),
        date: new Date(newEvent.date).toISOString(),
        showCountdown: newEvent.showCountdown,
      };
      console.log("Sending eventToCreate:", eventToCreate);
      const res = await fetch("http://localhost:5005/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(eventToCreate),
      });

      if (!res.ok) throw new Error("Failed to create event");

      const savedEvent = await res.json();
      setEvents([savedEvent, ...events]);
      setNewEvent({
        title: "",
        excerpt: "",
        date: "",
        price: "",
        image: "",
        showCountdown: false,
      });
    } catch (err) {
      console.error("Create failed:", err.message);
      setError(true);
    }
  }; */

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5005/events/${id}`)
      .then(() => fetchEvents())
      .catch((err) => console.error("Delete failed:", err));
  };

  const startEditing = (event) => {
    setEditingEventId(event._id);
    setEditedEvent({
      title: event.title?.en || "",
      excerpt: event.excerpt?.en || "",
      date: event.date,
      price: event.price,
      image: event.image,
      showCountdown: event.showCountdown,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setEditedEvent({ ...editedEvent, [name]: checked });
    } else {
      setEditedEvent({ ...editedEvent, [name]: value });
    }
  };

  const handleEditSave = (id) => {
    axios
      .put(`http://localhost:5005/events/${id}`, {
        title: { en: editedEvent.title },
        excerpt: { en: editedEvent.excerpt },
        date: editedEvent.date,
        price: editedEvent.price,
        image: editedEvent.image,
        showCountdown: editedEvent.showCountdown,
      })
      .then(() => {
        setEditingEventId(null);
        fetchEvents();
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Event Management ({events.length} events)
      </h2>

      {/* Create New Event Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-10 space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Create New Event</h3>
        <div className="grid grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            className="border-gray-300 rounded-lg p-3 shadow-sm w-full"
          />
          <input
            type="text"
            placeholder="Excerpt"
            value={newEvent.excerpt}
            onChange={(e) =>
              setNewEvent({ ...newEvent, excerpt: e.target.value })
            }
            className="border-gray-300 rounded-lg p-3 shadow-sm w-full"
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="border-gray-300 rounded-lg p-3 shadow-sm w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={newEvent.price}
            onChange={(e) =>
              setNewEvent({ ...newEvent, price: e.target.value })
            }
            className="border-gray-300 rounded-lg p-3 shadow-sm w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newEvent.image}
            onChange={(e) =>
              setNewEvent({ ...newEvent, image: e.target.value })
            }
            className="border-gray-300 rounded-lg p-3 shadow-sm w-full col-span-2"
          />
          <label className="flex items-center gap-2 col-span-2">
            <input
              type="checkbox"
              checked={newEvent.showCountdown}
              onChange={(e) =>
                setNewEvent({ ...newEvent, showCountdown: e.target.checked })
              }
              className="accent-indigo-500"
            />
            <span className="text-sm text-gray-700">Show Countdown</span>
          </label>
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200">
          Create Event
        </button>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center transition-transform hover:scale-105">
              <img
                src={event.image}
                alt={event.title?.en || "Event Image"}
                className="w-28 h-28 object-cover rounded-lg mr-6"
              />
              {editingEventId === event._id ? (
                <div className="flex-1 space-y-3">
                  <input
                    name="title"
                    value={editedEvent.title}
                    onChange={handleEditChange}
                    className="w-full border-gray-300 rounded-lg p-3 shadow-sm"
                  />
                  <input
                    name="excerpt"
                    value={editedEvent.excerpt}
                    onChange={handleEditChange}
                    className="w-full border-gray-300 rounded-lg p-3 shadow-sm"
                  />
                  <div className="flex gap-4">
                    <input
                      name="date"
                      type="date"
                      value={newEvent.date?.split("T")[0] || ""}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                      className="w-full border-gray-300 rounded-lg p-3 shadow-sm"
                    />
                    <input
                      name="price"
                      type="number"
                      value={editedEvent.price}
                      onChange={handleEditChange}
                      className="w-full border-gray-300 rounded-lg p-3 shadow-sm"
                    />
                  </div>
                  <input
                    name="image"
                    value={editedEvent.image}
                    onChange={handleEditChange}
                    className="w-full border-gray-300 rounded-lg p-3 shadow-sm"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      name="showCountdown"
                      type="checkbox"
                      checked={editedEvent.showCountdown}
                      onChange={handleEditChange}
                      className="accent-indigo-500"
                    />
                    <span className="text-sm">Show Countdown</span>
                  </label>
                  <div className="flex justify-end gap-4 pt-2">
                    <button
                      onClick={() => handleEditSave(event._id)}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                      Save
                    </button>
                    <button
                      onClick={() => setEditingEventId(null)} // Cancel editing
                      className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 text-gray-800">
                  <h3 className="text-xl font-semibold">
                    {event.title?.en || "No Title"}
                  </h3>
                  <p className="text-gray-600">
                    {event.excerpt?.en || "No Excerpt Available"}
                  </p>
                  <p className="text-sm mt-1">📅 Date: {event.date}</p>
                  <p className="text-sm">💶 Price: {event.price} €</p>
                  {event.showCountdown && (
                    <p className="text-sm text-red-500">⏳ Countdown active</p>
                  )}
                </div>
              )}
              <div className="ml-4 space-x-2">
                {!editingEventId && (
                  <>
                    <button
                      onClick={() => startEditing(event)}
                      className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
                      Delete
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
