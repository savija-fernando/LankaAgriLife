import React from "react";
import { Link } from "react-router-dom";
import useTypingEffect from "../hooks/useTypingEffect"; // adjust path accordingly

const Hero = () => {
  const paragraphText =
    "Transform your ideas into sustainable agriculture with our platform. Manage crops, livestock, and resources efficiently with modern tools.";
  
  const typedText = useTypingEffect(paragraphText, 40); // 40ms speed, adjust to your liking

  return (
    <section className="bg-gradient-to-r from-green-100 via-green-200 to-green-300 text-center py-20 px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 leading-tight">
        Grow Something Amazing Today
      </h1>

      <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto whitespace-pre-line">
        {typedText}
        <span className="border-r-2 border-gray-700 animate-blink ml-1">&nbsp;</span>
      </p>

      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition text-center"
        >
          Get Started
        </Link>

        <button className="px-6 py-3 bg-white text-green-700 border border-green-600 rounded-lg font-medium hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row justify-center gap-10 text-gray-700 text-sm sm:text-base">
        <div>
          <p className="text-2xl font-bold text-green-700">5,000+</p>
          <p>Farmers & Growers</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-700">99.9%</p>
          <p>Reliable Data</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-700">24/7</p>
          <p>Support</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
