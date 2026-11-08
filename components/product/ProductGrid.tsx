import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { spacing } from '@/constants/theme';

interface ProductGridProps {
  products: Product[];
  onProductPress: (productId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductPress,
}) => {
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          <ProductCard
            product={item}
            onPress={() => onProductPress(item.id)}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxxl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  cardWrapper: {
    width: '48.5%',
  },
});
