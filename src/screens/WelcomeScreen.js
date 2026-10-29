
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PrimaryButton from '../components/PrimaryButton';
import { COLORS, RADIUS } from '../styles/theme';

export default function WelcomeScreen({ navigation }) {
  const { height } = useWindowDimensions();

  const heroHeight = Math.min(350, Math.max(190, height * 0.36));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoRow}>
          <View style={styles.logoIcon}>
            <Ionicons name="paper-plane" size={22} color={COLORS.white} />
          </View>
          <Text style={styles.logoText}>wanderly</Text>
        </View>

        <View style={[styles.heroContainer, { height: heroHeight }]}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200',
            }}
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
          >
            <View style={styles.imageOverlay} />

            <View style={styles.imageLabel}>
              <Ionicons name="location" size={14} color={COLORS.white} />
              <Text style={styles.imageLabelText}>
                Discover the world
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <Text style={styles.eyebrow}>
            YOUR NEXT ADVENTURE STARTS HERE
          </Text>

          <Text style={styles.title}>
            Find your next{'\n'}
            <Text style={styles.titleAccent}>great escape.</Text>
          </Text>

          <Text style={styles.description}>
            Explore beautiful destinations, discover new experiences and
            make memories that last a lifetime.
          </Text>

          <PrimaryButton
            title="Create your account"
            onPress={() => navigation.navigate('Auth', { mode: 'signup' })}
          />

          <Pressable
            style={styles.loginButton}
            onPress={() => navigation.navigate('Auth', { mode: 'login' })}
          >
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginAccent}>Log in</Text>
            </Text>
          </Pressable>

          <View style={styles.bottomNote}>
            <Ionicons
              name="globe-outline"
              size={16}
              color={COLORS.textSecondary}
            />
            <Text style={styles.bottomNoteText}>
              The world is waiting for you
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 23,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.8,
  },
  heroContainer: {
    width: '100%',
    maxHeight: 350,
    minHeight: 190,
  },
  heroImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroImageStyle: {
    borderRadius: RADIUS.xl,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.12)',
    borderRadius: RADIUS.xl,
  },
  imageLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    margin: 16,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  imageLabelText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 24,
  },
  eyebrow: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  title: {
    color: COLORS.text,
    fontSize: 39,
    lineHeight: 46,
    fontWeight: '800',
    letterSpacing: -1.4,
  },
  titleAccent: {
    color: COLORS.primary,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 13,
    marginBottom: 22,
    maxWidth: 480,
  },
  loginButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  loginText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  loginAccent: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  bottomNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 5,
  },
  bottomNoteText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
});
