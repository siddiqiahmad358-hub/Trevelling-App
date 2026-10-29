import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DESTINATIONS from '../data/destinations';
import PrimaryButton from '../components/PrimaryButton';
import { useApp } from '../context/AppContext';
import { COLORS, RADIUS, SHADOW } from '../styles/theme';

export default function DestinationDetailsScreen({ route, navigation }) {
  const { destinationId } = route.params;
  const destination = DESTINATIONS.find((item) => item.id === destinationId);

  const { toggleFavorite, isFavorite } = useApp();

  if (!destination) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.notFound}>Destination not found.</Text>
      </SafeAreaView>
    );
  }

  const favorite = isFavorite(destination.id);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: destination.image }}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroTop}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.iconButton}
            >
              <Ionicons name="arrow-back" size={22} color={COLORS.text} />
            </Pressable>

            <Pressable
              onPress={() => toggleFavorite(destination.id)}
              style={styles.iconButton}
            >
              <Ionicons
                name={favorite ? 'heart' : 'heart-outline'}
                size={22}
                color={favorite ? COLORS.danger : COLORS.text}
              />
            </Pressable>
          </View>

          <View style={styles.heroLabel}>
            <Ionicons name="location" size={14} color={COLORS.white} />
            <Text style={styles.heroLabelText}>{destination.country}</Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{destination.name}</Text>
              <Text style={styles.location}>{destination.location}</Text>
            </View>

            <View style={styles.rating}>
              <Ionicons name="star" size={15} color="#E8A45B" />
              <Text style={styles.ratingText}>{destination.rating}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <Text style={styles.infoValue}>{destination.duration}</Text>
              <Text style={styles.infoLabel}>Duration</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="compass-outline" size={20} color={COLORS.primary} />
              <Text style={styles.infoValue}>{destination.category}</Text>
              <Text style={styles.infoLabel}>Experience</Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="wallet-outline" size={20} color={COLORS.primary} />
              <Text style={styles.infoValue}>${destination.price}</Text>
              <Text style={styles.infoLabel}>Starting price</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>About this destination</Text>
          <Text style={styles.description}>{destination.description}</Text>

          <View style={styles.priceCard}>
            <View>
              <Text style={styles.priceLabel}>Starting from</Text>
              <Text style={styles.price}>
                ${destination.price}
                <Text style={styles.perPerson}> / person</Text>
              </Text>
            </View>

            <View style={styles.priceIcon}>
              <Ionicons name="airplane-outline" size={24} color={COLORS.primary} />
            </View>
          </View>

          <PrimaryButton
            title="Book this trip"
            onPress={() =>
              navigation.navigate('Booking', {
                destinationId: destination.id,
              })
            }
          />
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
  hero: {
    height: 340,
    justifyContent: 'space-between',
    padding: 20,
  },
  heroImage: {
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  heroLabelText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    padding: 22,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '800',
  },
  location: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 9,
    ...SHADOW.card,
  },
  ratingText: {
    color: COLORS.text,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.lg,
    padding: 17,
    marginTop: 25,
    marginBottom: 28,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
    gap: 5,
  },
  infoValue: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  infoLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 24,
  },
  priceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 18,
    marginTop: 25,
    marginBottom: 20,
    ...SHADOW.card,
  },
  priceLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 5,
  },
  price: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '800',
  },
  perPerson: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '400',
  },
  priceIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    padding: 25,
    color: COLORS.text,
  },
});