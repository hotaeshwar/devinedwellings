import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

const PropertyCarousel = ({ autoPlayInterval = 4000, showControls = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState(new Set());

  // Property media items - memoized to prevent recreation
  const propertyMedia = useMemo(() => [
    { type: 'image', src: '/src/assets/images/dwellings1.jpg', alt: 'Luxury property exterior view' },
    { type: 'image', src: '/src/assets/images/dwellings2.jpg', alt: 'Modern kitchen interior' },
    { type: 'image', src: '/src/assets/images/dwellings3.jpg', alt: 'Spacious living room' },
    { type: 'image', src: '/src/assets/images/dwellings4.jpg', alt: 'Master bedroom suite' },
    { type: 'image', src: '/src/assets/images/dwellings5.jpg', alt: 'Contemporary bathroom' },
    { type: 'image', src: '/src/assets/images/dwellings6.jpg', alt: 'Elegant dining area' },
    { type: 'image', src: '/src/assets/images/dwellings7.jpg', alt: 'Outdoor patio space' },
    { type: 'image', src: '/src/assets/images/dwellings8.jpg', alt: 'Garden landscape view' },
    { type: 'image', src: '/src/assets/images/dwellings9.jpg', alt: 'Property front entrance' },
    { type: 'image', src: '/src/assets/images/dwellings10.jpg', alt: 'Balcony with city view' },
    { type: 'image', src: '/src/assets/images/dwellings11.jpg', alt: 'Guest bedroom' },
    { type: 'image', src: '/src/assets/images/dwellings12.jpg', alt: 'Home office space' },
    { type: 'image', src: '/src/assets/images/dwellings13.jpg', alt: 'Recreation room' },
    { type: 'image', src: '/src/assets/images/dwellings14.jpg', alt: 'Laundry and utility area' },
    { type: 'image', src: '/src/assets/images/dwellings15.jpg', alt: 'Garage and parking' },
    { type: 'image', src: '/src/assets/images/dwellings16.jpg', alt: 'Swimming pool area' },
    { type: 'image', src: '/src/assets/images/dwellings17.jpg', alt: 'Rooftop terrace' },
    { type: 'image', src: '/src/assets/images/dwelllings19.jpg', alt: 'Night exterior view' },
    { type: 'image', src: '/src/assets/images/dwellings20.jpg', alt: 'Aerial property view' },
    { type: 'image', src: '/src/assets/images/dwellingspromo.jpg', alt: 'Property promotional image' },
    { type: 'image', src: '/src/assets/images/dwellingspromo1.jpg', alt: 'Featured property highlight' },
    { type: 'video', src: '/src/assets/images/propertyvideo.mp4', alt: 'Property video tour' }
  ], []);

  // Auto-play functionality with proper cleanup
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === propertyMedia.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, propertyMedia.length, autoPlayInterval]);

  // Preload adjacent images for smoother transitions
  useEffect(() => {
    const preloadImage = (index) => {
      if (propertyMedia[index]?.type === 'image') {
        const img = new Image();
        img.src = propertyMedia[index].src;
      }
    };

    // Preload current, next, and previous images
    const nextIndex = (currentIndex + 1) % propertyMedia.length;
    const prevIndex = currentIndex === 0 ? propertyMedia.length - 1 : currentIndex - 1;
    
    preloadImage(nextIndex);
    preloadImage(prevIndex);
    
    setIsLoading(false);
  }, [currentIndex, propertyMedia]);

  // Navigation handlers with useCallback to prevent recreation
  const goToPrevious = useCallback(() => {
    setCurrentIndex((current) => current === 0 ? propertyMedia.length - 1 : current - 1);
    setIsAutoPlaying(false);
  }, [propertyMedia.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((current) => current === propertyMedia.length - 1 ? 0 : current + 1);
    setIsAutoPlaying(false);
  }, [propertyMedia.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => setIsAutoPlaying(false), []);
  const handleMouseLeave = useCallback(() => setIsAutoPlaying(true), []);

  // Handle image load errors
  const handleImageError = useCallback((index) => {
    setImageErrors((prev) => new Set(prev).add(index));
    console.error(`Failed to load image at index ${index}: ${propertyMedia[index]?.src}`);
  }, [propertyMedia]);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, toggleAutoPlay]);

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
            role="region"
            aria-label="Property gallery carousel"
            aria-live="polite"
          >
            {/* Slides Container */}
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {propertyMedia.map((media, index) => (
                <div 
                  key={`${media.type}-${index}`} 
                  className="w-full h-full flex-shrink-0 relative"
                  aria-hidden={index !== currentIndex}
                >
                  {media.type === 'image' ? (
                    <>
                      {!imageErrors.has(index) ? (
                        <img
                          src={media.src}
                          alt={media.alt}
                          className="w-full h-full object-cover"
                          loading={index === currentIndex ? 'eager' : 'lazy'}
                          onError={() => handleImageError(index)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <p className="text-yellow-400 text-center px-4">
                            Image failed to load<br />
                            <span className="text-sm text-gray-400">{media.alt}</span>
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <video
                      src={media.src}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={media.alt}
                    />
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true"></div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {showControls && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 bg-yellow-500/20 hover:bg-yellow-500/40 
                             backdrop-blur-sm rounded-full p-3 sm:p-4 transition-all duration-300
                             text-yellow-400 hover:text-yellow-300 z-10 border border-yellow-500/30
                             hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/25
                             focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Previous slide"
                  type="button"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 bg-yellow-500/20 hover:bg-yellow-500/40 
                             backdrop-blur-sm rounded-full p-3 sm:p-4 transition-all duration-300
                             text-yellow-400 hover:text-yellow-300 z-10 border border-yellow-500/30
                             hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/25
                             focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Next slide"
                  type="button"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            {/* Media Counter */}
            <div 
              className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 z-10"
              aria-label={`Slide ${currentIndex + 1} of ${propertyMedia.length}`}
            >
              <span className="text-yellow-400 text-sm sm:text-base font-medium">
                {currentIndex + 1} / {propertyMedia.length}
              </span>
            </div>

            {/* Touch/Swipe Areas for Mobile */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div 
                className="absolute left-0 top-0 w-1/3 h-full cursor-pointer pointer-events-auto"
                onClick={goToPrevious}
                role="button"
                tabIndex={-1}
              />
              <div 
                className="absolute right-0 top-0 w-1/3 h-full cursor-pointer pointer-events-auto"
                onClick={goToNext}
                role="button"
                tabIndex={-1}
              />
            </div>
          </div>

          {/* Card Footer */}
          <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4 sm:p-6">
            
            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mb-4 flex-wrap gap-y-2" role="tablist" aria-label="Slide navigation">
              {propertyMedia.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 focus:ring-offset-black ${
                    index === currentIndex 
                      ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50' 
                      : 'bg-yellow-600/50 hover:bg-yellow-500/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-selected={index === currentIndex}
                  role="tab"
                  type="button"
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-yellow-600/20 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={propertyMedia.length}>
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${((currentIndex + 1) / propertyMedia.length) * 100}%` }}
              />
            </div>

            {/* Auto-play Controls */}
            {showControls && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={toggleAutoPlay}
                  className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-full text-sm transition-all duration-300 border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                  type="button"
                >
                  {isAutoPlaying ? 'Pause' : 'Play'} Slideshow
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Keyboard Navigation Hint */}
        <div className="text-center mt-6 text-yellow-600/60 text-sm" aria-live="polite">
          Use arrow keys to navigate, spacebar to pause/play
        </div>
      </div>
    </div>
  );
};

PropertyCarousel.propTypes = {
  autoPlayInterval: PropTypes.number,
  showControls: PropTypes.bool
};

export default PropertyCarousel;
