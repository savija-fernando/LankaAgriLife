import React from 'react';
import { Card } from '../../../components/components/ui/Card';
import { FaDollarSign, FaMoneyBillWave, FaChartLine, FaHeartbeat } from 'react-icons/fa';

const RevenueAnalysisPage = ({ revenues }) => {
  // Safely calculate totals using Number() in case API returns strings
  const totalSales = revenues.reduce((acc, r) => acc + Number(r.salesData || 0), 0);
  const totalExpenses = revenues.reduce((acc, r) => acc + Number(r.expenseData || 0), 0);
  const totalProfit = revenues.reduce((acc, r) => acc + Number(r.profit || 0), 0);

  // Determine health status
  const businessHealth = totalProfit >= 0 ? 'Healthy' : 'Critical';
  const healthColor = totalProfit >= 0 ? 'text-green-700' : 'text-red-600';

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

  return (
    <div className="space-y-8">
      <h3 className="text-4xl font-semibold text-green-800 tracking-wide">Revenue Dashboard</h3>
      <p className="text-gray-600 max-w-2xl">
        Monitor your business revenue and financial health at a glance. This dashboard provides a
        real-time overview of sales, expenses, profits, and overall business performance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCard('Total Sales', `Rs.${totalSales.toLocaleString()}`, 'text-green-600', FaDollarSign)}
        {metricCard('Total Expenses', `Rs.${totalExpenses.toLocaleString()}`, 'text-red-500', FaMoneyBillWave)}
        {metricCard('Total Profit', `Rs.${totalProfit.toLocaleString()}`, healthColor, FaChartLine)}
        {metricCard('Business Health', businessHealth, healthColor, FaHeartbeat)}
      </div>

      <Card className="p-6 rounded-2xl shadow-xl bg-green-50 border border-green-200">
        <h4 className="text-xl font-semibold text-green-800 mb-2">Insights</h4>
        <p className="text-gray-700">
          Positive profits indicate healthy operations. If the profit is negative, it may be time to
          review expenses, optimize your sales strategy, or find areas to cut costs.
        </p>
      </Card>
    </div>
  );
};

export default RevenueAnalysisPage;
