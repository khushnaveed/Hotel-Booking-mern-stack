import React from "react";
import { User, Calendar, HelpCircle, LogOut } from "lucide-react";

const ProfileSidebar = ({
  guest,
  onLogout,
  activeSection,
  onSectionChange,
}) => {
  const navItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "reservations", label: "Reservations", icon: Calendar },
    { id: "help", label: "Help Center", icon: HelpCircle },
  ];

  return (
    <div className="bg-white p-6  shadow-sm h-full">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 border border-[#8E7037]  bg-opacity-10 rounded-full flex items-center justify-center mb-3">
          <span className="text-2xl font-bold text-[#8E7037]">
            {guest?.firstName?.charAt(0) || "?"}
            {guest?.lastName?.charAt(0) || "?"}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-[#8E7037]">
          {guest?.firstName} {guest?.lastName}
        </h2>
        <p className="text-sm text-gray-500">{guest?.email}</p>
      </div>

      <nav className="mb-8">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center px-4 py-2 transition-colors duration-200 ${
                  activeSection === item.id
                    ? "bg-gray-100 bg-opacity-10 text-[#8E7037]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center px-4 py-2 border border-[#8E7037] text-[#8E7037] hover:bg-[#8E7037] hover:text-white transition-colors duration-200"
      >
        <LogOut className="h-5 w-5 mr-2" />
        Logout
      </button>
    </div>
  );
};

export default ProfileSidebar;
