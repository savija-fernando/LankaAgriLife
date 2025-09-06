import React from 'react';
import '../App.css';

function ServiceCards() {
  const services = [
    {
      title: "Crop Management",
      features: ["Soil Analysis", "Weather Monitoring", "Pest Control", "Yield Optimization"],
    },
    {
      title: "Livestock Care",
      features: ["Health Tracking", "Breeding Records", "Feed Management", "Veterinary Care"],
    },
    {
      title: "Mobile Solutions",
      features: ["Real-time Updates", "Offline Access", "Photo Documentation", "GPS Mapping"],
    },
    {
      title: "Community Support",
      features: ["Expert Consultation", "Farmer Network", "Training Programs", "Knowledge Base"],
    }
  ];

  return (
    <section className="service-cards">
      {services.map((s, index) => (
        <div key={index} className="card">
          <h3>{s.title}</h3>
          <ul>
            {s.features.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
          <button className="btn-secondary">Learn More</button>
        </div>
      ))}
    </section>
  );
}

export default ServiceCards;
