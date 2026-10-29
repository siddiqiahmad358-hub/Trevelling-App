
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../context/AppContext';
import { COLORS, RADIUS } from '../styles/theme';

function ProfileOption({ icon, title, subtitle, onPress }) {
  return (
    <Pressable
      style={styles.option}
      onPress={onPress}
    >
      <View style={styles.optionIcon}>
        <Ionicons name={icon} size={20} color={COLORS.primary} />
      </View>
      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={19}
        color={COLORS.textSecondary}
      />
    </Pressable>
  );
}

export default function ProfileScreen({ navigation }) {
  const { favorites, bookings } = useApp();
  const [expandedBooking, setExpandedBooking] = useState(null);

  const toggleBooking = (index) => {
    setExpandedBooking(
      expandedBooking === index ? null : index
    );
  };

  const openSetting = (settingType) => {
    navigation.navigate('Settings', { settingType });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>YOUR ACCOUNT</Text>
        <Text style={styles.heading}>My profile</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={34} color={COLORS.primary} />
          </View>
          <Text style={styles.profileName}>Wanderly Explorer</Text>
          <Text style={styles.profileSubtitle}>
            Your travel journey starts here
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="heart" size={21} color={COLORS.primary} />
            <Text style={styles.statNumber}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons
              name="ticket-outline"
              size={21}
              color={COLORS.primary}
            />
            <Text style={styles.statNumber}>{bookings.length}</Text>
            <Text style={styles.statLabel}>Saved requests</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>My bookings</Text>

        {bookings.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons
              name="calendar-outline"
              size={30}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.emptySubtitle}>
              Your saved booking requests will appear here.
            </Text>
          </View>
        ) : (
          bookings.map((booking, index) => {
            const isExpanded = expandedBooking === index;

            return (
              <View style={styles.bookingCard} key={index}>
                <Pressable
                  style={styles.bookingHeader}
                  onPress={() => toggleBooking(index)}
                >
                  <View style={styles.bookingIcon}>
                    <Ionicons
                      name="airplane-outline"
                      size={22}
                      color={COLORS.primary}
                    />
                  </View>

                  <View style={styles.bookingMain}>
                    <Text style={styles.bookingDestination}>
                      {booking.destinationName}
                    </Text>
                    <Text style={styles.bookingDate}>
                      Travel date: {booking.travelDate}
                    </Text>
                  </View>

                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={COLORS.textSecondary}
                  />
                </Pressable>

                {isExpanded && (
                  <View style={styles.bookingDetails}>
                    <View style={styles.divider} />

                    <Text style={styles.detailLabel}>Full name</Text>
                    <Text style={styles.detailValue}>
                      {booking.fullName}
                    </Text>

                    <Text style={styles.detailLabel}>Email address</Text>
                    <Text style={styles.detailValue}>
                      {booking.email}
                    </Text>

                    <Text style={styles.detailLabel}>Travelers</Text>
                    <Text style={styles.detailValue}>
                      {booking.travelers}
                    </Text>

                    <Text style={styles.detailLabel}>Travel date</Text>
                    <Text style={styles.detailValue}>
                      {booking.travelDate}
                    </Text>

                    <Text style={styles.detailLabel}>Estimated total</Text>
                    <Text style={styles.totalValue}>
                      ${booking.total}
                    </Text>

                    <Text style={styles.demoNote}>
                      Demo request only — no real reservation or payment.
                    </Text>
                  </View>
                )}
              </View>
            );
          })
        )}

        <Text style={styles.sectionTitle}>Account settings</Text>

        <View style={styles.optionsCard}>
          <ProfileOption
            icon="person-outline"
            title="Personal information"
            subtitle="Your profile details"
            onPress={() => openSetting('personal')}
          />
          <View style={styles.divider} />

          <ProfileOption
            icon="notifications-outline"
            title="Notifications"
            subtitle="Travel updates and reminders"
            onPress={() => openSetting('notifications')}
          />
          <View style={styles.divider} />

          <ProfileOption
            icon="help-circle-outline"
            title="Help and support"
            subtitle="Get assistance"
            onPress={() => openSetting('help')}
          />
          <View style={styles.divider} />

          <ProfileOption
            icon="information-circle-outline"
            title="About Wanderly"
            subtitle="Discover more about our app"
            onPress={() => openSetting('about')}
          />
        </View>

        <Text style={styles.footer}>Made for curious travelers.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    padding: 22,
    paddingBottom: 40,
  },
  eyebrow: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginTop: 12,
  },
  heading: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 7,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 25,
    marginTop: 22,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 26,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  profileName: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '800',
  },
  profileSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 6,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 13,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.md,
    padding: 17,
    alignItems: 'center',
    gap: 6,
  },
  statNumber: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 29,
    marginBottom: 14,
  },
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 24,
    alignItems: 'center',
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 10,
  },
  emptySubtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
  bookingCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 15,
    marginBottom: 12,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bookingIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingMain: {
    flex: 1,
  },
  bookingDestination: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '800',
  },
  bookingDate: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 5,
  },
  bookingDetails: {
    paddingTop: 12,
  },
  detailLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 12,
  },
  detailValue: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  totalValue: {
    color: COLORS.primary,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 4,
  },
  demoNote: {
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 15,
  },
  optionsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  optionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
  },
  optionSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  footer: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 25,
  },
});
