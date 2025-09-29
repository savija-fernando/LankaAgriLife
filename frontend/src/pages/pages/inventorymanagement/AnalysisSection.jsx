import React from "react";
import { Card } from "../../../components/components/ui/Card";

const AnalysisSection = ({ items = [] }) => {
  const totalStock =
    items.length > 0
      ? items.reduce((acc, inv) => acc + Number(inv.stockLevel || 0), 0)
      : 0;

  const lowStockItems = items.filter(
    (inv) => Number(inv.stockLevel) <= Number(inv.threshold || 0)
  );

  const highStockItems = items.filter((inv) => Number(inv.stockLevel) > 100);

  const averageStock =
    items.length > 0 ? (totalStock / items.length).toFixed(1) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-gray-800 font-serif bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Inventory Analysis
        </h2>
        <p className="text-gray-600 text-lg">Real-time stock overview and insights</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group p-6 rounded-2xl shadow-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                Total Stock
              </h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{totalStock.toLocaleString()} units</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <span className="text-sm font-semibold text-blue-700">Total</span>
            </div>
          </div>
        </Card>

        <Card className="group p-6 rounded-2xl shadow-lg border border-red-100 bg-gradient-to-br from-red-50 to-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wide">Low Stock</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{lowStockItems.length}</p>
              <p className="text-xs text-red-600 mt-1">Items need attention</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <span className="text-sm font-semibold text-red-700">Low</span>
            </div>
          </div>
        </Card>

        <Card className="group p-6 rounded-2xl shadow-lg border border-green-100 bg-gradient-to-br from-green-50 to-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide">High Stock</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{highStockItems.length}</p>
              <p className="text-xs text-green-600 mt-1">Well stocked</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <span className="text-sm font-semibold text-green-700">High</span>
            </div>
          </div>
        </Card>

        <Card className="group p-6 rounded-2xl shadow-lg border border-yellow-100 bg-gradient-to-br from-yellow-50 to-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">Average Stock</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{averageStock} units</p>
              <p className="text-xs text-yellow-600 mt-1">Per item</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
              <span className="text-sm font-semibold text-yellow-700">Avg</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Low and High Stock Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Low Stock */}
        <Card className="p-6 shadow-lg rounded-2xl border border-red-50 bg-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-red-700">Low</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Low Stock Items</h3>
              <p className="text-sm text-red-600">Items below threshold</p>
            </div>
            <div className="ml-auto bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
              {lowStockItems.length}
            </div>
          </div>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {lowStockItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-sm font-semibold text-green-700">OK</span>
                </div>
                <p className="text-gray-500 font-medium">All items are well stocked!</p>
                <p className="text-gray-400 text-sm mt-1">No low stock items found</p>
              </div>
            ) : (
              lowStockItems.map((inv) => (
                <div
                  key={inv.inventory_id}
                  className="group p-4 rounded-xl border border-red-100 hover:border-red-300 transition-colors bg-red-50/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-800">{inv.itemName}</span>
                    <span className="text-red-700 font-bold">{inv.stockLevel} units</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>Threshold: {inv.threshold || 0} units</span>
                    <span className="text-red-600 font-semibold">
                      {Math.max(0, (inv.threshold || 0) - inv.stockLevel)} units needed
                    </span>
                  </div>
                  <div className="w-full bg-red-200 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (Number(inv.stockLevel) / Number(inv.threshold || 1)) * 100,
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
        <Card className="p-6 shadow-lg rounded-2xl border border-green-50 bg-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-green-700">High</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">High Stock Items</h3>
              <p className="text-sm text-green-600">Items above 100 units</p>
            </div>
            <div className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              {highStockItems.length}
            </div>
          </div>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {highStockItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-sm font-semibold text-blue-700">OK</span>
                </div>
                <p className="text-gray-500 font-medium">No high stock items</p>
                <p className="text-gray-400 text-sm mt-1">All items are within normal range</p>
              </div>
            ) : (
              highStockItems.map((inv) => (
                <div
                  key={inv.inventory_id}
                  className="group p-4 rounded-xl border border-green-100 hover:border-green-300 transition-colors bg-green-50/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-800">{inv.itemName}</span>
                    <span className="text-green-700 font-bold">{inv.stockLevel} units</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    <span>Well above minimum threshold</span>
                  </div>
                  <div className="w-full bg-green-200 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((Number(inv.stockLevel) / 500) * 100, 100)}%`,
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
