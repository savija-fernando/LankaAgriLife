import React, { useState } from "react";

const RevenueForm: React.FC = () => {
  const [formData, setFormData] = useState({
    revenue_id: "",
    salesData: "",
    expenseData: "",
    profit: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "salesData" || name === "expenseData") {
        const sales = name === "salesData" ? Number(value) : Number(prev.salesData);
        const expense = name === "expenseData" ? Number(value) : Number(prev.expenseData);
        updated.profit = (sales - expense).toString();
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Revenue Data:", formData);
    alert(`Revenue Submitted! Profit: ${formData.profit}`);
    setFormData({
      revenue_id: "",
      salesData: "",
      expenseData: "",
      profit: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Revenue Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["revenue_id", "salesData", "expenseData", "profit"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-gray-700 font-medium mb-1"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "revenue_id" ? "text" : "number"}
                id={field}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                readOnly={field === "profit"} // auto-calculated
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                placeholder={`Enter ${field}`}
                required={field !== "profit"}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit Revenue
          </button>
        </form>
      </div>
    </div>
  );
};

export default RevenueForm;
