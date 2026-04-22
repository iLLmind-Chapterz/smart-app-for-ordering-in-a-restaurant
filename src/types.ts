export interface MenuItem {
  id: string;
  name: string;
  description: string;
  detailedDescription?: string;
  ingredients?: string[];
  price: number;
  category: 'Food' | 'Drink' | 'Dessert';
  tags: string[];
  image: string;
  pairingIds?: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Reservation {
  id: string;
  userId: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'delivered' | 'completed' | 'processing';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}
