import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../src/components/components/Sidebar";
import Navbar from "../../src/components/components/Navbar";

export default function MainLayout() {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Clear auth token
    navigate("/admin"); // Redirect back to AdminLogin
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-10 shadow bg-white flex items-center justify-between px-4">
          <Navbar />

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition shadow"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
