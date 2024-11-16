import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(images.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerSlide >= images.length ? 0 : prevIndex + itemsPerSlide
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - itemsPerSlide < 0 ? images.length - itemsPerSlide : prevIndex - itemsPerSlide
    );
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex * itemsPerSlide);
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-1/3 flex-shrink-0 p-2"
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white
            p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white
            p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-800" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 
              ${currentIndex / itemsPerSlide === index 
                ? 'bg-green-600 w-6' 
                : 'bg-gray-300 hover:bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel; 