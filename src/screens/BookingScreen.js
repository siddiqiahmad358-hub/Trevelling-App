
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DESTINATIONS from '../data/destinations';
import PrimaryButton from '../components/PrimaryButton';
import { useApp } from '../context/AppContext';
import { COLORS, RADIUS } from '../styles/theme';

export default function BookingScreen({ route, navigation }) {
  const { destinationId } = route.params;
  const destination = DESTINATIONS.find(
    (item) => item.id === destinationId
  );
  const { addBooking } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [travelers, setTravelers] = useState('1');
  const [travelDate, setTravelDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookingSaved, setBookingSaved] = useState(false);

  if (!destination) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.heading}>Destination not found.</Text>
      </SafeAreaView>
    );
  }

  const travelerCount = Math.max(1, Number(travelers) || 1);
  const total = destination.price * travelerCount;

  const handleBooking = () => {
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !travelDate.trim()) {
      setErrorMessage(
        'Please enter your name, email and preferred travel date.'
      );
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    addBooking({
      destinationId: destination.id,
      destinationName: destination.name,
      fullName: fullName.trim(),
      email: email.trim(),
      travelers: travelerCount,
      travelDate: travelDate.trim(),
      total,
    });

    setBookingSaved(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={21}
            color={COLORS.primary}
          />
          <Text style={styles.backText}>Back to details</Text>
        </Pressable>

        {bookingSaved ? (
          <View style={styles.successCard}>
            <View style={styles.successIcon}>
              <Ionicons
                name="checkmark-circle"
                size={58}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.successTitle}>
              Booking request saved!
            </Text>

            <Text style={styles.successSubtitle}>
              Your demo booking request for {destination.name} has been
              saved successfully.
            </Text>

            <View style={styles.successInfo}>
              <Text style={styles.successInfoText}>
                You can view your booking details in the My bookings
                section of your Profile.
              </Text>
            </View>

            <Text style={styles.disclaimer}>
              Demo only: no payment or real travel reservation has
              been made.
            </Text>

            <PrimaryButton
              title="Go to My Profile"
              onPress={() => navigation.navigate('MainTabs', {
                screen: 'Profile',
              })}
            />
          </View>
        ) : (
          <>
            <Text style={styles.eyebrow}>YOUR NEXT ADVENTURE</Text>
            <Text style={styles.heading}>Plan your trip</Text>
            <Text style={styles.subtitle}>
              Enter your details to save a demo booking request.
            </Text>

            <View style={styles.destinationCard}>
              <View style={styles.destinationIcon}>
                <Ionicons
                  name="location"
                  size={22}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.destinationInfo}>
                <Text style={styles.destinationName}>
                  {destination.name}
                </Text>
                <Text style={styles.destinationCountry}>
                  {destination.country}
                </Text>
              </View>
              <Text style={styles.destinationPrice}>
                ${destination.price}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Your information</Text>

            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor={COLORS.textSecondary}
              value={fullName}
              onChangeText={setFullName}
            />

            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Number of travelers</Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              placeholderTextColor={COLORS.textSecondary}
              value={travelers}
              onChangeText={(value) =>
                setTravelers(value.replace(/[^0-9]/g, ''))
              }
              keyboardType="number-pad"
            />

            <Text style={styles.label}>Preferred travel date</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 15 December 2026"
              placeholderTextColor={COLORS.textSecondary}
              value={travelDate}
              onChangeText={setTravelDate}
            />

            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>
                Booking summary
              </Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Price per person
                </Text>
                <Text style={styles.summaryValue}>
                  ${destination.price}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Travelers</Text>
                <Text style={styles.summaryValue}>
                  {travelerCount}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>
                  Estimated total
                </Text>
                <Text style={styles.totalValue}>${total}</Text>
              </View>
            </View>

            {errorMessage !== '' && (
              <View style={styles.errorBox}>
                <Ionicons
                  name="alert-circle-outline"
                  size={19}
                  color={COLORS.danger}
                />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            <PrimaryButton
              title="Save booking request"
              onPress={handleBooking}
            />

            <Text style={styles.disclaimer}>
              Demo only: this app does not process payments or confirm
              real travel reservations.
            </Text>
          </>
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
    fontSize: 30,
    fontWeight: '800',
    marginTop: 7,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 22,
  },
  destinationCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 28,
  },
  destinationIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
  },
  destinationCountry: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  destinationPrice: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '800',
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 17,
  },
  label: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 14,
    color: COLORS.text,
    outlineStyle: 'none',
  },
  summary: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 18,
    marginTop: 28,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 17,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 7,
  },
  summaryLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  summaryValue: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  totalLabel: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
  },
  totalValue: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '800',
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FCEDEC',
    padding: 12,
    borderRadius: RADIUS.md,
    marginBottom: 15,
  },
  errorText: {
    flex: 1,
    color: COLORS.danger,
    fontSize: 12,
  },
  successCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  successIcon: {
    marginBottom: 15,
  },
  successTitle: {
    color: COLORS.primary,
    fontSize: 23,
    fontWeight: '800',
    textAlign: 'center',
  },
  successSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
  },
  successInfo: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.md,
    padding: 14,
    marginTop: 20,
    marginBottom: 15,
    width: '100%',
  },
  successInfoText: {
    color: COLORS.primary,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
  disclaimer: {
    color: COLORS.textSecondary,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 15,
  },
});
