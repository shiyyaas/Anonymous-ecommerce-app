import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { ProductGrid } from '@/components/product/ProductGrid';
import { AnonymousWordmark } from '@/components/common/AnonymousWordmark';
import { colors, typography, spacing } from '@/constants/theme';

export default function ProductsScreen() {
  const params = useLocalSearchParams<{ category?: string; search?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    params.category || 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>(params.search || '');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>(
    'featured'
  );

  useEffect(() => {
    if (params.category) {
      setSelectedCategory(params.category);
    }
  }, [params.category]);

  useEffect(() => {
    if (params.search) {
      setSearchQuery(params.search);
    }
  }, [params.search]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'all') {
      list = list.filter(
        p => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const allCategories = [{ id: 'all', name: 'All Archive' }, ...categories];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <AnonymousWordmark size={18} letterSpacing={3} />
          <Text style={styles.headerSub}>CATALOGUE & SEARCH</Text>
        </View>
        <Text style={styles.countBadge}>{filteredProducts.length} OBJECTS</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Feather name="search" size={16} color={colors.secondaryText} />
          <TextInput
            placeholder="Search items, specs, materials..."
            placeholderTextColor={colors.mutedText}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={16} color={colors.secondaryText} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter Chips */}
      <View style={styles.categoriesSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryChips}
        >
          {allCategories.map(cat => {
            const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  isSelected && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isSelected && styles.categoryChipTextActive,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Sort Options Bar */}
      <View style={styles.sortBar}>
        <Text style={styles.sortLabel}>SORT BY:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortChips}>
          {(
            [
              { id: 'featured', label: 'Featured' },
              { id: 'price-asc', label: 'Price: Low' },
              { id: 'price-desc', label: 'Price: High' },
              { id: 'rating', label: 'Rating' },
            ] as const
          ).map(s => (
            <TouchableOpacity
              key={s.id}
              style={[styles.sortButton, sortBy === s.id && styles.sortButtonActive]}
              onPress={() => setSortBy(s.id)}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortBy === s.id && styles.sortButtonTextActive,
                ]}
              >
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product List */}
      <View style={styles.gridContainer}>
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="slash" size={36} color={colors.secondaryText} />
            <Text style={styles.emptyTitle}>NO MATCHING SPECIMENS</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your query or filter parameters.
            </Text>
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              <Text style={styles.clearBtnText}>RESET FILTERS</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ProductGrid
            products={filteredProducts}
            onProductPress={id => router.push(`/product/${id}`)}
          />
        )}
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
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  headerSub: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.secondaryText,
    marginTop: 2,
    fontWeight: '600',
  },
  countBadge: {
    fontFamily: typography.fonts.heading,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: colors.primaryText,
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.border,
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
  categoriesSection: {
    marginVertical: spacing.xs,
  },
  categoryChips: {
    paddingHorizontal: spacing.lg,
    gap: 6,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 2,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primaryText,
    borderColor: colors.primaryText,
  },
  categoryChipText: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '700',
    color: colors.primaryText,
    textTransform: 'uppercase',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  sortBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    gap: 8,
  },
  sortLabel: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 9,
    letterSpacing: 1,
    color: colors.secondaryText,
    fontWeight: '700',
  },
  sortChips: {
    gap: 6,
  },
  sortButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  sortButtonActive: {
    backgroundColor: colors.accent,
  },
  sortButtonText: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 10,
    fontWeight: '600',
    color: colors.secondaryText,
    letterSpacing: 0.5,
  },
  sortButtonTextActive: {
    color: colors.primaryText,
    fontWeight: '800',
  },
  gridContainer: {
    flex: 1,
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
  },
  emptySubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.xs,
    color: colors.secondaryText,
    textAlign: 'center',
  },
  clearBtn: {
    marginTop: spacing.md,
    backgroundColor: colors.primaryText,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
  },
  clearBtnText: {
    fontFamily: typography.fonts.heading,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#FFFFFF',
  },
});
