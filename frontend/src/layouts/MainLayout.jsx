import { Outlet } from "react-router-dom";
import Sidebar from "../../src/components/components/Sidebar";
import Navbar from "../../src/components/components/Navbar";
import { useState, useEffect } from "react";
import { getAllInventory } from "../api/inventoryAPI";

export default function MainLayout() {
  const [notificationCount, setNotificationCount] = useState(3);
  const [inventoryData, setInventoryData] = useState({ lowStockAlerts: 0 });

  // Fetch inventory data for notifications
  const fetchInventoryData = async () => {
    try {
      const res = await getAllInventory();
      const inventoryData = res.data || [];
      
      const lowStockItems = inventoryData.filter(item => item.stockLevel <= item.threshold).length;
      const lowStockAlerts = lowStockItems;

      setInventoryData({ lowStockAlerts });
      
      // Update notification count based on low stock alerts
      const newNotificationCount = 3 + lowStockAlerts;
      setNotificationCount(newNotificationCount);
    } catch (err) {
      console.error('Error fetching inventory data:', err);
    }
  };

  useEffect(() => {
    fetchInventoryData();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      fetchInventoryData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Sticky Navbar - ONLY HERE */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
          <Navbar 
            notificationCount={notificationCount} 
            inventoryData={inventoryData}
          />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}