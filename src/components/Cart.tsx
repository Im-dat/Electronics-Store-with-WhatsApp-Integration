import React, { useState } from 'react';
import { X, MessageCircle, Loader, Plus, Minus } from 'lucide-react';
import type { Product, CartItem } from '../config/store';
import { storeConfig } from '../config/store';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
  onClose: () => void;
}

export function Cart({ items, onRemove, onUpdateQuantity, onCheckout, onClose }: CartProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      await onCheckout();
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 animate-slide-left">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Carrinho ({items.reduce((sum, item) => sum + item.quantity, 0)} itens)</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar carrinho"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 flex flex-col h-[calc(100vh-180px)]">
          <div className="flex-1 overflow-auto">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Seu carrinho está vazio</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div 
                    key={item.product.id} 
                    className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg animate-fade-in"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {storeConfig.currency} {item.product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded-full"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded-full"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="p-2 hover:bg-red-100 rounded-full text-red-500 transition-colors"
                      aria-label={`Remover ${item.product.name} do carrinho`}
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold">{storeConfig.currency} {total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <>
                    <MessageCircle size={20} />
                    Finalizar via WhatsApp
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}