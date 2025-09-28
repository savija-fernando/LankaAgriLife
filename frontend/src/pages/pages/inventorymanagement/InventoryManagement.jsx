import React, { useEffect, useState } from "react";
import { Button } from "../../../components/components/ui/Button";
import { PlusCircle, Search } from "lucide-react";
import { FaBoxes, FaExchangeAlt, FaChartPie } from "react-icons/fa";
import {
  getAllInventory,
  addInventory,
  updateInventory,
  deleteInventory,
  exportPDF,
} from "../../../api/inventoryAPI";

import StockMovementsSection from "./StockMovementsSection";
import AnalysisSection from "./AnalysisSection";

const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [searchTerm, setSearchTerm] = useState("");

  // ---- Shared State ----
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    inventory_id: "",
    itemName: "",
    dateAdded: "",
    expiryDate: "",
    stockLevel: "",
    unitPrice: "",
    threshold: 10,
  });

  // Fetch inventory list
  const fetchInventory = async () => {
    try {
      const res = await getAllInventory();
      setItems(res.data || []);
    } catch (err) {
      console.error("Error fetching inventory:", err);
      alert("Error fetching inventory.");
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        stockLevel: Number(formData.stockLevel),
        unitPrice: Number(formData.unitPrice),
        threshold: Number(formData.threshold),
      };

      if (editingItem) {
        await updateInventory(editingItem.inventory_id, payload);
        alert(`✅ Updated "${formData.itemName}" successfully.`);
        setEditingItem(null);
      } else {
        await addInventory(payload);
        alert(`✅ Added "${formData.itemName}" successfully.`);
      }

      // Reset form
      setFormData({
        inventory_id: "",
        itemName: "",
        dateAdded: "",
        expiryDate: "",
        stockLevel: "",
        unitPrice: "",
        threshold: 10,
      });

      fetchInventory();
    } catch (err) {
      console.error("Form error:", err);
      alert("❌ Error: " + (err.response?.data?.message || err.message));
    }
  };

  // Delete
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await deleteInventory(id);
      alert(`🗑️ Deleted "${name}" successfully.`);
      fetchInventory();
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Delete error: " + (err.response?.data?.message || err.message));
    }
  };

  // Edit
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      inventory_id: item.inventory_id,
      itemName: item.itemName,
      dateAdded: item.dateAdded?.slice(0, 10) || "",
      expiryDate: item.expiryDate?.slice(0, 10) || "",
      stockLevel: item.stockLevel,
      unitPrice: item.unitPrice,
      threshold: item.threshold,
    });
    setActiveTab("inventory");
  };

  // Export PDF
  const handleExportPDF = async () => {
    try {
      const res = await exportPDF();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inventory.pdf");
      document.body.appendChild(link);
      link.click();
      alert("📄 PDF exported successfully!");
    } catch (err) {
      console.error("Export PDF error:", err);
      alert("❌ Failed to export PDF.");
    }
  };

  const tabs = [
    { value: "inventory", label: "Inventory", icon: <FaBoxes className="w-5 h-5 text-green-600" /> },
    { value: "stockMovements", label: "Stock Movements", icon: <FaExchangeAlt className="w-5 h-5 text-green-600" /> },
    { value: "analysis", label: "Analysis", icon: <FaChartPie className="w-5 h-5 text-green-600" /> },
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-700 flex items-center gap-2">📦 Inventory Management</h2>
        <Button
          onClick={() => setActiveTab("inventory")}
          className="flex items-center gap-2 bg-green-700 text-white hover:bg-green-600 rounded-full px-4 py-2"
        >
          <PlusCircle className="w-5 h-5" /> Add Item
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-6 py-2 text-lg font-medium border-b-4 w-full focus:outline-none
              ${activeTab === tab.value
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-600 hover:text-green-600 hover:border-green-300"}
              transition-colors duration-300 ease-in-out flex items-center justify-center gap-2`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      {(activeTab === "inventory" || activeTab === "stockMovements") && (
        <div className="relative flex-1 max-w-md mb-6 z-10">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      )}

      {/* Tab Content */}
      {activeTab === "inventory" && (
        <div className="space-y-6">
          {/* Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              {editingItem ? "Update Item" : "Add New Item"}
            </h3>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Inventory ID"
                value={formData.inventory_id}
                required
                disabled={!!editingItem}
                onChange={(e) => setFormData({ ...formData, inventory_id: e.target.value })}
                className="border p-2 rounded bg-gray-50 disabled:opacity-60"
              />
              <input
                type="text"
                placeholder="Item Name"
                value={formData.itemName}
                required
                onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="date"
                value={formData.dateAdded}
                onChange={(e) => setFormData({ ...formData, dateAdded: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Stock Level"
                value={formData.stockLevel}
                required
                onChange={(e) => setFormData({ ...formData, stockLevel: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Unit Price"
                value={formData.unitPrice}
                required
                onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Threshold"
                value={formData.threshold}
                required
                onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="!bg-green-600 hover:!bg-green-700 !text-white !px-4 !py-2 !rounded col-span-full"
              >
                {editingItem ? "Update Item" : "Add Item"}
              </button>
            </form>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3 text-left font-semibold">ID</th>
                  <th className="p-3 text-left font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">Stock</th>
                  <th className="p-3 text-left font-semibold">Price</th>
                  <th className="p-3 text-left font-semibold">Threshold</th>
                  <th className="p-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items
                  .filter((i) => i.itemName.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item) => {
                    const isLowStock = item.stockLevel <= item.threshold;
                    return (
                      <tr
                        key={item.inventory_id}
                        className={`${isLowStock ? "bg-red-50" : "bg-white"} hover:bg-gray-50 transition`}
                      >
                        <td className="p-3">{item.inventory_id}</td>
                        <td className="p-3">{item.itemName}</td>
                        <td className="p-3">
                          {item.stockLevel}
                          {isLowStock && (
                            <span className="ml-2 text-xs px-2 py-0.5 bg-red-200 text-red-700 rounded-full">
                              Low
                            </span>
                          )}
                        </td>
                        <td className="p-3">Rs. {item.unitPrice}</td>
                        <td className="p-3">{item.threshold}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="!bg-yellow-400 hover:!bg-yellow-500 !text-white !px-3 !py-1 !rounded-md"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.inventory_id, item.itemName)}
                            className="!bg-red-500 hover:!bg-red-600 !text-white !px-3 !py-1 !rounded-md"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="mt-6 text-right">
              <button
                onClick={handleExportPDF}
                className="!bg-blue-600 hover:!bg-blue-700 !text-white !px-5 !py-2 !rounded !shadow"
              >
                Export as PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "stockMovements" && <StockMovementsSection searchTerm={searchTerm} />}
      {activeTab === "analysis" && <AnalysisSection items={items} />}
    </div>
  );
};

export default InventoryManagement;
