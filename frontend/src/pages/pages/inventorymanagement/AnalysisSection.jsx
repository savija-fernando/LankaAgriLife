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

  // Function to generate and download PDF report
  const downloadPDFReport = () => {
    // Create a new window for PDF content
    const printWindow = window.open('', '_blank');
    
    // Get current date for the report
    const currentDate = new Date().toLocaleDateString();
    
    // Generate report content
    const reportContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Inventory Analysis Report</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 40px; 
            color: #333;
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px;
            border-bottom: 2px solid #10b981;
            padding-bottom: 20px;
          }
          .header h1 { 
            color: #10b981; 
            margin: 0;
            font-size: 28px;
          }
          .header p { 
            color: #666; 
            margin: 5px 0 0 0;
          }
          .summary-cards {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 30px;
          }
          .summary-card {
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 15px;
            background: #f9fafb;
          }
          .summary-card h3 {
            font-size: 12px;
            color: #6b7280;
            margin: 0 0 5px 0;
            text-transform: uppercase;
          }
          .summary-card p {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
            color: #1f2937;
          }
          .section {
            margin-bottom: 25px;
          }
          .section h2 {
            color: #374151;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 8px;
            margin-bottom: 15px;
            font-size: 18px;
          }
          .item-list {
            width: 100%;
            border-collapse: collapse;
          }
          .item-list th {
            background-color: #f3f4f6;
            text-align: left;
            padding: 10px;
            border: 1px solid #e5e7eb;
            font-weight: bold;
          }
          .item-list td {
            padding: 10px;
            border: 1px solid #e5e7eb;
          }
          .low-stock { background-color: #fef2f2; }
          .high-stock { background-color: #f0fdf4; }
          .no-items {
            text-align: center;
            color: #6b7280;
            font-style: italic;
            padding: 20px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            border-top: 1px solid #e5e7eb;
            padding-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Inventory Analysis Report</h1>
          <p>Generated on ${currentDate}</p>
        </div>

        <div class="summary-cards">
          <div class="summary-card">
            <h3>Total Stock</h3>
            <p>${totalStock.toLocaleString()} units</p>
          </div>
          <div class="summary-card">
            <h3>Low Stock Items</h3>
            <p>${lowStockItems.length}</p>
          </div>
          <div class="summary-card">
            <h3>High Stock Items</h3>
            <p>${highStockItems.length}</p>
          </div>
          <div class="summary-card">
            <h3>Average Stock</h3>
            <p>${averageStock} units</p>
          </div>
        </div>

        <div class="section">
          <h2>Low Stock Items (Below Threshold)</h2>
          ${
            lowStockItems.length === 0 
              ? '<div class="no-items">No low stock items - All items are well stocked!</div>'
              : `
                <table class="item-list">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Current Stock</th>
                      <th>Threshold</th>
                      <th>Units Needed</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${lowStockItems.map(item => `
                      <tr class="low-stock">
                        <td>${item.itemName || 'N/A'}</td>
                        <td>${item.stockLevel} units</td>
                        <td>${item.threshold || 0} units</td>
                        <td>${Math.max(0, (item.threshold || 0) - item.stockLevel)} units</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              `
          }
        </div>

        <div class="section">
          <h2>High Stock Items (Above 100 units)</h2>
          ${
            highStockItems.length === 0 
              ? '<div class="no-items">No high stock items - All items are within normal range</div>'
              : `
                <table class="item-list">
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Current Stock</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${highStockItems.map(item => `
                      <tr class="high-stock">
                        <td>${item.itemName || 'N/A'}</td>
                        <td>${item.stockLevel} units</td>
                        <td>Well above minimum threshold</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              `
          }
        </div>

        <div class="footer">
          <p>Inventory Management System Report | Generated on ${currentDate}</p>
        </div>
      </body>
      </html>
    `;

    // Write content and trigger print
    printWindow.document.write(reportContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    setTimeout(() => {
      printWindow.print();
      // Optional: Close window after print dialog closes
      // printWindow.close();
    }, 250);
  };

  return (
    <div className="space-y-8">
      {/* Header with Download Button */}
      <div className="text-center space-y-4">
        <div className="flex justify-between items-center">
          <div></div> {/* Empty div for spacing */}
          <div className="text-center space-y-2 flex-1">
            <h2 className="text-4xl font-bold text-gray-800 font-serif bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Inventory Analysis
            </h2>
            <p className="text-gray-600 text-lg">Real-time stock overview and insights</p>
          </div>
          <button
            onClick={downloadPDFReport}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Report
          </button>
        </div>
      </div>

      {/* Rest of your existing JSX remains the same */}
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