import React, { useState } from 'react';
import { Card } from '../../../components/components/ui/Card';
import { Input } from '../../../components/components/ui/Input';
import { Edit, Trash, PlusCircle } from 'lucide-react'; // Added Trash for Delete
import { Button } from '../../../components/components/ui/Button';
import { GiCow } from "react-icons/gi";

const AnimalsSection = ({ animals, setAnimals }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [currentAnimal, setCurrentAnimal] = useState({
    animal_id: '',
    species: '',
    breedingDetails: '',
    feedingData: '',
    healthRecord: '',
    dateOfBirth: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setAnimals(
        animals.map((animal) =>
          animal.animal_id === editMode ? { ...animal, ...currentAnimal } : animal
        )
      );
    } else {
      setAnimals([...animals, { ...currentAnimal, animal_id: animals.length + 1 }]);
    }
    setIsModalOpen(false);
    setEditMode(null);
    setCurrentAnimal({
      animal_id: '',
      species: '',
      breedingDetails: '',
      feedingData: '',
      healthRecord: '',
      dateOfBirth: '',
    });
  };

  const handleEdit = (id) => {
    const animal = animals.find((a) => a.animal_id === id);
    setCurrentAnimal(animal);
    setEditMode(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setAnimals(animals.filter((a) => a.animal_id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-green-700 flex items-center gap-2">
          <GiCow className="w-8 h-8 text-green-600" /> Animals
        </h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-green-700 text-white hover:bg-green-600 rounded-full px-4 py-2"
        >
          <PlusCircle className="w-5 h-5" />
          Add Animal
        </Button>
      </div>

      {/* Animal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <Card
            key={animal.animal_id}
            className="relative bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition"
          >
            {/* Edit and Delete Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={() => handleEdit(animal.animal_id)} className="text-green-600 hover:text-gray-800">
                <Edit className="w-5 h-5" />
              </button>
              <button onClick={() => handleDelete(animal.animal_id)} className="text-green-600 hover:text-gray-800">
                <Trash className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-semibold text-green-800">{animal.species}</h3>
            <p><strong>Breeding:</strong> {animal.breedingDetails}</p>
            <p><strong>Feeding:</strong> {animal.feedingData}</p>
            <p><strong>Health:</strong> {animal.healthRecord}</p>
            <p><strong>DOB:</strong> {animal.dateOfBirth}</p>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              {editMode ? 'Edit Animal' : 'Add New Animal'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input name="species" placeholder="Species" value={currentAnimal.species} onChange={handleInputChange} />
              <Input name="breedingDetails" placeholder="Breeding Details" value={currentAnimal.breedingDetails} onChange={handleInputChange} />
              <Input name="feedingData" placeholder="Feeding Data" value={currentAnimal.feedingData} onChange={handleInputChange} />
              <Input name="healthRecord" placeholder="Health Record" value={currentAnimal.healthRecord} onChange={handleInputChange} />
              <Input name="dateOfBirth" placeholder="Date of Birth" value={currentAnimal.dateOfBirth} onChange={handleInputChange} />
              <div className="flex justify-end gap-2">
                <Button onClick={() => setIsModalOpen(false)} className="bg-red-600">Cancel</Button>
                <Button type="submit" className="bg-green-700">{editMode ? 'Update' : 'Add'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalsSection;
