import React, { useState } from "react";
import bgImage from "../assets/login.jpg";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5005/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        // You can redirect or clear form here
      } else {
        alert(data.message || "Something went wrong.");
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
        className="w-full h-full object-cover " // Apply blur effect
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 max-w-xl w-full text-center bg-[rgba(17,16,16,0.79)]">
        <h1 className="text-4xl font-extrabold mb-4 text-white">
          REGISTER FORM
        </h1>
        <p className="mb-6 text-white">
          Register now to begin your stay at the Royal Grand.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="User Name *"
            value={formData.username}
            onChange={handleChange}
            className="border border-white p-2 bg-transparent text-white placeholder-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            className="border border-white p-2 bg-transparent text-white placeholder-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            className="border border-white p-2 bg-transparent text-white placeholder-white"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password *"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-white p-2 bg-transparent text-white placeholder-white"
          />
          <button
            type="submit"
            className="text-white py-2 border border-white hover:bg-[#8E7037] hover:text-white transition-colors"
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}
