import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import divineLogo from '../assets/images/Divine.png';

const Navbar = ({ onOpenProject }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0, opacity: 0 });
  const navRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    closeMenu();
  };

  const handleNavClick = (item) => {
    if (item.id === 'gallery') {
      if (onOpenProject) onOpenProject();
      closeMenu();
    } else {
      scrollToSection(item.id);
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    const btn = buttonRefs.current[index];
    const nav = navRef.current;
    if (btn && nav) {
      const btnRect = btn.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      setSliderStyle({
        width: btnRect.width,
        left: btnRect.left - navRect.left,
        opacity: 1,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">

            {/* Logo */}
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
                  filter: isScrolled
                    ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                    : 'drop-shadow(0 0 18px rgba(255,255,255,1))',
                }}
              />
            </div>

            {/* Desktop Navigation */}
            <div
              ref={navRef}
              className="hidden md:flex items-center relative"
              onMouseLeave={handleMouseLeave}
            >
              {/* Sliding pill background */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 h-10 rounded-full pointer-events-none ${
                  isScrolled ? 'bg-yellow-100' : 'bg-white/20 backdrop-blur-sm'
                }`}
                style={{
                  width: sliderStyle.width,
                  left: sliderStyle.left,
                  opacity: sliderStyle.opacity,
                  transition:
                    'left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease',
                }}
              />

              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  ref={(el) => (buttonRefs.current[index] = el)}
                  onClick={() => handleNavClick(item)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={`relative px-6 py-2.5 text-lg font-semibold transition-colors duration-200 flex items-center gap-1.5 ${
                    isScrolled
                      ? hoveredIndex === index ? 'text-yellow-700' : 'text-gray-700'
                      : hoveredIndex === index ? 'text-yellow-200' : 'text-white'
                  }`}
                >
                  {item.name}

                  {/* Sliding underline per button */}
                  <span
                    className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full transition-all duration-300 ease-out origin-left ${
                      isScrolled ? 'bg-yellow-500' : 'bg-yellow-300'
                    } ${hoveredIndex === index ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
                  />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-3 rounded-lg transition-all duration-300 ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
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
              className={`py-4 space-y-1 ${
                isScrolled ? 'bg-white/95' : 'bg-black/30 backdrop-blur-md'
              } rounded-b-lg`}
            >
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`relative group w-full text-left px-6 py-4 text-lg font-medium transition-colors duration-200 overflow-hidden ${
                    isScrolled ? 'text-gray-700 hover:text-yellow-700' : 'text-white hover:text-yellow-200'
                  }`}
                  style={{
                    animationDelay: `${index * 80}ms`,
                    animation: isMenuOpen ? 'slideInFromTop 0.4s ease-out forwards' : 'none',
                    opacity: 0,
                  }}
                >
                  {/* Sliding bg fill from left */}
                  <div
                    className={`absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out ${
                      isScrolled ? 'bg-yellow-50' : 'bg-white/10'
                    }`}
                  />

                  {/* Left accent bar */}
                  <div
                    className={`absolute left-0 top-0 w-0.5 h-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out origin-top ${
                      isScrolled ? 'bg-yellow-500' : 'bg-yellow-300'
                    }`}
                  />

                  <span className="relative z-10">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes slideInFromTop {
          0%   { opacity: 0; transform: translateY(-12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        html { scroll-behavior: smooth; }
        [id]  { scroll-margin-top: 96px; }
      `}</style>
    </>
  );
};

export default Navbar;