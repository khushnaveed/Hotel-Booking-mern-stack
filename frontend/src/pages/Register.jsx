import React, { useState } from "react";
import { GuestContext } from "../context/GuestContext.jsx";
import bgImage from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
export default function Register() {
  const { guest } = useContext(GuestContext); // Using context

  const navigate = useNavigate();
  useEffect(() => {
    if (guest && guest.token) {
      navigate("/profile");
    }
  }, [guest, navigate]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phonenumber: "",
    address: "",
    city: "",
    zipcode: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(formData);
    try {
      const response = await fetch("http://localhost:5005/guest/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        console.log(data)
        const messages = Array.isArray(data.errors)
          ? data.errors.map((err) => err.msg).join("\n")
          : data.message;

      alert(messages || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register.");
    }
  };

  return (
    <div className="relative w-full h-screen">
      <img
        src={bgImage}
        alt="background"
        className="w-full h-full object-cover"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 p-8 max-w-xl w-full text-center bg-[rgba(17,16,16,0.79)] overflow-auto max-h-screen">
        <h1 className="text-4xl font-extrabold mb-4 text-white">
          REGISTER FORM
        </h1>
        <p className="mb-6 text-white">
          Register now to begin your stay at the Royal Grand.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-white"
        >
          <input
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-white p-2 bg-transparent placeholder-white"
          />
          <input
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-white p-2 bg-transparent placeholder-white"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className="border border-white p-2 bg-transparent placeholder-white"
            />
            <input
              name="phonenumber"
              placeholder="Phone Number (e.g. +491234567890) *"
              value={formData.phonenumber}
              onChange={handleChange}
              className="border border-white p-2 bg-transparent placeholder-white"
            />
          </div>

          <input
            name="address"
            placeholder="Address *"
            value={formData.address}
            onChange={handleChange}
            className="border border-white p-2 bg-transparent placeholder-white"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              name="city"
              placeholder="City *"
              value={formData.city}
              onChange={handleChange}
              className="border border-white p-2 bg-transparent placeholder-white"
            />
            <input
              name="zipcode"
              placeholder="Zip Code *"
              value={formData.zipcode}
              onChange={handleChange}
              className="border border-white p-2 bg-transparent placeholder-white"
            />
            <input
              name="country"
              placeholder="Country *"
              value={formData.country}
              onChange={handleChange}
              className="border border-white p-2 bg-transparent placeholder-white"
            />
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            className="border border-white p-2 bg-transparent placeholder-white"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password *"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-white p-2 bg-transparent placeholder-white"
          />

          <button
            type="submit"
            className="text-white py-2 border border-white hover:bg-[#8E7037] hover:text-white transition-colors"
          >
            REGISTER
          </button>
          <a href="/login">
            <p className="text-blue-500">Already have an Account </p>
          </a>
        </form>
      </div>
    </div>
  );
}
