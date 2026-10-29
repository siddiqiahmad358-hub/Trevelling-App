import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DESTINATIONS from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import { useApp } from '../context/AppContext';
import { COLORS, RADIUS } from '../styles/theme';

const CATEGORIES = ['All', 'Beach', 'Nature', 'City', 'Romantic', 'Culture'];

export default function ExploreScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { toggleFavorite, isFavorite } = useApp();

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(search.toLowerCase()) ||
        destination.country.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        destination.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const renderHeader = () => (
    <View>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greeting}>LET'S EXPLORE</Text>
          <Text style={styles.heading}>Find your next trip</Text>
        </View>

        <View style={styles.profileIcon}>
          <Ionicons name="person-outline" size={22} color={COLORS.primary} />
        </View>
      </View>

      <Text style={styles.subtitle}>
        Beautiful places are waiting to be discovered.
      </Text>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={21} color={COLORS.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations..."
          placeholderTextColor={COLORS.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <Ionicons
            name="close-circle"
            size={19}
            color={COLORS.textSecondary}
            onPress={() => setSearch('')}
          />
        )}
      </View>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Explore categories</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      >
        {CATEGORIES.map((category) => {
          const selected = selectedCategory === category;

          return (
            <Text
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.category,
                selected && styles.selectedCategory,
              ]}
            >
              {category}
            </Text>
          );
        })}
      </ScrollView>

      <View style={styles.destinationHeading}>
        <View>
          <Text style={styles.sectionTitle}>Popular destinations</Text>
          <Text style={styles.destinationSubtitle}>
            Explore places worth visiting
          </Text>
        </View>
        <Text style={styles.resultCount}>
          {filteredDestinations.length} places
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
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
          <View style={styles.emptyState}>
            <Ionicons
              name="search-outline"
              size={38}
              color={COLORS.textSecondary}
            />
            <Text style={styles.emptyTitle}>No destinations found</Text>
            <Text style={styles.emptyText}>
              Try another search or category.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heading: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: '800',
    marginTop: 7,
    letterSpacing: -0.8,
  },
  profileIcon: {
    height: 46,
    width: 46,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 8,
    marginBottom: 20,
  },
  searchBox: {
    height: 54,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    outlineStyle: 'none',
  },
  sectionHeading: {
    marginTop: 27,
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '800',
  },
  categoryList: {
    gap: 9,
    paddingBottom: 4,
  },
  category: {
    overflow: 'hidden',
    color: COLORS.textSecondary,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 22,
    paddingHorizontal: 17,
    paddingVertical: 10,
    fontSize: 13,
    fontWeight: '600',
  },
  selectedCategory: {
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  destinationHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 27,
    marginBottom: 16,
  },
  destinationSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 5,
  },
  resultCount: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 45,
  },
  emptyTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 12,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 6,
  },
});