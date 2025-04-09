import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5005/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password.");
      }

      const data = await response.json();
      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <img
        src="/src/assets/login.jpg"
        alt="background"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 p-8 max-w-xl w-full text-center bg-[rgba(17,16,16,0.79)] ">
        <h1 className="text-4xl font-extrabold mb-4 text-white">
          LOGIN ACCOUNT
        </h1>
        <p className="mb-6 text-white">Welcome to Royal Grand Hotel.</p>
        <p className="text-red-500"></p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="User Name *"
            className="border border-white p-2 bg-transparent text-white placeholder-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password *"
            className="border border-white p-2 bg-transparent text-white placeholder-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="text-white py-2 border border-white hover:bg-[#8E7037] hover:text-white transition-colors"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
