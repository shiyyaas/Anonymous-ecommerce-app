export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  images?: string[];
  description: string;
  rating: number;
  reviews?: number;
  reviewsCount?: number;
  sold?: number;
  onStock?: number;
  category: string;
  isFavorite?: boolean;
  isFeatured?: boolean;
}
