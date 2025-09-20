import React from "react";
import { Leaf, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    icon: <Leaf className="w-8 h-8 text-green-600" />,
    title: "Smart Farming",
    desc: "AI-powered tools to monitor soil, weather, and plant growth.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
    title: "Secure & Reliable",
    desc: "Your farm data is protected with enterprise-grade security.",
  },
  {
    icon: <Users className="w-8 h-8 text-green-600" />,
    title: "Collaboration",
    desc: "Work with farm workers and stakeholders in real-time.",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <h2 className="text-4xl font-bold text-center text-gray-800">
        Why Choose <span className="text-green-600">Our Platform</span>
      </h2>
      <p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">
        Discover the features that make us the preferred choice for modern agriculture.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
