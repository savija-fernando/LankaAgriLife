import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/components/ui/Card';
import { Input } from '../../../components/components/ui/Input';
import { Mail, Phone, User, Edit, Trash, PlusCircle } from 'lucide-react';
import { Button } from '../../../components/components/ui/Button';
import { GiFarmTractor } from "react-icons/gi";

import {
  getAllFarmers,
  addFarmer,
  updateFarmer,
  deleteFarmer
} from '../../../api/farmerAPI';

const FarmersSection = () => {
  const [farmers, setFarmers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [newFarmerData, setNewFarmerData] = useState({
    farmer_id: '',
    f_name: '',
    l_name: '',
    loginCredentials: '',
    email: '',
    contact_No: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await getAllFarmers();
      setFarmers(response.data);
      setErrorMsg('');
    } catch (error) {
      console.error("Error fetching farmers:", error);
      setErrorMsg("Failed to load farmers.");
    }
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setNewFarmerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddOrEditFarmerSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newFarmerData.farmer_id || !newFarmerData.f_name || !newFarmerData.l_name) {
      setErrorMsg("Please fill in Farmer ID, First Name, and Last Name.");
      return;
    }

    try {
      if (editMode) {
        await updateFarmer(editMode, newFarmerData);
        alert("Farmer updated successfully!");
      } else {
        await addFarmer(newFarmerData);
        alert("Farmer added successfully!");
      }

      setIsModalOpen(false);
      setEditMode(null);
      setNewFarmerData({
        farmer_id: '',
        f_name: '',
        l_name: '',
        loginCredentials: '',
        email: '',
        contact_No: ''
      });
      fetchFarmers();
    } catch (err) {
      console.error("Error saving farmer:", err);
      const serverError = err.response?.data?.message || err.message;
      setErrorMsg("Failed to save farmer: " + serverError);
    }
  };

  const handleEditFarmer = (farmer_id) => {
    const farmer = farmers.find(f => f.farmer_id === farmer_id);
    if (!farmer) {
      alert("Farmer not found for editing");
      return;
    }
    setNewFarmerData({
      farmer_id: farmer.farmer_id,
      f_name: farmer.f_name,
      l_name: farmer.l_name,
      loginCredentials: farmer.loginCredentials,
      email: farmer.email,
      contact_No: farmer.contact_No?.toString() || ''
    });
    setEditMode(farmer.farmer_id);
    setIsModalOpen(true);
    setErrorMsg('');
  };

  const handleDeleteFarmer = async (farmer_id) => {
    if (!window.confirm("Are you sure you want to delete this farmer?")) return;
    try {
      await deleteFarmer(farmer_id);
      alert("Farmer deleted successfully!");
      fetchFarmers();
    } catch (err) {
      console.error("Error deleting farmer:", err);
      setErrorMsg("Failed to delete farmer.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-green-700 font-serif flex items-center gap-2">
          <GiFarmTractor className="w-8 h-8 text-green-600" />
          Farmers
        </h2>
        <Button
          onClick={() => {
            setNewFarmerData({
              farmer_id: '',
              f_name: '',
              l_name: '',
              loginCredentials: '',
              email: '',
              contact_No: ''
            });
            setEditMode(null);
            setErrorMsg('');
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-700 text-white hover:bg-blue-600 rounded-full px-4 py-2"
        >
          <PlusCircle className="w-5 h-5" />
          Add Farmer
        </Button>
      </div>

      {/* Error message */}
      {errorMsg && (
        <div className="mb-4 text-red-600 font-semibold">
          {errorMsg}
        </div>
      )}

      {/* Farmers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farmers.map((farmer) => (
          <Card
            key={farmer.farmer_id}
            className="relative bg-green-100 shadow-lg rounded-lg p-6 transform transition-all hover:scale-105 border-b-2 border-green-300"
          >
            <div className="absolute top-4 right-6 flex gap-2">
              <button
                onClick={() => handleEditFarmer(farmer.farmer_id)}
                className="text-yellow-500 hover:text-yellow-600"
              >
                <Edit className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleDeleteFarmer(farmer.farmer_id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash className="w-6 h-6" />
              </button>
            </div>
            <h3 className="text-xl font-semibold text-green-800 flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              {farmer.f_name} {farmer.l_name}
            </h3>
            <p className="text-black"><strong>Email:</strong> {farmer.email}</p>
            <p className="text-black"><strong>Phone:</strong> {farmer.contact_No}</p>
            {farmer.loginCredentials && (
              <p className="text-black"><strong>Credentials:</strong> {farmer.loginCredentials}</p>
            )}
          </Card>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditMode(null);
                setErrorMsg('');
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              {editMode ? 'Edit Farmer' : 'Add New Farmer'}
            </h2>
            <form onSubmit={handleAddOrEditFarmerSubmit} className="space-y-4">
              <Input
                name="farmer_id"
                placeholder="Farmer ID"
                value={newFarmerData.farmer_id}
                onChange={handleModalInputChange}
                disabled={!!editMode}
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
                type="email"
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
                <Button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditMode(null);
                    setErrorMsg('');
                  }}
                  className="bg-gray-500 hover:bg-gray-400 text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={`${
                    editMode ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-blue-700 hover:bg-blue-600'
                  } text-white`}
                >
                  {editMode ? 'Update Farmer' : 'Add Farmer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmersSection;
