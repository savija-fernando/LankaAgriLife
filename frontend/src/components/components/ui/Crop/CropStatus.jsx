// components/Crop/CropStatus.jsx
import React from 'react';

const CropStatus = ({ status, growthStage, yieldPercentage }) => {
  return (
    <div className="mt-4 flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-semibold 
            ${status === 'Growing' ? 'bg-green-500' : status === 'Flowering' ? 'bg-yellow-500' : 'bg-gray-500'}`}
        >
          {status}
        </div>
        <p className="mt-2 text-sm text-gray-600">{growthStage}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg text-gray-700 font-semibold">Yield</p>
        <p className="text-sm">{yieldPercentage}%</p>
      </div>
    </div>
  );
};

export default CropStatus;
