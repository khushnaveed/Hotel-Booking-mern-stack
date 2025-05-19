import React, { useContext, useState } from "react";
import { GuestContext } from "../context/GuestContext.jsx";
import ProfileSidebar from "../components/profilePageComponents/ProfileSidebar";
import ProfileData from "../components/profilePageComponents/ProfileData";
import ReservationHistory from "../components/profilePageComponents/ReservationHistory";
import HelpCenter from "../components/profilePageComponents/HelpCenter";
import { Navigate } from "react-router-dom";


const Profile = () => {
  const { logout, guest } = useContext(GuestContext);
  const [activeSection, setActiveSection] = useState("profile");


  const handleLogout = () => {
    logout();

  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileData guest={guest} />;
      case "reservations":
        return <ReservationHistory guest={guest} />;
      case "help":
        return <HelpCenter />;
      default:
        return <ProfileData guest={guest} />;
    }
  };

  return (

    <div className="container mx-auto px-4 py-8 mt-40">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        <div className="md:col-span-1">
          <ProfileSidebar
            guest={guest}
            onLogout={handleLogout}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>


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
};

export default Profile;
