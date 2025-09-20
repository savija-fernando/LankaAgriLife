import { useState } from 'react';
import { Button } from '../../../components/components/ui/Button';
import { Card } from '../../../components/components/ui/Card';
import { Search } from 'lucide-react';
//import { MdOutlinePeopleAlt } from "react-icons/md"; 
import CompostSection from './CompostSection';
import CompostHandlerSection from './CompostHandlerSection';
import WasteSection from './WasteSection';
//import { MdCompost } from "react-icons/md";
//import { GiPlantWatering } from "react-icons/gi";

const CompostManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Compost State
  const [composts, setComposts] = useState([
    {
      compost_id: 1,
      quantity: 200,
      fermentingDate: '2023-08-15',
      employee_id: 'EMP001',
      waste_id: 1,
      inventory_id: 'INV100',
      compostStatus: 'Fermenting',
    },
  ]);

  // Compost Handlers State
  const [handlers, setHandlers] = useState([
    {
      CompostHandler_id: 1,
      f_name: 'Alice',
      l_name: 'Brown',
      loginCredentials: 'alice123',
      email: 'alice@farm.com',
      contact_No: 123456789,
    },
  ]);

  // Waste State
  const [wastes, setWastes] = useState([
    {
      waste_id: 1,
      quantity: 500,
      type: 'Organic',
      date: '2023-08-10',
    },
  ]);

  const [activeTab, setActiveTab] = useState('compost');

  const tabs = [
    { value: 'compost', label: 'Compost', icon: <GiPlantWatering className="w-5 h-5 text-green-600" /> },
    { value: 'handlers', label: 'Handlers', icon: <MdOutlinePeopleAlt className="w-5 h-5 text-green-600" /> },
    { value: 'waste', label: 'Waste', icon: <MdCompost className="w-5 h-5 text-green-600" /> },
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Compost Management</h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6 space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`px-6 py-2 text-lg font-medium border-b-4 w-full focus:outline-none 
              ${activeTab === tab.value
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-600 hover:text-green-600 hover:border-green-300'} 
              transition-colors duration-300 ease-in-out`} 
            onClick={() => setActiveTab(tab.value)}
          >
            <div className="flex items-center justify-center gap-2">
              {tab.icon}
              {tab.label}
            </div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-md mb-6 z-10">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
        />
      </div>

      {/* Conditional Rendering */}
      {activeTab === 'compost' && <CompostSection composts={composts} setComposts={setComposts} />}
      {activeTab === 'handlers' && <CompostHandlerSection handlers={handlers} setHandlers={setHandlers} />}
      {activeTab === 'waste' && <WasteSection wastes={wastes} setWastes={setWastes} />}
    </div>
  );
};

export default CompostManagement;
