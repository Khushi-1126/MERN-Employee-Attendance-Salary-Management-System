// src/pages/AdminDashboard.jsx
import React from "react";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
  
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 p-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
    <h1 className="text-3xl font-bold text-indigo-600 mb-6 tracking-wider">
      Welcome Admin
    </h1>
    <p className="mb-4 text-lg text-gray-800">
      <span className="font-semibold text-indigo-500">Name:</span> 
      <span className="font-bold text-gray-900 ml-1">{user?.name}</span>
    </p>
    <p className="mb-4 text-lg text-gray-800">
      <span className="font-semibold text-indigo-500">Email:</span> 
      <span className="font-medium text-gray-900 ml-1">{user?.email}</span>
    </p>
    <p className="mb-4 text-lg text-gray-800">
      <span className="font-semibold text-indigo-500">Role:</span> 
      <span className="font-medium text-gray-900 ml-1">{user?.role}</span>
    </p>
  </div>
</div>



    
  );
};

export default AdminDashboard;
