import { Link, useLocation } from "react-router-dom";

const EmployeeSidebar = ({ handleLogout }) => {
  const location = useLocation();

  const menuItems = [
    { label: "Profile", path: "/employee/profile" },
    { label: "Attendance", path: "/employee/attendance" },
    { label: "Leave", path: "/employee/leave" },
    { label: "Salary", path: "/employee/salary" },
  ];

  return (
    <div className="w-64 h-screen fixed top-0 left-0 bg-gradient-to-b from-violet-800 via-violet-700 to-violet-600 text-white flex flex-col p-6 shadow-2xl">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-10 text-center tracking-wider border-b pb-4 border-violet-500">
        Employee Panel
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 text-base font-medium">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-violet-600 font-semibold"
                : "hover:bg-violet-600"
            }`}
          >
            {item.label}
          </Link>
        ))}

        {/* Logout */}
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

export default EmployeeSidebar;
