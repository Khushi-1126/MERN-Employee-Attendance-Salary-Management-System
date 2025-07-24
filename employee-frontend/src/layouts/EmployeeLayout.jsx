import React from "react";
import { Outlet } from "react-router-dom";
import EmployeeSidebar from "../components/EmployeeSidebar";

const EmployeeLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <EmployeeSidebar />
      <main className="ml-64 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;

