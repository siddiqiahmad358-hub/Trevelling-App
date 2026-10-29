
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, RADIUS } from '../styles/theme';
import { useApp } from '../context/AppContext';

export default function SettingsScreen({ route, navigation }) {
  const { settingType } = route.params;
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const { currentUser, logoutUser } = useApp();

  const settingsContent = {
    personal: {
      eyebrow: 'YOUR ACCOUNT',
      title: 'Personal information',
      description: 'Your profile details',
    },
    notifications: {
      eyebrow: 'STAY UPDATED',
      title: 'Notifications',
      description: 'Manage your notification preferences',
    },
    help: {
      eyebrow: 'WE ARE HERE TO HELP',
      title: 'Help and support',
      description: 'Some useful information about Wanderly',
    },
    about: {
      eyebrow: 'GET TO KNOW US',
      title: 'About Wanderly',
      description: 'Discover more about our app',
    },
  };

  const content = settingsContent[settingType] || settingsContent.about;

  const handleLogout = () => {
    logoutUser();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={21} color={COLORS.primary} />
          <Text style={styles.backText}>Back to profile</Text>
        </Pressable>

        <Text style={styles.eyebrow}>{content.eyebrow}</Text>
        <Text style={styles.heading}>{content.title}</Text>
        <Text style={styles.subtitle}>{content.description}</Text>

        {settingType === 'personal' && (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={32} color={COLORS.primary} />
            </View>

            <Text style={styles.name}>
              {currentUser?.name || 'Wanderly Explorer'}
            </Text>
            <Text style={styles.muted}>Wanderly account</Text>

            <View style={styles.divider} />

            <Text style={styles.label}>Full name</Text>
            <Text style={styles.value}>
              {currentUser?.name || 'Not available'}
            </Text>

            <Text style={styles.label}>Email address</Text>
            <Text style={styles.value}>
              {currentUser?.email || 'Not available'}
            </Text>

            <Text style={styles.note}>
              These details belong to your current demo account.
            </Text>

            <Pressable
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons
                name="log-out-outline"
                size={19}
                color={COLORS.danger}
              />
              <Text style={styles.logoutText}>Log out</Text>
            </Pressable>
          </View>
        )}

        {settingType === 'notifications' && (
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingIcon}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color={COLORS.primary}
                />
              </View>

              <View style={styles.settingText}>
                <Text style={styles.value}>Notifications</Text>
                <Text style={styles.muted}>
                  Turn your app notification preference on or off.
                </Text>
              </View>

              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{
                  false: COLORS.border,
                  true: COLORS.primaryLight,
                }}
                thumbColor={
                  notificationsEnabled ? COLORS.primary : '#FFFFFF'
                }
              />
            </View>

            <View style={styles.divider} />

            <Text style={styles.note}>
              This switch changes the preference shown in this screen.
              Real device notifications have not been connected yet.
            </Text>
          </View>
        )}

        {settingType === 'help' && (
          <View style={styles.card}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="help-circle-outline"
                size={34}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.cardTitle}>How can we help?</Text>
            <Text style={styles.bodyText}>
              Explore destinations, save your favorite places, and submit
              demo booking requests using Wanderly.
            </Text>

            <View style={styles.divider} />

            <Text style={styles.label}>Booking help</Text>
            <Text style={styles.bodyText}>
              Your saved demo booking requests can be viewed in the My
              bookings section of your Profile.
            </Text>

            <Text style={styles.label}>Need more assistance?</Text>
            <Text style={styles.bodyText}>
              A support contact feature can be added in a future version.
            </Text>
          </View>
        )}

        {settingType === 'about' && (
          <View style={styles.card}>
            <View style={styles.logoCircle}>
              <Ionicons name="compass" size={38} color="#FFFFFF" />
            </View>

            <Text style={styles.appName}>Wanderly</Text>
            <Text style={styles.muted}>Version 1.0.0</Text>

            <View style={styles.divider} />

            <Text style={styles.bodyText}>
              Wanderly is a travel discovery app designed to help curious
              travelers explore beautiful destinations, save favorites,
              and create demo trip requests.
            </Text>

            <Text style={styles.note}>
              Made for curious travelers.
            </Text>
          </View>
        )}
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
    maxWidth: 680,
    alignSelf: 'center',
    padding: 22,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 28,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  eyebrow: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  heading: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 7,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 8,
    marginBottom: 22,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 22,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  name: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '800',
    textAlign: 'center',
  },
  muted: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 18,
  },
  label: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 15,
    marginBottom: 5,
  },
  value: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  note: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 18,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    flex: 1,
  },
  infoIcon: {
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  bodyText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 21,
    marginTop: 8,
  },
  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },
  appName: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFF1F0',
    borderRadius: RADIUS.md,
    paddingVertical: 13,
    marginTop: 22,
  },
  logoutText: {
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: '700',
  },
});
