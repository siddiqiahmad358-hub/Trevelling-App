import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DESTINATIONS from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import { useApp } from '../context/AppContext';
import { COLORS } from '../styles/theme';

export default function FavoritesScreen({ navigation }) {
  const { favorites, toggleFavorite, isFavorite } = useApp();

  const favoriteDestinations = DESTINATIONS.filter((destination) =>
    favorites.includes(destination.id)
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={favoriteDestinations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>YOUR COLLECTION</Text>
            <Text style={styles.heading}>Saved places</Text>
            <Text style={styles.subtitle}>
              Your favorite destinations, all in one place.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <DestinationCard
            destination={item}
            onPress={() =>
              navigation.navigate('DestinationDetails', {
                destinationId: item.id,
              })
            }
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="heart-outline" size={34} color={COLORS.primary} />
            </View>
            <Text style={styles.emptyTitle}>No saved places yet</Text>
            <Text style={styles.emptyText}>
              Tap the heart on a destination to add it to your favorites.
            </Text>
          </View>
        }
      />
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
    padding: 20,
    paddingBottom: 35,
  },
  header: {
    marginTop: 12,
    marginBottom: 23,
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
  },
  empty: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 55,
  },
  emptyIcon: {
    width: 75,
    height: 75,
    borderRadius: 25,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '800',
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 8,
  },
});