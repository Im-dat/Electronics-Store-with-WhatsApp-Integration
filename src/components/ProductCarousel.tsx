import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../config/store';
import { storeConfig } from '../config/store';

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((current) => (current + 1) % products.length);
  };

  const prev = () => {
    setCurrentIndex((current) => (current - 1 + products.length) % products.length);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full h-full flex-shrink-0 relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-white text-2xl font-bold">{product.name}</h3>
              <p className="text-white/90 mt-2">{storeConfig.currency} {product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 transition-colors"
        aria-label="Produto anterior"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/50 transition-colors"
        aria-label="Próximo produto"
      >
        <ChevronRight className="text-white" size={24} />
      </button>
    </div>
  );
}