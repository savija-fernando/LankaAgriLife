import React from 'react';
import '../App.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <h3>LankaAgriLife</h3>
        <p>Empowering Sri Lankan farmers with modern agricultural technology.</p>
        <p>📍 Colombo, Sri Lanka</p>
        <p>📞 +94 11 234 4587</p>
        <p>✉️ info@lankaagrilife.lk</p>
      </div>
      <div className="footer-col">
        <h4>Services</h4>
        <ul>
          <li>Crop Management</li>
          <li>Livestock Care</li>
          <li>Analytics</li>
          <li>Risk Management</li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Support</h4>
        <ul>
          <li>Help Center</li>
          <li>Training</li>
          <li>Community</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
