import React, { useContext, useState } from "react";
import AdminGuest from "../components/adminPanelComponents/AdminGuest";
import AdminRoom from "../components/adminPanelComponents/AdminRoom";
import AdminRestaurant from "../components/adminPanelComponents/AdminRestaurant";
import AdminEvent from "../components/adminPanelComponents/AdminEvent";
import AdminBookings from "../components/adminPanelComponents/AdminBookings";
import { GuestContext } from "../context/GuestContext.jsx";
import AdminProfileSidebar from "../components/adminPanelComponents/AdminProfileSidebar.jsx";

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("guests");
  const { guest } = useContext(GuestContext);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "guests":
        return <AdminGuest />;
      case "rooms":
        return <AdminRoom />;
      case "bookings":
        return <AdminBookings />;
      case "events":
        return <AdminEvent />;
      case "restaurant":
        return <AdminRestaurant />;
      default:
        return <AdminGuest />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-40">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Sidebar with Logout */}
        <div className="md:col-span-1">
          <AdminProfileSidebar
            guest={guest}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 lg:col-span-3">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#8E7037]">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
}
