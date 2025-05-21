import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5005" : "";

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      const res = await axios.post(baseUrl + `/guest/reset-password/${token}`, {
        password,
        confirmPassword,
      });

      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <section
        className="absolute top-0 left-0 w-full h-[20vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center "
      >
        <div className="absolute inset-0 bg-white
        "></div>


      </section>


      <div className="max-w-md mx-auto mt-100 mb-50">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded "
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Reset Password
          </button>
        </form>

        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div></>

  );
};

export default ResetPassword;
