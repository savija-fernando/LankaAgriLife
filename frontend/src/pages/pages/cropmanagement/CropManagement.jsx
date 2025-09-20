import { useState } from 'react';
import { Button } from '../../../components/components/ui/Button';
import { Card } from '../../../components/components/ui/Card';
//import { FaSeedling } from "react-icons/fa"; // For Plant Icon
import { Calendar } from 'lucide-react'; // For Calendar Icon
import { Search } from 'lucide-react';
import { TabToggleBar } from '../../../components/components/ui/TabToggleBar'; // Correct way to import named export
import FarmersSection from './FarmersSection';  // Import FarmersSection
import PlantsSection from './PlantsSection';  // Import PlantsSection
import HarvestSection from './HarvestSection'; // Import HarvestSection
//import { GiFarmer } from "react-icons/gi";

const CropManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [farmers, setFarmers] = useState([
    { id: 1, name: 'John Smith', email: 'john@farm.com', phone: '+1-555-0123', location: 'Field A', crops: 5, experience: '8 years' },
    { id: 2, name: 'Maria Garcia', email: 'maria@farm.com', phone: '+1-555-0124', location: 'Field B', crops: 3, experience: '5 years' },
    { id: 3, name: 'David Wilson', email: 'david@farm.com', phone: '+1-555-0125', location: 'Field C', crops: 7, experience: '12 years' },
  ]);

  const [plants, setPlants] = useState([
    { id: 1, name: 'Wheat', type: 'Cereal', plantedDate: '2023-05-01', harvestDate: '2023-09-01', quantity: '500kg' },
    { id: 2, name: 'Corn', type: 'Vegetable', plantedDate: '2023-06-10', harvestDate: '2023-10-15', quantity: '700kg' },
    { id: 3, name: 'Rice', type: 'Cereal', plantedDate: '2023-04-20', harvestDate: '2023-08-15', quantity: '600kg' },
  ]);

  const [harvests, setHarvests] = useState([
    { harvest_id: 1, type: 'Wheat', quantity: '200kg', harvestDate: '2023-09-01', note: 'First harvest of the season' },
    { harvest_id: 2, type: 'Corn', quantity: '300kg', harvestDate: '2023-10-15', note: 'Early harvest' },
  ]);

  const [activeTab, setActiveTab] = useState('farmers'); // Manage which tab is active

  const tabs = [
    { value: 'farmers', label: 'Farmers', icon: <GiFarmer className="w-5 h-5 text-green-600" /> },
    { value: 'plants', label: 'Plants', icon: <FaSeedling className="w-5 h-5 text-green-600" /> },
    { value: 'harvest', label: 'Harvest', icon: <Calendar className="w-5 h-5 text-green-600" /> }
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Crop Management</h2>
      </div>

      {/* Tab Toggle Bar with Icons side-by-side */}
      <div className="flex justify-center mb-6 space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`px-6 py-2 text-lg font-medium border-b-4 w-full focus:outline-none 
              ${activeTab === tab.value
              ? 'border-green-500 text-green-600' // Active tab style (underline + color change)
              : 'border-transparent text-gray-600 hover:text-green-600 hover:border-green-300'} 
              transition-colors duration-300 ease-in-out`} 
            onClick={() => setActiveTab(tab.value)}
          >
            {/* Render icon and label for each tab */}
            <div className="flex items-center justify-center gap-2">
              {tab.icon}
              {tab.label}
            </div>
          </button>
        ))}
      </div>

      {/* Search Bar */}
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

      {/* Conditional Rendering Based on Active Tab */}
      {activeTab === 'farmers' && <FarmersSection farmers={farmers} setFarmers={setFarmers} />}
      {activeTab === 'plants' && <PlantsSection plants={plants} setPlants={setPlants} />}
      {activeTab === 'harvest' && <HarvestSection harvests={harvests} setHarvests={setHarvests} />}
    </div>
  );
};

export default CropManagement;
