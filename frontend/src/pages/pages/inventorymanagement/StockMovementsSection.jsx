import React from 'react';
import { Card } from "../../../components/components/ui/Card";

const StockMovementsSection = ({ movements }) => {
  // Group movements by itemName
 const grouped = Array.isArray(movements)
  ? movements.reduce((acc, move) => {
      if (!acc[move.itemName]) acc[move.itemName] = [];
      acc[move.itemName].push(move);
      return acc;
    }, {})
  : {};


  return (
    <div>
      <h2 className="text-3xl font-semibold text-green-800 font-serif mb-6">
        🌱 Stock Movements
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(grouped).map((itemName, idx) => {
          const totalIn = grouped[itemName].filter(m => m.type === 'in').reduce((sum, m) => sum + m.quantity, 0);
          const totalOut = grouped[itemName].filter(m => m.type === 'out').reduce((sum, m) => sum + m.quantity, 0);

          return (
            <Card
              key={idx}
              className="bg-green-50 shadow-lg rounded-2xl p-6 border border-green-300 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Item Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-green-900">{itemName}</h3>
                <div className="text-sm text-gray-600">{grouped[itemName].length} movements</div>
              </div>

              {/* Total In/Out */}
              <div className="flex justify-between mb-3 text-sm">
                <span className="font-medium text-green-700">Stock Added:</span>
                <span className="font-semibold">{totalIn} units</span>
              </div>
              <div className="flex justify-between mb-4 text-sm">
                <span className="font-medium text-red-600">Stock Removed:</span>
                <span className="font-semibold">{totalOut} units</span>
              </div>

              {/* Movements List */}
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {grouped[itemName].map((move, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-green-200 pb-1 text-sm"
                  >
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        move.type === 'in' ? 'bg-green-200 text-green-900' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {move.type === 'in' ? 'Stock In 🌿' : 'Stock Out ❌'}: {move.quantity}
                    </span>
                    <span className="text-gray-500 text-xs">{move.date}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StockMovementsSection;
