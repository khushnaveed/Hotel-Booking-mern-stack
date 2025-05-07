import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard.jsx";
import { useCurrency } from "../context/CurrencyContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";

function Events() {
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const { t, i18n } = useTranslation(); // ✅ Use i18n to access the current language

  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);
  const [luxuryRoom, setLuxuryRoom] = useState(null);
  const roomSlug = "luxury-suite";

  useEffect(() => {
    axios
      .get("http://localhost:5005/events")
      .then((response) => {
        setEvents(response.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });

    axios
      .get(`http://localhost:5005/room/${roomSlug}`)
      .then((res) => {
        setLuxuryRoom(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching luxury room:", err);
      });
  }, []);

  return (
    <>
      <HeroSection
        title="Events"
        subtitle="Experience Unforgettable Moments"
        backgroundImage="/src/assets/heroImage.jpg"
      />

      {/* MAIN BLOG CONTENT */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR */}
        <aside className="lg:col-span-1 space-y-8">
          <section>
            <h2 className="font-bold text-lg mb-4">{t("categories")}</h2>
            <ul className="space-y-2 text-gray-700">
              <li>{t("foodDrink")} (4)</li>
              <li>{t("rendering")} (2)</li>
              <li>{t("travel")} (7)</li>
              <li>{t("uncategorized")} (1)</li>
            </ul>
          </section>

          {/* DEAL CARD */}
          <section>
            <h2 className="font-bold text-lg mb-4">{t("deal")}</h2>

            {luxuryRoom && (
              <div className="relative [&_img]:rounded-none group">
                <img
                  src={luxuryRoom.images?.[0]}
                  alt={luxuryRoom.title}
                  className="rounded-md w-full object-cover transition-transform duration-300 group-hover:scale-102"
                />
                <div className="absolute bottom-2 left-2 bg-white rounded-none font-bold">
                  <Link
                    to={`/rooms/${luxuryRoom.slug}`}
                    className="block text-sm text-black text-center px-2 py-1 transition duration-300 hover:bg-[#6f5525] hover:text-white"
                  >
                    {luxuryRoom.title?.toUpperCase()}
                    <p className="text-xs font-semibold mt-1">
                      {t("price")}: {currencySymbols[currency]}
                      {luxuryRoom.defaultPrice}
                    </p>
                  </Link>
                </div>
              </div>
            )}
          </section>
        </aside>

        {/* EVENT CARDS */}
        <main className="lg:col-span-3 space-y-8">
          {error && (
            <div className="text-red-500">{t("errorFetchingEvents")}</div>
          )}
          {events.length === 0 && !error ? (
            <div>{t("loadingEvents")}</div>
          ) : (
            events.map((event) => (
              <div key={event._id} className="pb-8 [&_img]:rounded-none">
                <BlogCard
                  date={event.date}
                  title={event.title[i18n.language]}
                  image={event.image}
                  excerpt={event.excerpt[i18n.language]}
                  showCountdown={events[0]?._id === event._id}
                  slug={event._id}
                  price={event.price}
                  currency={currency}
                  currencySymbol={currencySymbols[currency]}
                  button={
                    <button
                      onClick={() => navigate(`/events/${event.slug}`)}
                      className="px-4 sm:px-6 py-2 sm:pb-2 pb-4 text-sm sm:text-base 
                    bg-[#8E7037] font-semibold text-white 
                     hover:bg-white hover:text-[#8E7037] 
                     border-2 border-[#8E7037] w-max mt-4 ml-2 sm:ml-6"
                    >
                      View Details
                    </button>
                  }
                />
              </div>
            ))
          )}
        </main>
      </div>
    </>
  );
}

export default Events;
