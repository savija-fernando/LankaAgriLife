import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../assets/LankaAgriLife.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" }, 
    { name: "Contact us", path: "/contact" },
    { name: "Login", path: "/login" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-transparent backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="LankaAgriLife Logo"
              className="h-14 scale-[2.5] transform object-contain"
              style={{ transformOrigin: "left center" }}
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative font-medium transition-colors after:block after:h-[2px] after:w-0 after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full ${
                    isActive
                      ? "text-green-400"
                      : "text-gray-100 hover:text-green-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-100 hover:text-green-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Links */}
      <div
        className={`md:hidden bg-black/70 backdrop-blur-md absolute w-full transition-all duration-300 ${
          isOpen ? "top-full opacity-100" : "-top-[400px] opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-6 px-6 py-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-green-400"
                    : "text-gray-100 hover:text-green-400"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
