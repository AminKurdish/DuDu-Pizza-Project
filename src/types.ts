export interface MenuItem {
  id: string;
  name: { ku: string; ar: string };
  price: number;
  category: 'pizza' | 'side' | 'drink';
  description: { ku: string; ar: string };
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: 'Small' | 'Medium' | 'Large';
}

export interface CustomerDetails {
  name: string;
  neighborhood: string;
}
