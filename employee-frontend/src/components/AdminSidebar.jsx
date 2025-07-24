
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    

<div className="w-64 h-screen fixed top-0 left-0 bg-gradient-to-b from-violet-900 via-violet-800 to-violet-700 text-white flex flex-col p-6 shadow-2xl">
  {/* Sidebar Title */}
  <h2 className="text-2xl font-bold mb-10 text-center tracking-wider border-b pb-4 border-violet-400">
    Admin Panel
  </h2>

  {/* Navigation Links */}
  <nav className="flex flex-col gap-2 text-base font-medium">
    <Link
      to="/admin/dashboard"
      className="px-4 py-2 rounded-md hover:bg-violet-600 transition-all duration-200 hover:font-semibold"
    >
      Dashboard
    </Link>
    <Link
      to="/admin/manage-leaves"
      className="px-4 py-2 rounded-md hover:bg-violet-600 transition-all duration-200 hover:font-semibold"
    >
      Manage Leave Requests
    </Link>
    <Link
      to="/admin/absent-employees"
      className="px-4 py-2 rounded-md hover:bg-violet-600 transition-all duration-200 hover:font-semibold"
    >
      Employees Attendance
    </Link>
    <Link
      to="/admin/salary-overview"
      className="px-4 py-2 rounded-md hover:bg-violet-600 transition-all duration-200 hover:font-semibold"
    >
      Salary Overview
    </Link>
    <Link
      to="/admin/reset-password"
      className="px-4 py-2 rounded-md hover:bg-violet-600 transition-all duration-200 hover:font-semibold"
    >
      Reset Password
    </Link>
    <Link
      to="/admin/create-employee"
      className="px-4 py-2 rounded-md hover:bg-violet-600 transition-all duration-200 hover:font-semibold"
    >
      Create Employee
    </Link>

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-semibold transition duration-200"
    >
      Logout
    </button>
  </nav>
</div>


  );
};

export default AdminSidebar;
