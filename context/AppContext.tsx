import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { featuredProducts, flashSaleProducts, wishlistProducts } from '@/data/products';
import { Product } from '@/types/product';
import { CartItem } from '@/types/cart';
import { Alert, Dimensions } from 'react-native';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface AppContextType {
  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;

  // Wishlist
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Products
  products: Product[];
  getProductById: (id: string) => Product | undefined;

  // Responsive design
  dimensions: { width: number; height: number };
  isSmallDevice: boolean;
  isMediumDevice: boolean;
  isLargeDevice: boolean;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    cartItems,
    addToCart: cartAddToCart,
    removeFromCart: cartRemoveFromCart,
    updateQuantity: updateCartItemQuantity,
    clearCart,
    totalPrice: cartTotal
  } = useCart();

  const {
    wishlistItems,
    addToWishlist: wishlistAddToWishlist,
    removeFromWishlist,
    isInWishlist
  } = useWishlist();

  // Products state
  const [products, setProducts] = useState<Product[]>(featuredProducts);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Responsive design
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  // Calculate device size with better breakpoints
  const isSmallDevice = dimensions.width < 390;  // iPhone SE and similar small devices
  const isMediumDevice = dimensions.width >= 390 && dimensions.width < 768;  // Most phones
  const isLargeDevice = dimensions.width >= 768;  // Tablets and larger devices

  // Update dimensions on window resize
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription.remove();
  }, []);

  // Add item to cart with alert matching AppContext behavior
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    cartAddToCart(product, quantity);

    if (existingItem) {
      Alert.alert('Success', `Updated ${product.name} quantity in cart (${existingItem.quantity + quantity} total)`);
    } else {
      Alert.alert('Added to Cart!', `${product.name} has been added to your cart.`, [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => {} }
      ]);
    }
  };

  const removeFromCart = (productId: string) => {
    cartRemoveFromCart(productId);
  };

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      wishlistAddToWishlist(product);
      Alert.alert('Added to Wishlist!', `${product.name} has been saved to your wishlist.`, [
        { text: 'Continue', style: 'cancel' },
        { text: 'View Wishlist', onPress: () => {} }
      ]);
    }
  };

  // Get product by ID
  const getProductById = (id: string) => {
    const allProducts = [
      ...products,
      ...flashSaleProducts,
      ...wishlistProducts
    ];
    return allProducts.find(product => product.id === id);
  };

  // Update search results when query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredResults = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, [searchQuery, products]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    cartTotal,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    products,
    getProductById,
    dimensions,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    searchQuery,
    setSearchQuery,
    searchResults
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
