import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Products from "./pages/Products"; // <-- import Products page

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />  {/* Products Page */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />        {/* Login Page */}
          <Route path="/admin" element={<AdminLogin />} />   {/* Admin Login Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
