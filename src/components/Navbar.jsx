import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import divineLogo from '../assets/images/Divine.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking on a link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            
            {/* Logo Section - Extra Large Focus */}
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
              <img 
                src={divineLogo} 
                alt="Divine Dwelling Logo" 
                className={`transition-all duration-300 ${
                  isScrolled 
                    ? 'h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40' 
                    : 'h-28 sm:h-32 md:h-36 lg:h-40 xl:h-44'
                }`}
                style={{
                  filter: isScrolled ? 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))' : 'drop-shadow(0 0 18px rgba(255, 255, 255, 1))',
                }}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About Us', id: 'about' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group px-6 py-3 text-lg font-semibold transition-all duration-300 ease-in-out ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-yellow-600' 
                      : 'text-white hover:text-yellow-300'
                  }`}
                >
                  {/* Text */}
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                    {item.name}
                  </span>
                  
                  {/* Hover background */}
                  <div 
                    className={`absolute inset-0 rounded-full scale-0 transition-all duration-300 ease-out group-hover:scale-100 ${
                      isScrolled 
                        ? 'bg-yellow-100/80' 
                        : 'bg-white/20 backdrop-blur-sm'
                    }`}
                  />
                  
                  {/* Bottom border animation */}
                  <div 
                    className={`absolute bottom-1 left-1/2 h-0.5 w-0 transition-all duration-300 ease-out group-hover:w-full group-hover:left-0 ${
                      isScrolled 
                        ? 'bg-yellow-600' 
                        : 'bg-yellow-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-3 rounded-lg transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <div className="relative w-7 h-7">
                <Menu 
                  className={`absolute inset-0 w-7 h-7 transition-all duration-300 ${
                    isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                  }`}
                />
                <X 
                  className={`absolute inset-0 w-7 h-7 transition-all duration-300 ${
                    isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div 
              className={`py-4 space-y-2 ${
                isScrolled ? 'bg-white/95' : 'bg-black/30 backdrop-blur-md'
              } rounded-b-lg`}
            >
              {[
                { name: 'Home', id: 'home' },
                { name: 'About Us', id: 'about' },
                { name: 'Gallery', id: 'gallery' },
                { name: 'Contact', id: 'contact' }
              ].map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group w-full text-left px-6 py-4 text-lg font-medium transition-all duration-300 ease-in-out ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-yellow-600' 
                      : 'text-white hover:text-yellow-300'
                  }`}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: isMenuOpen ? 'slideInFromTop 0.5s ease-out forwards' : 'none'
                  }}
                >
                  {/* Background hover effect */}
                  <div 
                    className={`absolute inset-0 scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                      isScrolled 
                        ? 'bg-yellow-100/50' 
                        : 'bg-white/10'
                    }`}
                  />
                  
                  {/* Text */}
                  <span className="relative z-10 block transform transition-transform duration-300 group-hover:translate-x-3">
                    {item.name}
                  </span>
                  
                  {/* Left border animation */}
                  <div 
                    className={`absolute left-0 top-1/2 w-1 h-0 -translate-y-1/2 transition-all duration-300 ease-out group-hover:h-full ${
                      isScrolled 
                        ? 'bg-yellow-600' 
                        : 'bg-yellow-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        html {
          scroll-behavior: smooth;
        }

        [id] {
          scroll-margin-top: 96px;
        }
      `}</style>
    </>
  );
};

export default Navbar;