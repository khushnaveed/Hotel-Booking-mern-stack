import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Cloud,
  MapPin,
  Globe,
  DollarSign,
  UserPlus,
  LogIn,
} from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle submenu item click
  const handleRoomClick = (roomType) => {
    navigate(`/rooms/${roomType.toLowerCase().replace(/ /g, "-")}`);
  };

  const handleReservationClick  =(reservationType) =>{
    navigate(`/reservation/${reservationType.toLowerCase().replace(/ /g, "-")}`);

  }
  return (
    <div className="bg-gray-100">
      
      <div className="relative z-10 bg-white shadow-md relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <NavLink to="/" className="text-2xl font-bold text-[#344a71]">
              LOGO
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavItem text="HOME" path="/" />
              
              <NavItem
                text="ROOMS"
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

              <NavItem text="RESTAURANT" path="/restaurant" />

              <NavItem
                text="RESERVATIONS"
                hasSubmenu
                submenuItems={[
                  "Rooms",
                  "Events",
                ]}
                onSubmenuClick={handleReservationClick}
              />

              <NavItem text="GALLERY" path="/gallery" />
              <NavItem text="ABOUT" path="/about" />
              <NavItem text="CONTACT" path="/contact" />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <MobileNavItem text="HOME" path="/" />
              <MobileNavItem text="ROOMS" hasSubmenu submenuItems={[
                "Luxury Suite", "Deluxe Room", "Single Room", "Family Suite", "Double Room", "Presidential Room"
              ]} onSubmenuClick={handleRoomClick} />
              <MobileNavItem text="RESTAURANT" path="/restaurant" />
              <MobileNavItem text="GALLERY" path="/gallery" />
              <MobileNavItem text="ABOUT" path="/about" />
              <MobileNavItem text="CONTACT" path="/contact" />
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
            className="text-gray-600 hover:text-[#344a71] transition-colors"
          >
            {text}
          </NavLink>
        ) : (
          <span className="text-gray-600 hover:text-[#344a71] transition-colors">
            {text}
          </span>
        )}

        {hasSubmenu && (
          <ChevronDown
            size={16}
            className="text-gray-600 group-hover:text-[#344a71] transition-transform group-hover:rotate-180"
          />
        )}
      </div>

      {/* Dropdown Menu */}
      {hasSubmenu && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="py-2">
            {submenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => onSubmenuClick(item)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#344a71] w-full text-left"
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

function MobileNavItem({ text, path, hasSubmenu, submenuItems, onSubmenuClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className="flex items-center justify-between px-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {path ? (
          <NavLink to={path} className="text-gray-600">
            {text}
          </NavLink>
        ) : (
          <span className="text-gray-600">{text}</span>
        )}
        {hasSubmenu && (
          <ChevronDown
            size={16}
            className={`text-gray-600 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {/* Mobile Dropdown */}
      {hasSubmenu && isOpen && (
        <div className="mt-2 bg-gray-50">
          {submenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => onSubmenuClick(item)}
              className="block px-8 py-2 text-sm text-gray-600 hover:text-[#344a71] w-full text-left"
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