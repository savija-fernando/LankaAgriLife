import React, { useEffect, useState } from "react";
import {
  getAllRevenue,
  addRevenue,
  updateRevenue,
  deleteRevenue,
  Revenuepdfgenerator,
} from "../../api/revenueAPI";

const RevenueManagement = () => {
  const [revenues, setRevenues] = useState([]);
  const [formData, setFormData] = useState({
    revenue_id: "",
    salesData: "",
    expenseData: "",
    profit: "",
  });
  const [editingRevenue, setEditingRevenue] = useState(null);

  useEffect(() => {
    fetchRevenues();
  }, []);

  const fetchRevenues = async () => {
    try {
      const res = await getAllRevenue();
      setRevenues(res.data);
    } catch (err) {
      console.error("Error fetching revenues:", err);
      alert("Error fetching revenue data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        salesData: Number(formData.salesData),
        expenseData: Number(formData.expenseData),
        profit:
          formData.profit !== ""
            ? Number(formData.profit)
            : Number(formData.salesData) - Number(formData.expenseData),
      };

      if (editingRevenue) {
        await updateRevenue(editingRevenue.revenue_id, payload);
        alert(`Updated revenue ID: ${formData.revenue_id} successfully.`);
        setEditingRevenue(null);
      } else {
        await addRevenue(payload);
        alert(`Added revenue ID: ${formData.revenue_id} successfully.`);
      }

      setFormData({
        revenue_id: "",
        salesData: "",
        expenseData: "",
        profit: "",
      });

      fetchRevenues();
    } catch (err) {
      console.error("Error submitting revenue:", err);
      alert("Form error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (item) => {
    setEditingRevenue(item);
    setFormData({
      revenue_id: item.revenue_id,
      salesData: item.salesData,
      expenseData: item.expenseData,
      profit: item.profit,
    });
  };

  const handleDelete = async (revenue_id) => {
    if (!window.confirm(`Delete revenue record with ID: "${revenue_id}"?`))
      return;

    try {
      await deleteRevenue(revenue_id);
      alert(`Deleted revenue ID: ${revenue_id} successfully.`);
      fetchRevenues();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleExportPDF = async () => {
    try {
      const res = await Revenuepdfgenerator();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "revenue_report.pdf");
      document.body.appendChild(link);
      link.click();
      alert("PDF exported successfully!");
    } catch (err) {
      console.error("Export PDF error:", err);
      alert("Failed to export PDF.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Revenue Management
      </h1>

      {/* Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {editingRevenue ? "Update Revenue Record" : "Add New Revenue Record"}
        </h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Revenue ID"
            value={formData.revenue_id}
            required
            onChange={(e) =>
              setFormData({ ...formData, revenue_id: e.target.value })
            }
            className="border p-2 rounded bg-gray-50 disabled:opacity-60"
            disabled={!!editingRevenue}
          />
          <input
            type="number"
            placeholder="Sales Data"
            value={formData.salesData}
            required
            onChange={(e) =>
              setFormData({ ...formData, salesData: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Expense Data"
            value={formData.expenseData}
            required
            onChange={(e) =>
              setFormData({ ...formData, expenseData: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Profit (auto-calculated if empty)"
            value={formData.profit}
            onChange={(e) =>
              setFormData({ ...formData, profit: e.target.value })
            }
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="!bg-green-600 hover:!bg-green-700 !text-white !px-4 !py-2 !rounded col-span-full"
          >
            {editingRevenue ? "Update Record" : "Add Record"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left font-semibold">ID</th>
              <th className="p-3 text-left font-semibold">Sales</th>
              <th className="p-3 text-left font-semibold">Expense</th>
              <th className="p-3 text-left font-semibold">Profit</th>
              <th className="p-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {revenues.map((rev) => (
              <tr key={rev.revenue_id} className="bg-white hover:bg-gray-50">
                <td className="p-3">{rev.revenue_id}</td>
                <td className="p-3">Rs. {rev.salesData}</td>
                <td className="p-3">Rs. {rev.expenseData}</td>
                <td className="p-3">Rs. {rev.profit}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(rev)}
                    className="!flex !items-center !gap-1 !bg-yellow-400 hover:!bg-yellow-500 !text-white !px-3 !py-1 !rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(rev.revenue_id)}
                    className="!flex !items-center !gap-1 !bg-red-500 hover:!bg-red-600 !text-white !px-3 !py-1 !rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PDF Export */}
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

export default RevenueManagement;
