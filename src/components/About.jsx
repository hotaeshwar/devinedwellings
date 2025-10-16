import React, { useState, useEffect, useRef } from 'react';
import DivineLogo from '../assets/images/Divine.png';
import { Building2, Users, Award, MapPin } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    properties: 0,
    families: 0,
    experience: 0,
    cities: 0
  });
  
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  const stats = [
    { key: 'properties', icon: Building2, label: 'Properties Sold', value: 500, suffix: '+' },
    { key: 'families', icon: Users, label: 'Happy Families', value: 450, suffix: '+' },
    { key: 'experience', icon: Award, label: 'Years Experience', value: 15, suffix: '+' },
    { key: 'cities', icon: MapPin, label: 'Cities Covered', value: 12, suffix: '+' }
  ];

  // Navigation function to scroll to gallery section
  const scrollToGallery = () => {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Scroll detection without Intersection Observer
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && !hasAnimated.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Trigger when section is 70% visible
        if (rect.top <= windowHeight * 0.7 && rect.bottom >= 0) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated counter function
  const animateCount = (target, key, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      setCounts(prev => ({
        ...prev,
        [key]: Math.floor(current)
      }));
    }, 16);
  };

  // Start counting animations when visible
  useEffect(() => {
    if (isVisible) {
      stats.forEach(stat => {
        setTimeout(() => {
          animateCount(stat.value, stat.key, 2000);
        }, 300); // Slight delay for better effect
      });
    }
  }, [isVisible]);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Logo Section */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <img 
                  src={DivineLogo} 
                  alt="Divine Dwellings Logo" 
                  className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain rounded-2xl bg-white shadow-xl transform group-hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 leading-tight tracking-wide underline decoration-yellow-400">
                  Divine Dwellings
                </h1>
              </div>

              <div className="space-y-6">
                <span className="block text-lg sm:text-xl text-yellow-400 leading-relaxed font-medium">
                  Your trusted partner in finding the perfect home. We transform dreams into addresses and houses into cherished memories.
                </span>

                <span className="block text-base sm:text-lg text-yellow-300 leading-relaxed">
                  At Divine Dwellings, we understand that a home is more than just four walls and a roof. It's where life unfolds, families grow, and memories are created. With our deep expertise in the real estate market and unwavering commitment to excellence, we guide you through every step of your property journey.
                </span>

                <span className="block text-base sm:text-lg text-yellow-300 leading-relaxed">
                  Our team of seasoned professionals brings years of market knowledge, innovative technology, and personalized service to ensure you find not just a property, but your perfect sanctuary. From luxurious villas to cozy apartments, from commercial spaces to investment opportunities – we make your real estate dreams come true.
                </span>
              </div>

              {/* CTA Button with Navigation */}
              <div className="pt-4">
                <button 
                  onClick={scrollToGallery}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  Explore Properties
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section 
        ref={sectionRef}
        className={`py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-medium text-yellow-400 mb-6 tracking-wide leading-tight">
              Our <span className="text-yellow-600">Journey</span> in Numbers
            </h2>
            <span className="text-lg text-yellow-300 max-w-2xl mx-auto block leading-relaxed">
              These numbers represent the trust our clients have placed in us and the success stories we've been part of creating.
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`bg-black rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 border border-yellow-600 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms` 
                }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-black" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2 min-h-[2.5rem] flex items-center justify-center">
                  {counts[stat.key]}{stat.suffix}
                </div>
                <div className="text-sm sm:text-base text-yellow-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-yellow-400 mb-8 tracking-wide">
            Our <span className="text-yellow-600">Mission</span>
          </h2>
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 border border-yellow-600">
            <span className="text-lg sm:text-xl text-yellow-400 leading-relaxed block mb-6">
              To redefine the real estate experience by combining cutting-edge technology with personalized service, ensuring every client finds their ideal property match.
            </span>
            <span className="text-base sm:text-lg text-yellow-300 leading-relaxed block">
              We believe in building lasting relationships, not just closing deals. Our commitment extends beyond the transaction to provide ongoing support and guidance in your property journey.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;