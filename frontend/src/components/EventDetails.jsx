import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import heroImage from "../assets/heroImage.jpg";
import { useCurrency } from "../context/CurrencyContext";
import { useTranslation } from "react-i18next";

function EventDetails() {
  const { currency } = useCurrency();
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const language = i18n.language;

  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/events/${id}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  if (!event)
    return <div className="p-10 text-center">{t("loadingEvents")}</div>;

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative w-full h-[80vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="relative text-white text-center">
          <h1
            className="text-5xl font-bold uppercase"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            {event.title?.[language] || "Untitled"}
          </h1>
          <p
            className="text-lg mt-2"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            {t("checkUpcomingEvents")}
          </p>
        </div>
      </section>

      <div className="p-10 max-w-4xl mx-auto [&_img]:rounded-none">
        <img
          src={event.image}
          alt={event.title?.[language]}
          className="rounded-md w-full mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{event.title?.[language]}</h1>
        <p className="text-sm text-gray-500 mb-6">
          {t("date")}: {event.date}
        </p>
        <h2 className="text-lg text-gray-700 font-semibold mb-6">
          {t("price")}:{" "}
          <span>
            {currencySymbols[currency]}
            {event.price}
          </span>
        </h2>
        <p className="text-lg">{event.excerpt?.[language]}</p>

        <Link
          to="/checkout"
          state={{
            slug: event.title?.[language], // use event title as 'slug'
            arrivalDate: "-", // event has no arrival date
            departureDate: "-", // event has no departure date
            numAdults: "-", // optional or set default
            numChildren: "-", // optional or set default
            selectedPackages: [], // empty if not needed
            totalPrice: event.price, // actual event price
          }}
          className="w-full bg-[#8E7037] text-white mr-8 px-4 py-2 rounded font-semibold hover:bg-[#3e3e3e] transition-colors">
          {t("Book Event")}
        </Link>

        <Link
          to="/events"
          className="inline-block mt-6 text-blue-500 underline">
          ← {t("backToEvents")}
        </Link>
      </div>
    </>
  );
}

export default EventDetails;
