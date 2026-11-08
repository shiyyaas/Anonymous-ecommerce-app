import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Product } from '@/types/product';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { colors, typography, spacing } from '@/constants/theme';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = (e: any) => {
    e.stopPropagation?.();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation?.();
    addToCart(product, 1);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
        {product.discountPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>SALE</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={toggleWishlist}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.7}
        >
          <Feather
            name="heart"
            size={16}
            color={inWishlist ? '#DC2626' : colors.primaryText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.title} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.footerRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              ${(product.discountPrice || product.price).toFixed(2)}
            </Text>
            {product.discountPrice && (
              <Text style={styles.originalPrice}>
                ${product.price.toFixed(2)}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={handleAddToCart}
            activeOpacity={0.7}
          >
            <Feather name="plus" size={16} color={colors.primaryText} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#EDEAE2',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.primaryText,
  },
  discountText: {
    fontFamily: typography.fonts.heading,
    fontSize: 9,
    fontWeight: '800',
    color: colors.primaryText,
    letterSpacing: 1,
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoContainer: {
    padding: spacing.sm,
  },
  category: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 9,
    color: colors.secondaryText,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: typography.sizes.sm,
    color: colors.primaryText,
    fontWeight: '500',
    lineHeight: 18,
    minHeight: 36,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  price: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.base,
    fontWeight: '700',
    color: colors.primaryText,
  },
  originalPrice: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.xs,
    color: colors.mutedText,
    textDecorationLine: 'line-through',
  },
  addToCartBtn: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.primaryText,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
