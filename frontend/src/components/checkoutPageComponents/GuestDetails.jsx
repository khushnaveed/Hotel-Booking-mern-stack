import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { GuestContext } from "../../context/GuestContext";

const GuestDetails = ({ onNext, setGuestData }) => {
  const { guest } = useContext(GuestContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phonenumber: "",
    address: "",
    city: "",
    zipcode: "",
    country: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (guest) {
      console.log("GUEST DATA:", guest); // Debug line to check key names
      setFormData((prev) => ({
        ...prev,
        firstName: guest.firstName || "",
        lastName: guest.lastName || "",
        email: guest.email || "",
        phonenumber: guest.phonenumber || "",
        address: guest.address || "",
        city: guest.city || "",
        zipcode: guest.zipcode  || "",
        country: guest.country || "",
        specialRequests: guest.specialRequests || "",
      }));
    }
  }, [guest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!formData.phonenumber.trim()) {
      newErrors.phonenumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phonenumber.replace(/\s/g, ""))) {
      newErrors.phonenumber = "Please enter a valid phone number";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipcode.trim()) newErrors.zipcode = "Zip code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setGuestData(formData);
      onNext();
    }
  };

  const countries = [
    "United States", "Canada", "United Kingdom", "Australia",
    "Germany", "France", "Spain", "Italy", "Japan", "China"
  ];

  const inputClasses =
    "w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-[#8E7037] transition-all duration-300 bg-white";
  const errorClasses = "text-red-500 text-sm mt-1";
  const iconClasses = "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Guest Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">First Name</label>
            <div className="relative">
              <User size={18} className={iconClasses} />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`${inputClasses} pl-10 ${
                  errors.firstName ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                placeholder="John"
              />
            </div>
            {errors.firstName && <p className={errorClasses}>{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Last Name</label>
            <div className="relative">
              <User size={18} className={iconClasses} />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`${inputClasses} pl-10 ${
                  errors.lastName ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                placeholder="Doe"
              />
            </div>
            {errors.lastName && <p className={errorClasses}>{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail size={18} className={iconClasses} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputClasses} pl-10 ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                placeholder="john.doe@example.com"
              />
            </div>
            {errors.email && <p className={errorClasses}>{errors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <Phone size={18} className={iconClasses} />
              <input
                type="tel"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                className={`${inputClasses} pl-10 ${
                  errors.phonenumber ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                placeholder="+1 123 456 7890"
              />
            </div>
            {errors.phonenumber && <p className={errorClasses}>{errors.phonenumber}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Address</label>
          <div className="relative">
            <MapPin size={18} className={iconClasses} />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`${inputClasses} pl-10 ${
                errors.address ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
              placeholder="123 Main St"
            />
          </div>
          {errors.address && <p className={errorClasses}>{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`${inputClasses} ${
                errors.city ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
              placeholder="New York"
            />
            {errors.city && <p className={errorClasses}>{errors.city}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Zip Code</label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              className={`${inputClasses} ${
                errors.zipcode ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
              placeholder="10001"
            />
            {errors.zipcode && <p className={errorClasses}>{errors.zipcode}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`${inputClasses} ${
                errors.country ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && <p className={errorClasses}>{errors.country}</p>}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 mb-2">
            Special Requests (Optional)
          </label>
          <div className="relative">
            <MessageSquare size={18} className="absolute left-3 top-4 text-gray-400" />
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className={`${inputClasses} pl-10 min-h-[100px] resize-none`}
              placeholder="Any special requests or preferences..."
            />
          </div>
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="bg-[#8E7037] text-white px-8 py-3 font-semibold 
              hover:bg-[#7a602f] transition-all duration-300 shadow-md"
          >
            Continue to Payment
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default GuestDetails;
