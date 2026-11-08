import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CartItem as CartItemType } from '@/types/cart';
import { useCart } from '@/context/CartContext';
import { colors, typography, spacing } from '@/constants/theme';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const itemTotal = item.price * item.quantity;

  return (
    <View style={styles.card}>
      <View style={styles.imageCol}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.infoCol}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <TouchableOpacity
            onPress={() => removeFromCart(item.id)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="trash-2" size={16} color={colors.secondaryText} />
          </TouchableOpacity>
        </View>

        {item.selectedSize && (
          <Text style={styles.variantText}>SIZE: {item.selectedSize}</Text>
        )}
        {item.selectedColor && (
          <Text style={styles.variantText}>COLOR: {item.selectedColor}</Text>
        )}

        <View style={styles.actionRow}>
          <Text style={styles.price}>${itemTotal.toFixed(2)}</Text>

          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Feather name="minus" size={14} color={colors.primaryText} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Feather name="plus" size={14} color={colors.primaryText} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    flexDirection: 'row',
    padding: spacing.sm,
    gap: spacing.md,
    alignItems: 'center',
  },
  imageCol: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#EDEAE2',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoCol: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontFamily: typography.fonts.bodyMedium,
    fontSize: typography.sizes.sm,
    color: colors.primaryText,
    fontWeight: '600',
    paddingRight: 8,
  },
  variantText: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 9,
    color: colors.secondaryText,
    letterSpacing: 1,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  price: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.base,
    fontWeight: '700',
    color: colors.primaryText,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  qtyBtn: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xs,
    fontWeight: '700',
    color: colors.primaryText,
    minWidth: 16,
    textAlign: 'center',
  },
});
