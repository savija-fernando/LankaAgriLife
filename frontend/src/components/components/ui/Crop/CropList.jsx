// components/Crop/CropList.jsx
import React from 'react';
import CropCard from './CropCard';

const CropList = ({ crops, onEdit }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {crops.map(crop => (
        <CropCard key={crop.id} crop={crop} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default CropList;
