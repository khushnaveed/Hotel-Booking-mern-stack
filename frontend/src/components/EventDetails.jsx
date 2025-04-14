import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import heroImage from "../assets/heroImage.jpg";
import { useCurrency } from "../context/CurrencyContext";

function EventDetails() {
    const { currency } = useCurrency();
    const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/events/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  if (!event) return <div className="p-10 text-center">Loading...</div>;

  return (
    <>
          {/* HERO SECTION */}
          <section
  className=" relative w-full h-[80vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
         style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="relative text-white text-center">
          <h1
            className="text-5xl font-bold uppercase"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            {event.title}
          </h1>
          <p
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Check out our upcoming events!
          </p>
        </div>
      </section>
    <div className="p-10 max-w-4xl mx-auto [&_img]:rounded-none">
      <img
        src={event.image}
        alt={event.title}
        className="rounded-md w-full mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-sm text-gray-500 mb-6">Date: {event.date}</p>
      <h2 className="text-lg text-gray-700 font-semibold mb-6">Price: <span>{currencySymbols[currency]}{event.price}</span></h2>
      <p className="text-lg">{event.excerpt}</p>
      <Link
            to="/login"
            className="w-full bg-[#8E7037] text-white mr-8 px-4 py-2 rounded font-semibold hover:bg-[#3e3e3e] transition-colors">
            Add Event
          </Link>
      <Link
        to={`/events`}
        className="inline-block mt-6 text-blue-500 underline">
        ← Back to Events
      </Link>
  
    </div>
    </>
  );
}

export default EventDetails;
