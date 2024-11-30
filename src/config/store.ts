import { LucideIcon, Sofa, Bed, Tv, Lamp, Fan, DoorOpen, Utensils, Refrigerator } from 'lucide-react';

// Tipos
export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Configuração da loja
export const storeConfig = {
  name: "Tambosi Móveis e Eletros",
  phone: "(47) 99991-7354",
  email: "contato@tambosi.com.br",
  address: "Av. Brasil, 1500 - Centro",
  whatsapp: "5547999917354",
  currency: "R$"
};

// Categorias
export const categories: Category[] = [
  { id: 'sala', name: 'Sala', icon: Sofa },
  { id: 'quarto', name: 'Quarto', icon: Bed },
  { id: 'eletronicos', name: 'Eletrônicos', icon: Tv },
  { id: 'iluminacao', name: 'Iluminação', icon: Lamp },
  { id: 'climatizacao', name: 'Climatização', icon: Fan },
  { id: 'cozinha', name: 'Cozinha', icon: Utensils },
  { id: 'eletrodomesticos', name: 'Eletrodomésticos', icon: Refrigerator },
  { id: 'decoracao', name: 'Decoração', icon: DoorOpen }
];

// Produtos
export const products: Product[] = [
  {
    id: "1",
    name: "Sofá Retrátil 3 Lugares",
    price: 2499.99,
    description: "Sofá confortável com tecido suede e encosto reclinável",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    categoryId: "sala"
  },
  {
    id: "2",
    name: "Smart TV 55\" 4K",
    price: 3299.99,
    description: "TV LED com resolução 4K e sistema Android TV",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800",
    categoryId: "eletronicos"
  },
  {
    id: "3",
    name: "Cama Box Queen Size",
    price: 1899.99,
    description: "Conjunto cama box com colchão ortopédico",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800",
    categoryId: "quarto"
  },
  {
    id: "4",
    name: "Geladeira Frost Free",
    price: 4599.99,
    description: "Refrigerador duplex com tecnologia Frost Free",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=800",
    categoryId: "eletrodomesticos"
  },
  {
    id: "5",
    name: "Ar Condicionado Split",
    price: 2799.99,
    description: "12000 BTUs com tecnologia Inverter",
    image: "https://images.unsplash.com/photo-1614633833026-0820452613d9?auto=format&fit=crop&q=80&w=800",
    categoryId: "climatizacao"
  }
]; 