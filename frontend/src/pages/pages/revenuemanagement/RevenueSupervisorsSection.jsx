import React, { useState } from 'react';
import { Card } from '../../../components/components/ui/Card';
import { Input } from '../../../components/components/ui/Input';
import { Button } from '../../../components/components/ui/Button';
import { Edit, Trash, PlusCircle } from 'lucide-react';

const RevenueSupervisorsSection = ({ supervisors, setSupervisors }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [currentSupervisor, setCurrentSupervisor] = useState({
    rsupervisor_id: '', first_name: '', last_name: '', email: '', password: '', contact: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSupervisor(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setSupervisors(supervisors.map(s => s.rsupervisor_id === editMode ? currentSupervisor : s));
    } else {
      setSupervisors([...supervisors, { ...currentSupervisor, rsupervisor_id: supervisors.length + 1 }]);
    }
    setIsModalOpen(false);
    setEditMode(null);
    setCurrentSupervisor({ rsupervisor_id: '', first_name: '', last_name: '', email: '', password: '', contact: '' });
  };

  const handleEdit = (id) => {
    const sup = supervisors.find(s => s.rsupervisor_id === id);
    setCurrentSupervisor(sup);
    setEditMode(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setSupervisors(supervisors.filter(s => s.rsupervisor_id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-green-700">Revenue Supervisors</h3>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-green-700 text-white rounded-full px-4 py-2">
          <PlusCircle className="w-5 h-5" /> Add Supervisor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supervisors.map(s => (
          <Card key={s.rsupervisor_id} className="p-4 bg-green-50 shadow rounded-lg relative">
            <div className="absolute top-2 right-2 flex gap-2">
              <button onClick={() => handleEdit(s.rsupervisor_id)} className="text-green-600 hover:text-green-800"><Edit /></button>
              <button onClick={() => handleDelete(s.rsupervisor_id)} className="text-red-600 hover:text-red-800"><Trash /></button>
            </div>
            <p><strong>Name:</strong> {s.first_name} {s.last_name}</p>
            <p><strong>Email:</strong> {s.email}</p>
            <p><strong>Contact:</strong> {s.contact}</p>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-500 text-2xl">&times;</button>
            <h2 className="text-xl font-semibold mb-4 text-green-700">{editMode ? 'Edit Supervisor' : 'Add Supervisor'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input name="first_name" placeholder="First Name" value={currentSupervisor.first_name} onChange={handleInputChange} />
              <Input name="last_name" placeholder="Last Name" value={currentSupervisor.last_name} onChange={handleInputChange} />
              <Input name="email" placeholder="Email" value={currentSupervisor.email} onChange={handleInputChange} />
              <Input name="password" placeholder="Password" type="password" value={currentSupervisor.password} onChange={handleInputChange} />
              <Input name="contact" placeholder="Contact" value={currentSupervisor.contact} onChange={handleInputChange} />
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

export default RevenueSupervisorsSection;
