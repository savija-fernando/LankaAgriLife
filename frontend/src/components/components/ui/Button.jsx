// components/ui/Button.jsx
export const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};
