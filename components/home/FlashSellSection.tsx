import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { products } from '@/data/products';
import { FlashSellProductCard } from './FlashSellProductCard';
import { colors, typography, spacing } from '@/constants/theme';
import { SectionHeader } from '@/components/common/SectionHeader';

interface FlashSellSectionProps {
  onProductPress: (productId: string) => void;
}

export const FlashSellSection: React.FC<FlashSellSectionProps> = ({
  onProductPress,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter(p => p.discountPrice);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Archival Vault"
        subtitle="Time-restricted acquisition release"
      />

      <View style={styles.timerBanner}>
        <View style={styles.timerLeft}>
          <Feather name="clock" size={14} color={colors.primaryText} />
          <Text style={styles.timerLabel}>CLOSES IN</Text>
        </View>
        <View style={styles.digitsRow}>
          <View style={styles.digitBox}>
            <Text style={styles.digitText}>{formatNumber(timeLeft.hours)}</Text>
          </View>
          <Text style={styles.colon}>:</Text>
          <View style={styles.digitBox}>
            <Text style={styles.digitText}>{formatNumber(timeLeft.minutes)}</Text>
          </View>
          <Text style={styles.colon}>:</Text>
          <View style={styles.digitBox}>
            <Text style={styles.digitText}>{formatNumber(timeLeft.seconds)}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {flashProducts.map(product => (
          <FlashSellProductCard
            key={product.id}
            product={product}
            onPress={() => onProductPress(product.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
  },
  timerBanner: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.accent,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primaryText,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerLabel: {
    fontFamily: typography.fonts.heading,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: colors.primaryText,
  },
  digitsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  digitBox: {
    backgroundColor: colors.primaryText,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  digitText: {
    fontFamily: typography.fonts.heading,
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  colon: {
    fontFamily: typography.fonts.heading,
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryText,
  },
  scrollList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
});
