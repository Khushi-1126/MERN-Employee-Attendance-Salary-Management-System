// Attendance.jsx
import React, { useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [message, setMessage] = useState(""); //Message state

  const handleMarkAttendance = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;

      if (!userId) {
        setMessage("User not found!");
        return;
      }

      const res = await axios.post("http://localhost:8080/api/attendance", {
  userId,
});

      setMessage(res.data.message); // Show success message
    } catch (error) {
      console.error("Attendance error:", error);

      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message); //Show backend error (like already marked)
      } else {
        setMessage("Something went wrong while marking attendance");
      }
    }
  };

  return (
   
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
  <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8">
    <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center tracking-wide">
      Mark Attendance
    </h2>

    <button
      onClick={handleMarkAttendance}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors duration-200 font-semibold"
    >
      Mark Attendance
    </button>

    {message && (
      <p className="mt-4 text-sm font-medium text-center text-green-700">
        {message}
      </p>
    )}
  </div>
</div>

  );
};

export default Attendance;

