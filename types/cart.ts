export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  storage?: string;
  features?: string[];
  product?: import('./product').Product;
  selectedColor?: string;
  selectedSize?: string;
}
