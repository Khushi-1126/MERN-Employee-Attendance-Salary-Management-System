import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminEmployeesAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [overview, setOverview] = useState({
    presentEmployees: [],
    onLeaveEmployees: [],
    absentEmployees: [],
  });
  const [loading, setLoading] = useState(false);

  // Fetch unapproved attendance and today's overview
  useEffect(() => {
    fetchUnapprovedAttendance();
    fetchTodayOverview();
  }, []);

  const fetchUnapprovedAttendance = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/attendance/unapproved");
      setAttendanceList(res.data);
    } catch (error) {
      console.error("Error fetching unapproved attendance:", error);
      toast.error("Failed to load unapproved attendance.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayOverview = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/attendance/overview-today");
      setOverview(res.data);
    } catch (error) {
      console.error("Error fetching today's overview:", error);
      toast.error("Failed to load today's attendance overview.");
    }
  };

  const approveAttendance = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/attendance/${id}/approve`);
      toast.success("Attendance approved successfully!");
      setAttendanceList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error approving attendance:", error);
      toast.error("Failed to approve attendance.");
    }
  };

  return (
    <div className="p-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-xl font-semibold mb-4">Today's Attendance Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 border border-green-400 p-4 rounded shadow">
          <h3 className="text-lg font-bold text-green-700">Present Employees</h3>
          {overview?.presentEmployees?.length === 0 ? (
            <p className="text-sm text-gray-600">No attendance marked today.</p>
          ) : (
            <ul className="list-disc list-inside text-sm text-green-800">
              {overview?.presentEmployees?.map((emp) => (
                <li key={emp._id}>{emp.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-blue-100 border border-blue-400 p-4 rounded shadow">
          <h3 className="text-lg font-bold text-blue-700">Approved Leaves</h3>
          {overview?.onLeaveEmployees?.length === 0 ? (
            <p className="text-sm text-gray-600">No approved leaves today.</p>
          ) : (
            <ul className="list-disc list-inside text-sm text-blue-800">
              {overview?.onLeaveEmployees?.map((emp) => (
                <li key={emp._id}>{emp.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-red-100 border border-red-400 p-4 rounded shadow">
          <h3 className="text-lg font-bold text-red-700">Absent Employees</h3>
          {overview?.absentEmployees?.length === 0 ? (
            <p className="text-sm text-gray-600">No absentees today.</p>
          ) : (
            <ul className="list-disc list-inside text-sm text-red-800">
              {overview?.absentEmployees?.map((emp) => (
                <li key={emp._id}>{emp.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Unapproved Attendance</h2>

      {loading ? (
        <p className="text-blue-500">Loading...</p>
      ) : attendanceList?.length === 0 ? (
        <p className="text-gray-600">No unapproved attendance found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Employee Name</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList?.map((entry) => (
              <tr key={entry._id}>
                <td className="p-2 border">{entry.user?.name || "Unknown"}</td>
                <td className="p-2 border">
                  {new Date(entry.date).toLocaleDateString()}
                </td>
                <td className="p-2 border">{entry.status}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => approveAttendance(entry._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminEmployeesAttendance;
