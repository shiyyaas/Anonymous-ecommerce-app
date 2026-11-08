import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { BannerCarousel } from '@/components/home/BannerCarousel';
import { CategorySection } from '@/components/home/CategorySection';
import { FlashSellSection } from '@/components/home/FlashSellSection';
import { ProductCard } from '@/components/product/ProductCard';
import { AnonymousWordmark } from '@/components/common/AnonymousWordmark';
import { SectionHeader } from '@/components/common/SectionHeader';
import { products } from '@/data/products';
import { colors, typography, spacing } from '@/constants/theme';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredProducts = products.filter(p => p.isFeatured || p.rating >= 4.5);
  const newArrivals = products.slice(0, 4);

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleCategorySelect = (categoryId: string) => {
    router.push({
      pathname: '/(tabs)/products',
      params: { category: categoryId },
    });
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push({
        pathname: '/(tabs)/products',
        params: { search: searchQuery.trim() },
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* ANONYMOUS Minimal Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <AnonymousWordmark size={20} letterSpacing={3.5} />
          <Text style={styles.headerSub}>AUTUMN / WINTER 2026 ARCHIVE</Text>
        </View>
        <TouchableOpacity
          style={styles.headerIconBtn}
          onPress={() => router.push('/(tabs)/cart')}
          activeOpacity={0.7}
        >
          <Feather name="shopping-bag" size={20} color={colors.primaryText} />
        </TouchableOpacity>
      </View>

      {/* Editorial Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Feather name="search" size={16} color={colors.secondaryText} />
          <TextInput
            placeholder="Search archival pieces, electronics, apparel..."
            placeholderTextColor={colors.mutedText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
            style={styles.searchInput}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={16} color={colors.secondaryText} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Editorial Carousel */}
        <BannerCarousel />

        {/* Categories Section */}
        <CategorySection onSelectCategory={handleCategorySelect} />

        {/* Curated Drop / Limited Offer */}
        <FlashSellSection onProductPress={handleProductPress} />

        {/* Featured Editions */}
        <SectionHeader
          title="Featured Editions"
          subtitle="Curated essentials of exceptional craft"
          actionText="View All"
          onActionPress={() => router.push('/(tabs)/products')}
        />
        <View style={styles.productsGrid}>
          {featuredProducts.slice(0, 4).map(product => (
            <View key={product.id} style={styles.gridItem}>
              <ProductCard
                product={product}
                onPress={() => handleProductPress(product.id)}
              />
            </View>
          ))}
        </View>

        {/* New Arrivals */}
        <SectionHeader
          title="Recent Releases"
          subtitle="Newly unsealed from the catalog"
          actionText="Explore"
          onActionPress={() => router.push('/(tabs)/products')}
        />
        <View style={styles.productsGrid}>
          {newArrivals.map(product => (
            <View key={product.id} style={styles.gridItem}>
              <ProductCard
                product={product}
                onPress={() => handleProductPress(product.id)}
              />
            </View>
          ))}
        </View>

        {/* Editorial Footer */}
        <View style={styles.editorialFooter}>
          <AnonymousWordmark size={16} letterSpacing={3} color={colors.secondaryText} />
          <Text style={styles.editorialFooterText}>
            Design minimalism for the modern lifestyle.
          </Text>
          <Text style={styles.editorialCopyright}>
            © 2026 ANONYMOUS RETAIL CO. ALL RIGHTS RESERVED.
          </Text>
        </View>
      </ScrollView>
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
    paddingBottom: spacing.xs,
    backgroundColor: colors.background,
  },
  headerLeft: {
    flex: 1,
  },
  headerSub: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.secondaryText,
    marginTop: 2,
    fontWeight: '600',
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  searchSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: spacing.md,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.sm,
    color: colors.primaryText,
    padding: 0,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: spacing.md,
  },
  editorialFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.xl,
    backgroundColor: colors.background,
  },
  editorialFooterText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.xs,
    color: colors.secondaryText,
    marginTop: spacing.xs,
  },
  editorialCopyright: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 9,
    letterSpacing: 1.2,
    color: colors.mutedText,
    marginTop: spacing.sm,
  },
});
