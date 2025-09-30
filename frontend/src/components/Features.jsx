import React from "react";
import { Leaf, ShieldCheck, Users, ArrowRight } from "lucide-react";

const features = [
  {
    icon: <Leaf className="w-12 h-12 text-white" />,
    title: "Smart Farming",
    desc: "AI-powered tools to monitor soil, weather, and plant growth with precision analytics.",
    gradient: "from-emerald-500 to-green-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-white" />,
    title: "Secure & Reliable",
    desc: "Your farm data is protected with enterprise-grade security and encryption.",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
  },
  {
    icon: <Users className="w-12 h-12 text-white" />,
    title: "Collaboration",
    desc: "Work with farm workers and stakeholders in real-time with seamless integration.",
    gradient: "from-purple-500 to-indigo-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Why Farmers Love Us
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Grow Smarter with{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Our Platform
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of agriculture with cutting-edge technology designed 
            to maximize your yield while minimizing environmental impact.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Background Card */}
              <div className={`absolute inset-0 ${feature.bgColor} rounded-3xl transform group-hover:scale-105 transition-all duration-500 opacity-0 group-hover:opacity-100`} />
              
              {/* Main Card */}
              <div className="relative p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col">
                {/* Icon Container */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {feature.desc}
                  </p>
                </div>

                {/* Learn More Link */}
                <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors cursor-pointer">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;