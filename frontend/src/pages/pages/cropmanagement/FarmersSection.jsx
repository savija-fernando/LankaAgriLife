import React, { useState } from 'react';
import { Card } from '../../../components/components/ui/Card';
import { Input } from '../../../components/components/ui/Input';
import { Mail, Phone, MapPin, User, Edit, Trash, PlusCircle } from 'lucide-react'; // Edit, Delete and PlusCircle icons
import { FaSeedling } from 'react-icons/fa'; // Seedling Icon from React Icons
import { Button } from '../../../components/components/ui/Button';
import { GiFarmTractor } from "react-icons/gi";

const FarmersSection = ({ farmers, setFarmers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Add/Edit Farmer Modal
  const [editMode, setEditMode] = useState(null); // To track the farmer being edited
  const [newFarmerData, setNewFarmerData] = useState({
    farmer_id: '',
    f_name: '',
    l_name: '',
    loginCredentials: '',
    email: '',
    contact_No: ''
  });

  // Handle input changes in Add/Edit Farmer modal
  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setNewFarmerData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle adding or editing farmer
  const handleAddOrEditFarmerSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      // Edit mode: Update existing farmer data
      const updatedFarmers = farmers.map((farmer) =>
        farmer.id === editMode ? { ...farmer, ...newFarmerData } : farmer
      );
      setFarmers(updatedFarmers);
    } else {
      // Add mode: Add a new farmer
      setFarmers([...farmers, { ...newFarmerData, id: farmers.length + 1 }]);
    }

    setIsModalOpen(false); // Close the modal after submitting
    setEditMode(null); // Reset edit mode
    setNewFarmerData({
      farmer_id: '',
      f_name: '',
      l_name: '',
      loginCredentials: '',
      email: '',
      contact_No: ''
    });
  };

  // Open the modal for editing a farmer
  const handleEditFarmer = (id) => {
    const farmer = farmers.find((farmer) => farmer.id === id);
    setNewFarmerData(farmer); // Pre-fill the modal with farmer data
    setEditMode(id); // Set edit mode to the selected farmer ID
    setIsModalOpen(true); // Open the modal
  };

  // Handle deleting a farmer
  const handleDeleteFarmer = (id) => {
    setFarmers(farmers.filter(farmer => farmer.id !== id));
  };

  return (
    <div>
      {/* Title Section for Farmers Page */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-green-700 font-serif flex items-center gap-2">
          <GiFarmTractor className="w-8 h-8 text-green-600" /> {/* Icon in front of title */}
          Farmers
        </h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-green-700 text-white hover:bg-green-600 rounded-full px-4 py-2">
          <PlusCircle className="w-5 h-5" />
          Add Farmer
        </Button>
      </div>

      {/* Farmers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farmers.map((farmer) => (
          <Card key={farmer.id} className="relative bg-green-100 shadow-lg rounded-lg p-6 hover:scale-105 transform transition-all border-b-2 border-green-300">
            {/* Edit and Delete Icons side by side */}
            <div className="absolute top-4 right-6 flex gap-2">
              <button
                onClick={() => handleEditFarmer(farmer.id)}
                className="text-green-600 cursor-pointer hover:text-gray-800 transition-all"
              >
                <Edit className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleDeleteFarmer(farmer.id)}
                className="text-green-600 cursor-pointer hover:text-gray-800 transition-all"
              >
                <Trash className="w-6 h-6" />
              </button>
            </div>
            {/* Farmer Info */}
            <h3 className="text-xl font-semibold text-green-800 flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              {farmer.f_name} {farmer.l_name}
            </h3>
            <p className="text-green-700"><strong>Email:</strong> {farmer.email}</p>
            <p className="text-green-700"><strong>Phone:</strong> {farmer.contact_No}</p>
            <p className="text-green-700"><strong>Location:</strong> {farmer.location}</p>
            <p className="text-green-700"><strong>Crops:</strong> {farmer.crops}</p>
            <p className="text-green-700"><strong>Experience:</strong> {farmer.experience}</p>
          </Card>
        ))}
      </div>

      {/* Modal for Adding/Editing New Farmer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-green-700">{editMode ? 'Edit Farmer' : 'Add New Farmer'}</h2>
            <form onSubmit={handleAddOrEditFarmerSubmit}>
              <div className="space-y-4">
                <Input
                  name="farmer_id"
                  placeholder="Farmer ID"
                  value={newFarmerData.farmer_id}
                  onChange={handleModalInputChange}
                  className="border-2 border-green-500"
                />
                <Input
                  name="f_name"
                  placeholder="First Name"
                  value={newFarmerData.f_name}
                  onChange={handleModalInputChange}
                  className="border-2 border-green-500"
                />
                <Input
                  name="l_name"
                  placeholder="Last Name"
                  value={newFarmerData.l_name}
                  onChange={handleModalInputChange}
                  className="border-2 border-green-500"
                />
                <Input
                  name="loginCredentials"
                  placeholder="Login Credentials"
                  value={newFarmerData.loginCredentials}
                  onChange={handleModalInputChange}
                  className="border-2 border-green-500"
                />
                <Input
                  name="email"
                  placeholder="Email"
                  value={newFarmerData.email}
                  onChange={handleModalInputChange}
                  className="border-2 border-green-500"
                />
                <Input
                  name="contact_No"
                  type="number"
                  placeholder="Contact No"
                  value={newFarmerData.contact_No}
                  onChange={handleModalInputChange}
                  className="border-2 border-green-500"
                />
                <div className="flex justify-end space-x-4 mt-4">
                  <Button onClick={() => setIsModalOpen(false)} className="bg-red-600 hover:bg-red-500">Cancel</Button>
                  <Button type="submit" className="bg-green-700 hover:bg-green-600">{editMode ? 'Update Farmer' : 'Add Farmer'}</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmersSection;
