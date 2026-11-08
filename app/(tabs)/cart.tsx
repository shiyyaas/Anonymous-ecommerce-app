import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { AnonymousWordmark } from '@/components/common/AnonymousWordmark';
import { colors, typography, spacing } from '@/constants/theme';

export default function CartScreen() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <AnonymousWordmark size={18} letterSpacing={3} />
          <Text style={styles.headerSub}>SHOPPING BAG</Text>
        </View>
        {cartItems.length > 0 && (
          <View style={styles.headerRight}>
            <View style={styles.countTag}>
              <Text style={styles.countTagText}>{totalItems} ITEMS</Text>
            </View>
          </View>
        )}
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name="shopping-bag" size={44} color={colors.mutedText} />
          <Text style={styles.emptyTitle}>BAG IS CURRENTLY EMPTY</Text>
          <Text style={styles.emptySubtitle}>
            Browse our catalogue to add contemporary garments, hardware and archival pieces.
          </Text>
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => router.push('/(tabs)/products')}
          >
            <Text style={styles.exploreBtnText}>BEGIN BROWSING</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CartItem item={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          {/* Persistent Order Summary Checkout Footer */}
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <View>
                <Text style={styles.totalLabel}>ORDER TOTAL</Text>
                <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={() => router.push('/checkout')}
                activeOpacity={0.85}
              >
                <Text style={styles.checkoutBtnText}>PROCEED TO CHECKOUT</Text>
                <Feather name="arrow-right" size={16} color={colors.primaryText} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  countTagText: {
    fontFamily: typography.fonts.heading,
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryText,
  },
  content: {
    flex: 1,
  },
  listContent: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 9,
    letterSpacing: 1.2,
    color: colors.secondaryText,
  },
  totalAmount: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xl,
    fontWeight: '800',
    color: colors.primaryText,
    marginTop: 2,
  },
  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.primaryText,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 4,
  },
  checkoutBtnText: {
    fontFamily: typography.fonts.heading,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
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
    maxWidth: 280,
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
