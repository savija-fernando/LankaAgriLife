import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-6 px-4">
      <p className="text-sm sm:text-base">
        © {new Date().getFullYear()} <span className="font-semibold text-green-500">LankaAgriLife</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
