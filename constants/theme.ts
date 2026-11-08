export const colors = {
  background: '#F4F2EC',       // Editorial bone/warm off-white
  surface: '#FFFFFF',          // Crisp white card surface
  surfaceElevated: '#FFFFFF',
  primaryText: '#171717',      // Deep editorial black
  secondaryText: '#77756F',    // Warm muted gray
  mutedText: '#A3A099',        // Secondary subtle text
  accent: '#C8F169',           // Electric lime accent
  accentDark: '#A6CF45',       // Darker accent state
  border: '#DEDCD4',           // Subtle warm divider/border
  borderStrong: '#171717',     // High-contrast structural border
  badgeBg: '#171717',
  badgeText: '#FFFFFF',
  destructive: '#DC2626',
  destructiveBg: '#FEE2E2',
  success: '#16A34A',
  warning: '#F59E0B',
};

export const typography = {
  fonts: {
    heading: 'SpaceGrotesk_700Bold',
    headingMedium: 'SpaceGrotesk_500Medium',
    headingRegular: 'SpaceGrotesk_400Regular',
    body: 'Inter_400Regular',
    bodyMedium: 'Inter_500Medium',
    bodySemiBold: 'Inter_600SemiBold',
    bodyBold: 'Inter_700Bold',
  },
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxl: 30,
    display: 36,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 1.2,
    wider: 2.5,
    widest: 4.0,
  },
};

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 9999,
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
};

export default theme;
