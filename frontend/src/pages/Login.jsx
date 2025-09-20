import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import googleIcon from "../assets/google.png";
import githubIcon from "../assets/github.png";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 items-center justify-center text-white p-10">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6">LankaAgriLife</h1>
          <p className="text-xl font-semibold mb-4">
            Online Community For Farmers & Growers
          </p>
          <p className="text-sm text-green-50">
            Connect, share knowledge, and transform your agricultural journey
            with modern tools and insights.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 relative">
        <div className="w-full max-w-md space-y-6">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-6 left-6 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          >
            ← Back
          </button>

          {/* Admin Login Button */}
          <div className="flex justify-end">
            <NavLink
              to="/admin"
              className="px-4 py-2 !bg-gray-800 !text-white rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Admin Login
            </NavLink>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Join & Connect the Fastest <br /> Growing Online Community
          </h2>

          {/* Social Login */}
          <div className="flex gap-4">
            <button className="flex-1 !bg-gray-200/50 !text-gray-800 backdrop-blur-sm border border-gray-300 rounded-xl py-2 flex items-center justify-center gap-2 hover:!bg-gray-300 transition">
                <img src={googleIcon} alt="Google" className="w-5 h-5" />
                <span>Sign up with Google</span>
            </button>
            <button className="flex-1 !bg-gray-200/50 !text-gray-800 backdrop-blur-sm border border-gray-300 rounded-xl py-2 flex items-center justify-center gap-2 hover:!bg-gray-300 transition">
                <img src={githubIcon} alt="GitHub" className="w-5 h-5" />
                <span>Sign up with GitHub</span>
            </button>
        </div>

          {/* Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I accept the terms & conditions
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Login 
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600">
            Own an Account?{" "}
            <span className="font-bold text-green-600 cursor-pointer">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
