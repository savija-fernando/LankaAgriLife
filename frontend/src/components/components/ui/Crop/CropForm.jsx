// components/Crop/CropForm.jsx
import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const CropForm = ({ crop, handleInputChange, handleSubmit, formData }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Crop Name"
        value={formData.name || crop?.name || ''}
        onChange={handleInputChange}
      />
      <Input
        name="farmer"
        placeholder="Farmer"
        value={formData.farmer || crop?.farmer || ''}
        onChange={handleInputChange}
      />
      <Input
        name="field"
        placeholder="Field"
        value={formData.field || crop?.field || ''}
        onChange={handleInputChange}
      />
      <Input
        name="planted"
        placeholder="Planted Date"
        value={formData.planted || crop?.planted || ''}
        onChange={handleInputChange}
      />
      <Input
        name="yield"
        type="number"
        placeholder="Expected Yield"
        value={formData.yield || crop?.yield || ''}
        onChange={handleInputChange}
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default CropForm;
