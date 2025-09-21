import React, { useState } from 'react';
import { FaHorse } from 'react-icons/fa';
import { GiFarmer, GiMilkCarton } from 'react-icons/gi';
import { Calendar } from 'lucide-react';
import { Search } from 'lucide-react';
import { Button } from '../../../components/components/ui/Button';
import { Card } from '../../../components/components/ui/Card'
import AnimalsSection from './AnimalsSection';
import HandlersSection from './HandlersSection';
import ProductsSection from './ProductsSection';

const LivestockManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animals, setAnimals] = useState([
    { animal_id: 1, species: 'Cow', breedingDetails: 'Artificial Insemination', feedingData: 'Grass + Supplements', healthRecord: 'Vaccinated, Dewormed', dateOfBirth: '2021-03-15' },
    { animal_id: 2, species: 'Goat', breedingDetails: 'Natural', feedingData: 'Leaves + Hay', healthRecord: 'Regular Checkups', dateOfBirth: '2022-06-10' }
  ]);

  const [handlers, setHandlers] = useState([
    { handler_id: 1, firstName: 'Alice', lastName: 'Brown', password: 'pass123', email: 'alice@farm.com', contact_No: '+1-555-1001' },
    { handler_id: 2, firstName: 'Bob', lastName: 'Green', password: 'pass456', email: 'bob@farm.com', contact_No: '+1-555-1002' }
  ]);

  const [products, setProducts] = useState([
    { product_id: 1, storageDetails: 'Cold Storage', type: 'Milk', quantity: '200L', CollectionDate: '2023-08-15', processedStatus: 'Processed' },
    { product_id: 2, storageDetails: 'Dry Storage', type: 'Wool', quantity: '50kg', CollectionDate: '2023-07-20', processedStatus: 'Unprocessed' }
  ]);

  const [activeTab, setActiveTab] = useState('animals');

  const tabs = [
    { value: 'animals', label: 'Animals', icon: <FaHorse className="w-5 h-5 text-green-600" /> },
    { value: 'handlers', label: 'Handlers', icon: <GiFarmer className="w-5 h-5 text-green-600" /> },
    { value: 'products', label: 'Products', icon: <GiMilkCarton className="w-5 h-5 text-green-600" /> }
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Livestock Management</h2>
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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      {/* Sections */}
      {activeTab === 'animals' && <AnimalsSection animals={animals} setAnimals={setAnimals} />}
      {activeTab === 'handlers' && <HandlersSection handlers={handlers} setHandlers={setHandlers} />}
      {activeTab === 'products' && <ProductsSection products={products} setProducts={setProducts} />}
    </div>
  );
};

export default LivestockManagement;
