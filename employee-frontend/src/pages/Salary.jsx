// src/pages/Salary.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Salary = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;

        if (!userId) {
          setError("User not found. Please login again.");
          return;
        }

        const res = await axios.get(
          `http://localhost:8080/api/salary/history?userId=${userId}`
        );

        setSalaryData(res.data.history);
      } catch (err) {
        console.error(err);
        setError("Failed to load salary data");
      }
    };

    fetchSalary();
  }, []);


  return (
   
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
  <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-8">
    <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center tracking-wide">
      Salary History
    </h2>

    {error && (
      <p className="text-red-600 text-center font-medium mb-4">{error}</p>
    )}

    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse bg-white text-sm md:text-base">
        <thead>
          <tr className="bg-indigo-600 text-white font-semibold">
            <th className="py-3 px-4 border border-gray-300">Month</th>
            <th className="py-3 px-4 border border-gray-300">Working</th>
            <th className="py-3 px-4 border border-gray-300">Present</th>
            <th className="py-3 px-4 border border-gray-300">Leaves</th>
            <th className="py-3 px-4 border border-gray-300">Absent</th>
            <th className="py-3 px-4 border border-gray-300">Base</th>
            <th className="py-3 px-4 border border-gray-300">Final</th>
          </tr>
        </thead>
        <tbody>
          {salaryData.map((salary, idx) => (
            <tr key={idx} className="text-center hover:bg-indigo-50 transition-colors">
              <td className="py-2 px-4 border border-gray-200">{salary.month}</td>
              <td className="py-2 px-4 border border-gray-200">{salary.workingDays}</td>
              <td className="py-2 px-4 border border-gray-200">{salary.presents}</td>
              <td className="py-2 px-4 border border-gray-200">{salary.leaveDays}</td>
              <td className="py-2 px-4 border border-gray-200">{salary.absents}</td>
              <td className="py-2 px-4 border border-gray-200 font-medium text-gray-800">
                ₹{salary.baseMonthlySalary}
              </td>
              <td className="py-2 px-4 border border-gray-200 font-semibold text-black">
                ₹{salary.salary}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};

export default Salary;
