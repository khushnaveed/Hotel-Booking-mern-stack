import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import { Calendar, Minus, Plus, ArrowLeft } from "lucide-react";
import { useCurrency } from "../context/CurrencyContext";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";

function EventDetails() {
  const { currency, conversionRates } = useCurrency();
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const language = i18n.language;
  const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };

  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

  useEffect(() => {
    axios
      .get(baseUrl + `/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Error fetching event:", err));
  }, [id]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const increment = () => setTicketCount((prev) => prev + 1);
  const decrement = () => setTicketCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleBookNow = () => {
    const slug = event.title?.[language]
      ? event.title[language].replace(/\s+/g, "-").toLowerCase()
      : "untitled-event";

    addToCart({
      slug,
      title: event.title?.[language] || "Untitled",
      price: event.price,
      quantity: ticketCount,
      image: event.image,
      totalPrice: event.price * ticketCount * conversionRates[currency],

      date: event.date,
    });

    const token = localStorage.getItem("token");
    navigate(token ? "/checkout" : "/login");
    console.log("Token:", localStorage.getItem("token"));
  };

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-500">{t("loadingEvents")}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSection
        title="Events"
        subtitle="Experience Unforgettable Moments."
        backgroundImage="/heroImage.jpg"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate("/events")}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group">
          <ArrowLeft
            size={18}
            className="mr-2 group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span className="text-sm font-medium">Back to events</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="overflow-hidden shadow-sm bg-white">
              <div className="relative aspect-[16/9] overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gray-200 animate-pulse ${
                    isImageLoaded ? "hidden" : "block"
                  }`}></div>

                <div
                  className={`absolute inset-0 bg-gray-200 animate-pulse ${
                    isImageLoaded ? "hidden" : "block"
                  }`}></div>

                <img
                  src={event.image}
                  alt={event.title.en}
                  className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={handleImageLoad}
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                  {event.title.en}
                </h1>
                <div className="inline-flex items-center gap-2 px-3 py-1.5  bg-gray-100 text-gray-700">
                  <Calendar size={16} className="text-gray-500" />
                  <span className="text-sm font-medium">{event.date}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  About This Event
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg text-justify">
                  {event.excerpt.en}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Reserve Tickets
                </h3>

                <div className="flex justify-between items-center mb-8">
                  <span className="text-gray-700">Price per ticket</span>
                  <span className="text-2xl font-semibold text-gray-900">
                    {currencySymbols[currency]}
                    {(event.price * conversionRates[currency]).toFixed(2)}
                  </span>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Number of tickets
                  </label>
                  <div className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                    <button
                      onClick={decrement}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="Decrease ticket count">
                      <Minus size={18} className="text-gray-700" />
                    </button>

                    <span className="text-2xl font-medium text-gray-900">
                      {ticketCount}
                    </span>

                    <button
                      onClick={increment}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="Increase ticket count">
                      <Plus size={18} className="text-gray-700" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center py-6 border-t border-gray-200 mb-8">
                  <span className="font-medium text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900 block">
                      {currencySymbols[currency]}
                      {(
                        event.price *
                        ticketCount *
                        conversionRates[currency]
                      ).toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500 block mt-1">
                      All taxes included
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full py-3 px-6 bg-[#8E7037] text-white text-lg font-semibold hover:bg-[#705832] transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
