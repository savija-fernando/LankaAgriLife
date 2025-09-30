import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/components/ui/Button';
import { PlusCircle, Search, TrendingUp, Users, FileText } from 'lucide-react';
import { FaMoneyBillWave, FaUserTie, FaChartBar } from 'react-icons/fa';
import RevenueEntriesSection from './RevenueEntriesSection';
import RevenueSupervisorsSection from './RevenueSupervisorsSection';
import RevenueAnalysisPage from './RevenueAnalysisPage';
import { getAllRevenue } from '../../../api/revenueAPI';

const RevenueManagement = () => {
  const [activeTab, setActiveTab] = useState('entries');
  const [searchTerm, setSearchTerm] = useState('');

  // ---- Shared State ----
  const [revenues, setRevenues] = useState([]);
  const [supervisors, setSupervisors] = useState([
    { rsupervisor_id: 1, first_name: 'John', last_name: 'Doe', email: 'john@rev.com', password: 'pass123', contact: '+123456' },
    { rsupervisor_id: 2, first_name: 'Maria', last_name: 'Smith', email: 'maria@rev.com', password: 'pass456', contact: '+123457' },
  ]);

  // Load revenues from API once and whenever refresh is requested
  const fetchRevenues = async () => {
    try {
      const res = await getAllRevenue();
      setRevenues(res.data || []);
    } catch (err) {
      console.error('Error fetching revenues:', err);
    }
  };

  useEffect(() => {
    fetchRevenues();
  }, []);

  // Calculate stats for the header
  const totalRevenue = revenues.reduce((sum, revenue) => sum + (revenue.amount || 0), 0);
  const totalEntries = revenues.length;
  const activeSupervisors = supervisors.length;

  const tabs = [
    { value: 'entries', label: 'Revenue Entries', icon: <FaMoneyBillWave className="w-5 h-5" />, count: totalEntries },
    { value: 'supervisors', label: 'Supervisors', icon: <FaUserTie className="w-5 h-5" />, count: activeSupervisors },
    { value: 'analysis', label: 'Analytics', icon: <FaChartBar className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Revenue Management</h1>
                  <p className="text-gray-600 mt-1">Manage revenue streams and financial analytics</p>
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => setActiveTab('entries')}
              className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-5 h-5" /> 
              Add Revenue Entry
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    ${totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <FaMoneyBillWave className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Entries</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {totalEntries.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Supervisors</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {activeSupervisors}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Enhanced Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex flex-col sm:flex-row">
              {tabs.map(tab => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 text-lg font-semibold transition-all duration-300 relative group
                    ${activeTab === tab.value
                      ? 'text-green-700 bg-green-50 border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'}
                  `}
                >
                  <div className={`p-2 rounded-lg transition-colors ${
                    activeTab === tab.value ? 'bg-green-100' : 'bg-gray-100 group-hover:bg-green-100'
                  }`}>
                    {tab.icon}
                  </div>
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      activeTab === tab.value 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                  
                  {/* Active indicator */}
                  {activeTab === tab.value && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          {(activeTab === 'entries' || activeTab === 'supervisors') && (
            <div className="px-6 pt-6">
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'entries' ? 'revenue entries' : 'supervisors'}...`}
                  className="block w-full pl-10 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'entries' && (
              <RevenueEntriesSection
                revenues={revenues}
                setRevenues={setRevenues}
                refreshRevenues={fetchRevenues}
                searchTerm={searchTerm}
              />
            )}

            {activeTab === 'supervisors' && (
              <RevenueSupervisorsSection
                supervisors={supervisors}
                setSupervisors={setSupervisors}
                searchTerm={searchTerm}
              />
            )}

            {activeTab === 'analysis' && (
              <RevenueAnalysisPage revenues={revenues} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueManagement;