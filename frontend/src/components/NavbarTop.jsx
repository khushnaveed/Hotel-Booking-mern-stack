import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { GuestContext } from "../context/GuestContext.jsx";
import { useWeather } from "../context/WeatherContext.jsx";
import {
  Phone,
  ChevronDown,
  Cloud,
  MapPin,
  Globe,
  DollarSign,
  Euro,
  PoundSterling,
  Currency,
  UserPlus,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const [language, setLanguage] = useState("EN");
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang.toLowerCase());
    setIsOpen(false);
  };
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" onClick={toggleDropdown}>
      <div className="flex items-center space-x-1 hover:text-[#8E7037] transition">
        <Globe size={16} />
        <span className="text-sm">{language}</span>
        <ChevronDown size={14} />
      </div>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-50"
          onClick={(e) => e.stopPropagation()} // prevent parent click
        >
          <div className="py-1">
            {["EN", "ES", "FR"].map((lang) => (
              <a
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                {lang === "EN"
                  ? "English"
                  : lang === "ES"
                  ? "Español"
                  : "Français"}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CurrencySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, changeCurrency } = useCurrency();
  const currencyIcons = {
    USD: DollarSign,
    EUR: Euro,
    GBP: PoundSterling,
  };
  const CurrencyIcon = currencyIcons[currency] || Currency;

  return (
    <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-center space-x-1 hover:text-[#8E7037] transition">
        <CurrencyIcon size={16} strokeWidth={2.5} />
        <span className="text-sm">{currency}</span>
        <ChevronDown size={14} />
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-50">
          <div className="py-1">
            {["USD", "EUR", "GBP"].map((cur) => (
              <a
                key={cur}
                onClick={() => {
                  changeCurrency(cur);
                  setIsOpen(false);
                }}
                className={`block px-4 py-2 text-sm ${
                  currency === cur
                    ? "text-[#8E7037] font-semibold"
                    : "text-gray-700"
                } hover:bg-gray-100 cursor-pointer`}>
                {cur}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NavbarTop() {
  const { currency, changeCurrency } = useCurrency();
  const { t } = useTranslation();
  const { weather } = useWeather();
  const { isLoggedIn } = useContext(GuestContext);
  const currencyIcons = {
    USD: DollarSign,
    EUR: Euro,
    GBP: PoundSterling,
  };
  const CurrencyIcon = currencyIcons[currency] || Currency;
  return (
    <div className="fixed top-0 left-0 w-full z-[101] bg-black/80 backdrop-blur-md font-bold text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-15">
          <div className="flex items-center space-x-6">
            <Link
              to="/weather"
              className="flex items-center space-x-2 hover:text-[#8E7037]">
              <Cloud size={16} />
              <span className="text-sm">
                {weather ? `${Math.round(weather.main.temp)}°C` : "Temp"}
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-sm">+41 (0)61 5603-497</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span className="text-sm">
                  Hirschgässlein 15, 6073 Basel, Switzerland
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <LanguageSelector />
            <CurrencySelector />

            <div className="flex items-center space-x-4 ml-4">
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 hover:text-[#8E7037]">
                  <UserPlus size={16} />
                  <span className="text-sm">{t("profile")}</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center space-x-1 hover:text-[#8E7037]">
                    <LogIn size={16} />
                    <span className="text-sm">{t("login")}</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarTop;
