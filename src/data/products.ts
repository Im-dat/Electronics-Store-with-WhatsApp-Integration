export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Pro Wireless Headphones',
    price: 299.99,
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    category: 'Audio'
  },
  {
    id: '2',
    name: 'Ultra 4K Smart TV',
    price: 899.99,
    description: '55-inch 4K HDR display with smart features',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800',
    category: 'TV'
  },
  {
    id: '3',
    name: 'Gaming Laptop Pro',
    price: 1299.99,
    description: 'High-performance gaming laptop with RGB keyboard',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800',
    category: 'Computers'
  },
  {
    id: '4',
    name: 'Smart Watch Elite',
    price: 249.99,
    description: 'Advanced fitness tracking and notifications',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800',
    category: 'Wearables'
  }
];