import React, { useEffect, useState } from "react";
import {
  getAllInventory,
  addInventory,
  updateInventory,
  deleteInventory,
  exportPDF,
} from "../../api/inventoryAPI";

const InventoryManagement = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    inventory_id: "",
    itemName: "",
    dateAdded: "",
    expiryDate: "",
    stockLevel: "",
    unitPrice: "",
    threshold: 10,
  });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await getAllInventory();
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
      alert("Error fetching inventory");
    }
  };

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
        alert(`Updated "${formData.itemName}" successfully.`);
        setEditingItem(null);
      } else {
        await addInventory(payload);
        alert(`Added "${formData.itemName}" successfully.`);
      }

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
      console.error("Error submitting form:", err);
      alert("Form error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (inventory_id, itemName) => {
    if (!window.confirm(`Delete "${itemName}"?`)) return;

    try {
      await deleteInventory(inventory_id);
      alert(`Deleted "${itemName}" successfully.`);
      fetchInventory();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete error: " + (err.response?.data?.message || err.message));
    }
  };

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
  };

  const handleExportPDF = async () => {
    try {
      const res = await exportPDF();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inventory.pdf");
      document.body.appendChild(link);
      link.click();
      alert("PDF exported successfully!");
    } catch (err) {
      console.error("Export PDF error:", err);
      alert("Failed to export PDF.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Inventory Management
      </h1>

      {/* Add / Update Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {editingItem ? "Update Item" : "Add New Item"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Inventory ID"
            value={formData.inventory_id}
            required
            onChange={(e) =>
              setFormData({ ...formData, inventory_id: e.target.value })
            }
            className="border p-2 rounded disabled:opacity-60 bg-gray-50"
            disabled={!!editingItem}
          />
          <input
            type="text"
            placeholder="Item Name"
            value={formData.itemName}
            required
            onChange={(e) =>
              setFormData({ ...formData, itemName: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={formData.dateAdded}
            onChange={(e) =>
              setFormData({ ...formData, dateAdded: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={formData.expiryDate}
            onChange={(e) =>
              setFormData({ ...formData, expiryDate: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Stock Level"
            value={formData.stockLevel}
            required
            onChange={(e) =>
              setFormData({ ...formData, stockLevel: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Unit Price"
            value={formData.unitPrice}
            required
            onChange={(e) =>
              setFormData({ ...formData, unitPrice: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Threshold"
            value={formData.threshold}
            required
            onChange={(e) =>
              setFormData({ ...formData, threshold: e.target.value })
            }
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

      {/* Inventory Table */}
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
            {items.map((item) => {
              const isLowStock = item.stockLevel <= item.threshold;
              return (
                <tr
                  key={item.inventory_id}
                  className={`${
                    isLowStock ? "bg-red-50" : "bg-white"
                  } hover:bg-gray-50 transition`}
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
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(item)}
                      className="!flex !items-center !gap-1 !bg-yellow-400 hover:!bg-yellow-500 !text-white !px-3 !py-1 !rounded-md !transition"
                    >
                    Edit
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() =>
                        handleDelete(item.inventory_id, item.itemName)
                      }
                      className="!flex !items-center !gap-1 !bg-red-500 hover:!bg-red-600 !text-white !px-3 !py-1 !rounded-md !transition"
                    >
                    Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Export PDF Button */}
      <div className="mt-6 text-right">
        <button
          onClick={handleExportPDF}
          className="!bg-blue-600 hover:!bg-blue-700 !text-white !px-5 !py-2 !rounded !shadow"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default InventoryManagement;
