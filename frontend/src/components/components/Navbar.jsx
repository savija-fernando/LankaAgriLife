import { Bell, User, Search } from "lucide-react";

export default function Navbar() {
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

        {/* User Avatar */}
        <button className="flex items-center gap-2 text-gray-700 hover:text-green-700 transition">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={18} />
          </div>
          <span className="hidden sm:inline text-sm font-medium">Admin</span>
        </button>
      </div>
    </header>
  );
}
