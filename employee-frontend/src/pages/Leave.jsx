// import React, { useState, useEffect } from "react";
// import axios from "axios";
// const Leave = () => {
//   const [type, setType] = useState("full");
//   const [halfDaySlot, setHalfDaySlot] = useState("");
//   const [category, setCategory] = useState("Casual Leave");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [reason, setReason] = useState("");
//   const [message, setMessage] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     } else {
//       setMessage("Please login again. User not found.");
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user || !user._id || !user.email) {
//       setMessage("User not found. Please login again.");
//       return;
//     }

//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // clear time

//     const from = new Date(fromDate);
//     const to = new Date(toDate);
//     from.setHours(0, 0, 0, 0);
//     to.setHours(0, 0, 0, 0);

//     if (from < today || to < today) {
//       setMessage("You can only request leave for today or future dates.");
//       return;
//     }

//     if (from > to) {
//       setMessage("From date cannot be after To date.");
//       return;
//     }

//     try {
//       const leaveData = {
//         userId: user._id,
//         email: user.email,
//         fromDate,
//         toDate,
//         reason,
//         type,
//         halfDaySlot: type === "half" ? halfDaySlot : "",
//         category,
//       };

//       const res = await axios.post("http://localhost:8080/api/leave", leaveData);

//       setMessage(res.data.message || "Leave requested successfully.");
//       setFromDate("");
//       setToDate("");
//       setReason("");
//       setType("full");
//       setHalfDaySlot("");
//       setCategory("Casual Leave");
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   const minDate = new Date().toISOString().split("T")[0]; // today's date in yyyy-mm-dd

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
//       <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-8">
//         <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 tracking-wide">
//           Apply for Leave
//         </h2>

//         {message && (
//           <div className="mb-6 p-4 bg-indigo-100 text-indigo-800 rounded-lg text-center font-medium">
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//             min={minDate}
//             required
//             className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />

//           <input
//             type="date"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//             min={fromDate || minDate}
//             required
//             className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />

//           <textarea
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             placeholder="Reason for Leave"
//             required
//             className="w-full px-4 py-2 border border-indigo-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />

//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           >
//             <option value="Medical Leave">Medical Leave</option>
//             <option value="Casual Leave">Casual Leave</option>
//             <option value="Earned Leave">Earned Leave</option>
//             <option value="Other Leave">Other Leave</option>
//           </select>

//           <select
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//             className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           >
//             <option value="full">Full Day</option>
//             <option value="half">Half Day</option>
//           </select>

//           {type === "half" && (
//             <select
//               value={halfDaySlot}
//               onChange={(e) => setHalfDaySlot(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             >
//               <option value="">-- Select Half Day Slot --</option>
//               <option value="first">First Half</option>
//               <option value="second">Second Half</option>
//             </select>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors duration-200 font-semibold"
//           >
//             Request Leave
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Leave;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Leave = () => {
  const [type, setType] = useState("full");
  const [halfDaySlot, setHalfDaySlot] = useState("");
  const [category, setCategory] = useState("Casual Leave");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const today = new Date();
today.setHours(0, 0, 0, 0); 


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      setMessage("Please login again. User not found.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id || !user.email) {
      setMessage("User not found. Please login again.");
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    if (from > to) {
      setMessage("From date cannot be after To date.");
      return;
    }

    if (from < today || to < today) {
      toast.error("You can only request leave for today or future dates.");
      return;
    }

    try {
      const leaveData = {
        userId: user._id,
        email: user.email,
        fromDate,
        toDate,
        reason,
        type,
        halfDaySlot: type === "half" ? halfDaySlot : "",
        category,
      };

      const res = await axios.post("http://localhost:8080/api/leave", leaveData);

      setMessage(res.data.message || "Leave requested successfully.");
      setFromDate("");
      setToDate("");
      setReason("");
      setType("full");
      setHalfDaySlot("");
      setCategory("Casual Leave");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 tracking-wide">
          Apply for Leave
        </h2>

        {message && (
          <div className="mb-6 p-4 bg-indigo-100 text-indigo-800 rounded-lg text-center font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for Leave"
            required
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="Medical Leave">Medical Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Earned Leave">Earned Leave</option>
            <option value="Other Leave">Other Leave</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="full">Full Day</option>
            <option value="half">Half Day</option>
          </select>

          {type === "half" && (
            <select
              value={halfDaySlot}
              onChange={(e) => setHalfDaySlot(e.target.value)}
              required
              className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">-- Select Half Day Slot --</option>
              <option value="first">First Half</option>
              <option value="second">Second Half</option>
            </select>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors duration-200 font-semibold"
          >
            Request Leave
          </button>
        </form>
      </div>
    </div>
  );
};

export default Leave;
