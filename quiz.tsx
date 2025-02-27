import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useColorScheme, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { CircleAlert as AlertCircle, CircleCheck as CheckCircle2, CircleHelp as HelpCircle } from 'lucide-react-native';

// Sample quiz data
const quizData = [
  {
    question: 'Which country does this flag belong to?',
    flag: 'https://flagcdn.com/w320/fr.png',
    options: ['Germany', 'Italy', 'France', 'Spain'],
    correctAnswer: 'France',
  },
  {
    question: 'What is the capital of Japan?',
    flag: 'https://flagcdn.com/w320/jp.png',
    options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
    correctAnswer: 'Tokyo',
  },
  {
    question: 'Which country does this flag belong to?',
    flag: 'https://flagcdn.com/w320/br.png',
    options: ['Argentina', 'Colombia', 'Brazil', 'Peru'],
    correctAnswer: 'Brazil',
  },
  {
    question: 'What is the capital of Australia?',
    flag: 'https://flagcdn.com/w320/au.png',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
    correctAnswer: 'Canberra',
  },
  {
    question: 'Which country does this flag belong to?',
    flag: 'https://flagcdn.com/w320/ca.png',
    options: ['United States', 'Canada', 'United Kingdom', 'Australia'],
    correctAnswer: 'Canada',
  },
];

export default function QuizScreen() {
  const colorScheme = useColorScheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const scoreAnimation = useSharedValue(0);
  const scoreStyle = useAnimatedStyle(() => {
    return {
      fontSize: 48,
      fontWeight: 'bold',
      color: colorScheme === 'dark' ? '#ffffff' : '#000000',
      opacity: scoreAnimation.value,
      transform: [{ scale: scoreAnimation.value }],
    };
  });
  
  useEffect(() => {
    // Simulate loading quiz data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const currentQuestion = quizData[currentQuestionIndex];
  
  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
        scoreAnimation.value = withTiming(1, {
          duration: 1000,
          easing: Easing.bounce,
        });
      }
    }, 1500);
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    scoreAnimation.value = 0;
  };
  
  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#f9fafb' }]}>
        <ActivityIndicator size="large" color={colorScheme === 'dark' ? '#60a5fa' : '#2563eb'} />
        <Text style={[styles.loadingText, { color: colorScheme === 'dark' ? '#e5e7eb' : '#1f2937' }]}>
          Loading quiz...
        </Text>
      </View>
    );
  }
  
  if (quizCompleted) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#f9fafb' }]}>
        <Text style={[styles.resultTitle, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>
          Quiz Completed!
        </Text>
        
        <Text style={[styles.resultSubtitle, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
          Your score:
        </Text>
        
        <Animated.Text style={scoreStyle}>
          {score}/{quizData.length}
        </Animated.Text>
        
        <Text style={[styles.resultMessage, { color: colorScheme === 'dark' ? '#e5e7eb' : '#1f2937' }]}>
          {score === quizData.length 
            ? 'Perfect! You\'re a geography expert!' 
            : score >= quizData.length / 2 
              ? 'Good job! Keep learning to improve your score.' 
              : 'Keep practicing to improve your knowledge!'}
        </Text>
        
        <TouchableOpacity 
          style={[styles.restartButton, { backgroundColor: colorScheme === 'dark' ? '#3b82f6' : '#2563eb' }]} 
          onPress={restartQuiz}
        >
          <Text style={styles.restartButtonText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#111827' : '#f9fafb' }]}>
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { 
              backgroundColor: colorScheme === 'dark' ? '#374151' : '#e5e7eb',
              width: '100%',
            }
          ]}
        >
          <View 
            style={[
              styles.progressFill, 
              { 
                backgroundColor: colorScheme === 'dark' ? '#3b82f6' : '#2563eb',
                width: `${((currentQuestionIndex) / quizData.length) * 100}%`,
              }
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: colorScheme === 'dark' ? '#9ca3af' : '#6b7280' }]}>
          Question {currentQuestionIndex + 1} of {quizData.length}
        </Text>
      </View>
      
      <Text style={[styles.question, { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }]}>
        {currentQuestion.question}
      </Text>
      
      <Image source={{ uri: currentQuestion.flag }} style={styles.flagImage} resizeMode="contain" />
      
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === currentQuestion.correctAnswer;
          
          let backgroundColor;
          if (selectedAnswer) {
            if (isSelected && isCorrect) {
              backgroundColor = colorScheme === 'dark' ? '#065f46' : '#10b981';
            } else if (isSelected && !isCorrect) {
              backgroundColor = colorScheme === 'dark' ? '#7f1d1d' : '#ef4444';
            } else if (isCorrect) {
              backgroundColor = colorScheme === 'dark' ? '#065f46' : '#10b981';
            } else {
              backgroundColor = colorScheme === 'dark' ? '#1f2937' : '#ffffff';
            }
          } else {
            backgroundColor = colorScheme === 'dark' ? '#1f2937' : '#ffffff';
          }
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                { backgroundColor }
              ]}
              onPress={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
            >
              <Text 
                style={[
                  styles.optionText, 
                  { color: colorScheme === 'dark' ? '#ffffff' : '#000000' }
                ]}
              >
                {option}
              </Text>
              
              {selectedAnswer && (
                <View style={styles.resultIcon}>
                  {isCorrect ? (
                    <CheckCircle2 size={24} color="#10b981" />
                  ) : (
                    isSelected ? <AlertCircle size={24} color="#ef4444" /> : null
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      
      {selectedAnswer && (
        <View style={styles.feedbackContainer}>
          <Text 
            style={[
              styles.feedbackText,
              { 
                color: selectedAnswer === currentQuestion.correctAnswer 
                  ? '#10b981' 
                  : '#ef4444' 
              }
            ]}
          >
            {selectedAnswer === currentQuestion.correctAnswer 
              ? 'Correct! Well done!' 
              : `Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`
            }
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  question: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  flagImage: {
    width: '100%',
    height: 150,
    marginBottom: 32,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
  },
  resultIcon: {
    width: 24,
    height: 24,
  },
  feedbackContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: '600',
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  resultSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  resultMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  restartButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
});