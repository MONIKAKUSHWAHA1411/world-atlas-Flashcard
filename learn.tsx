import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react-native';

// Sample data for flashcards
const flashcardData = [
  {
    id: '1',
    country: 'Japan',
    capital: 'Tokyo',
    flag: 'https://flagcdn.com/w320/jp.png',
    population: '125.8 million',
    continent: 'Asia',
    language: 'Japanese',
  },
  {
    id: '2',
    country: 'Brazil',
    capital: 'Brasília',
    flag: 'https://flagcdn.com/w320/br.png',
    population: '212.6 million',
    continent: 'South America',
    language: 'Portuguese',
  },
  {
    id: '3',
    country: 'Kenya',
    capital: 'Nairobi',
    flag: 'https://flagcdn.com/w320/ke.png',
    population: '53.8 million',
    continent: 'Africa',
    language: 'Swahili, English',
  },
  {
    id: '4',
    country: 'Germany',
    capital: 'Berlin',
    flag: 'https://flagcdn.com/w320/de.png',
    population: '83.2 million',
    continent: 'Europe',
    language: 'German',
  },
  {
    id: '5',
    country: 'Australia',
    capital: 'Canberra',
    flag: 'https://flagcdn.com/w320/au.png',
    population: '25.7 million',
    continent: 'Oceania',
    language: 'English',
  },
];

const { width } = Dimensions.get('window');

export default function LearnScreen() {
  const colorScheme = useColorScheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const rotate = useSharedValue(0);
  
  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${rotate.value}deg` },
      ],
      opacity: rotate.value <= 90 ? 1 : 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    };
  });
  
  const backStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateY: `${rotate.value + 180}deg` },
      ],
      opacity: rotate.value > 90 ? 1 : 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    };
  });
  
  const flipCard = () => {
    const newValue = isFlipped ? 0 : 180;
    rotate.value = withTiming(newValue, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
    setIsFlipped(!isFlipped);
  };
  
  const nextCard = () => {
    if (isFlipped) {
      flipCard();
    }
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcardData.length);
    }, isFlipped ? 250 : 0);
  };
  
  const prevCard = () => {
    if (isFlipped) {
      flipCard();
    }
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcardData.length) % flashcardData.length);
    }, isFlipped ? 250 : 0);
  };
  
  const resetCards = () => {
    if (isFlipped) {
      flipCard();
    }
    
    setTimeout(() => {
      setCurrentIndex(0);
    }, isFlipped ? 250 : 0);
  };
  
  const currentCard = flashcardData[currentIndex];
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#f9fafb' }]}>
      <Text style={[styles.instructions, { color: colorScheme === 'dark' ? '#e5e7eb' : '#1f2937' }]}>
        Tap the card to flip and learn more
      </Text>
      
      <View style={styles.cardContainer}>
        <TouchableOpacity activeOpacity={0.9} onPress={flipCard} style={styles.card}>
          <Animated.View style={[
            styles.cardFace,
            frontStyle,
            { backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff' }
          ]}>
            <Image source={{ uri: currentCard.flag }} style={styles.flag} resizeMode="contain" />
            <Text style={[styles.countryName, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>
              {currentCard.country}
            </Text>
          </Animated.View>
          
          <Animated.View style={[
            styles.cardFace,
            backStyle,
            { backgroundColor: colorScheme === 'dark' ? '#1f2937' : '#ffffff' }
          ]}>
            <View style={styles.infoContainer}>
              <Text style={[styles.infoLabel, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>Capital</Text>
              <Text style={[styles.infoValue, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>{currentCard.capital}</Text>
              
              <Text style={[styles.infoLabel, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>Continent</Text>
              <Text style={[styles.infoValue, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>{currentCard.continent}</Text>
              
              <Text style={[styles.infoLabel, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>Population</Text>
              <Text style={[styles.infoValue, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>{currentCard.population}</Text>
              
              <Text style={[styles.infoLabel, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>Language</Text>
              <Text style={[styles.infoValue, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>{currentCard.language}</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, { backgroundColor: colorScheme === 'dark' ? '#374151' : '#e5e7eb' }]} 
          onPress={prevCard}
        >
          <ChevronLeft size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, { backgroundColor: colorScheme === 'dark' ? '#374151' : '#e5e7eb' }]} 
          onPress={resetCards}
        >
          <RotateCcw size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, { backgroundColor: colorScheme === 'dark' ? '#374151' : '#e5e7eb' }]} 
          onPress={nextCard}
        >
          <ChevronRight size={24} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.counter, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
        {currentIndex + 1} / {flashcardData.length}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  cardContainer: {
    width: width * 0.85,
    height: width * 1.2,
    marginBottom: 32,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardFace: {
    borderRadius: 16,
    padding: 20,
  },
  flag: {
    width: '100%',
    height: '60%',
    marginBottom: 20,
  },
  countryName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    width: '100%',
    padding: 16,
  },
  infoLabel: {
    fontSize: 14,
    marginTop: 12,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  counter: {
    marginTop: 16,
    fontSize: 14,
  },
});