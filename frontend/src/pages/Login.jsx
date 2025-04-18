import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // for displaying errors

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5005/guest/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });
      const token = response.headers.get("token");
      localStorage.setItem("token", token);
      const data = await response.json();

      // Check if the response is okay, i.e., status 200
      if (!response.ok) {
        throw new Error(data.message || "Invalid userName or password.");
      }

      // If login is successful, navigate to rooms page
      if (data.success) {
        alert("Login successful!");
        navigate("/profile");
      } else {
        setError("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message); // Display error message in UI
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
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error message */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="User Name *"
            className="border border-white p-2 bg-transparent text-white placeholder-white"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
          <p className=" p-2 bg-transparent text-white">
            <Link to="/forgot-password" className="text-sm text-blue-600">
              Forgot Password?
            </Link>
          </p>
          <p className=" p-2 bg-transparent text-white">
            Don't have and account ?{" "}
            <Link to="/register">
              <span style={{ color: "blue", cursor: "pointer" }}>
                {" "}
                Register Now{" "}
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
