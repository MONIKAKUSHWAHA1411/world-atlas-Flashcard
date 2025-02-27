import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, useColorScheme, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

// Define types
type Continent = {
  name: string;
  code: string;
  image: string;
  countryCount: number;
};

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const continents: Continent[] = [
    {
      name: 'Africa',
      code: 'AF',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=600&auto=format&fit=crop',
      countryCount: 54
    },
    {
      name: 'Asia',
      code: 'AS',
      image: 'https://images.unsplash.com/photo-1535139262971-c51845709a48?q=80&w=600&auto=format&fit=crop',
      countryCount: 48
    },
    {
      name: 'Europe',
      code: 'EU',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=600&auto=format&fit=crop',
      countryCount: 44
    },
    {
      name: 'North America',
      code: 'NA',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=600&auto=format&fit=crop',
      countryCount: 23
    },
    {
      name: 'South America',
      code: 'SA',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=600&auto=format&fit=crop',
      countryCount: 12
    },
    {
      name: 'Oceania',
      code: 'OC',
      image: 'https://images.unsplash.com/photo-1589330273594-fade1ee91647?q=80&w=600&auto=format&fit=crop',
      countryCount: 14
    },
    {
      name: 'Antarctica',
      code: 'AN',
      image: 'https://images.unsplash.com/photo-1516557070061-c3d1653fa646?q=80&w=600&auto=format&fit=crop',
      countryCount: 0
    },
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const navigateToContinent = (continent: Continent) => {
    // In a real app, this would navigate to a continent detail screen
    console.log(`Navigate to ${continent.name}`);
    // router.push(`/continent/${continent.code}`);
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#f9fafb' }]}>
        <ActivityIndicator size="large" color={colorScheme === 'dark' ? '#60a5fa' : '#2563eb'} />
        <Text style={[styles.loadingText, { color: colorScheme === 'dark' ? '#e5e7eb' : '#1f2937' }]}>
          Loading world data...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#f9fafb' }]}>
      <Text style={[styles.subtitle, { color: colorScheme === 'dark' ? '#e5e7eb' : '#1f2937' }]}>
        Explore the world by continent
      </Text>
      
      <FlatList
        data={continents}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.continentCard, 
              { backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff' }
            ]}
            onPress={() => navigateToContinent(item)}
          >
            <Image source={{ uri: item.image }} style={styles.continentImage} />
            <View style={styles.continentInfo}>
              <Text style={[styles.continentName, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>
                {item.name}
              </Text>
              <Text style={[styles.countryCount, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
                {item.countryCount} {item.countryCount === 1 ? 'country' : 'countries'}
              </Text>
            </View>
            <ChevronRight size={24} color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  listContent: {
    padding: 16,
  },
  continentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  continentImage: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  continentInfo: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  continentName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  countryCount: {
    fontSize: 14,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
});