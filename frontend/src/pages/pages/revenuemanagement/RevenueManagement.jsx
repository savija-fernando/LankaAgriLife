import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/components/ui/Button';
import { PlusCircle, Search } from 'lucide-react';
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

  const tabs = [
    { value: 'entries', label: 'Revenue Entries', icon: <FaMoneyBillWave className="w-5 h-5 text-green-600" /> },
    { value: 'supervisors', label: 'Revenue Supervisors', icon: <FaUserTie className="w-5 h-5 text-green-600" /> },
    { value: 'analysis', label: 'Revenue Analysis', icon: <FaChartBar className="w-5 h-5 text-green-600" /> },
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-700 flex items-center gap-2">📊 Revenue Management</h2>
        <Button
          onClick={() => setActiveTab('entries')}
          className="flex items-center gap-2 bg-green-700 text-white hover:bg-green-600 rounded-full px-4 py-2"
        >
          <PlusCircle className="w-5 h-5" /> Add Revenue
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-6">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-6 py-2 text-lg font-medium border-b-4 w-full focus:outline-none
              ${activeTab === tab.value
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-600 hover:text-green-600 hover:border-green-300'}
              transition-colors duration-300 ease-in-out flex items-center justify-center gap-2`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      {(activeTab === 'entries' || activeTab === 'supervisors') && (
        <div className="relative flex-1 max-w-md mb-6 z-10">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      )}

      {/* Tab Content */}
      {activeTab === 'entries' && (
        <RevenueEntriesSection
          revenues={revenues}
          setRevenues={setRevenues}
          refreshRevenues={fetchRevenues}   // allow child to trigger refetch
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
  );
};

export default RevenueManagement;
