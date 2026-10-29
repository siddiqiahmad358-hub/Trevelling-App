import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PrimaryButton from '../components/PrimaryButton';
import { useApp } from '../context/AppContext';
import { COLORS, RADIUS } from '../styles/theme';

export default function AuthScreen({ route, navigation }) {
  const [mode, setMode] = useState(
    route.params?.mode === 'login' ? 'login' : 'signup'
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { registerUser, loginUser } = useApp();

  const isSignup = mode === 'signup';

  const handleSubmit = () => {
    const cleanEmail = email.trim();

    if (isSignup && !name.trim()) {
      Alert.alert('Name required', 'Please enter your full name.');
      return;
    }

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    const result = isSignup
      ? registerUser(name, cleanEmail)
      : loginUser(cleanEmail);

    if (!result.success) {
      Alert.alert('Account message', result.message);
      return;
    }

    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={21} color={COLORS.primary} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <View style={styles.logoIcon}>
          <Ionicons name="paper-plane" size={28} color={COLORS.white} />
        </View>

        <Text style={styles.brand}>wanderly</Text>

        <Text style={styles.eyebrow}>
          {isSignup ? 'START YOUR JOURNEY' : 'WELCOME BACK'}
        </Text>

        <Text style={styles.heading}>
          {isSignup ? 'Create your account' : 'Welcome back!'}
        </Text>

        <Text style={styles.description}>
          {isSignup
            ? 'Join Wanderly and start discovering beautiful places.'
            : 'Enter your email to continue your journey.'}
        </Text>

        <View style={styles.card}>
          {isSignup && (
            <>
              <Text style={styles.label}>Full name</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  size={19}
                  color={COLORS.textSecondary}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor={COLORS.textSecondary}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </>
          )}

          <Text style={styles.label}>Email address</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={19}
              color={COLORS.textSecondary}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <PrimaryButton
            title={isSignup ? 'Create account' : 'Log in'}
            onPress={handleSubmit}
          />

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>
              {isSignup
                ? 'Already have an account?'
                : "Don't have an account?"}
            </Text>

            <Pressable
              onPress={() => {
                setMode(isSignup ? 'login' : 'signup');
                setName('');
                setEmail('');
              }}
            >
              <Text style={styles.switchLink}>
                {isSignup ? 'Log in' : 'Sign up'}
              </Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.note}>
          Demo account only. Account information is stored temporarily
          while this app session is running.
        </Text>
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
    flexGrow: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: 24,
    paddingBottom: 35,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 30,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  logoIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  brand: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 32,
  },
  eyebrow: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    textAlign: 'center',
  },
  heading: {
    color: COLORS.text,
    fontSize: 29,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 9,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 22,
  },
  label: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 9,
    marginTop: 13,
  },
  inputContainer: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 13,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    paddingVertical: 12,
    outlineStyle: 'none',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 20,
  },
  switchText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  switchLink: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  note: {
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 22,
  },
});