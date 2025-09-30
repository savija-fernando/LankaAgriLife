import React from "react";
import facebookIcon from "../assets/facebook.png";
import twitterIcon from "../assets/twitter.png";
import instagramIcon from "../assets/instagram.png";
import githubIcon from "../assets/github.png";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-green-900 to-gray-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                LankaAgriLife
              </span>
            </div>
            <p className="text-gray-300 text-center md:text-left max-w-md leading-relaxed">
              Empowering farmers with modern agricultural solutions. Growing
              together for a sustainable future.
            </p>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
              {[
                { name: "Facebook", icon: facebookIcon, color: "hover:bg-blue-600" },
                { name: "Twitter", icon: twitterIcon, color: "hover:bg-gray-900" },
                { name: "Instagram", icon: instagramIcon, color: "hover:bg-pink-500" },
                { name: "GitHub", icon: githubIcon, color: "hover:bg-gray-800" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color} p-2`}
                  aria-label={social.name}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-6 h-6 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-green-400 mb-4 text-center md:text-left">
              Get In Touch
            </h3>
            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-300">
                <svg
                  className="w-5 h-5 text-green-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm md:text-base">
                  lankaagrilife@gmail.com
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-300">
                <svg
                  className="w-5 h-5 text-green-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm md:text-base">+94 70 150 1303</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-300">
                <svg
                  className="w-5 h-5 text-green-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm md:text-base">Malabe, Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-green-400">LankaAgriLife</span>.
            All rights reserved.
          </p>

          <div className="flex space-x-6 text-sm text-gray-400">
            <a
              href="#"
              className="hover:text-green-400 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-green-400 transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-green-400 transition-colors duration-300"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500"></div>
    </footer>
  );
};

export default Footer;
