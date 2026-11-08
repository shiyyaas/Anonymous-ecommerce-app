import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionPress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText,
  onActionPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {actionText && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onActionPress}
          activeOpacity={0.7}
        >
          <Text style={styles.actionText}>{actionText}</Text>
          <Feather name="arrow-right" size={14} color={colors.primaryText} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.heading,
    fontWeight: '700',
    color: colors.primaryText,
    letterSpacing: typography.letterSpacing.wider,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.body,
    color: colors.secondaryText,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingBottom: 2,
  },
  actionText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.headingMedium,
    color: colors.primaryText,
    fontWeight: '600',
    letterSpacing: typography.letterSpacing.wide,
    textTransform: 'uppercase',
  },
});
