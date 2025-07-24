// src/pages/AdminResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";

const AdminResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:8080/api/auth/admin-reset-password", {
        email,
        newPassword,
      });
      setSuccess(res.data.message);
      setError("");
      setEmail("");          // ✅ clear input after success
      setNewPassword("");
    } catch (err) {
      console.log(err.response); // ✅ helpful for debugging
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };

  return (
 
<div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-violet-100 via-indigo-50 to-pink-100 p-4">
  <form
    onSubmit={handleReset}
    className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transition-all duration-300"
  >
    <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6 tracking-wide">
      Admin: Reset Employee Password
    </h2>

    <input
      type="email"
      placeholder="Employee Email"
      className="w-full mb-4 px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <input
      type="password"
      placeholder="New Password"
      className="w-full mb-4 px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      required
    />

    <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold"
    >
      🔒 Reset Password
    </button>

    {success && <p className="text-green-600 mt-4 text-center font-medium">{success}</p>}
    {error && <p className="text-red-600 mt-4 text-center font-medium">{error}</p>}
  </form>
</div>

  );
};

export default AdminResetPassword;
