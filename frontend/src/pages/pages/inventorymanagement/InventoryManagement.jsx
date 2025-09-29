import React, { useEffect, useState } from "react";
import { Button } from "../../../components/components/ui/Button";
import { Download, Edit, Trash2, AlertTriangle } from "lucide-react";
import { FaBoxes, FaChartPie } from "react-icons/fa";
import {
  getAllInventory,
  addInventory,
  updateInventory,
  deleteInventory,
  exportPDF,
} from "../../../api/inventoryAPI";

import AnalysisSection from "./AnalysisSection";

const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState("inventory");

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
        alert(` Updated "${formData.itemName}" successfully.`);
        setEditingItem(null);
      } else {
        await addInventory(payload);
        alert(`Added "${formData.itemName}" successfully.`);
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
    { value: "inventory", label: "Inventory", icon: <FaBoxes className="w-5 h-5" /> },
    { value: "analysis", label: "Analysis", icon: <FaChartPie className="w-5 h-5" /> },
  ];

  // Calculate stats for the header
  const totalItems = items.length;
  const lowStockItems = items.filter(item => item.stockLevel <= item.threshold).length;
  const totalValue = items.reduce((sum, item) => sum + (item.stockLevel * item.unitPrice), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                  <FaBoxes className="w-8 h-8 text-white" />
                </div>
                Inventory Management
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Manage your stock levels and analyze performance</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Items</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{totalItems}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FaBoxes className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Low Stock Items</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{lowStockItems}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Inventory Value</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">Rs. {totalValue.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <FaChartPie className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105
                  ${activeTab === tab.value
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"}
                `}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {activeTab === "inventory" && (
            <div className="p-6">
              {/* Form */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8 border border-green-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {editingItem ? "Update Inventory Item" : "Add New Inventory Item"}
                </h3>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inventory ID</label>
                    <input
                      type="text"
                      placeholder="e.g., INV001"
                      value={formData.inventory_id}
                      required
                      disabled={!!editingItem}
                      onChange={(e) => setFormData({ ...formData, inventory_id: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition disabled:bg-gray-100 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                    <input
                      type="text"
                      placeholder="Enter item name"
                      value={formData.itemName}
                      required
                      onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Added</label>
                    <input
                      type="date"
                      value={formData.dateAdded}
                      onChange={(e) => setFormData({ ...formData, dateAdded: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock Level</label>
                    <input
                      type="number"
                      placeholder="Enter quantity"
                      value={formData.stockLevel}
                      required
                      onChange={(e) => setFormData({ ...formData, stockLevel: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price (Rs.)</label>
                    <input
                      type="number"
                      placeholder="Enter price"
                      value={formData.unitPrice}
                      required
                      onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Low Stock Threshold</label>
                    <input
                      type="number"
                      placeholder="Threshold level"
                      value={formData.threshold}
                      required
                      onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                  </div>
                  <div className="lg:col-span-3">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {editingItem ? "Update Item" : "Add Item to Inventory"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Inventory Items</h3>
                  <Button
                    onClick={handleExportPDF}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl px-6 py-3 shadow-lg transition-all duration-300"
                  >
                    <Download className="w-4 h-4" /> Export PDF
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <tr>
                        <th className="p-4 text-left font-semibold text-gray-700">ID</th>
                        <th className="p-4 text-left font-semibold text-gray-700">Name</th>
                        <th className="p-4 text-left font-semibold text-gray-700">Stock</th>
                        <th className="p-4 text-left font-semibold text-gray-700">Price</th>
                        <th className="p-4 text-left font-semibold text-gray-700">Threshold</th>
                        <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {items.map((item) => {
                        const isLowStock = item.stockLevel <= item.threshold;
                        return (
                          <tr
                            key={item.inventory_id}
                            className={`hover:bg-gray-50 transition-all duration-200 ${
                              isLowStock ? "bg-red-50 border-l-4 border-l-red-500" : "bg-white"
                            }`}
                          >
                            <td className="p-4 font-mono text-gray-600">{item.inventory_id}</td>
                            <td className="p-4 font-medium text-gray-900">{item.itemName}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{item.stockLevel}</span>
                                {isLowStock && (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                    <AlertTriangle className="w-3 h-3" /> Low Stock
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-4 font-semibold text-gray-900">Rs. {item.unitPrice?.toLocaleString()}</td>
                            <td className="p-4 text-gray-600">{item.threshold}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="flex items-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                                >
                                  <Edit className="w-4 h-4" /> Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(item.inventory_id, item.itemName)}
                                  className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                                >
                                  <Trash2 className="w-4 h-4" /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analysis" && <AnalysisSection items={items} />}
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;