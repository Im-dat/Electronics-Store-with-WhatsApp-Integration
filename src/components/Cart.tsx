import React from 'react';
import { X, MessageCircle } from 'lucide-react';
import type { Product } from '../data/products';

interface CartProps {
  items: Product[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export function Cart({ items, onRemove, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
      <div className="space-y-3 max-h-96 overflow-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
        >
          <MessageCircle size={20} />
          Checkout via WhatsApp
        </button>
      </div>
    </div>
  );
}