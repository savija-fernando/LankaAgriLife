import React from "react";
import { Link } from "react-router-dom";
import useTypingEffect from "../hooks/useTypingEffect";
import { ArrowRight, Play, Star, Shield, Clock, TrendingUp, Users, Zap } from "lucide-react";

const Hero = () => {
  const paragraphText =
    "Trransform your ideas into sustainable agriculture with our platform. Manage crops, livestock, and resources efficiently with modern tools.";
  
  const typedText = useTypingEffect(paragraphText, 40);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Photo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80')",
        }}
      >
        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-200! rounded-full mix-blend-multiply filter blur-xl! opacity-20! animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-200! rounded-full mix-blend-multiply filter blur-xl! opacity-20! animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-teal-200! rounded-full mix-blend-multiply filter blur-xl! opacity-20! animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100/80! backdrop-blur-sm! border border-green-200! text-green-700! text-sm! font-medium! mb-8">
          <Star className="w-4 h-4 fill-green-500! text-green-500!" />
          Trusted by 5,000+ farmers worldwide
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl! sm:text-6xl! lg:text-7xl! font-bold! text-white! leading-tight! mb-6!">
          Grow Something{" "}
          <span className="bg-gradient-to-r from-green-400! via-emerald-400! to-teal-400! bg-clip-text! text-transparent!">
            Amazing
          </span>{" "}
          Today
        </h1>

        {/* Typing Text */}
        <div className="max-w-3xl mx-auto mb-10">
          <p className="text-xl! lg:text-2xl! text-white/90! leading-relaxed! font-light!">
            {typedText}
            <span className="border-r-2! border-white! animate-blink ml-1">&nbsp;</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/login"
            className="group relative px-8 py-4 bg-gradient-to-r from-green-600! to-emerald-600! text-white! font-semibold! rounded-2xl! shadow-lg! hover:shadow-xl! transform hover:-translate-y-1! transition-all! duration-300! flex items-center gap-2 min-w-[160px] justify-center"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1! transition-transform!" />
          </Link>

          <button className="group px-8 py-4 bg-white/90! backdrop-blur-sm! text-gray-700! border border-gray-200! font-semibold! rounded-2xl! shadow-sm! hover:shadow-md! transform hover:-translate-y-1! transition-all! duration-300! flex items-center gap-2 min-w-[160px] justify-center hover:border-green-300!">
            <Play className="w-5 h-5 text-green-600!" />
            Watch Demo
          </button>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {[
            { 
              icon: <Users className="w-7 h-7!" />, 
              value: "5,000+", 
              label: "Farmers & Growers",
              description: "Active Community",
              gradient: "from-green-500 to-emerald-500",
              bgGradient: "from-green-50 to-emerald-50"
            },
            { 
              icon: <Shield className="w-7 h-7!" />, 
              value: "99.9%", 
              label: "Reliable Data",
              description: "Accuracy Guaranteed",
              gradient: "from-blue-500 to-cyan-500",
              bgGradient: "from-blue-50 to-cyan-50"
            },
            { 
              icon: <Clock className="w-7 h-7!" />, 
              value: "24/7", 
              label: "Support",
              description: "Always Available",
              gradient: "from-purple-500 to-indigo-500",
              bgGradient: "from-purple-50 to-indigo-50"
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-3xl blur-md opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
              
              {/* Main Card */}
              <div className="relative p-8 bg-white/95! backdrop-blur-sm! rounded-3xl border border-white/40! shadow-xl! hover:shadow-2xl! transform hover:-translate-y-2! transition-all duration-500 group-hover:border-white/60!">
                {/* Icon Container */}
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center text-white mb-5 mx-auto group-hover:scale-110! transition-transform duration-300 shadow-lg`}>
                  {stat.icon}
                </div>

                {/* Content */}
                <p className="text-4xl! font-black! text-gray-900! mb-2!">{stat.value}</p>
                <p className="text-lg! font-bold! text-gray-800! mb-1!">{stat.label}</p>
                <p className="text-gray-600! text-sm! font-medium! mb-4!">{stat.description}</p>
                
                {/* Animated Progress Bar */}
                <div className="w-full h-2 bg-gray-200/80! rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transform origin-left transition-all duration-1000 group-hover:scale-x-100 scale-x-95`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;