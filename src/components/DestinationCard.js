
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOW } from '../styles/theme';

export default function DestinationCard({
  destination,
  onPress,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: destination.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <Pressable
          style={styles.favoriteButton}
          onPress={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={21}
            color={isFavorite ? COLORS.danger : COLORS.text}
          />
        </Pressable>

        <View style={styles.rating}>
          <Ionicons name="star" size={13} color="#E8A45B" />
          <Text style={styles.ratingText}>{destination.rating}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{destination.name}</Text>
          <Text style={styles.duration}>{destination.duration}</Text>
        </View>

        <Text style={styles.country}>
          <Ionicons name="location-outline" size={13} color={COLORS.textSecondary} />
          {' '}{destination.country}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            ${destination.price}
            <Text style={styles.perPerson}> / person</Text>
          </Text>
          <Text style={styles.category}>{destination.category}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: 20,
    ...SHADOW.card,
  },
  imageContainer: {
    height: 190,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 12,
  },
  details: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '700',
  },
  duration: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  country: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 7,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  price: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '800',
  },
  perPerson: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '400',
  },
  category: {
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 11,
    fontWeight: '600',
  },
});
