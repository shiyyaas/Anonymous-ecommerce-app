import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { AnonymousWordmark } from '@/components/common/AnonymousWordmark';
import { colors, typography, spacing } from '@/constants/theme';

export default function ProfileScreen() {
  const profileMenuItems = [
    {
      id: 'orders',
      title: 'My Orders',
      subtitle: 'Track acquisitions & order history',
      icon: 'package',
      route: '/orders',
    },
    {
      id: 'addresses',
      title: 'Shipping Addresses',
      subtitle: '4 destinations registered',
      icon: 'map-pin',
      route: '/addresses',
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      subtitle: '5 methods on file',
      icon: 'credit-card',
      route: '/payment-methods',
    },
    {
      id: 'settings',
      title: 'App Settings',
      subtitle: 'Security, currency & notifications',
      icon: 'settings',
      route: '/settings',
    },
    {
      id: 'help',
      title: 'Concierge & Support',
      subtitle: 'Private client assistance',
      icon: 'help-circle',
      route: '/help-support',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <AnonymousWordmark size={18} letterSpacing={3} />
        <Text style={styles.headerSub}>CLIENT PROFILE</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* User Card */}
        <View style={styles.userCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
            }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>Alexander Vance</Text>
              <View style={styles.clientTier}>
                <Text style={styles.tierText}>PRIVÉ</Text>
              </View>
            </View>
            <Text style={styles.userEmail}>alexander.vance@studio.org</Text>
            <Text style={styles.userPhone}>+1 (555) 234-8901</Text>
          </View>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push('/edit-profile')}
          >
            <Feather name="edit-2" size={16} color={colors.primaryText} />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuGroup}>
          <Text style={styles.groupHeader}>COMMERCE ARCHIVE</Text>
          <View style={styles.menuBox}>
            {profileMenuItems.slice(0, 3).map((item, idx) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  idx < 2 && styles.menuItemBorder,
                ]}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.7}
              >
                <View style={styles.iconCircle}>
                  <Feather name={item.icon as any} size={18} color={colors.primaryText} />
                </View>
                <View style={styles.itemTextCol}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                </View>
                <Feather name="chevron-right" size={16} color={colors.secondaryText} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.menuGroup}>
          <Text style={styles.groupHeader}>PREFERENCES & SUPPORT</Text>
          <View style={styles.menuBox}>
            {profileMenuItems.slice(3).map((item, idx) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  idx < profileMenuItems.slice(3).length - 1 && styles.menuItemBorder,
                ]}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.7}
              >
                <View style={styles.iconCircle}>
                  <Feather name={item.icon as any} size={18} color={colors.primaryText} />
                </View>
                <View style={styles.itemTextCol}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                </View>
                <Feather name="chevron-right" size={16} color={colors.secondaryText} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout CTA */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.7}>
          <Feather name="log-out" size={16} color="#DC2626" />
          <Text style={styles.logoutText}>TERMINATE SESSION</Text>
        </TouchableOpacity>

        <Text style={styles.versionNotice}>
          ANONYMOUS CLIENT APP — BUILD 1.0.0
        </Text>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerSub: {
    fontFamily: typography.fonts.headingMedium,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.secondaryText,
    marginTop: 2,
    fontWeight: '600',
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: spacing.md,
    gap: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EDEAE2',
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontFamily: typography.fonts.heading,
    fontSize: typography.sizes.base,
    color: colors.primaryText,
    fontWeight: '700',
  },
  clientTier: {
    backgroundColor: colors.accent,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 2,
  },
  tierText: {
    fontFamily: typography.fonts.heading,
    fontSize: 9,
    letterSpacing: 1,
    color: colors.primaryText,
    fontWeight: '800',
  },
  userEmail: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes.xs,
    color: colors.secondaryText,
    marginTop: 2,
  },
  userPhone: {
    fontFamily: typography.fonts.body,
    fontSize: 11,
    color: colors.mutedText,
    marginTop: 1,
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuGroup: {
    gap: spacing.xs,
  },
  groupHeader: {
    fontFamily: typography.fonts.heading,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colors.secondaryText,
    fontWeight: '700',
  },
  menuBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTextCol: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: typography.fonts.bodyMedium,
    fontSize: typography.sizes.sm,
    color: colors.primaryText,
    fontWeight: '600',
  },
  itemSubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 6,
    paddingVertical: 14,
  },
  logoutText: {
    fontFamily: typography.fonts.heading,
    fontSize: 11,
    letterSpacing: 1.5,
    color: '#DC2626',
    fontWeight: '700',
  },
  versionNotice: {
    textAlign: 'center',
    fontFamily: typography.fonts.headingMedium,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.mutedText,
    marginTop: spacing.xs,
  },
});
