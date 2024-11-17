import React, { useState } from 'react';
import { Monitor } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { ProductCarousel } from './components/ProductCarousel';
import { products, type Product } from './data/products';

function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    const message = cartItems
      .map(item => `${item.name} - $${item.price}`)
      .join('\n');
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const whatsappMessage = encodeURIComponent(
      `Hello! I would like to purchase:\n\n${message}\n\nTotal: $${total.toFixed(2)}`
    );
    window.open(`https://wa.me/+1234567890?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="text-indigo-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">TechStore</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-12">
          <ProductCarousel products={products} />
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>

        <Cart
          items={cartItems}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © 2024 TechStore. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;