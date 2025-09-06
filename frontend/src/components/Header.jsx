import React from 'react';
import '../App.css';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="header">
      <div className="footer-col" style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={logo} 
          alt="LankaAgriLife Logo" 
          style={{ width: '40px', height: '40px', marginRight: '10px' }} 
        />
        <h3>LankaAgriLife</h3>
      </div>
      <nav>
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <button className="btn-primary">Get Started</button>
      </nav>
    </header>
  );
}

export default Header;
