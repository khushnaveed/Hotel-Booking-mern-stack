/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Logo from "../assets/Logo.svg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import { Menu, X, ChevronDown, CalendarCheck } from "lucide-react";
import { useCart } from "../context/CartContext";

import { useTranslation } from "react-i18next"; // ✅ Import useTranslation
import { useContext } from "react";
import { GuestContext } from "../context/GuestContext.jsx";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { cartItems } = useCart(); // ✅ Get cart items from context

  const { t } = useTranslation(); // ✅
  const { guest, isLoggedIn } = useContext(GuestContext);

  const handleRoomClick = (roomType) => {
    navigate(`/rooms/${roomType.toLowerCase().replace(/ /g, "-")}`);
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[100] text-white font-bold pb-4 mt-16">
      <div
        className={`${
          isHome
            ? "bg-black/80 backdrop-blur-md"
            : "bg-black/80 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-3">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <NavLink to="/" className="w-60 block group">
              <img
                src={Logo}
                alt="Logo"
                className="w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavItem text={t("home").toUpperCase()} path="/" />
              <NavItem
                text={t("rooms").toUpperCase()}
                path="/rooms"
                hasSubmenu
                submenuItems={[
                  "Luxury Suite",
                  "Deluxe Room",
                  "Single Room",
                  "Family Suite",
                  "Double Room",
                  "Presidential Room",
                ]}
                onSubmenuClick={handleRoomClick}
              />

              <NavItem
                text={t("restaurant").toUpperCase()}
                path="/restaurant"
              />
              <NavItem text={t("events").toUpperCase()} path="/events" />
              <NavItem text={t("gallery").toUpperCase()} path="/gallery" />
              <NavItem text={t("about").toUpperCase()} path="/about" />
              <NavItem text={t("contact").toUpperCase()} path="/contact" />
              {isLoggedIn && guest?.role === "admin" && (
             <NavItem text="ADMIN" path="/adminPanel" />
               )}

              {/* Cart Icon */}
              <div
                className="relative cursor-pointer"
                onClick={() => {
                 /*  navigate("/checkout");
                  console.log(cartItems); */
                  const token = localStorage.getItem("token");
                  if (!token) {
                    alert("Please log in first to view your cart.");
                    return;
                  }
                  navigate("/checkout");
                }}
              >
                <CalendarCheck className="text-white hover:text-[#8E7037] transition" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden z-[101] flex items-center gap-4">
              <div
                className="relative cursor-pointer"
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    alert("Please log in first to view your cart.");
                    return;
                  }
                  navigate("/checkout");
                }}
              >
                <CalendarCheck className="text-white hover:text-[#8E7037]" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-200 hover:text-[#8E7037]"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 mt-16 bg-black/90 text-white z-50 relative rounded-b-lg">
              <MobileNavItem text={t("home").toUpperCase()} path="/" />
              <MobileNavItem
                text={t("rooms").toUpperCase()}
                path="/rooms"
                hasSubmenu
                submenuItems={[
                  "Luxury Suite",
                  "Deluxe Room",
                  "Single Room",
                  "Family Suite",
                  "Double Room",
                  "Presidential Room",
                ]}
                onSubmenuClick={handleRoomClick}
              />
              <MobileNavItem
                text={t("restaurant").toUpperCase()}
                path="/restaurant"
              />
              <MobileNavItem text={t("events").toUpperCase()} path="/events" />
              <MobileNavItem
                text={t("gallery").toUpperCase()}
                path="/gallery"
              />
              <MobileNavItem text={t("about").toUpperCase()} path="/about" />
              <MobileNavItem
                text={t("contact").toUpperCase()}
                path="/contact"
              />
              {isLoggedIn && guest?.role === "admin" && (
            <MobileNavItem text="ADMIN" path="/adminPanel" />
            )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NavItem({ text, path, hasSubmenu, submenuItems, onSubmenuClick }) {
  return (
    <div className="relative group">
      <div className="flex items-center space-x-1 cursor-pointer">
        {path ? (
          <NavLink
            to={path}
            className="text-white hover:text-[#8E7037] transition-colors"
          >
            {text}
          </NavLink>
        ) : (
          <span className="text-white hover:text-[#8E7037] transition-colors">
            {text}
          </span>
        )}
        {hasSubmenu && (
          <ChevronDown
            size={16}
            className="text-white group-hover:text-[#8E7037] transition-transform group-hover:rotate-180"
          />
        )}
      </div>
      {hasSubmenu && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="py-2">
            {submenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onSubmenuClick(item)}
                className="block px-4 py-2 text-sm text-black hover:text-[#8E7037] hover:bg-gray-100 w-full text-left"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavItem({
  text,
  path,
  hasSubmenu,
  submenuItems,
  onSubmenuClick,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex items-center justify-between px-4 py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {path ? (
          <NavLink to={path} className="text-white hover:text-[#8E7037]">
            {text}
          </NavLink>
        ) : (
          <span className="text-white hover:text-[#8E7037]">{text}</span>
        )}
        {hasSubmenu && (
          <ChevronDown
            size={16}
            className={`text-white transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>
      {hasSubmenu && isOpen && (
        <div className="bg-gray-100">
          {submenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onSubmenuClick(item)}
              className="block px-8 py-2 text-sm text-black hover:text-[#8E7037] w-full text-left"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
