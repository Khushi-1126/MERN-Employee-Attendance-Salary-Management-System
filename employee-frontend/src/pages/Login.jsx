// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
  email: email.trim().toLowerCase(),
  password,
});


      const { user } = res.data;

      if (user.mustChangePassword) {
        localStorage.setItem("email", user.email);
        navigate("/change-password");
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        navigate(user.role === "admin" ? "/admin" : "/employee");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
  
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-800 p-4">
  <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
    {/* Left image */}
    <div className="w-1/2 bg-indigo-100 flex items-center justify-center p-4">
      <img
        src="/assets/welcome.jpg"
        alt="Welcome"
        className="w-full max-w-md"
      />
    </div>

    {/* Right form */}
    <div className="w-1/2 p-10">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">
        Welcome To Login Page 
      </h2>

      {error && (
        <p className="text-red-600 text-sm mb-4 text-center font-medium">
          {error}
        </p>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors duration-200 font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</div>

  );
};

export default Login;
