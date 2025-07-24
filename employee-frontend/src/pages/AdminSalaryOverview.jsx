
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const AdminSalaryOverview = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [paidStatus, setPaidStatus] = useState({});

  const fetchSalaryData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/salary/all");
      setSalaryData(response.data);
    } catch (error) {
      console.error("Error fetching salary data", error);
    }
  }, []);

  useEffect(() => {
    fetchSalaryData();
  }, [fetchSalaryData]);

  const toggleRow = (email) => {
    setExpandedRows((prev) => ({
      ...prev,
      [email]: !prev[email],
    }));
  };

  const handlePay = (email, month) => {
    const key = `${email}-${month}`;
    setPaidStatus((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-tr from-purple-100 via-indigo-50 to-pink-100 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl p-6 overflow-x-auto">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Salary Overview (Admin)
        </h1>

        <table className="min-w-full border-collapse bg-white text-sm md:text-base">
          <thead className="bg-indigo-100 text-indigo-700 font-semibold">
            <tr>
              <th className="py-3 px-4 border">Name</th>
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((employee, idx) => (
              <React.Fragment key={idx}>
                <tr className="bg-gray-50 hover:bg-purple-50 transition-colors">
                  <td className="py-2 px-4 border font-semibold text-gray-900">
                    {employee.name}
                  </td>
                  <td className="py-2 px-4 border text-gray-800">{employee.email}</td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition duration-200"
                      onClick={() => toggleRow(employee.email)}
                    >
                      {expandedRows[employee.email] ? "Hide" : "View"} History
                    </button>
                  </td>
                </tr>

                {expandedRows[employee.email] && (
                  <tr>
                    <td colSpan={3}>
                      <table className="min-w-full border text-sm mt-2 rounded-lg overflow-hidden">
                        <thead className="bg-indigo-200 text-indigo-800 font-semibold">
                          <tr>
                            <th className="py-2 px-3 border">Month</th>
                            <th className="py-2 px-3 border">Working Days</th>
                            <th className="py-2 px-3 border">Presents</th>
                            <th className="py-2 px-3 border">Leaves</th>
                            <th className="py-2 px-3 border">Absents</th>
                            <th className="py-2 px-3 border">Base Salary</th>
                            <th className="py-2 px-3 border">Calculated Salary</th>
                            <th className="py-2 px-3 border">Pay</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employee.salaryHistory.map((entry, i) => {
                            const key = `${employee.email}-${entry.month}`;
                            const isPaid = entry.paid || paidStatus[key];

                            return (
                              <tr key={i} className="bg-white hover:bg-pink-50 transition-colors">
                                <td className="py-2 px-3 border">{entry.month}</td>
                                <td className="py-2 px-3 border">{entry.workingDays}</td>
                                <td className="py-2 px-3 border">{entry.presents}</td>
                                <td className="py-2 px-3 border">{entry.leaveDays}</td>
                                <td className="py-2 px-3 border">{entry.absents}</td>
                                <td className="py-2 px-3 border text-indigo-700">₹{entry.baseMonthlySalary}</td>
                                <td className="py-2 px-3 border font-semibold text-indigo-900">₹{entry.salary}</td>
                                <td className="py-2 px-3 border text-center">
                                  {isPaid ? (
                                    <span className="text-green-600 font-semibold">Paid</span>
                                  ) : (
                                    <button
                                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm transition"
                                      onClick={() => handlePay(employee.email, entry.month)}
                                    >
                                      Pay
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSalaryOverview;

