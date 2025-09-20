// components/ui/Input.jsx
import React from "react";

export const Input = ({ placeholder = "", value, onChange, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
