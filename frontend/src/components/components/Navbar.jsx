import { Bell, User, Search, LogOut, ChevronDown, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [adminRole, setAdminRole] = useState("Admin");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const role = localStorage.getItem("adminRole");
    if (role) setAdminRole(role);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Remove credentials
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");

    // Close dropdown
    setIsDropdownOpen(false);

    // Navigate to login page
    navigate("/admin", { replace: true });
  };

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-100 shadow-sm px-6 py-4 w-full">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-3xl mx-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400 transition-all duration-200 bg-gray-50/50 hover:bg-white shadow-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5 ml-6">
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-green-600 transition-all duration-200 hover:bg-green-50 rounded-xl group">
          <Bell size={22} className="group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center shadow-sm">
            3
          </span>
        </button>

        {/* User Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-50 transition-all duration-200 group border border-transparent hover:border-gray-200"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center shadow-sm group-hover:shadow transition-all">
                <User size={18} className="text-green-700" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-800">{adminRole}</span>
              <span className="text-xs text-gray-500">Administrator</span>
            </div>

            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">{adminRole}</p>
                <p className="text-xs text-gray-500 mt-0.5">Administrator Account</p>
              </div>

              <div className="py-2">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <User size={16} className="text-gray-400" />
                  My Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings size={16} className="text-gray-400" />
                  Settings
                </button>
              </div>

              <div className="border-t border-gray-100 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
