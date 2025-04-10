import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard.jsx";

function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  // Fetch events data from backend
  useEffect(() => {
    axios
      .get("http://localhost:5005/events")
      .then((response) => {
        setEvents(response.data); // Set the events data
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("An error occurred while fetching events.");
      });
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative top-0 left-0 w-full h-[80vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('src/assets/heroImage.jpg')" }}>
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="relative text-white text-center">
          <h1
            className="text-5xl font-bold uppercase"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Events
          </h1>
          <p
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Check out our upcoming events!
          </p>
        </div>
      </section>

      {/* MAIN BLOG CONTENT */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR */}
        <aside className="lg:col-span-1 space-y-8">
          <section>
            <h2 className="font-bold text-lg mb-4">CATEGORIES</h2>
            <ul className="space-y-2 text-gray-700">
              <li>Food & Drink (4)</li>
              <li>Rendering (2)</li>
              <li>Travel (7)</li>
              <li>Uncategorized (1)</li>
            </ul>
          </section>

          {/* DEAL CARD */}
          <section>
            <h2 className="font-bold text-lg mb-4">DEAL</h2>
            <div className="relative [&_img]:rounded-none group">
              <img
                src="/src/assets/EventsLuxuryRoom.jpg"
                alt="Luxury Room"
                className="rounded-md w-full object-cover transition-transform duration-300 group-hover:scale-102"
              />
              <div className="absolute bottom-2 left-2 bg-white px-3 py-1 font-bold hover:bg-[#6f5525]">
                <Link
                  to="/rooms/luxury-suite"
                  className="block text-black hover:text-white text-center py-2 px-4 rounded-lg transition duration-300">
                  LUXURY ROOM
                  <br />
                  $220
                </Link>
              </div>
            </div>
          </section>
        </aside>

        {/* EVENT CARDS */}
        <main className="lg:col-span-3 space-y-8">
          {error && <div className="text-red-500">{error}</div>}
          {events.length === 0 ? (
            <div>Loading events...</div>
          ) : (
            events.map((event) => (
              <Link key={event._id} to={`/events/${event._id}`}>
                <div className="pb-8 [&_img]:rounded-none">
                  <BlogCard
                    date={event.date}
                    title={event.title}
                    image={event.image}
                    excerpt={event.excerpt}
                    showCountdown={event.showCountdown}
                  />
                </div>
              </Link>
            ))
          )}
        </main>
      </div>
    </>
  );
}

export default Events;
