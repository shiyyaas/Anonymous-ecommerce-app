import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { AnonymousWordmark } from '@/components/common/AnonymousWordmark';
import { colors, typography, spacing } from '@/constants/theme';
import { Product } from '@/types/product';

export default function WishlistScreen() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const renderItem = ({ item }: { item: Product }) => {
    const currentPrice = item.discountPrice || item.price;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => router.push(`/product/${item.id}`)}
          style={styles.imageCol}
          activeOpacity={0.8}
        >
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        </TouchableOpacity>

        <View style={styles.contentCol}>
          <View style={styles.itemHeader}>
            <Text style={styles.category}>{item.category}</Text>
            <TouchableOpacity
              onPress={() => removeFromWishlist(item.id)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="x" size={16} color={colors.secondaryText} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)}>
            <Text style={styles.title} numberOfLines={2}>
              {item.name}
            </Text>
          </TouchableOpacity>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${currentPrice.toFixed(2)}</Text>
            {item.discountPrice && (
              <Text style={styles.originalPrice}>${item.price.toFixed(2)}</Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.moveToBagBtn}
            onPress={() => handleMoveToCart(item)}
            activeOpacity={0.8}
          >
            <Feather name="shopping-bag" size={14} color={colors.primaryText} />
            <Text style={styles.moveToBagText}>TRANSFER TO BAG</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <AnonymousWordmark size={18} letterSpacing={3} />
          <Text style={styles.headerSub}>WISHLIST & SAVED PIECES</Text>
        </View>
        {wishlistItems.length > 0 && (
          <TouchableOpacity onPress={clearWishlist}>
            <Text style={styles.clearText}>PURGE ALL</Text>
          </TouchableOpacity>
        )}
      </View>

      {wishlistItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="heart" size={44} color={colors.mutedText} />
          <Text style={styles.emptyTitle}>ARCHIVE EMPTY</Text>
          <Text style={styles.emptySubtitle}>
            Save exceptional items while browsing to curate your personal archive.
          </Text>
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => router.push('/(tabs)/products')}
          >
            <Text style={styles.exploreBtnText}>EXPLORE ARCHIVE</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={wishlistItems}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerSub: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.secondaryText,
    marginTop: 2,
    fontWeight: '600',
  },
  clearText: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 10,
    letterSpacing: 1,
    color: colors.secondaryText,
    fontWeight: '700',
  },
  listContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: spacing.sm,
    gap: spacing.md,
  },
  imageCol: {
    width: 100,
    height: 100,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#EDEAE2',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentCol: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 9,
    letterSpacing: 1,
    color: colors.secondaryText,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: typography.sizes.sm,
    color: colors.primaryText,
    fontWeight: '600',
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginVertical: 4,
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
  moveToBagBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.primaryText,
    paddingVertical: 8,
    borderRadius: 3,
  },
  moveToBagText: {
    fontFamily: typography.fonts.heading,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: colors.primaryText,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  emptyTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.md,
    letterSpacing: 2,
    color: colors.primaryText,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  emptySubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.xs,
    color: colors.secondaryText,
    textAlign: 'center',
    maxWidth: 260,
  },
  exploreBtn: {
    marginTop: spacing.md,
    backgroundColor: colors.primaryText,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
  },
  exploreBtnText: {
    fontFamily: typography.fonts.heading,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#FFFFFF',
  },
});
