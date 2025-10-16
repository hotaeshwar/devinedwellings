import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PropertyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Property media items
  const propertyMedia = [
    { type: 'image', src: '/src/assets/images/dwellings1.jpg', alt: 'Property 1' },
    { type: 'image', src: '/src/assets/images/dwellings2.jpg', alt: 'Property 2' },
    { type: 'image', src: '/src/assets/images/dwellings3.jpg', alt: 'Property 3' },
    { type: 'image', src: '/src/assets/images/dwellings4.jpg', alt: 'Property 4' },
    { type: 'image', src: '/src/assets/images/dwellings5.jpg', alt: 'Property 5' },
    { type: 'image', src: '/src/assets/images/dwellings6.jpg', alt: 'Property 6' },
    { type: 'image', src: '/src/assets/images/dwellings7.jpg', alt: 'Property 7' },
    { type: 'image', src: '/src/assets/images/dwellings8.jpg', alt: 'Property 8' },
    { type: 'image', src: '/src/assets/images/dwellings9.jpg', alt: 'Property 9' },
    { type: 'image', src: '/src/assets/images/dwellings10.jpg', alt: 'Property 10' },
    { type: 'image', src: '/src/assets/images/dwellings11.jpg', alt: 'Property 11' },
    { type: 'image', src: '/src/assets/images/dwellings12.jpg', alt: 'Property 12' },
    { type: 'image', src: '/src/assets/images/dwellings13.jpg', alt: 'Property 13' },
    { type: 'image', src: '/src/assets/images/dwellings14.jpg', alt: 'Property 14' },
    { type: 'image', src: '/src/assets/images/dwellings15.jpg', alt: 'Property 15' },
    { type: 'image', src: '/src/assets/images/dwellings16.jpg', alt: 'Property 16' },
    { type: 'image', src: '/src/assets/images/dwellings17.jpg', alt: 'Property 17' },
    { type: 'image', src: '/src/assets/images/dwelllings19.jpg', alt: 'Property 19' },
    { type: 'image', src: '/src/assets/images/dwellings20.jpg', alt: 'Property 20' },
    { type: 'image', src: '/src/assets/images/dwellingspromo.jpg', alt: 'Property Promo' },
    { type: 'image', src: '/src/assets/images/dwellingspromo1.jpg', alt: 'Property Promo 1' },
    { type: 'video', src: '/src/assets/images/propertyvideo.mp4', alt: 'Property Video' }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === propertyMedia.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, propertyMedia.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? propertyMedia.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === propertyMedia.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div className="w-full min-h-screen bg-black py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
            Property Gallery
          </h2>
          <p className="text-lg sm:text-xl text-yellow-300 max-w-2xl mx-auto">
            Explore our stunning collection of premium properties
          </p>
        </div>

        {/* Card Container */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl border border-yellow-600/20">
          
          {/* Main Carousel Container */}
          <div 
            className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Slides Container */}
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {propertyMedia.map((media, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 relative">
                  {media.type === 'image' ? (
                    <img
                      src={media.src}
                      alt={media.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <video
                      src={media.src}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 bg-yellow-500/20 hover:bg-yellow-500/40 
                         backdrop-blur-sm rounded-full p-3 sm:p-4 transition-all duration-300
                         text-yellow-400 hover:text-yellow-300 z-10 border border-yellow-500/30
                         hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/25"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 bg-yellow-500/20 hover:bg-yellow-500/40 
                         backdrop-blur-sm rounded-full p-3 sm:p-4 transition-all duration-300
                         text-yellow-400 hover:text-yellow-300 z-10 border border-yellow-500/30
                         hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/25"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Media Counter */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 z-10">
              <span className="text-yellow-400 text-sm sm:text-base font-medium">
                {currentIndex + 1} / {propertyMedia.length}
              </span>
            </div>

            {/* Touch/Swipe Areas for Mobile */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute left-0 top-0 w-1/3 h-full cursor-pointer pointer-events-auto"
                onClick={goToPrevious}
              />
              <div 
                className="absolute right-0 top-0 w-1/3 h-full cursor-pointer pointer-events-auto"
                onClick={goToNext}
              />
            </div>
          </div>

          {/* Card Footer */}
          <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4 sm:p-6">
            
            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mb-4">
              {propertyMedia.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50' 
                      : 'bg-yellow-600/50 hover:bg-yellow-500/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-yellow-600/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${((currentIndex + 1) / propertyMedia.length) * 100}%` }}
              />
            </div>

            {/* Auto-play Controls */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-full text-sm transition-all duration-300 border border-yellow-500/30"
              >
                {isAutoPlaying ? 'Pause' : 'Play'} Slideshow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCarousel;
