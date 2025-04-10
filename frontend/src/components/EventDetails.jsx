import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`/events/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  if (!event) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <img
        src={event.image}
        alt={event.title}
        className="rounded-md w-full mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-sm text-gray-500 mb-6">Date: {event.date}</p>
      <p className="text-lg">{event.excerpt}</p>
      <Link
        to="/events"
        className="inline-block mt-6 text-blue-500 underline"
      >
        ← Back to Events
      </Link>
    </div>
  );
}

export default EventDetails;
