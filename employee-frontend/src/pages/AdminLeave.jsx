import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminLeave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/leave");
      setLeaveRequests(res.data);
    } catch (error) {
      console.error("Error fetching leaves", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusUpdate = async (leaveId, status) => {
    try {
      await axios.put(`http://localhost:8080/api/leave/${leaveId}/status`, {
        status,
      });

      // Update status locally instead of re-fetching all data
      setLeaveRequests((prev) =>
        prev.map((leave) =>
          leave._id === leaveId ? { ...leave, status } : leave
        )
      );
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  // to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
<div className="p-4 sm:p-8 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Manage Leave Requests
        </h2>


        <table className="min-w-full border-collapse text-sm md:text-base rounded-lg overflow-hidden">
          <thead className="bg-indigo-100 text-indigo-700 font-semibold">
            <tr>
              <th className="border px-4 py-3">Employee</th>
              <th className="border px-4 py-3">From</th>
              <th className="border px-4 py-3">To</th>
              <th className="border px-4 py-3">Type</th>
              <th className="border px-4 py-3">Reason</th>
              <th className="border px-4 py-3">Status</th>
              <th className="border px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave) => (
              <tr key={leave._id} className="hover:bg-purple-50 transition-colors">
                <td className="border px-4 py-3 text-gray-800">{leave?.user?.name}</td>
                <td className="border px-4 py-3 text-gray-800">{formatDate(leave.fromDate)}</td>
                <td className="border px-4 py-3 text-gray-800">{formatDate(leave.toDate)}</td>
                <td className="border px-4 py-3 text-gray-800">{leave.type}</td>
                <td className="border px-4 py-3 text-gray-800">{leave.reason}</td>
                <td className="border px-4 py-3 text-center font-semibold text-indigo-600">
                  {leave.status}
                </td>
                <td className="border px-4 py-3 space-x-2 text-center">
                  {leave.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(leave._id, "approved")}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition duration-200"
                      >
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(leave._id, "rejected")}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
                      >
                        ❌ Reject
                      </button>
                    </>
                  ) : (
                    <span>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>




  );
};

export default AdminLeave;
