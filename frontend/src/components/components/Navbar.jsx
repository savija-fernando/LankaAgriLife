import { Bell, User, Search, LogOut, ChevronDown, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function Navbar({ notificationCount = 3, inventoryData = { lowStockAlerts: 0 } }) {
  const navigate = useNavigate();
  const [adminRole, setAdminRole] = useState("Admin");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const role = localStorage.getItem("adminRole");
    if (role) setAdminRole(role);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    setIsDropdownOpen(false);
    navigate("/admin", { replace: true });
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNotificationOpen(false);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 w-full">
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
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={toggleNotifications}
            className="relative p-2 text-gray-500 hover:text-green-600 transition-all duration-200 hover:bg-green-50 rounded-xl group"
          >
            <Bell size={22} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center shadow-sm">
              {notificationCount}
            </span>
          </button>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200/60 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Header */}
              <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                  {notificationCount} new
                </span>
              </div>

              {/* Notification List */}
              <div className="max-h-96 overflow-y-auto">
                <div className="space-y-2 p-2">
                  {/* Low Stock Alert */}
                  {inventoryData.lowStockAlerts > 0 && (
                    <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-xl border border-red-200 hover:bg-red-100 cursor-pointer transition-colors">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mt-1.5 flex-shrink-0"></div>
                      <div className="flex-1">
                        <span className="text-sm text-gray-700 font-medium block">
                          {inventoryData.lowStockAlerts} items are low on stock
                        </span>
                        <span className="text-xs text-red-600 mt-1 block">Action required</span>
                      </div>
                    </div>
                  )}

                  {/* Scheduled Watering */}
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200 hover:bg-yellow-100 cursor-pointer transition-colors">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="text-sm text-gray-700 font-medium block">
                        Watering scheduled in 2 hours
                      </span>
                      <span className="text-xs text-yellow-600 mt-1 block">Upcoming task</span>
                    </div>
                  </div>

                  {/* Compost Ready */}
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 cursor-pointer transition-colors">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="text-sm text-gray-700 font-medium block">
                        Compost batch #5 ready for review
                      </span>
                      <span className="text-xs text-green-600 mt-1 block">Ready for processing</span>
                    </div>
                  </div>

                  {/* Equipment Maintenance */}
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1">
                      <span className="text-sm text-gray-700 font-medium block">
                        New equipment maintenance due
                      </span>
                      <span className="text-xs text-blue-600 mt-1 block">Maintenance required</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 pt-3 px-4">
                <button className="w-full text-center text-sm text-green-600 font-medium hover:text-green-700 py-2 transition-colors">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleUserDropdown}
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