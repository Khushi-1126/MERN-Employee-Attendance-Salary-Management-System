import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // React Router hook

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:8080/api/auth/change-password", {
        email,
        newPassword,
      });
      setSuccess(res.data.message);
      setError("");
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-violet-100 via-indigo-50 to-pink-100 p-4">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transition-all duration-300"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6 tracking-wide">
          Change Your Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-4 px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full mb-4 px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold"
        >
          🔐 Change Password
        </button>

        {success && (
          <div className="mt-4 text-center">
            <p className="text-green-600 font-medium">{success}</p>
            <button
              onClick={handleLoginRedirect}
              className="mt-2 text-indigo-600 hover:underline font-semibold"
            >
              Go to Login
            </button>
          </div>
        )}

        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}
      </form>
    </div>

  );
};

export default ChangePassword;

