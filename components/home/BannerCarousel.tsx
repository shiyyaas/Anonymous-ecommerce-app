import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { colors, typography, spacing } from '@/constants/theme';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - spacing.lg * 2;
const BANNER_HEIGHT = 190;

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
}

const BANNERS: Banner[] = [
  {
    id: '1',
    title: 'THE ARCHIVAL DROP',
    subtitle: 'Limited pieces refined for timeless functionality',
    tag: 'EDITION 01',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'MONOCHROME AUDIO',
    subtitle: 'Acoustic fidelity stripped of all excess',
    tag: 'STUDIO HARDWARE',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'TACTILE ESSENTIALS',
    subtitle: 'Everyday carry designed with industrial precision',
    tag: 'CURATED OBJECTS',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
  },
];

export const BannerCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % BANNERS.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 4500);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const onMomentumScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / BANNER_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={BANNERS}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={BANNER_WIDTH + spacing.sm}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item }) => (
          <View style={styles.bannerCard}>
            <Image
              source={{ uri: item.image }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <View style={styles.overlay} />
            <View style={styles.bannerContent}>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
              <Text style={styles.bannerTitle}>{item.title}</Text>
              <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.pagination}>
        {BANNERS.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              idx === activeIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  bannerCard: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1E1E1E',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  bannerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
  },
  tagBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  tagText: {
    fontFamily: typography.fonts.heading,
    fontSize: 9,
    color: colors.primaryText,
    letterSpacing: 1.5,
    fontWeight: '800',
  },
  bannerTitle: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.lg,
    color: '#FFFFFF',
    letterSpacing: 1,
    fontWeight: '700',
  },
  bannerSubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.xs,
    color: '#D4D4D0',
    marginTop: 2,
    maxWidth: '90%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  dot: {
    width: 16,
    height: 2,
    backgroundColor: colors.border,
  },
  activeDot: {
    width: 28,
    backgroundColor: colors.primaryText,
  },
});
