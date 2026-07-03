import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import divineLogo from '../assets/images/Divine.png';

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0, opacity: 0 });
  const navRef = useRef(null);
  const buttonRefs = useRef([]);

  const shouldBeDark = isScrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

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
    { name: 'Home', id: 'home', path: '/' },
    { name: 'About Us', id: 'about', path: '/about' },
    { name: 'Gallery', id: 'gallery', path: '/projects' },
    { name: 'Contact', id: 'contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          shouldBeDark ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-yellow-600/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">

            {/* Logo */}
            <Link to="/" className="flex items-center cursor-pointer">
              <img
                src={divineLogo}
                alt="Divine Dwelling Logo"
                className={`transition-all duration-300 ${
                  shouldBeDark
                    ? 'h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40'
                    : 'h-28 sm:h-32 md:h-36 lg:h-40 xl:h-44'
                }`}
                style={{
                  filter: shouldBeDark
                    ? 'drop-shadow(0 0 12px rgba(212,175,55,0.4))'
                    : 'drop-shadow(0 0 18px rgba(255,255,255,1))',
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div
              ref={navRef}
              className="hidden md:flex items-center relative"
              onMouseLeave={handleMouseLeave}
            >
              {/* Sliding pill background */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 h-10 rounded-full pointer-events-none ${
                  shouldBeDark ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-white/20 backdrop-blur-sm'
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
                <Link
                  key={item.id}
                  to={item.path}
                  ref={(el) => (buttonRefs.current[index] = el)}
                  onClick={closeMenu}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={`relative px-6 py-2.5 text-lg font-semibold transition-colors duration-200 flex items-center gap-1.5 ${
                    shouldBeDark
                      ? hoveredIndex === index ? 'text-yellow-400' : 'text-white'
                      : hoveredIndex === index ? 'text-yellow-200' : 'text-white'
                  }`}
                >
                  {item.name}

                  {/* Sliding underline per button */}
                  <span
                    className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full transition-all duration-300 ease-out origin-left ${
                      shouldBeDark ? 'bg-yellow-500' : 'bg-yellow-300'
                    } ${hoveredIndex === index ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
                  />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-3 rounded-lg transition-all duration-300 ${
                shouldBeDark ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/20'
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
                shouldBeDark ? 'bg-black/95 border-b border-yellow-600/10' : 'bg-black/30 backdrop-blur-md'
              } rounded-b-lg`}
            >
              {navItems.map((item, index) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={closeMenu}
                  className={`relative group block w-full text-left px-6 py-4 text-lg font-medium transition-colors duration-200 overflow-hidden ${
                    shouldBeDark ? 'text-white hover:text-yellow-400' : 'text-white hover:text-yellow-200'
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
                      shouldBeDark ? 'bg-yellow-500/10' : 'bg-white/10'
                    }`}
                  />

                  {/* Left accent bar */}
                  <div
                    className={`absolute left-0 top-0 w-0.5 h-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out origin-top ${
                      shouldBeDark ? 'bg-yellow-500' : 'bg-yellow-300'
                    }`}
                  />

                  <span className="relative z-10">{item.name}</span>
                </Link>
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