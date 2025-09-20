import { useState } from "react";

function RevenueForm({ onAdd }) {
  const [form, setForm] = useState({
    type: "revenue",
    title: "",
    category: "",
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      type: "revenue",
      title: "",
      category: "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  };

  return (
    <div className="bg-green-50 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3">➕ Add New Revenue</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="revenue">Revenue</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Amount"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Enter title"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="p-2 border rounded"
            placeholder="Enter category"
          />
        </div>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          placeholder="Optional description"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Revenue
        </button>
      </form>
    </div>
  );
}

export default RevenueForm;
