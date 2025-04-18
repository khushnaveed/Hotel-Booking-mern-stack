import React, { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import {
  Phone,
  ChevronDown,
  Cloud,
  MapPin,
  Globe,
  DollarSign,
  UserPlus,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const [language, setLanguage] = useState("EN");
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang.toLowerCase());
  };

  return (
    <div className="group relative cursor-pointer">
      <div className="flex items-center space-x-1 hover:text-[#8E7037] transition">
        <Globe size={16} />
        <span className="text-sm">{language}</span>
        <ChevronDown size={14} />
      </div>
      <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
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
    </div>
  );
}

function NavbarTop() {
  const { currency, changeCurrency } = useCurrency();
  const { t } = useTranslation();
  const { weather } = useWeather();

  return (
    <div className="fixed top-0 left-0 w-full z-[101] bg-black/80 backdrop-blur-md font-bold text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-15">
          {/* LEFT: Weather, Phone, Location */}

          <div className="flex items-center space-x-6">
            {/* Weather - always visible */}
            <Link
              to="/weather"
              className="flex items-center space-x-2 hover:text-[#8E7037]">
              <Cloud size={16} />
              <span className="text-sm">
                {weather ? `${Math.round(weather.main.temp)}°C` : "Temp"}
              </span>
            </Link>

            {/* Phone and Location - hidden on mobile */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Phone */}
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-sm">+41 (0)61 5603-497</span>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span className="text-sm">
                  Hirschgässlein 15, 6073 Basel, Switzerland
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Language, Currency, Login, Register */}
          <div className="flex items-center space-x-6">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Currency Selector */}
            <div className="group relative cursor-pointer">
              <div className="flex items-center space-x-1 hover:text-[#8E7037] transition">
                <DollarSign size={16} />
                <span className="text-sm">{currency}</span>
                <ChevronDown size={14} />
              </div>
              <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  {["USD", "EUR", "GBP"].map((cur) => (
                    <a
                      key={cur}
                      onClick={() => changeCurrency(cur)}
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
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4 ml-4">
              <Link
                to="/login"
                className="flex items-center space-x-1 hover:text-[#8E7037]">
                <LogIn size={16} />
                <span className="text-sm">{t("login")}</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-1 hover:text-[#8E7037]">
                <UserPlus size={16} />
                <span className="text-sm">{t("register")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarTop;
