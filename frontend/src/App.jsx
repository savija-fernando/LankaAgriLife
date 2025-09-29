import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Products from "./pages/Products";

// Admin/Dashboard pages
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/pages/Dashboard";
import CropManagement from "./pages/pages/cropmanagement/CropManagement";
import CompostManagement from "./pages/pages/compostmanagement/CompostManagement";
import LivestockManagement from "./pages/pages/livestockmanagement/LivestockManagement";
import RevenueManagement from "./pages/pages/revenuemanagement/RevenueManagement";
import InventoryManagement from "./pages/pages/inventorymanagement/InventoryManagement";
import Farmers from "./pages/pages/Farmers";
import Handlers from "./pages/pages/Handlers";
import Analytics from "./pages/pages/Analytics";
import Settings from "./pages/pages/Settings";

// Voice navigation component
import VoiceCommandHandler from "./components/VoiceCommandHandler"; // ✅ add this

function App() {
  return (
    <Router>
      <div className="font-sans">
        {/* ✅ Voice navigation always running */}
        <VoiceCommandHandler />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />

          {/* Dashboard routes (nested under /dashboard) */}
          <Route path="/dashboard" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="crops" element={<CropManagement />} />
            <Route path="compost" element={<CompostManagement />} />
            <Route path="livestock" element={<LivestockManagement />} />
            <Route path="revenue" element={<RevenueManagement />} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="farmers" element={<Farmers />} />
            <Route path="handlers" element={<Handlers />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
