import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const ProfileData = ({ guest }) => {
  const labelClass = "text-sm text-gray-500";
  const valueClass = "font-medium mt-1 text-gray-700";

  return (
    <div className="bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg ">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        {/* First Name */}
        <div>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-[#8E7037]" />
            <p className={labelClass}>First Name</p>
          </div>
          <p className={valueClass}>{guest?.firstName || "Not provided"}</p>
        </div>

        {/* Last Name */}
        <div>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-[#8E7037]" />
            <p className={labelClass}>Last Name</p>
          </div>
          <p className={valueClass}>{guest?.lastName || "Not provided"}</p>
        </div>

        {/* Email */}
        <div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-[#8E7037]" />
            <p className={labelClass}>Email</p>
          </div>
          <p className={valueClass}>{guest?.email || "Not provided"}</p>
        </div>

        {/* Phone */}
        <div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-[#8E7037]" />
            <p className={labelClass}>Phone</p>
          </div>
          <p className={valueClass}>{guest?.phonenumber || "Not provided"}</p>
        </div>
      </div>

      {/* Address Section */}
      <div className="mt-8 border-t pt-6">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="h-4 w-4 text-[#8E7037]" />
          <p className="text-sm font-semibold text-[#8E7037]">Address</p>
        </div>
        <p className={valueClass}>{guest?.address || "Not provided"}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <p className={labelClass}>City</p>
            <p className={valueClass}>{guest?.city || "Not provided"}</p>
          </div>
          <div>
            <p className={labelClass}>Zip Code</p>
            <p className={valueClass}>{guest?.zipcode || "Not provided"}</p>
          </div>
          <div>
            <p className={labelClass}>Country</p>
            <p className={valueClass}>{guest?.country || "Not provided"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
