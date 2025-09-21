// components/Crop/CropCard.jsx
import React from 'react';
import { FaSeedling } from 'react-icons/fa';

const CropCard = ({ crop, onEdit }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all mb-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <FaSeedling className="w-5 h-5 text-green-600" />
        {crop.name}
      </h3>
      <p><strong>Farmer:</strong> {crop.farmer}</p>
      <p><strong>Planted:</strong> {crop.planted}</p>
      <p><strong>Field:</strong> {crop.field}</p>
      <p><strong>Yield:</strong> {crop.yield}%</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={() => onEdit(crop)}
      >
        Edit Crop
      </button>
    </div>
  );
};

export default CropCard;
