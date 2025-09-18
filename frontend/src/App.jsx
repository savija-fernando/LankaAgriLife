import React from 'react';
import './App.css'; // Assuming you have a CSS file for styles

const animals = [
  {
    name: 'Dolly',
    species: 'Sheep',
    breed: 'Merino',
    age: '2 years',
    weight: '75 kg',
    lastVaccination: '7/20/2024',
    status: 'Recovering',
    statusColor: 'bg-gray-200 text-gray-800',
  },
  {
    name: 'Clucky',
    species: 'Chicken',
    breed: 'Rhode Island Red',
    age: '1 years',
    weight: '2.5 kg',
    lastVaccination: '9/1/2024',
    status: 'Healthy',
    statusColor: 'bg-green-200 text-green-800',
  },
];

const AnimalCard = ({ animal }) => (
  <div className="bg-white rounded-lg shadow p-4 w-72">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-semibold">{animal.name}</h2>
      <span className={`text-sm px-2 py-1 rounded-full ${animal.statusColor}`}>
        {animal.status}
      </span>
    </div>
    <p className="text-gray-600">{animal.species} • {animal.breed}</p>
    <div className="mt-2 text-gray-700">
      <p><span className="font-semibold">Age:</span> {animal.age}</p>
      <p><span className="font-semibold">Weight:</span> {animal.weight}</p>
      <p className="text-gray-400 text-sm mt-1">Last vaccination: {animal.lastVaccination}</p>
    </div>
    <div className="mt-4 flex gap-2">
      <button className="flex-1 border border-gray-300 rounded px-3 py-1 hover:bg-gray-100">
        ✏️ Edit
      </button>
      <button className="flex-1 bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600">
        🗑️ Delete
      </button>
    </div>
  </div>
);

const Navbar = () => (
  <nav className="bg-white shadow p-4 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <div className="bg-green-500 text-white rounded p-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2L2 8h2v8h4v-4h4v4h4V8h2L10 2z" />
        </svg>
      </div>
      <div>
        <h1 className="font-bold text-lg">FarmManager</h1>
        <p className="text-gray-500 text-sm">Livestock Management System</p>
      </div>
    </div>
    <div className="flex gap-4">
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Animals</button>
      <button className="flex items-center gap-1 hover:text-gray-700">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        Handlers
      </button>
      <button className="flex items-center gap-1 hover:text-gray-700">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 3h12v2H4V3zm0 4h12v2H4V7zm0 4h12v2H4v-2zm0 4h12v2H4v-2z" />
        </svg>
        Products
      </button>
    </div>
  </nav>
);

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Animals</h1>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            + Add Animal
          </button>
        </header>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {animals.map((animal) => (
            <AnimalCard key={animal.name} animal={animal} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
