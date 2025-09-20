import React, { useState } from 'react';
import { Card } from '../../../components/components/ui/Card';
//import { FaSeedling } from 'react-icons/fa'; // Seedling Icon
import { Edit, Trash, PlusCircle } from 'lucide-react'; // Edit, Delete and PlusCircle icons
import { Input } from '../../../components/components/ui/Input';
import { Button } from '../../../components/components/ui/Button';
//import { GiWheat } from "react-icons/gi";

const PlantsSection = ({ plants, setPlants }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Add/Edit Plant Modal
  const [currentPlant, setCurrentPlant] = useState({
    crop_id: '',
    plantingDate: '',
    type: '',
    location: '',
    harvestDate: '',
    waterIntake: '',
    fertilizerIntake: '',
    employee_id: ''
  });

  // Handle modal input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPlant((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle submit to add or edit a plant
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPlant.id) {
      // Update existing plant
      setPlants(
        plants.map((plant) =>
          plant.id === currentPlant.id ? currentPlant : plant
        )
      );
    } else {
      // Add new plant
      setPlants([ ...plants, { ...currentPlant, id: plants.length + 1 } ]);
    }
    setIsModalOpen(false); // Close the modal after submission
  };

  // Open modal for editing a plant
  const handleEditPlant = (id) => {
    const plant = plants.find((plant) => plant.id === id);
    setCurrentPlant(plant); // Pre-fill the modal with plant data
    setIsModalOpen(true);
  };

  // Handle deleting a plant
  const handleDeletePlant = (id) => {
    setPlants(plants.filter(plant => plant.id !== id));
  };

  return (
    <div>
      {/* Title Section for Plants Page */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-green-700 font-serif flex items-center gap-2">
          <GiWheat className="w-8 h-8 text-green-600" /> {/* Seedling icon in front of the title */}
          Plants
        </h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-green-700 text-white hover:bg-green-600 rounded-full px-4 py-2">
          <PlusCircle className="w-5 h-5" />
          Add Plant
        </Button>
      </div>

      {/* Plants List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant) => (
          <Card key={plant.id} className="relative bg-white shadow-lg rounded-lg p-6 hover:scale-105 transform transition-all border-b-2 border-green-300">
            {/* Edit and Delete Icons side by side */}
            <div className="absolute top-4 right-6 flex gap-2">
              <button
                onClick={() => handleEditPlant(plant.id)}
                className="text-green-600 cursor-pointer hover:text-gray-800 transition-all"
              >
                <Edit className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleDeletePlant(plant.id)}
                className="text-green-600 cursor-pointer hover:text-gray-800 transition-all"
              >
                <Trash className="w-6 h-6" />
              </button>
            </div>
            {/* Plant Info */}
            <h3 className="text-xl font-semibold text-green-800">{plant.name}</h3>
            <p className="text-green-700"><strong>Type:</strong> {plant.type}</p>
            <p className="text-green-700"><strong>Planted:</strong> {plant.plantedDate}</p>
            <p className="text-green-700"><strong>Harvested:</strong> {plant.harvestDate}</p>
            <p className="text-green-700"><strong>Quantity:</strong> {plant.quantity}</p>
          </Card>
        ))}
      </div>

      {/* Modal for Adding or Editing a Plant */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-green-700">{currentPlant.id ? 'Edit Plant' : 'Add New Plant'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  name="crop_id"
                  placeholder="Crop ID"
                  value={currentPlant.crop_id}
                  onChange={handleInputChange}
                />
                <Input
                  name="plantingDate"
                  placeholder="Planting Date"
                  value={currentPlant.plantingDate}
                  onChange={handleInputChange}
                />
                <Input
                  name="type"
                  placeholder="Plant Type"
                  value={currentPlant.type}
                  onChange={handleInputChange}
                />
                <Input
                  name="location"
                  placeholder="Location"
                  value={currentPlant.location}
                  onChange={handleInputChange}
                />
                <Input
                  name="harvestDate"
                  placeholder="Harvest Date"
                  value={currentPlant.harvestDate}
                  onChange={handleInputChange}
                />
                <Input
                  name="waterIntake"
                  placeholder="Water Intake"
                  value={currentPlant.waterIntake}
                  onChange={handleInputChange}
                />
                <Input
                  name="fertilizerIntake"
                  placeholder="Fertilizer Intake"
                  value={currentPlant.fertilizerIntake}
                  onChange={handleInputChange}
                />
                <Input
                  name="employee_id"
                  placeholder="Employee ID"
                  value={currentPlant.employee_id}
                  onChange={handleInputChange}
                />
                <div className="flex justify-end space-x-4 mt-4">
                  <Button onClick={() => setIsModalOpen(false)} className="bg-red-600 hover:bg-red-500">Cancel</Button>
                  <Button type="submit" className="bg-green-700 hover:bg-green-600">{currentPlant.id ? 'Update Plant' : 'Add Plant'}</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantsSection;
