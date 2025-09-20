// components/ui/Card.jsx
import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all hover:scale-105 transform duration-300 ${className}`}
    >
      {children}
    </div>
  );
};
