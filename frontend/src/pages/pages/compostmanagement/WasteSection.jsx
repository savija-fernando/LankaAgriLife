import React, { useState } from 'react';
import { Card } from '../../../components/components/ui/Card';
import { Button } from '../../../components/components/ui/Button';
import { Input } from '../../../components/components/ui/Input';
import { Edit, Trash, PlusCircle } from 'lucide-react';
//import { MdCompost } from "react-icons/md";

const WasteSection = ({ wastes, setWastes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [currentWaste, setCurrentWaste] = useState({
    waste_id: '',
    quantity: '',
    type: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentWaste((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setWastes(
        wastes.map((w) => (w.waste_id === editMode ? { ...w, ...currentWaste } : w))
      );
    } else {
      setWastes([...wastes, { ...currentWaste, waste_id: wastes.length + 1 }]);
    }
    setIsModalOpen(false);
    setEditMode(null);
    setCurrentWaste({ waste_id: '', quantity: '', type: '', date: '' });
  };

  const handleEdit = (id) => {
    const waste = wastes.find((w) => w.waste_id === id);
    setCurrentWaste(waste);
    setEditMode(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setWastes(wastes.filter((w) => w.waste_id !== id));
  };

  return (
    <div>
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-green-700 font-serif flex items-center gap-2">
          <MdCompost className="w-8 h-8 text-green-600" />
          Waste
        </h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-green-700 text-white hover:bg-green-600 rounded-full px-4 py-2">
          <PlusCircle className="w-5 h-5" /> Add Waste
        </Button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wastes.map((w) => (
          <Card key={w.waste_id} className="relative bg-green-50 shadow-lg rounded-lg p-6 border-b-2 border-green-300">
            <div className="absolute top-2 right-2 flex gap-2">
              <Edit onClick={() => handleEdit(w.waste_id)} className="w-5 h-5 text-green-600 cursor-pointer hover:text-green-800" />
              <Trash onClick={() => handleDelete(w.waste_id)} className="w-5 h-5 text-red-600 cursor-pointer hover:text-red-800" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">Waste #{w.waste_id}</h3>
            <p><strong>Quantity:</strong> {w.quantity}</p>
            <p><strong>Type:</strong> {w.type}</p>
            <p><strong>Date:</strong> {w.date}</p>
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
            <h2 className="text-xl font-semibold text-green-700 mb-4">{editMode ? 'Edit Waste' : 'Add Waste'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {['quantity','type','date'].map((field) => (
                <Input
                  key={field}
                  name={field}
                  placeholder={field}
                  value={currentWaste[field]}
                  onChange={handleInputChange}
                />
              ))}
              <div className="flex justify-end gap-3">
                <Button onClick={() => setIsModalOpen(false)} className="bg-red-600 hover:bg-red-500">Cancel</Button>
                <Button type="submit" className="bg-green-700 hover:bg-green-600">
                  {editMode ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteSection;
