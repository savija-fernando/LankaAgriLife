import Card from "../../components/components/Card";
import QuickActions from "../../components/components/QuickActions";
import RecentActivities from "../../components/components/RecentActivities";
import PerformanceCard from "../../components/components/PerformanceCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Welcome back! Here’s what’s happening on your farm today.</p>

      {/* Top Summary */}
      <div className="grid grid-cols-5 gap-4">
        <Card title="Active Crops" value="24" sub="+3 from last month" />
        <Card title="Compost Batches" value="8" sub="2 in progress" />
        <Card title="Livestock" value="156" sub="+12 this quarter" />
        <Card title="Monthly Revenue" value="$24,580" sub="+18% from last month" />
        <Card title="Inventory Items" value="89" sub="5 low stock alerts" />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-2 gap-6">
        <RecentActivities />
        <QuickActions />
      </div>

      {/* Farm Performance */}
      <div className="grid grid-cols-3 gap-4">
        <PerformanceCard title="Crop Yield" value="92%" sub="Of expected yield" />
        <PerformanceCard title="Compost Quality" value="85%" sub="Quality rating" />
        <PerformanceCard title="Profit Margin" value="68%" sub="This quarter" />
      </div>
    </div>
  );
}
