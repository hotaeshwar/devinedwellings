import React from 'react';
import { MapPin, Mail, Facebook, Instagram, Twitter, Linkedin, ArrowUp } from 'lucide-react';
import divineLogo from '../assets/images/Divine.png';

const Footer = () => {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-600 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info Section */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <img 
                  src={divineLogo} 
                  alt="Divine Dwelling Logo" 
                  className="h-16 sm:h-18 md:h-20 lg:h-24 transition-transform duration-300 hover:scale-110 drop-shadow-2xl brightness-110 contrast-125 saturate-125 filter"
                />
                <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 drop-shadow-lg">
                  Divine Dwelling
                </h3>
              </div>



              {/* Social Media Links */}
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, href: '#', label: 'Facebook' },
                  { Icon: Instagram, href: '#', label: 'Instagram' },
                  { Icon: Twitter, href: '#', label: 'Twitter' },
                  { Icon: Linkedin, href: '#', label: 'LinkedIn' }
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="group bg-gray-700 hover:bg-yellow-600 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-6">
              <h4 className="text-lg sm:text-xl font-semibold text-yellow-400 border-b border-yellow-600/30 pb-2">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', id: 'home' },
                  { name: 'About Us', id: 'about' },
                  { name: 'Services', id: 'services' },
                  { name: 'Contact', id: 'contact' }
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-sm sm:text-base hover:translate-x-2 transform inline-block"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Section */}
            <div className="space-y-6">
              <h4 className="text-lg sm:text-xl font-semibold text-yellow-400 border-b border-yellow-600/30 pb-2">
                Our Services
              </h4>
              <ul className="space-y-3">
                {[
                  'Sacred Space Design',
                  'Spiritual Wellness',
                  'Community Building',
                  'Holistic Living',
                  'Meditation Spaces',
                  'Energy Alignment'
                ].map((service) => (
                  <li key={service}>
                    <span className="text-gray-300 text-sm sm:text-base hover:text-yellow-400 transition-colors duration-300 cursor-pointer hover:translate-x-2 transform inline-block">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-6">
              <h4 className="text-lg sm:text-xl font-semibold text-yellow-400 border-b border-yellow-600/30 pb-2">
                Get in Touch
              </h4>
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start space-x-3 group">
                  <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Sector 82<br />
                      Mohali, Punjab<br />
                      India
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 group">
                  <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <a 
                    href="mailto:divinedwellings2025@gmail.com" 
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-sm sm:text-base"
                  >
                    divinedwellings2025@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              
              {/* Copyright */}
              <div className="text-center sm:text-left">
                <p className="text-gray-400 text-xs sm:text-sm">
                  © {new Date().getFullYear()} Divine Dwelling. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Crafted with ♥ for sacred living spaces
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center sm:justify-end items-center space-x-4 sm:space-x-6">
                <a href="#" className="text-gray-400 hover:text-yellow-400 text-xs sm:text-sm transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 text-xs sm:text-sm transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-yellow-400 text-xs sm:text-sm transition-colors duration-300">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 text-white group-hover:animate-bounce" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;