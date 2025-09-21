// components/ui/Input.jsx
import React from "react";

export const Input = React.forwardRef(
  ({ placeholder = "", value, onChange, className = "", ...props }, ref) => {
    return (
      <div className={`relative ${className}`}>
        <input
          ref={ref}
          className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props} // ✅ forward extra props like name, type, required
        />
      </div>
    );
  }
);

Input.displayName = "Input";
