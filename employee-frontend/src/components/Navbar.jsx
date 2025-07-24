import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-violet-600">Employee Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition"
      >
        Logout
      </button>
    </nav>
  );
}
