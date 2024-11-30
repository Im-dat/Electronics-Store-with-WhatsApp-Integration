import React, { useState, useCallback } from 'react';
import { Monitor, AlertCircle, Search, ShoppingBag, Instagram } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { ProductCarousel } from './components/ProductCarousel';
import { CategoryFilter } from './components/CategoryFilter';
import { products, categories, storeConfig, type Product, CartItem } from './config/store';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategoryId || product.categoryId === selectedCategoryId;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = useCallback((product: Product) => {
    try {
      setCartItems(prev => {
        const existingItem = prev.find(item => item.product.id === product.id);
        if (existingItem) {
          return prev.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
      setIsCartOpen(true);
    } catch (err) {
      setError('Falha ao adicionar item ao carrinho');
    }
  }, []);

  const removeFromCart = useCallback((id: string) => {
    try {
      setCartItems(prev => prev.filter(item => item.product.id !== id));
    } catch (err) {
      setError('Falha ao remover item do carrinho');
    }
  }, []);

  const updateCartItemQuantity = useCallback((id: string, quantity: number) => {
    try {
      if (quantity < 1) return;
      setCartItems(prev => 
        prev.map(item =>
          item.product.id === id
            ? { ...item, quantity }
            : item
        )
      );
    } catch (err) {
      setError('Falha ao atualizar quantidade');
    }
  }, []);

  const handleCheckout = useCallback(() => {
    try {
      const message = cartItems
        .map(item => `${item.product.name} (${item.quantity}x) - ${storeConfig.currency} ${item.product.price}`)
        .join('\n');
      const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const whatsappMessage = encodeURIComponent(
        `Olá! Gostaria de comprar:\n\n${message}\n\nTotal: ${storeConfig.currency} ${total.toFixed(2)}`
      );
      window.open(`https://wa.me/${storeConfig.whatsapp}?text=${whatsappMessage}`, '_blank');
    } catch (err) {
      setError('Falha ao processar checkout');
    }
  }, [cartItems]);

  const dismissError = () => setError(null);

  return (
    <div className="min-h-screen bg-tambosi-gray">
      {error && (
        <div className="fixed top-4 right-4 bg-tambosi-red/10 border border-tambosi-red text-tambosi-red px-4 py-3 rounded-lg flex items-center gap-2 z-50 animate-slide-down">
          <AlertCircle size={20} />
          <span>{error}</span>
          <button onClick={dismissError} className="ml-2 font-bold">&times;</button>
        </div>
      )}

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="text-tambosi-navy" size={32} />
              <h1 className="text-2xl font-bold text-tambosi-navy">Tambosi Móveis e Eletros</h1>
            </div>
            
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-tambosi-navy"
                />
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-tambosi-navy/5 rounded-full transition-colors"
              aria-label="Abrir carrinho"
            >
              <ShoppingBag size={24} className="text-tambosi-navy" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-tambosi-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-12" aria-label="Carrossel de Produtos em Destaque">
          <ProductCarousel products={products} />
        </section>

        <section className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />
        </section>

        <section aria-label="Lista de Produtos">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </section>

        {isCartOpen && (
          <Cart
            items={cartItems}
            onRemove={removeFromCart}
            onUpdateQuantity={updateCartItemQuantity}
            onCheckout={handleCheckout}
            onClose={() => setIsCartOpen(false)}
          />
        )}
      </main>

      <footer className="bg-tambosi-navy text-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sobre a Tambosi Móveis e Eletros</h3>
              <p className="text-gray-200">
                Sua loja completa de móveis e eletrodomésticos.
                Oferecemos produtos de qualidade com os melhores preços da região.
              </p>
              <div className="mt-4">
                <a 
                  href="https://www.instagram.com/tambosimoveis/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-200 hover:text-tambosi-red transition-colors"
                >
                  <Instagram size={20} />
                  <span>@tambosimoveis</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-200 hover:text-tambosi-red">Início</a></li>
                <li><a href="#" className="text-gray-200 hover:text-tambosi-red">Produtos</a></li>
                <li><a href="#" className="text-gray-200 hover:text-tambosi-red">Sobre Nós</a></li>
                <li><a href="#" className="text-gray-200 hover:text-tambosi-red">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-gray-200">
                <li>Email: contato@tambosi.com.br</li>
                <li>Telefone: (47) 99991-7354</li>
                <li>Av. Brasil, 1500 - Centro</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            © {new Date().getFullYear()} Tambosi Móveis e Eletros. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;