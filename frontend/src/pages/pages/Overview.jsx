import StatsCard from "../../components/components/StatsCard";
import RevenueForm from "../../components/components/RevenueForm";
import QuickActions from "../../components/components/QuickActions";

function Overview({ transactions, addTransaction }) {
  const totalRevenue = transactions
    .filter((t) => t.type === "revenue")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const netProfit = totalRevenue + totalIncome - totalExpenses;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <StatsCard title="Total Revenue" value={totalRevenue} color="green" />
        <StatsCard title="Total Income" value={totalIncome} color="yellow" />
        <StatsCard title="Total Expenses" value={totalExpenses} color="red" />
        <StatsCard title="Net Profit" value={netProfit} color="green" />
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <RevenueForm onAdd={addTransaction} />
        <QuickActions />
      </div>
    </div>
  );
}

export default Overview;
