import React, { useState } from 'react';
import { Card } from '../../../components/components/ui/Card';
import { Button } from '../../../components/components/ui/Button';
import { Input } from '../../../components/components/ui/Input';
import { Edit, PlusCircle } from 'lucide-react';
//import { GiFertilizerBag } from "react-icons/gi";


const CompostSection = ({ composts, setComposts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCompost, setCurrentCompost] = useState({
    compost_id: '',
    quantity: '',
    fermentingDate: '',
    employee_id: '',
    waste_id: '',
    inventory_id: '',
    compostStatus: '',
  });

  // Handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCompost((prev) => ({ ...prev, [name]: value }));
  };

  // Add/Edit compost
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCompost.compost_id) {
      setComposts(
        composts.map((c) => (c.compost_id === currentCompost.compost_id ? currentCompost : c))
      );
    } else {
      setComposts([...composts, { ...currentCompost, compost_id: composts.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (id) => {
    const compost = composts.find((c) => c.compost_id === id);
    setCurrentCompost(compost);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-green-700 font-serif flex items-center gap-2">
          <GiFertilizerBag className="w-8 h-8 text-green-600" />
          Compost
        </h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-green-700 text-white hover:bg-green-600 rounded-full px-4 py-2">
          <PlusCircle className="w-5 h-5" /> Add Compost
        </Button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {composts.map((c) => (
          <Card key={c.compost_id} className="relative bg-green-50 shadow-lg rounded-lg p-6 border-b-2 border-green-300">
            <div className="absolute top-4 right-6 text-green-600 cursor-pointer hover:text-green-800">
              <Edit onClick={() => handleEdit(c.compost_id)} className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">Compost #{c.compost_id}</h3>
            <p><strong>Quantity:</strong> {c.quantity}</p>
            <p><strong>Fermenting Date:</strong> {c.fermentingDate}</p>
            <p><strong>Status:</strong> {c.compostStatus}</p>
            <p><strong>Employee ID:</strong> {c.employee_id}</p>
            <p><strong>Waste ID:</strong> {c.waste_id}</p>
            <p><strong>Inventory ID:</strong> {c.inventory_id}</p>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-sm z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-2xl text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold text-green-700 mb-4">{currentCompost.compost_id ? 'Edit Compost' : 'Add Compost'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {['quantity','fermentingDate','employee_id','waste_id','inventory_id','compostStatus'].map((field) => (
                <Input
                  key={field}
                  name={field}
                  placeholder={field}
                  value={currentCompost[field]}
                  onChange={handleInputChange}
                />
              ))}
              <div className="flex justify-end gap-3">
                <Button onClick={() => setIsModalOpen(false)} className="bg-red-600 hover:bg-red-500">Cancel</Button>
                <Button type="submit" className="bg-green-700 hover:bg-green-600">
                  {currentCompost.compost_id ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompostSection;
