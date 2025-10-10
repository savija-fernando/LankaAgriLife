import React from 'react';
import { Card } from '../../../components/components/ui/Card';
import { FaDollarSign, FaMoneyBillWave, FaChartLine, FaHeartbeat, FaDownload } from 'react-icons/fa';

const RevenueAnalysisPage = ({ revenues }) => {
  // Safely calculate totals using Number() in case API returns strings
  const totalSales = revenues.reduce((acc, r) => acc + Number(r.salesData || 0), 0);
  const totalExpenses = revenues.reduce((acc, r) => acc + Number(r.expenseData || 0), 0);
  const totalProfit = revenues.reduce((acc, r) => acc + Number(r.profit || 0), 0);

  // Determine health status
  const businessHealth = totalProfit >= 0 ? 'Healthy' : 'Critical';
  const healthColor = totalProfit >= 0 ? 'text-green-700' : 'text-red-600';

  // Function to get record identifier - checks multiple possible field names
  const getRecordId = (record) => {
    // Check for common ID field names
    if (record.id) return record.id;
    if (record.revenue_id) return record.revenue_id;
    if (record.recordId) return record.recordId;
    if (record._id) return record._id;
    if (record.transactionId) return record.transactionId;
    
    // If no ID field found, generate a sequential number
    return 'N/A';
  };

  // Function to get record name/description if available
  const getRecordName = (record) => {
    if (record.name) return record.name;
    if (record.itemName) return record.itemName;
    if (record.description) return record.description;
    if (record.transactionName) return record.transactionName;
    return 'Revenue Record';
  };

  // Function to generate and download PDF report
  const downloadPDFReport = () => {
    const printWindow = window.open('', '_blank');
    const currentDate = new Date().toLocaleDateString();
    const profitPercentage = totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : 0;

    // Generate sequential numbers for records without IDs
    const revenuesWithIds = revenues.map((record, index) => ({
      ...record,
      displayId: getRecordId(record) !== 'N/A' ? getRecordId(record) : `REC-${index + 1}`,
      displayName: getRecordName(record)
    }));

    const reportContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Revenue Analysis Report</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 40px; 
            color: #333;
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px;
            border-bottom: 2px solid #059669;
            padding-bottom: 20px;
          }
          .header h1 { 
            color: #059669; 
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
            font-size: 20px;
            font-weight: bold;
            margin: 0;
            color: #1f2937;
          }
          .profit-positive { color: #059669; }
          .profit-negative { color: #dc2626; }
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
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 20px;
          }
          .metric-item {
            padding: 12px;
            border-radius: 8px;
            background: #f8fafc;
          }
          .metric-label {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .metric-value {
            font-size: 16px;
            font-weight: bold;
            color: #1f2937;
          }
          .health-status {
            padding: 15px;
            border-radius: 8px;
            background: ${totalProfit >= 0 ? '#f0fdf4' : '#fef2f2'};
            border: 1px solid ${totalProfit >= 0 ? '#bbf7d0' : '#fecaca'};
          }
          .health-title {
            font-weight: bold;
            color: ${totalProfit >= 0 ? '#059669' : '#dc2626'};
            margin-bottom: 8px;
          }
          .health-description {
            font-size: 14px;
            color: #6b7280;
          }
          .insights {
            background: #f0fdf4;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #bbf7d0;
            margin-top: 20px;
          }
          .insights h3 {
            color: #059669;
            margin: 0 0 10px 0;
            font-size: 16px;
          }
          .insights p {
            margin: 0;
            color: #374151;
            font-size: 14px;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            border-top: 1px solid #e5e7eb;
            padding-top: 15px;
          }
          .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            font-size: 14px;
          }
          .data-table th {
            background-color: #f3f4f6;
            text-align: left;
            padding: 10px;
            border: 1px solid #e5e7eb;
            font-weight: bold;
          }
          .data-table td {
            padding: 10px;
            border: 1px solid #e5e7eb;
          }
          .positive-profit { background-color: #f0fdf4; }
          .negative-profit { background-color: #fef2f2; }
          .text-right { text-align: right; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Revenue Analysis Report</h1>
          <p>Generated on ${currentDate}</p>
        </div>

        <div class="summary-cards">
          <div class="summary-card">
            <h3>Total Sales</h3>
            <p>Rs. ${totalSales.toLocaleString()}</p>
          </div>
          <div class="summary-card">
            <h3>Total Expenses</h3>
            <p>Rs. ${totalExpenses.toLocaleString()}</p>
          </div>
          <div class="summary-card">
            <h3>Total Profit</h3>
            <p class="${totalProfit >= 0 ? 'profit-positive' : 'profit-negative'}">
              Rs. ${totalProfit.toLocaleString()}
            </p>
          </div>
          <div class="summary-card">
            <h3>Profit Margin</h3>
            <p class="${totalProfit >= 0 ? 'profit-positive' : 'profit-negative'}">
              ${profitPercentage}%
            </p>
          </div>
        </div>

        <div class="section">
          <h2>Business Health Analysis</h2>
          <div class="health-status">
            <div class="health-title">Status: ${businessHealth}</div>
            <div class="health-description">
              ${totalProfit >= 0 
                ? 'Your business is generating positive profits, indicating healthy financial operations.' 
                : 'Your business is currently operating at a loss. Consider reviewing expenses and optimizing sales strategies.'
              }
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Financial Metrics</h2>
          <div class="metrics-grid">
            <div class="metric-item">
              <div class="metric-label">Sales to Expense Ratio</div>
              <div class="metric-value">${totalExpenses > 0 ? (totalSales / totalExpenses).toFixed(2) : 'N/A'}</div>
            </div>
            <div class="metric-item">
              <div class="metric-label">Profit Margin</div>
              <div class="metric-value">${profitPercentage}%</div>
            </div>
            <div class="metric-item">
              <div class="metric-label">Number of Records</div>
              <div class="metric-value">${revenues.length}</div>
            </div>
            <div class="metric-item">
              <div class="metric-label">Average Profit per Record</div>
              <div class="metric-value">Rs. ${revenues.length > 0 ? (totalProfit / revenues.length).toFixed(2) : '0'}</div>
            </div>
          </div>
        </div>

        ${revenues.length > 0 ? `
          <div class="section">
            <h2>Detailed Revenue Data</h2>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Record ID</th>
                  <th>Description</th>
                  <th class="text-right">Sales (Rs.)</th>
                  <th class="text-right">Expenses (Rs.)</th>
                  <th class="text-right">Profit (Rs.)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${revenuesWithIds.map(rev => `
                  <tr class="${Number(rev.profit || 0) >= 0 ? 'positive-profit' : 'negative-profit'}">
                    <td>${rev.displayId}</td>
                    <td>${rev.displayName}</td>
                    <td class="text-right">${Number(rev.salesData || 0).toLocaleString()}</td>
                    <td class="text-right">${Number(rev.expenseData || 0).toLocaleString()}</td>
                    <td class="text-right">${Number(rev.profit || 0).toLocaleString()}</td>
                    <td>${Number(rev.profit || 0) >= 0 ? 'Profitable' : 'Loss'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}

        <div class="insights">
          <h3>Key Insights</h3>
          <p>
            ${totalProfit >= 0 
              ? 'Positive profits indicate healthy operations. Continue monitoring your expenses and exploring opportunities for growth.' 
              : 'Negative profits suggest the need for immediate attention. Review your expense structure, optimize pricing strategies, and identify cost-saving opportunities.'
            }
            ${revenues.length === 0 ? ' No revenue records found for analysis.' : ''}
          </p>
        </div>

        <div class="footer">
          <p>Revenue Analysis Report | Generated on ${currentDate} | ${revenues.length} records analyzed</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(reportContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  // Reusable metric card
  const metricCard = (title, value, color, Icon) => (
    <Card className="flex-1 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-green-50 to-white border border-green-200 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-600">{title}</h4>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </Card>
  );

  // Debug: Log the revenue data structure to console to see available fields
  React.useEffect(() => {
    if (revenues.length > 0) {
      console.log('Revenue data structure:', revenues[0]);
      console.log('Available fields:', Object.keys(revenues[0]));
    }
  }, [revenues]);

  return (
    <div className="space-y-8">
      {/* Header with Download Button */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-4xl font-semibold text-green-800 tracking-wide">Revenue Dashboard</h3>
          <p className="text-gray-600 max-w-2xl">
            Monitor your business revenue and financial health at a glance. This dashboard provides a
            real-time overview of sales, expenses, profits, and overall business performance.
          </p>
        </div>
        <button
          onClick={downloadPDFReport}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-semibold"
        >
          <FaDownload className="w-5 h-5" />
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCard('Total Sales', `Rs.${totalSales.toLocaleString()}`, 'text-green-600', FaDollarSign)}
        {metricCard('Total Expenses', `Rs.${totalExpenses.toLocaleString()}`, 'text-red-500', FaMoneyBillWave)}
        {metricCard('Total Profit', `Rs.${totalProfit.toLocaleString()}`, healthColor, FaChartLine)}
        {metricCard('Business Health', businessHealth, healthColor, FaHeartbeat)}
      </div>

      <Card className="p-6 rounded-2xl shadow-xl bg-green-50 border border-green-200">
        <h4 className="text-xl font-semibold text-green-800 mb-2">Insights</h4>
        <p className="text-gray-700">
          {totalProfit >= 0 
            ? 'Positive profits indicate healthy operations. Continue to monitor your financial metrics and explore growth opportunities.' 
            : 'Negative profits suggest the need for immediate attention. Review your expense structure, optimize pricing strategies, and identify cost-saving opportunities to return to profitability.'
          }
        </p>
      </Card>

      {/* Additional Financial Metrics Section */}
      {revenues.length > 0 && (
        <Card className="p-6 rounded-2xl shadow-xl bg-white border border-gray-200">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Detailed Financial Metrics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Profit Margin</p>
              <p className="text-2xl font-bold text-blue-700">
                {totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(1) : 0}%
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Sales/Expense Ratio</p>
              <p className="text-2xl font-bold text-purple-700">
                {totalExpenses > 0 ? (totalSales / totalExpenses).toFixed(2) : 'N/A'}
              </p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600">Records Analyzed</p>
              <p className="text-2xl font-bold text-orange-700">{revenues.length}</p>
            </div>
            <div className="text-center p-4 bg-teal-50 rounded-lg">
              <p className="text-sm text-gray-600">Avg Profit/Record</p>
              <p className="text-2xl font-bold text-teal-700">
                Rs.{revenues.length > 0 ? (totalProfit / revenues.length).toFixed(2) : '0'}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RevenueAnalysisPage;