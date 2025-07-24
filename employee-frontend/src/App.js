import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLeave from "./pages/AdminLeave";
import AdminResetPassword from "./pages/AdminResetPassword";
import AdminSalaryOverview from "./pages/AdminSalaryOverview";
import AdminEmployeesAttendance from "./pages/AdminEmployeesAttendance";
import CreateEmployee from "./pages/CreateEmployee";

import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Salary from "./pages/Salary";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";

const App = () => {
  return (
    <Router>
      <>
        <ToastContainer /> {/* Toasts will work across entire app */}

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage-leaves" element={<AdminLeave />} />
            <Route path="reset-password" element={<AdminResetPassword />} />
            <Route path="salary-overview" element={<AdminSalaryOverview />} />
            <Route path="absent-employees" element={<AdminEmployeesAttendance />} />
            <Route path="create-employee" element={<CreateEmployee />} />
            <Route path="unapproved-attendance" element={<AdminEmployeesAttendance />} />
          </Route>

          {/* Employee Protected Routes */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute allowedRole="employee">
                <EmployeeLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="profile" />} />
            <Route path="profile" element={<Profile />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leave" element={<Leave />} />
            <Route path="salary" element={<Salary />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
