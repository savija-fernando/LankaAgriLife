import { Bell, User, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [adminRole, setAdminRole] = useState("Admin");

  useEffect(() => {
    const role = localStorage.getItem("adminRole");
    if (role) setAdminRole(role);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    navigate("/admin-login");
  };

  return (
    <header className="flex items-center justify-between bg-white border-b shadow-sm px-6 py-3">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 ml-6">
        {/* Notifications */}
        <button className="relative text-gray-600 hover:text-green-600 transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
            3
          </span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 text-gray-700">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={18} />
          </div>
          <span className="hidden sm:inline text-sm font-medium">
            {adminRole}
          </span>


        </div>
      </div>
    </header>
  );
}
