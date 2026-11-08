import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { categories } from '@/data/categories';
import { colors, typography, spacing } from '@/constants/theme';
import { SectionHeader } from '@/components/common/SectionHeader';

interface CategorySectionProps {
  onSelectCategory: (categoryId: string) => void;
}

const getCategoryIcon = (id: string): any => {
  switch (id.toLowerCase()) {
    case 'electronics':
      return 'cpu';
    case 'clothing':
    case 'fashion':
      return 'tag';
    case 'home':
      return 'home';
    case 'beauty':
      return 'star';
    case 'books':
      return 'book-open';
    default:
      return 'grid';
  }
};

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
}) => {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="Departments"
        subtitle="Filter archive by discipline"
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => onSelectCategory(category.id)}
            activeOpacity={0.75}
          >
            <View style={styles.iconCircle}>
              <Feather
                name={getCategoryIcon(category.id)}
                size={18}
                color={colors.primaryText}
              />
            </View>
            <Text style={styles.categoryName} numberOfLines={1}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
  },
  scrollList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  categoryCard: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    minWidth: 84,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  categoryName: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.primaryText,
    textTransform: 'uppercase',
  },
});
