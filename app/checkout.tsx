import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useCart } from '@/context/CartContext';
import { colors, typography, spacing } from '@/constants/theme';

export default function CheckoutScreen() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'apple' | 'cod'>('card');
  const [selectedShipping, setSelectedShipping] = useState<'standard' | 'express'>('standard');
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = selectedShipping === 'express' ? 25 : 0;
  const estimatedTax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + estimatedTax;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      Alert.alert(
        'ORDER ACQUISITION CONFIRMED',
        'Your archival selection has been verified and registered. You will receive dispatch updates shortly.',
        [
          {
            text: 'VIEW ARCHIVE',
            onPress: () => router.replace('/(tabs)/products'),
          },
        ]
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={20} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ACQUISITION CHECKOUT</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Shipping Address */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>DELIVERY DESTINATION</Text>
            <TouchableOpacity onPress={() => router.push('/addresses')}>
              <Text style={styles.cardAction}>MODIFY</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.addressBox}>
            <Text style={styles.addressName}>Alexander Vance</Text>
            <Text style={styles.addressLine}>442 Minimalist Boulevard, Suite 8B</Text>
            <Text style={styles.addressLine}>New York, NY 10012, United States</Text>
            <Text style={styles.addressLine}>+1 (555) 234-8901</Text>
          </View>
        </View>

        {/* Dispatch Options */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>DISPATCH TIER</Text>
          <TouchableOpacity
            style={[
              styles.optionRow,
              selectedShipping === 'standard' && styles.optionRowActive,
            ]}
            onPress={() => setSelectedShipping('standard')}
          >
            <View style={styles.radio}>
              {selectedShipping === 'standard' && <View style={styles.radioInner} />}
            </View>
            <View style={styles.optionDetails}>
              <Text style={styles.optionTitle}>Standard Archival Dispatch</Text>
              <Text style={styles.optionSub}>Delivery in 3–5 business days</Text>
            </View>
            <Text style={styles.optionPrice}>FREE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionRow,
              selectedShipping === 'express' && styles.optionRowActive,
            ]}
            onPress={() => setSelectedShipping('express')}
          >
            <View style={styles.radio}>
              {selectedShipping === 'express' && <View style={styles.radioInner} />}
            </View>
            <View style={styles.optionDetails}>
              <Text style={styles.optionTitle}>Priority Express Dispatch</Text>
              <Text style={styles.optionSub}>Next business day courier delivery</Text>
            </View>
            <Text style={styles.optionPrice}>$25.00</Text>
          </TouchableOpacity>
        </View>

        {/* Settlement Method */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>SETTLEMENT METHOD</Text>
          <TouchableOpacity
            style={[
              styles.optionRow,
              selectedPayment === 'card' && styles.optionRowActive,
            ]}
            onPress={() => setSelectedPayment('card')}
          >
            <View style={styles.radio}>
              {selectedPayment === 'card' && <View style={styles.radioInner} />}
            </View>
            <Feather name="credit-card" size={18} color={colors.primaryText} />
            <View style={styles.optionDetails}>
              <Text style={styles.optionTitle}>Credit Card</Text>
              <Text style={styles.optionSub}>Ending in •••• 9012 (Mastercard)</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionRow,
              selectedPayment === 'apple' && styles.optionRowActive,
            ]}
            onPress={() => setSelectedPayment('apple')}
          >
            <View style={styles.radio}>
              {selectedPayment === 'apple' && <View style={styles.radioInner} />}
            </View>
            <Feather name="smartphone" size={18} color={colors.primaryText} />
            <View style={styles.optionDetails}>
              <Text style={styles.optionTitle}>Digital Wallet</Text>
              <Text style={styles.optionSub}>Apple Pay / Google Pay</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionRow,
              selectedPayment === 'cod' && styles.optionRowActive,
            ]}
            onPress={() => setSelectedPayment('cod')}
          >
            <View style={styles.radio}>
              {selectedPayment === 'cod' && <View style={styles.radioInner} />}
            </View>
            <Feather name="package" size={18} color={colors.primaryText} />
            <View style={styles.optionDetails}>
              <Text style={styles.optionTitle}>Settlement on Delivery</Text>
              <Text style={styles.optionSub}>Cash or card upon physical receipt</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Order Accounting Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ORDER ACCOUNTING</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({cartItems.length} items)</Text>
            <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Dispatch</Text>
            <Text style={styles.summaryValue}>
              {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimated Duties / Tax</Text>
            <Text style={styles.summaryValue}>${estimatedTax.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>TOTAL ACQUISITION</Text>
            <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.placeOrderBtn, isProcessing && styles.placeOrderBtnDisabled]}
          onPress={handlePlaceOrder}
          disabled={isProcessing}
          activeOpacity={0.85}
        >
          <Text style={styles.placeOrderText}>
            {isProcessing ? 'PROCESSING ACQUISITION...' : `AUTHORIZE $${finalTotal.toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.sm,
    letterSpacing: 2,
    color: colors.primaryText,
    fontWeight: '700',
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.secondaryText,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  cardAction: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 10,
    letterSpacing: 1,
    color: colors.primaryText,
    fontWeight: '700',
  },
  addressBox: {
    marginTop: 4,
  },
  addressName: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: typography.sizes.sm,
    color: colors.primaryText,
    fontWeight: '700',
    marginBottom: 2,
  },
  addressLine: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.xs,
    color: colors.secondaryText,
    lineHeight: 18,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  optionRowActive: {
    borderColor: colors.primaryText,
    backgroundColor: colors.background,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.primaryText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primaryText,
  },
  optionDetails: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: typography.sizes.xs,
    color: colors.primaryText,
    fontWeight: '600',
  },
  optionSub: {
    fontFamily: typography.fonts.body,
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 1,
  },
  optionPrice: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xs,
    fontWeight: '700',
    color: colors.primaryText,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.xs,
    color: colors.secondaryText,
  },
  summaryValue: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: typography.sizes.xs,
    color: colors.primaryText,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  totalLabel: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.xs,
    letterSpacing: 1.5,
    color: colors.primaryText,
    fontWeight: '800',
  },
  totalValue: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: colors.primaryText,
    fontWeight: '800',
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
    paddingVertical: spacing.md,
  },
  placeOrderBtn: {
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.primaryText,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderBtnDisabled: {
    opacity: 0.5,
  },
  placeOrderText: {
    fontFamily: typography.fonts.heading,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: colors.primaryText,
  },
});
