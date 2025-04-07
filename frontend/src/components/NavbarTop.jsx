import React from "react";
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

function NavbarTop() {
  return (
    <div className=" relative z-10 bg-gray-100">
      {/* Top Bar */}
      <div className="bg-[#344a71] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Cloud size={16} />
                <span className="text-sm">temp</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span className="text-sm">1-548-854-8898</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span className="text-sm">Location</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="group relative cursor-pointer">
                <div className="flex items-center space-x-1 hover:text-gray-300">
                  <Globe size={16} />
                  <span className="text-sm">EN</span>
                  <ChevronDown size={14} />
                </div>
                <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      English
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Español
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Français
                    </a>
                  </div>
                </div>
              </div>

              {/* Currency Selector */}
              <div className="group relative cursor-pointer">
                <div className="flex items-center space-x-1 hover:text-gray-300">
                  <DollarSign size={16} />
                  <span className="text-sm">USD</span>
                  <ChevronDown size={14} />
                </div>
                <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      USD
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      EUR
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      GBP
                    </a>
                  </div>
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4 ml-4">
                <button className="flex items-center space-x-1 hover:text-gray-300">
                  <LogIn size={16} />
                  <span className="text-sm">Login</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-gray-300">
                  <UserPlus size={16} />
                  <span className="text-sm">Register</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default NavbarTop;
