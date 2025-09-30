import Card from "../../components/components/Card";
import RecentActivities from "../../components/components/RecentActivities";
import PerformanceCard from "../../components/components/PerformanceCard";
import WeatherCard from "../../components/WeatherWidget";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening on your farm today.</p>
          </div>
          <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700 font-medium">Live updates</span>
          </div>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="transform hover:scale-105 transition-all duration-300 hover:rotate-1">
          <Card 
            title="Active Crops" 
            value="24" 
            sub="+3 from last month"
            className="bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg hover:shadow-2xl border-0"
            icon="🌱"
          />
        </div>
        <div className="transform hover:scale-105 transition-all duration-300 hover:-rotate-1">
          <Card 
            title="Compost Batches" 
            value="8" 
            sub="2 in progress"
            className="bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg hover:shadow-2xl border-0"
            icon="🔄"
          />
        </div>
        <div className="transform hover:scale-105 transition-all duration-300 hover:rotate-1">
          <Card 
            title="Livestock" 
            value="156" 
            sub="+12 this quarter"
            className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-lg hover:shadow-2xl border-0"
            icon="🐄"
          />
        </div>
        <div className="transform hover:scale-105 transition-all duration-300 hover:-rotate-1">
          <Card 
            title="Monthly Revenue" 
            value="Rs.24,580" 
            sub="+18% from last month"
            className="bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-lg hover:shadow-2xl border-0"
            icon="💰"
          />
        </div>
        <div className="transform hover:scale-105 transition-all duration-300 hover:rotate-1">
          <Card 
            title="Inventory Items" 
            value="89" 
            sub="5 low stock alerts"
            className="bg-gradient-to-br from-red-400 to-rose-500 text-white shadow-lg hover:shadow-2xl border-0"
            icon="📦"
          />
        </div>
      </div>

      {/* Middle Section with Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/60 p-6 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Recent Activities
              </h2>
              <button className="text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300">
                View All
              </button>
            </div>
            <RecentActivities />
          </div>
        </div>

        {/* Quick Stats */}
       <div className="space-y-6">
          {/* Live Weather */}
          <WeatherCard />

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/60 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
              <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                3 new
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-700 font-medium">Watering scheduled in 2 hours</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 font-medium">Compost batch #5 ready for review</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700 font-medium">New equipment maintenance due</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="transform hover:scale-105 transition-all duration-300 hover:rotate-1">
          <PerformanceCard 
            title="Crop Yield" 
            value="92%" 
            sub="Of expected yield"
            trend="up"
            className="bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 text-white shadow-xl hover:shadow-2xl border-0"
            icon="📈"
          />
        </div>
        <div className="transform hover:scale-105 transition-all duration-300 hover:-rotate-1">
          <PerformanceCard 
            title="Compost Quality" 
            value="85%" 
            sub="Quality rating"
            trend="up"
            className="bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 text-white shadow-xl hover:shadow-2xl border-0"
            icon="⭐"
          />
        </div>
        <div className="transform hover:scale-105 transition-all duration-300 hover:rotate-1">
          <PerformanceCard 
            title="Profit Margin" 
            value="68%" 
            sub="This quarter"
            trend="up"
            className="bg-gradient-to-br from-blue-400 via-indigo-500 to-blue-600 text-white shadow-xl hover:shadow-2xl border-0"
            icon="💹"
          />
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl p-4 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-2xl font-bold">98%</div>
          <div className="text-sm opacity-90">Soil Health</div>
        </div>
        <div className="bg-gradient-to-br from-rose-400 to-red-500 rounded-2xl p-4 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-2xl font-bold">24/7</div>
          <div className="text-sm opacity-90">Farm Monitoring</div>
        </div>
        <div className="bg-gradient-to-br from-sky-400 to-cyan-500 rounded-2xl p-4 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-2xl font-bold">15</div>
          <div className="text-sm opacity-90">Active Workers</div>
        </div>
        <div className="bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl p-4 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-2xl font-bold">100%</div>
          <div className="text-sm opacity-90">Organic Certified</div>
        </div>
      </div>
    </div>
  );
}