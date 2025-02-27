import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, useColorScheme, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X } from 'lucide-react-native';

// Sample country data
const allCountries = [
  { name: 'Afghanistan', capital: 'Kabul', flag: 'https://flagcdn.com/w320/af.png', continent: 'Asia' },
  { name: 'Albania', capital: 'Tirana', flag: 'https://flagcdn.com/w320/al.png', continent: 'Europe' },
  { name: 'Algeria', capital: 'Algiers', flag: 'https://flagcdn.com/w320/dz.png', continent: 'Africa' },
  { name: 'Andorra', capital: 'Andorra la Vella', flag: 'https://flagcdn.com/w320/ad.png', continent: 'Europe' },
  { name: 'Angola', capital: 'Luanda', flag: 'https://flagcdn.com/w320/ao.png', continent: 'Africa' },
  { name: 'Argentina', capital: 'Buenos Aires', flag: 'https://flagcdn.com/w320/ar.png', continent: 'South America' },
  { name: 'Armenia', capital: 'Yerevan', flag: 'https://flagcdn.com/w320/am.png', continent: 'Asia' },
  { name: 'Australia', capital: 'Canberra', flag: 'https://flagcdn.com/w320/au.png', continent: 'Oceania' },
  { name: 'Austria', capital: 'Vienna', flag: 'https://flagcdn.com/w320/at.png', continent: 'Europe' },
  { name: 'Azerbaijan', capital: 'Baku', flag: 'https://flagcdn.com/w320/az.png', continent: 'Asia' },
  { name: 'Bahamas', capital: 'Nassau', flag: 'https://flagcdn.com/w320/bs.png', continent: 'North America' },
  { name: 'Bahrain', capital: 'Manama', flag: 'https://flagcdn.com/w320/bh.png', continent: 'Asia' },
  { name: 'Bangladesh', capital: 'Dhaka', flag: 'https://flagcdn.com/w320/bd.png', continent: 'Asia' },
  { name: 'Barbados', capital: 'Bridgetown', flag: 'https://flagcdn.com/w320/bb.png', continent: 'North America' },
  { name: 'Belarus', capital: 'Minsk', flag: 'https://flagcdn.com/w320/by.png', continent: 'Europe' },
  { name: 'Belgium', capital: 'Brussels', flag: 'https://flagcdn.com/w320/be.png', continent: 'Europe' },
  { name: 'Belize', capital: 'Belmopan', flag: 'https://flagcdn.com/w320/bz.png', continent: 'North America' },
  { name: 'Benin', capital: 'Porto-Novo', flag: 'https://flagcdn.com/w320/bj.png', continent: 'Africa' },
  { name: 'Bhutan', capital: 'Thimphu', flag: 'https://flagcdn.com/w320/bt.png', continent: 'Asia' },
  { name: 'Bolivia', capital: 'Sucre', flag: 'https://flagcdn.com/w320/bo.png', continent: 'South America' },
];

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(allCountries);
  const [loading, setLoading] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  
  const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica'];
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      let results = allCountries;
      
      if (searchQuery) {
        results = results.filter(country => 
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.capital.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (selectedContinent) {
        results = results.filter(country => country.continent === selectedContinent);
      }
      
      setFilteredCountries(results);
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedContinent]);
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  const toggleContinent = (continent: string) => {
    if (selectedContinent === continent) {
      setSelectedContinent(null);
    } else {
      setSelectedContinent(continent);
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#f9fafb' }]}>
      <View style={styles.searchContainer}>
        <View style={[
          styles.searchBar, 
          { backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff' }
        ]}>
          <Search size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
          <TextInput
            style={[styles.input, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}
            placeholder="Search countries or capitals..."
            placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <View style={styles.filtersContainer}>
        <Text style={[styles.filtersTitle, { color: colorScheme === 'dark' ? '#e5e7eb' : '#1f2937' }]}>
          Filter by continent:
        </Text>
        <FlatList
          data={continents}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                { 
                  backgroundColor: selectedContinent === item 
                    ? (colorScheme === 'dark' ? '#3b82f6' : '#2563eb') 
                    : (colorScheme === 'dark' ? '#374151' : '#e5e7eb')
                }
              ]}
              onPress={() => toggleContinent(item)}
            >
              <Text 
                style={[
                  styles.filterText, 
                  { 
                    color: selectedContinent === item 
                      ? '#ffffff' 
                      : (colorScheme === 'dark' ? '#e5e7eb' : '#1f2937')
                  }
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.filtersList}
        />
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colorScheme === 'dark' ? '#60a5fa' : '#2563eb'} />
        </View>
      ) : (
        <>
          <Text style={[styles.resultsText, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
            {filteredCountries.length} {filteredCountries.length === 1 ? 'country' : 'countries'} found
          </Text>
          
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={[
                styles.countryCard, 
                { backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff' }
              ]}>
                <Image source={{ uri: item.flag }} style={styles.flag} />
                <View style={styles.countryInfo}>
                  <Text style={[styles.countryName, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.capitalName, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                    {item.capital}
                  </Text>
                  <View style={[
                    styles.continentTag, 
                    { backgroundColor: colorScheme === 'dark' ? '#374151' : '#e5e7eb' }
                  ]}>
                    <Text style={[styles.continentText, { color: colorScheme === 'dark' ? '#e5e7eb' : '#1f2937' }]}>
                      {item.continent}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            contentContainerStyle={styles.countriesList}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filtersTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  filtersList: {
    paddingBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsText: {
    paddingHorizontal: 16,
    marginBottom: 8,
    fontSize: 14,
  },
  countriesList: {
    padding: 16,
  },
  countryCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  flag: {
    width: 80,
    height: 60,
  },
  countryInfo: {
    flex: 1,
    padding: 12,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  capitalName: {
    fontSize: 14,
    marginTop: 2,
  },
  continentTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 6,
  },
  continentText: {
    fontSize: 12,
  },
});