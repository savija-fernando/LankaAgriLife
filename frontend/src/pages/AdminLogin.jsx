import React from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-gray-50">

      {/* Back Button (fixed top-left) */}
      <button
        onClick={() => navigate("/login")}
        className="absolute top-6 left-6 z-50 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        ← Back
      </button>

      {/* Left Side: Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 relative">

          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Admin Login
          </h2>
          <p className="text-center text-gray-600">
            Enter your credentials to access the admin dashboard
          </p>

          {/* Form */}
          <form className="space-y-4 mt-6">
            <input
              type="email"
              placeholder="Admin Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Forgot your password? <span className="text-green-600 hover:underline cursor-pointer">Reset here</span>
          </p>
        </div>
      </div>

      {/* Right Side: Info Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-800 via-gray-900 to-black items-center justify-center text-white p-12 relative overflow-hidden">
        
        {/* Decorative Circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-green-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-500/30 rounded-full blur-3xl"></div>

        <div className="max-w-md text-center space-y-4 z-10">
          <h1 className="text-4xl font-extrabold mb-2 drop-shadow-md">Admin Portal</h1>
          <p className="text-xl font-semibold mb-2">
            Manage LankaAgriLife Platform
          </p>
          <p className="text-gray-300 text-sm">
            Access insights, moderate users, and oversee platform activity with
            powerful admin tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
