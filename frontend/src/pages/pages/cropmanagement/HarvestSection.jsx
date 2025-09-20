import React, { useState } from 'react';
import { Card } from '../../../components/components/ui/Card';
import { Input } from '../../../components/components/ui/Input';
import { Edit, Trash, PlusCircle } from 'lucide-react'; // Edit, Delete and Plus icons
import { Button } from '../../../components/components/ui/Button';

const HarvestSection = ({ harvests, setHarvests }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null); // To track the harvest being edited
  const [currentHarvest, setCurrentHarvest] = useState({
    harvest_id: '',
    type: '',
    quantity: '',
    harvestDate: '',
    note: '',
  });

  // Handle input changes in Add/Edit Harvest modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentHarvest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle adding or editing a harvest
  const handleAddOrEditHarvestSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      // Edit mode: Update existing harvest data
      const updatedHarvests = harvests.map((harvest) =>
        harvest.harvest_id === editMode ? { ...harvest, ...currentHarvest } : harvest
      );
      setHarvests(updatedHarvests);
    } else {
      // Add mode: Add a new harvest
      setHarvests([
        ...harvests,
        { ...currentHarvest, harvest_id: harvests.length + 1 },
      ]);
    }

    setIsModalOpen(false); // Close the modal after submitting
    setEditMode(null); // Reset edit mode
    setCurrentHarvest({
      harvest_id: '',
      type: '',
      quantity: '',
      harvestDate: '',
      note: '',
    });
  };

  // Open the modal for editing a harvest
  const handleEditHarvest = (id) => {
    const harvest = harvests.find((harvest) => harvest.harvest_id === id);
    setCurrentHarvest(harvest); // Pre-fill the modal with harvest data
    setEditMode(id); // Set edit mode to the selected harvest ID
    setIsModalOpen(true); // Open the modal
  };

  // Handle deleting a harvest
  const handleDeleteHarvest = (id) => {
    const filteredHarvests = harvests.filter((harvest) => harvest.harvest_id !== id);
    setHarvests(filteredHarvests);
  };

  return (
    <div>
      {/* Title Section for Harvest Page */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-green-700 font-serif flex items-center gap-2">
          <PlusCircle className="w-8 h-8 text-green-600" />
          Harvests
        </h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-green-700 text-white hover:bg-green-600 rounded-full px-4 py-2">
          <PlusCircle className="w-5 h-5" />
          Add Harvest
        </Button>
      </div>

      {/* Harvest List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {harvests.map((harvest) => (
          <Card
            key={harvest.harvest_id}
            className="relative bg-green-100 shadow-lg rounded-lg p-6 hover:scale-105 transform transition-all border-b-2 border-green-300"
          >
            {/* Edit and Delete Icons side by side */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEditHarvest(harvest.harvest_id)}
                className="absolute top-2 right-11 text-green-600 cursor-pointer hover:text-gray-800 transition-all"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDeleteHarvest(harvest.harvest_id)}
                className="absolute top-2 right-3 text-green-600 cursor-pointer hover:text-gray-800 transition-all"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
            {/* Harvest Info */}
            <h3 className="text-xl font-semibold text-green-800">{harvest.type}</h3>
            <p className="text-green-700"><strong>Quantity:</strong> {harvest.quantity}</p>
            <p className="text-green-700"><strong>Harvest Date:</strong> {harvest.harvestDate}</p>
            <p className="text-green-700"><strong>Note:</strong> {harvest.note}</p>
          </Card>
        ))}
      </div>

      {/* Modal for Adding/Editing Harvest */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-green-700">{editMode ? 'Edit Harvest' : 'Add New Harvest'}</h2>
            <form onSubmit={handleAddOrEditHarvestSubmit}>
              <div className="space-y-4">
                <Input
                  name="type"
                  placeholder="Type"
                  value={currentHarvest.type}
                  onChange={handleInputChange}
                  className="border-2 border-green-500"
                />
                <Input
                  name="quantity"
                  placeholder="Quantity"
                  value={currentHarvest.quantity}
                  onChange={handleInputChange}
                  className="border-2 border-green-500"
                />
                <Input
                  name="harvestDate"
                  placeholder="Harvest Date"
                  value={currentHarvest.harvestDate}
                  onChange={handleInputChange}
                  className="border-2 border-green-500"
                />
                <Input
                  name="note"
                  placeholder="Note"
                  value={currentHarvest.note}
                  onChange={handleInputChange}
                  className="border-2 border-green-500"
                />
                <div className="flex justify-end space-x-4 mt-4">
                  <Button onClick={() => setIsModalOpen(false)} className="bg-red-600 hover:bg-red-500">Cancel</Button>
                  <Button type="submit" className="bg-green-700 hover:bg-green-600">{editMode ? 'Update Harvest' : 'Add Harvest'}</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HarvestSection;
