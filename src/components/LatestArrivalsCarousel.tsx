import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestArrivalsCarousel: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    { id: 1, name: "Bold Vibe Oversize T-Shirt", price: 696, image: "Raritone Collection/Bold vibe Oversize Tshirt.jpg" },
    { id: 2, name: "Raritone Hoodie", price: 1043, image: "Raritone Collection/Hoddie1(F).jpg" },
    { id: 3, name: "Kiss Me Again Oversize T-Shirt", price: 399, image: "Raritone Collection/Kiss me again.jpeg" },
    { id: 4, name: "Minimal Look Oversize T-Shirt", price: 599, image: "Raritone Collection/Minimal look Oversize Tshirt.jpg" }
  ];

  const itemsPerView = window.innerWidth >= 1280 ? 4 : window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="relative w-full max-w-full">
      {/* Translucent Glass Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[var(--text-primary)] hover:bg-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
        style={{ backdropFilter: 'blur(15px)' }}
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        disabled={currentIndex >= maxIndex}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[var(--text-primary)] hover:bg-white/20 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
        style={{ backdropFilter: 'blur(15px)' }}
      >
        <ChevronRight size={28} />
      </button>

      {/* Full Width Products Container with Proper Spacing */}
      <div className="w-full overflow-hidden px-20">
        <motion.div
          className="flex gap-8"
          animate={{ x: `${-currentIndex * (100 / itemsPerView)}%` }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{ width: `${(products.length / itemsPerView) * 100}%` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 cursor-pointer group rounded-2xl overflow-hidden bg-[var(--card-bg)] border border-[var(--border-color)] hover-lift shadow-lg"
              style={{ 
                width: `calc(${100 / itemsPerView}% - 32px)`,
                marginLeft: '16px',
                marginRight: '16px'
              }}
              onClick={() => navigate('/catalog')}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-t-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-xl font-bold text-[var(--accent-color)]">₹{product.price}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Dots Indicator */}
      {maxIndex > 0 && (
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[var(--accent-color)] scale-125' 
                  : 'bg-[var(--accent-color)]/30 hover:bg-[var(--accent-color)]/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestArrivalsCarousel;