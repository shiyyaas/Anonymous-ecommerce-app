import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, typography } from '@/constants/theme';

interface AnonymousWordmarkProps {
  size?: number;
  color?: string;
  letterSpacing?: number;
  style?: TextStyle;
}

export const AnonymousWordmark: React.FC<AnonymousWordmarkProps> = ({
  size = 20,
  color = colors.primaryText,
  letterSpacing = 4,
  style,
}) => {
  return (
    <Text
      style={[
        styles.wordmark,
        {
          fontSize: size,
          color,
          letterSpacing,
        },
        style,
      ]}
    >
      ANONYMOUS
    </Text>
  );
};

const styles = StyleSheet.create({
  wordmark: {
    fontFamily: typography.fonts.heading,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
