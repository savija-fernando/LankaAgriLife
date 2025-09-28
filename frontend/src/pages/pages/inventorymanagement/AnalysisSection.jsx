import React from "react";
import { Card } from "../../../components/components/ui/Card";

const AnalysisSection = ({ items = [] }) => {
  // ✅ Guard with default empty array
  const totalStock =
    items.length > 0
      ? items.reduce((acc, inv) => acc + Number(inv.stockLevel || 0), 0)
      : 0;

  // Low stock: below or equal to threshold
  const lowStockItems = items.filter(
    (inv) => Number(inv.stockLevel) <= Number(inv.threshold || 0)
  );

  // High stock: more than 100
  const highStockItems = items.filter((inv) => Number(inv.stockLevel) > 100);

  const averageStock =
    items.length > 0 ? (totalStock / items.length).toFixed(1) : 0;

  return (
    <div>
      <h2 className="text-3xl font-semibold text-green-700 font-serif mb-6">
        Inventory Analysis
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-blue-100 p-6 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold">Total Stock</h3>
          <p className="text-3xl font-bold mt-2">{totalStock} units</p>
        </Card>
        <Card className="bg-red-100 p-6 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold">Low Stock Items</h3>
          <p className="text-3xl font-bold mt-2">{lowStockItems.length}</p>
        </Card>
        <Card className="bg-green-100 p-6 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold">High Stock Items</h3>
          <p className="text-3xl font-bold mt-2">{highStockItems.length}</p>
        </Card>
        <Card className="bg-yellow-100 p-6 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold">Average Stock</h3>
          <p className="text-3xl font-bold mt-2">{averageStock} units</p>
        </Card>
      </div>

      {/* Low and High Stock Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Low Stock */}
        <Card className="p-6 shadow-md rounded-xl">
          <h3 className="text-xl font-bold mb-4 text-red-600">Low Stock Items</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {lowStockItems.length === 0 ? (
              <p className="text-gray-500 text-sm">No low stock items.</p>
            ) : (
              lowStockItems.map((inv) => (
                <div key={inv.inventory_id} className="flex flex-col">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{inv.itemName}</span>
                    <span>{inv.stockLevel} units</span>
                  </div>
                  <div className="w-full bg-red-200 h-2 rounded-full mt-1">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (Number(inv.stockLevel) /
                            Number(inv.threshold || 1)) *
                            100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* High Stock */}
        <Card className="p-6 shadow-md rounded-xl">
          <h3 className="text-xl font-bold mb-4 text-green-600">
            High Stock Items
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {highStockItems.length === 0 ? (
              <p className="text-gray-500 text-sm">No high stock items.</p>
            ) : (
              highStockItems.map((inv) => (
                <div key={inv.inventory_id} className="flex flex-col">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{inv.itemName}</span>
                    <span>{inv.stockLevel} units</span>
                  </div>
                  <div className="w-full bg-green-200 h-2 rounded-full mt-1">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (Number(inv.stockLevel) / 500) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisSection;
