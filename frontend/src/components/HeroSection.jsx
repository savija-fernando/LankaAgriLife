import React from 'react';
import '../App.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Cultivating <br />
          <span>Sri Lanka's</span> <br />
          Agricultural <br />
          Future
        </h1>
        <p>Empowering farmers with modern tools and traditional wisdom.</p>
        <div className="hero-buttons">
          <button className="btn-primary">Start Your Journey</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
}


export default HeroSection;
