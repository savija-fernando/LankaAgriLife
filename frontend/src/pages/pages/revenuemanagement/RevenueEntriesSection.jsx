import React, { useEffect, useState } from 'react';
import { Card } from '../../../components/components/ui/Card';
import { Input } from '../../../components/components/ui/Input';
import { Button } from '../../../components/components/ui/Button';
import { Edit, Trash, PlusCircle } from 'lucide-react';

import {
  getAllRevenue,
  addRevenue,
  updateRevenue,
  deleteRevenue,
  Revenuepdfgenerator,
} from '../../../api/revenueAPI';

const RevenueEntriesSection = () => {
  const [revenues, setRevenues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [currentEntry, setCurrentEntry] = useState({
    revenue_id: '',
    salesData: '',
    expenseData: '',
    profit: 0,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchRevenues();
  }, []);

  const fetchRevenues = async () => {
    try {
      const res = await getAllRevenue();
      setRevenues(res.data || []);
    } catch (err) {
      console.error('Error fetching revenues:', err);
      alert('Error fetching revenue data.');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!currentEntry.revenue_id?.toString().trim()) {
      newErrors.revenue_id = 'Revenue ID is required.';
    }
    if (currentEntry.salesData === '' || currentEntry.salesData == null) {
      newErrors.salesData = 'Sales Data is required.';
    } else if (isNaN(currentEntry.salesData) || Number(currentEntry.salesData) < 0) {
      newErrors.salesData = 'Sales Data must be a non-negative number.';
    }
    if (currentEntry.expenseData === '' || currentEntry.expenseData == null) {
      newErrors.expenseData = 'Expense Data is required.';
    } else if (isNaN(currentEntry.expenseData) || Number(currentEntry.expenseData) < 0) {
      newErrors.expenseData = 'Expense Data must be a non-negative number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // keep numbers as strings until submit, but allow empty string for easy editing
    setCurrentEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const sales = Number(currentEntry.salesData);
    const expense = Number(currentEntry.expenseData);
    const profit = sales - expense;

    const payload = {
      revenue_id: currentEntry.revenue_id,
      salesData: sales,
      expenseData: expense,
      profit,
    };

    try {
      if (editMode !== null) {
        await updateRevenue(editMode, payload);
        alert(`Updated revenue ID: ${editMode} successfully.`);
      } else {
        await addRevenue(payload);
        alert(`Added revenue ID: ${payload.revenue_id} successfully.`);
      }

      // reset and refresh
      setCurrentEntry({ revenue_id: '', salesData: '', expenseData: '', profit: 0 });
      setEditMode(null);
      setIsModalOpen(false);
      setErrors({});
      fetchRevenues();
    } catch (err) {
      console.error('Error in submit:', err);
      alert('Form error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (id) => {
    const entry = revenues.find((r) => r.revenue_id === id);
    if (!entry) return;
    setCurrentEntry({
      revenue_id: entry.revenue_id,
      salesData: entry.salesData.toString(),
      expenseData: entry.expenseData.toString(),
      profit: entry.profit,
    });
    setEditMode(id);
    setIsModalOpen(true);
    setErrors({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete revenue record with ID: "${id}"?`)) return;
    try {
      await deleteRevenue(id);
      alert(`Deleted revenue ID: ${id} successfully.`);
      fetchRevenues();
    } catch (err) {
      console.error('Delete error:', err);
      alert('Delete error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleExportPDF = async () => {
    try {
      const res = await Revenuepdfgenerator();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'revenue_report.pdf');
      document.body.appendChild(link);
      link.click();
      alert('PDF exported successfully!');
    } catch (err) {
      console.error('Export PDF error:', err);
      alert('Failed to export PDF.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-green-700">Revenue Entries</h3>
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setEditMode(null);
            setCurrentEntry({ revenue_id: '', salesData: '', expenseData: '', profit: 0 });
            setErrors({});
          }}
          className="flex items-center gap-2 bg-green-700 text-white rounded-full px-4 py-2"
        >
          <PlusCircle className="w-5 h-5" /> Add Entry
        </Button>
      </div>

      <div className="overflow-x-auto w-full rounded-lg shadow-md bg-white">
        <table className="w-full min-w-[600px] divide-y divide-gray-200">
          <thead className="bg-green-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Sales</th>
              <th className="px-4 py-2 text-left">Expenses</th>
              <th className="px-4 py-2 text-left">Profit</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {revenues.map((entry) => (
              <tr key={entry.revenue_id} className="hover:bg-green-50 transition">
                <td className="px-4 py-2">{entry.revenue_id}</td>
                <td className="px-4 py-2">{entry.salesData}</td>
                <td className="px-4 py-2">{entry.expenseData}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    entry.profit >= 0 ? 'text-green-700' : 'text-red-600'
                  }`}
                >
                  {entry.profit}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => handleEdit(entry.revenue_id)} className="text-green-600 hover:text-green-800">
                    <Edit />
                  </button>
                  <button onClick={() => handleDelete(entry.revenue_id)} className="text-red-600 hover:text-red-800">
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <Button onClick={handleExportPDF} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow">
          Export as PDF
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-20">
          <div className="bg-white p-8 rounded-xl shadow-lg w-96 relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditMode(null);
                setErrors({});
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-green-700">
              {editMode !== null ? 'Edit Revenue Entry' : 'Add New Revenue Entry'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="revenue_id" className="block text-gray-700 font-medium mb-1">
                  Revenue ID
                </label>
                <Input
                  id="revenue_id"
                  name="revenue_id"
                  placeholder="Unique ID"
                  value={currentEntry.revenue_id}
                  onChange={handleInputChange}
                  disabled={editMode !== null}
                />
                {errors.revenue_id && <p className="text-red-500 text-sm">{errors.revenue_id}</p>}
              </div>

              <div>
                <label htmlFor="salesData" className="block text-gray-700 font-medium mb-1">Sales Amount</label>
                <Input
                  id="salesData"
                  name="salesData"
                  type="number"
                  value={currentEntry.salesData}
                  onChange={handleInputChange}
                />
                {errors.salesData && <p className="text-red-500 text-sm">{errors.salesData}</p>}
              </div>

              <div>
                <label htmlFor="expenseData" className="block text-gray-700 font-medium mb-1">Expenses Amount</label>
                <Input
                  id="expenseData"
                  name="expenseData"
                  type="number"
                  value={currentEntry.expenseData}
                  onChange={handleInputChange}
                />
                {errors.expenseData && <p className="text-red-500 text-sm">{errors.expenseData}</p>}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditMode(null);
                    setErrors({});
                  }}
                  className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg">
                  {editMode !== null ? 'Update Entry' : 'Add Entry'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueEntriesSection;
