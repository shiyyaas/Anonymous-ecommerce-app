import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { products } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { colors, typography, spacing } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find(p => p.id === id);

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Feather name="alert-circle" size={48} color={colors.secondaryText} />
        <Text style={styles.notFoundTitle}>ARCHIVE NOT LOCATED</Text>
        <Text style={styles.notFoundSubtitle}>
          The requested specimen cannot be found in the system.
        </Text>
        <TouchableOpacity
          style={styles.backHomeBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.backHomeBtnText}>RETURN</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const currentPrice = product.discountPrice || product.price;
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleDirectBuy = () => {
    addToCart(product, quantity);
    router.push('/(tabs)/cart');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Top Floating Navigation */}
      <View style={styles.floatingHeader}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Feather name="arrow-left" size={20} color={colors.primaryText} />
        </TouchableOpacity>
        <View style={styles.headerRightGroup}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={handleToggleWishlist}
            activeOpacity={0.8}
          >
            <Feather
              name="heart"
              size={20}
              color={inWishlist ? '#DC2626' : colors.primaryText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => router.push('/(tabs)/cart')}
            activeOpacity={0.8}
          >
            <Feather name="shopping-bag" size={20} color={colors.primaryText} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Editorial Hero Image */}
        <View style={styles.imageGallery}>
          <Image
            source={{ uri: productImages[activeImageIndex] || product.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          {productImages.length > 1 && (
            <View style={styles.thumbnailRow}>
              {productImages.map((img, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setActiveImageIndex(idx)}
                  style={[
                    styles.thumbnail,
                    activeImageIndex === idx && styles.thumbnailActive,
                  ]}
                >
                  <Image source={{ uri: img }} style={styles.thumbImg} resizeMode="cover" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Specimen Info */}
        <View style={styles.infoCard}>
          <View style={styles.metaRow}>
            <Text style={styles.categoryBadge}>{product.category}</Text>
            <View style={styles.ratingBox}>
              <Feather name="star" size={12} color="#EAB308" />
              <Text style={styles.ratingText}>
                {product.rating.toFixed(1)} ({product.reviewsCount || 245})
              </Text>
            </View>
          </View>

          <Text style={styles.productTitle}>{product.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${currentPrice.toFixed(2)}</Text>
            {product.discountPrice && (
              <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
            )}
            <View style={styles.inStockBadge}>
              <Text style={styles.inStockText}>IN ARCHIVE</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionHeading}>ARCHIVE SPECIFICATIONS</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>

          {/* Quantity Controls */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>ACQUISITION QUANTITY</Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(q => Math.max(1, q - 1))}
              >
                <Feather name="minus" size={16} color={colors.primaryText} />
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity(q => q + 1)}
              >
                <Feather name="plus" size={16} color={colors.primaryText} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Editorial Highlights */}
          <View style={styles.detailsBox}>
            <View style={styles.detailRow}>
              <Feather name="truck" size={16} color={colors.primaryText} />
              <View style={styles.detailTextCol}>
                <Text style={styles.detailTitle}>Complimentary Dispatch</Text>
                <Text style={styles.detailSubtitle}>Standard delivery on domestic orders</Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Feather name="rotate-ccw" size={16} color={colors.primaryText} />
              <View style={styles.detailTextCol}>
                <Text style={styles.detailTitle}>14-Day Return Window</Text>
                <Text style={styles.detailSubtitle}>Hassle-free archival exchanges</Text>
              </View>
            </View>
            <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
              <Feather name="shield" size={16} color={colors.primaryText} />
              <View style={styles.detailTextCol}>
                <Text style={styles.detailTitle}>Certificate of Authenticity</Text>
                <Text style={styles.detailSubtitle}>Verified genuine ANONYMOUS production</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Persistent Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addToBagBtn}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.addToBagText}>ADD TO BAG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyNowBtn}
          onPress={handleDirectBuy}
          activeOpacity={0.8}
        >
          <Text style={styles.buyNowText}>ACQUIRE NOW</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  notFoundTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    letterSpacing: 2,
    color: colors.primaryText,
  },
  notFoundSubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.secondaryText,
    textAlign: 'center',
  },
  backHomeBtn: {
    backgroundColor: colors.primaryText,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: spacing.md,
  },
  backHomeBtnText: {
    fontFamily: typography.fonts.heading,
    fontSize: 11,
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  floatingHeader: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight || 20) + 8 : 44,
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRightGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  imageGallery: {
    width: '100%',
    aspectRatio: 0.9,
    backgroundColor: '#EDEAE2',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailRow: {
    position: 'absolute',
    bottom: 12,
    left: spacing.lg,
    flexDirection: 'row',
    gap: 8,
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  thumbnailActive: {
    borderColor: colors.primaryText,
    borderWidth: 2,
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
  infoCard: {
    padding: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryBadge: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.secondaryText,
    textTransform: 'uppercase',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  ratingText: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 11,
    color: colors.primaryText,
  },
  productTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xl,
    letterSpacing: 0.5,
    color: colors.primaryText,
    lineHeight: 30,
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: spacing.sm,
  },
  price: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xxl,
    fontWeight: '700',
    color: colors.primaryText,
  },
  originalPrice: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.base,
    color: colors.mutedText,
    textDecorationLine: 'line-through',
  },
  inStockBadge: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    marginLeft: 8,
  },
  inStockText: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 9,
    letterSpacing: 1,
    color: colors.secondaryText,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  sectionHeading: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xs,
    letterSpacing: 1.5,
    color: colors.primaryText,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  descriptionText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.secondaryText,
    lineHeight: 22,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  quantityLabel: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 10,
    letterSpacing: 1.2,
    color: colors.primaryText,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyValue: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.base,
    fontWeight: '700',
    color: colors.primaryText,
    minWidth: 20,
    textAlign: 'center',
  },
  detailsBox: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailTextCol: {
    flex: 1,
  },
  detailTitle: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: typography.sizes.xs,
    color: colors.primaryText,
    fontWeight: '600',
  },
  detailSubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? 28 : spacing.sm,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  addToBagBtn: {
    flex: 1,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.primaryText,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToBagText: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xs,
    letterSpacing: 1.5,
    color: colors.primaryText,
    fontWeight: '800',
  },
  buyNowBtn: {
    flex: 1,
    backgroundColor: colors.primaryText,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xs,
    letterSpacing: 1.5,
    color: '#FFFFFF',
    fontWeight: '800',
  },
});
