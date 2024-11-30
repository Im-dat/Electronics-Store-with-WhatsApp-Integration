import React from 'react';
import type { Category } from '../config/store';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryFilter({ categories, selectedCategoryId, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-4">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
          !selectedCategoryId 
            ? 'bg-indigo-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Todos os Produtos
      </button>
      
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            selectedCategoryId === category.id 
              ? 'bg-indigo-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <category.icon size={20} />
          {category.name}
        </button>
      ))}
    </div>
  );
} 