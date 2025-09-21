import React, { useState, useEffect } from "react";
import { Card } from "../../../components/components/ui/Card";
import { Input } from "../../../components/components/ui/Input";
import { Edit, Trash, PlusCircle } from "lucide-react";
import { Button } from "../../../components/components/ui/Button";
import { GiCow } from "react-icons/gi";

import {
  getAllAnimals,
  addAnimal,
  updateAnimal,
  deleteAnimal,
} from "../../../api/animalAPI";

const AnimalsSection = () => {
  const [animals, setAnimals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [currentAnimal, setCurrentAnimal] = useState({
    animal_id: "",
    species: "",
    breedingDetails: "",
    feedingData: "",
    healthRecord: "",
    dateOfBirth: "",
  });

  // Fetch animals from backend
  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const res = await getAllAnimals();
      setAnimals(res.data);
    } catch (err) {
      console.error("Error fetching animals:", err);
      alert("Failed to load animals.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!currentAnimal.animal_id) {
        alert("Animal ID is required");
        return;
      }

      if (editMode) {
        await updateAnimal(editMode, currentAnimal);
        alert("Animal updated successfully");
      } else {
        await addAnimal(currentAnimal);
        alert("Animal added successfully");
      }

      setIsModalOpen(false);
      setEditMode(null);
      resetForm();
      fetchAnimals();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save animal");
    }
  };

  const handleEdit = (id) => {
    const animal = animals.find((a) => a.animal_id === id);
    setCurrentAnimal({
      ...animal,
      feedingData: animal.feedingData ? animal.feedingData.slice(0, 10) : "",
      dateOfBirth: animal.dateOfBirth ? animal.dateOfBirth.slice(0, 10) : "",
    });
    setEditMode(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this animal?")) return;
    try {
      await deleteAnimal(id);
      alert("Animal deleted successfully");
      fetchAnimals();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete animal");
    }
  };

  const resetForm = () => {
    setCurrentAnimal({
      animal_id: "",
      species: "",
      breedingDetails: "",
      feedingData: "",
      healthRecord: "",
      dateOfBirth: "",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-green-700 flex items-center gap-2">
          <GiCow className="w-8 h-8 text-green-600" /> Animals
        </h2>
        <Button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 !bg-blue-600 text-white hover:!bg-blue-500 rounded-full px-4 py-2"
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
              <button
                onClick={() => handleEdit(animal.animal_id)}
                className="bg-yellow-400 text-white p-1 rounded hover:bg-yellow-500"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(animal.animal_id)}
                className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl font-semibold text-green-800">
              {animal.species}
            </h3>
            <p>
              <strong>Breeding:</strong> {animal.breedingDetails}
            </p>
            <p>
              <strong>Feeding:</strong>{" "}
              {animal.feedingData
                ? new Date(animal.feedingData).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <strong>Health:</strong> {animal.healthRecord}
            </p>
            <p>
              <strong>DOB:</strong>{" "}
              {animal.dateOfBirth
                ? new Date(animal.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </p>
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
              {editMode ? "Edit Animal" : "Add New Animal"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* animal_id is always required */}
              <Input
                name="animal_id"
                placeholder="Animal ID"
                value={currentAnimal.animal_id}
                onChange={handleInputChange}
                required
              />
              <Input
                name="species"
                placeholder="Species"
                value={currentAnimal.species}
                onChange={handleInputChange}
                required
              />
              <Input
                name="breedingDetails"
                placeholder="Breeding Details"
                value={currentAnimal.breedingDetails}
                onChange={handleInputChange}
                required
              />
              <Input
                type="date"
                name="feedingData"
                placeholder="Feeding Data"
                value={currentAnimal.feedingData}
                onChange={handleInputChange}
              />
              <Input
                name="healthRecord"
                placeholder="Health Record"
                value={currentAnimal.healthRecord}
                onChange={handleInputChange}
                required
              />
              <Input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={currentAnimal.dateOfBirth}
                onChange={handleInputChange}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="!bg-red-600 text-white"
                >
                  Cancel
                </Button>
                <Button type="submit" className="!bg-blue-600 text-white">
                  {editMode ? "Update" : "Add"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalsSection;
