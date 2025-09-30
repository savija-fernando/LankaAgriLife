import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../assets/icon.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" }, 
    { name: "Contact us", path: "/contact" },
    { name: "Login", path: "/login" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/15 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center py-3">
          {/* Logo with Text */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="LankaAgriLife Logo"
              className="h-8 w-8 object-contain filter drop-shadow-lg"
            />
            <span className="text-xl font-bold text-gray-400 drop-shadow-sm">
              LankaAgriLife
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 border border-transparent shadow-lg ${
                    isActive 
                      ? "text-white bg-green-600 shadow-green-600/40 border-green-700 scale-105" 
                      : "text-green-800 bg-white/30 backdrop-blur-sm border-white/40 hover:bg-white/40 hover:border-white/60 hover:scale-105 hover:text-green-900 hover:shadow-xl"
                  }`
                }
              >
                {link.name}
                {link.name === "Login" && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border border-white"></span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button - More Visible */}
          <button
            className="md:hidden p-3 bg-white/40 backdrop-blur-md rounded-xl border border-white/50 text-green-800 hover:text-green-900 hover:bg-white/60 hover:border-white/70 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Links */}
      <div
        className={`md:hidden bg-white/98 backdrop-blur-2xl absolute w-full transition-all duration-500 shadow-2xl border-t border-white/30 ${
          isOpen ? "top-full opacity-100 visible" : "-top-[500px] opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col space-y-3 px-6 py-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-semibold px-5 py-3.5 rounded-xl transition-all duration-300 border shadow-lg text-center ${
                  isActive
                    ? "text-white bg-green-600 shadow-green-600/40 border-green-700"
                    : "text-green-800 bg-white/50 border-white/40 hover:bg-white/70 hover:border-white/60 hover:text-green-900"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center justify-center">
                {link.name}
                {link.name === "Login" && (
                  <span className="ml-3 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-white"></span>
                )}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;