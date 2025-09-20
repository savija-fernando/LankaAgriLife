import React, { useState } from 'react';
import { Card } from '../../../components/components/ui/Card';
import { Button } from '../../../components/components/ui/Button';
import { Input } from '../../../components/components/ui/Input';
import { Edit, PlusCircle } from 'lucide-react';
//import { GiPitchfork } from "react-icons/gi";

const CompostHandlerSection = ({ handlers, setHandlers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHandler, setCurrentHandler] = useState({
    CompostHandler_id: '',
    f_name: '',
    l_name: '',
    loginCredentials: '',
    email: '',
    contact_No: '',
  });

  // Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentHandler((prev) => ({ ...prev, [name]: value }));
  };

  // Add/Edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentHandler.CompostHandler_id) {
      setHandlers(
        handlers.map((h) =>
          h.CompostHandler_id === currentHandler.CompostHandler_id ? currentHandler : h
        )
      );
    } else {
      setHandlers([...handlers, { ...currentHandler, CompostHandler_id: handlers.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  // Edit mode
  const handleEdit = (id) => {
    const handler = handlers.find((h) => h.CompostHandler_id === id);
    setCurrentHandler(handler);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-green-700 font-serif flex items-center gap-2">
          <GiPitchfork className="w-8 h-8 text-green-600" />
          Compost Handlers
        </h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-green-700 text-white hover:bg-green-600 rounded-full px-4 py-2">
          <PlusCircle className="w-5 h-5" /> Add Handler
        </Button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {handlers.map((h) => (
          <Card key={h.CompostHandler_id} className="relative bg-green-50 shadow-lg rounded-lg p-6 border-b-2 border-green-300">
            <div className="absolute top-4 right-6 text-green-600 cursor-pointer hover:text-green-800">
              <Edit onClick={() => handleEdit(h.CompostHandler_id)} className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">{h.f_name} {h.l_name}</h3>
            <p><strong>Email:</strong> {h.email}</p>
            <p><strong>Contact:</strong> {h.contact_No}</p>
            <p><strong>Login:</strong> {h.loginCredentials}</p>
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
            <h2 className="text-xl font-semibold text-green-700 mb-4">
              {currentHandler.CompostHandler_id ? 'Edit Handler' : 'Add Handler'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {['f_name','l_name','loginCredentials','email','contact_No'].map((field) => (
                <Input
                  key={field}
                  name={field}
                  placeholder={field}
                  value={currentHandler[field]}
                  onChange={handleInputChange}
                />
              ))}
              <div className="flex justify-end gap-3">
                <Button onClick={() => setIsModalOpen(false)} className="bg-red-600 hover:bg-red-500">Cancel</Button>
                <Button type="submit" className="bg-green-700 hover:bg-green-600">
                  {currentHandler.CompostHandler_id ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompostHandlerSection;
