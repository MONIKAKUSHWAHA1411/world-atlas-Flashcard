import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

type CountryCardProps = {
  country: {
    name: string;
    capital: string;
    flag: string;
    population?: string;
    continent?: string;
  };
  onPress?: () => void;
  showDetails?: boolean;
};

export default function CountryCard({ country, onPress, showDetails = true }: CountryCardProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { backgroundColor: isDarkMode ? '#1f2937' : '#ffffff' }
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <Image source={{ uri: country.flag }} style={styles.flag} resizeMode="cover" />
      
      <View style={styles.content}>
        <Text style={[styles.name, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
          {country.name}
        </Text>
        
        {showDetails && (
          <>
            <Text style={[styles.capital, { color: isDarkMode ? '#9ca3af' : '#6b7280' }]}>
              Capital: {country.capital}
            </Text>
            
            {country.continent && (
              <View style={[
                styles.continentTag, 
                { backgroundColor: isDarkMode ? '#374151' : '#e5e7eb' }
              ]}>
                <Text style={[styles.continentText, { color: isDarkMode ? '#e5e7eb' : '#1f2937' }]}>
                  {country.continent}
                </Text>
              </View>
            )}
            
            {country.population && (
              <Text style={[styles.population, { color: isDarkMode ? '#9ca3af' : '#6b7280' }]}>
                Population: {country.population}
              </Text>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  flag: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  capital: {
    fontSize: 16,
    marginBottom: 8,
  },
  continentTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 8,
  },
  continentText: {
    fontSize: 14,
    fontWeight: '500',
  },
  population: {
    fontSize: 14,
  },
});