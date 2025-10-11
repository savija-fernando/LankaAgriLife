import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  // State for inputs and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Form submit handler
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    setError(""); // reset error
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8070/AdminDetails/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token
        localStorage.setItem("adminToken", data.token);

        // Save admin role or name
        localStorage.setItem("adminRole", data.admin.role || "Admin");
        localStorage.setItem("adminEmail", data.admin.email); // optional if you want email

        // Navigate to dashboard
        navigate("/dashboard/");
        console.log("Login successful", data);
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("An error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate("/login")}
        className="absolute top-6 left-6 z-50 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        ← Back
      </button>

      {/* Left Side: Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 relative">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Admin Login
          </h2>
          <p className="text-center text-gray-600">
            Enter your credentials to access the admin dashboard
          </p>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-center text-sm font-medium">
              {error}
            </div>
          )}

          <form className="space-y-4 mt-6" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-transform hover:-translate-y-0.5 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Forgot your password?{" "}
            <span className="text-green-600 hover:underline cursor-pointer">
              Reset here
            </span>
          </p>
        </div>
      </div>

      {/* Right Side: Info Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-800 via-gray-900 to-black items-center justify-center text-white p-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-green-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-500/30 rounded-full blur-3xl"></div>

        <div className="max-w-md text-center space-y-4 z-10">
          <h1 className="text-4xl font-extrabold mb-2 drop-shadow-md">
            Admin Portal
          </h1>
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