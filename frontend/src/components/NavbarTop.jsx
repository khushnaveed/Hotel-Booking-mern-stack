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
import { useTranslation } from "react-i18next"; // ✅ Import

function LanguageSelector() {
  const [language, setLanguage] = useState("EN");
  const { i18n } = useTranslation(); // ✅

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang.toLowerCase()); // ✅ Change language
  };

  return (
    <div className="group relative cursor-pointer">
      <div className="flex items-center space-x-1 hover:text-gray-300">
        <Globe size={16} />
        <span className="text-sm">{language}</span>
        <ChevronDown size={14} />
      </div>
      <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <div className="py-1">
          <a
            onClick={() => handleLanguageChange("EN")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            English
          </a>
          <a
            onClick={() => handleLanguageChange("ES")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            Español
          </a>
          <a
            onClick={() => handleLanguageChange("FR")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
            Français
          </a>
        </div>
      </div>
    </div>
  );
}

function NavbarTop() {
  const { currency, changeCurrency } = useCurrency();

  const { t } = useTranslation(); // ✅

  const { weather } = useWeather();

  return (
    <div className="fixed top-0 left-0 w-full z-[101] bg-black/30 backdrop-blur-md">
      <div className="text-white py-2 font-bold drop-shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Left Section */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
          

                {/* Weather Info */}

                <div className="relative flex items-center space-x-2 cursor-pointer">
                  <Link to="/weather">
                    <Cloud size={16} />
                    <span className="text-sm hover:underline">
                      {weather ? `${Math.round(weather.main.temp)}°C` : "temp"}
                    </span>
                  </Link>
                </div>

                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span className="text-sm">+41 (0)61 5603-497</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span className="text-sm">{t("location")}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Language Selector */}
                <LanguageSelector />

                {/* Currency Selector */}
                <div className="group relative cursor-pointer">
                  <div className="flex items-center space-x-1 hover:text-gray-300">
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
                          href="#"
                          className={`block px-4 py-2 text-sm ${
                            currency === cur
                              ? "text-blue-500 font-semibold"
                              : "text-gray-700"
                          } hover:bg-gray-100`}>
                          {cur}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-4 ml-4">
                  <button className="flex items-center space-x-1 hover:text-gray-300">
                    <LogIn size={16} />
                    <Link to="/login">
                      <span className="text-sm">{t("login")}</span>
                    </Link>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-gray-300">
                    <UserPlus size={16} />
                    <Link to="/register">
                      <span className="text-sm">{t("register")}</span>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarTop;
