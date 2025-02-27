import React from 'react';
import { FlatList, StyleSheet, View, Text, useColorScheme, ActivityIndicator } from 'react-native';
import CountryCard from './CountryCard';

type Country = {
  name: string;
  capital: string;
  flag: string;
  population?: string;
  continent?: string;
};

type CountryListProps = {
  countries: Country[];
  loading?: boolean;
  onCountryPress?: (country: Country) => void;
  showDetails?: boolean;
  emptyMessage?: string;
};

export default function CountryList({ 
  countries, 
  loading = false, 
  onCountryPress, 
  showDetails = true,
  emptyMessage = 'No countries found'
}: CountryListProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={isDarkMode ? '#60a5fa' : '#2563eb'} />
        <Text style={[styles.loadingText, { color: isDarkMode ? '#e5e7eb' : '#1f2937' }]}>
          Loading countries...
        </Text>
      </View>
    );
  }
  
  if (countries.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.emptyText, { color: isDarkMode ? '#e5e7eb' : '#1f2937' }]}>
          {emptyMessage}
        </Text>
      </View>
    );
  }
  
  return (
    <FlatList
      data={countries}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <CountryCard 
          country={item} 
          onPress={onCountryPress ? () => onCountryPress(item) : undefined}
          showDetails={showDetails}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});