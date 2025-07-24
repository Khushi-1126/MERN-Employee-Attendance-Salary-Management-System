// pages/CreateEmployee.jsx
import React, { useState } from "react";
import axios from "axios";

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee", // Must match backend enum: "Admin" or "Employee"
    employeeType: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Basic field validation
    if (!formData.name || !formData.email || !formData.password || !formData.employeeType) {
      setError("❌ Please fill all fields correctly.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", formData);
      console.log("Employee Created: ", res.data);
      setMessage("✅ Employee created successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "employee",
        employeeType: "",
      });
    } catch (err) {
      console.error("Error creating employee:", err.response?.data || err);
      setError("❌ Failed to create employee. Email may already exist.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Create New Employee
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Default Password"
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </select>
          <select
            name="employeeType"
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.employeeType}
            onChange={handleChange}
            required
          >
            <option value="">Select Employee Type</option>
            <option value="Sr. Faculty">Sr. Faculty</option>
            <option value="Faculty">Faculty</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Associate">Associate</option>
            <option value="Accountant">Accountant</option>
            <option value="Sr. Accountant">Sr. Accountant</option>
          </select>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold"
          >
            ✍️ Create Employee
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-600 text-center font-semibold">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-red-600 text-center font-semibold">{error}</p>
        )}
      </div>
    </div>

  );
};

export default CreateEmployee;



