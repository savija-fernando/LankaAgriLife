import { Outlet } from "react-router-dom";
import Sidebar from "../../src/components/components/Sidebar";
import Navbar from "../../src/components/components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-10 shadow bg-white flex items-center justify-between px-0">
          <Navbar />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
