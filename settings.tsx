import { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, useColorScheme, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moon, Sun, Globe, Info, Download, Share2, Star, Mail } from 'lucide-react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  // These would be connected to actual state management in a real app
  const [offlineMode, setOfflineMode] = useState(false);
  const [showCapitals, setShowCapitals] = useState(true);
  const [showPopulation, setShowPopulation] = useState(true);
  const [quizDifficulty, setQuizDifficulty] = useState('medium');
  
  const handleRateApp = () => {
    Alert.alert('Rate App', 'This would open the app store rating page in a real app.');
  };
  
  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'This would open an email client in a real app.');
  };
  
  const handleShareApp = () => {
    Alert.alert('Share App', 'This would open the share dialog in a real app.');
  };
  
  const handleDownloadData = () => {
    Alert.alert(
      'Download Offline Data',
      'This would download country data for offline use in a real app.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Download', 
          onPress: () => {
            // Simulate download
            setTimeout(() => {
              setOfflineMode(true);
              Alert.alert('Success', 'Offline data downloaded successfully!');
            }, 2000);
          }
        }
      ]
    );
  };
  
  const handleAbout = () => {
    Alert.alert(
      'About World Atlas',
      'World Atlas Learning App v1.0.0\n\nLearn about countries, flags, and capitals from around the world. Test your knowledge with interactive quizzes and flashcards.\n\n© 2025 World Atlas'
    );
  };
  
  const renderSettingItem = (
    icon: JSX.Element,
    title: string,
    description: string,
    control: JSX.Element
  ) => (
    <View style={[
      styles.settingItem, 
      { borderBottomColor: isDarkMode ? '#374151' : '#e5e7eb' }
    ]}>
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
          {title}
        </Text>
        <Text style={[styles.settingDescription, { color: isDarkMode ? '#9ca3af' : '#6b7280' }]}>
          {description}
        </Text>
      </View>
      <View style={styles.settingControl}>
        {control}
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#111827' : '#f9fafb' }]}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#e5e7eb' : '#1f2937' }]}>
            Appearance
          </Text>
          
          {renderSettingItem(
            isDarkMode ? <Moon size={24} color="#60a5fa" /> : <Sun size={24} color="#f59e0b" />,
            'Theme',
            'The app follows your device theme settings',
            <Text style={[styles.themeText, { color: isDarkMode ? '#60a5fa' : '#f59e0b' }]}>
              {isDarkMode ? 'Dark' : 'Light'}
            </Text>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#e5e7eb' : '#1f2937' }]}>
            Content
          </Text>
          
          {renderSettingItem(
            <Globe size={24} color={isDarkMode ? '#60a5fa' : '#2563eb'} />,
            'Offline Mode',
            'Access all content without internet connection',
            <Switch
              value={offlineMode}
              onValueChange={setOfflineMode}
              trackColor={{ false: '#d1d5db', true: isDarkMode ? '#3b82f6' : '#2563eb' }}
              thumbColor="#ffffff"
            />
          )}
          
          {renderSettingItem(
            <Info size={24} color={isDarkMode ? '#60a5fa' : '#2563eb'} />,
            'Show Capitals',
            'Display capital cities in country listings',
            <Switch
              value={showCapitals}
              onValueChange={setShowCapitals}
              trackColor={{ false: '#d1d5db', true: isDarkMode ? '#3b82f6' : '#2563eb' }}
              thumbColor="#ffffff"
            />
          )}
          
          {renderSettingItem(
            <Info size={24} color={isDarkMode ? '#60a5fa' : '#2563eb'} />,
            'Show Population',
            'Display population data in country details',
            <Switch
              value={showPopulation}
              onValueChange={setShowPopulation}
              trackColor={{ false: '#d1d5db', true: isDarkMode ? '#3b82f6' : '#2563eb' }}
              thumbColor="#ffffff"
            />
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#e5e7eb' : '#1f2937' }]}>
            Quiz Settings
          </Text>
          
          <View style={[
            styles.settingItem, 
            { borderBottomColor: isDarkMode ? '#374151' : '#e5e7eb' }
          ]}>
            <View style={styles.settingContent}>
              <Text style={[styles.settingTitle, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
                Difficulty Level
              </Text>
            </View>
          </View>
          
          <View style={styles.difficultyContainer}>
            {['easy', 'medium', 'hard'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.difficultyButton,
                  { 
                    backgroundColor: quizDifficulty === level 
                      ? (isDarkMode ? '#3b82f6' : '#2563eb') 
                      : (isDarkMode ? '#1f2937' : '#e5e7eb')
                  }
                ]}
                onPress={() => setQuizDifficulty(level)}
              >
                <Text 
                  style={[
                    styles.difficultyText, 
                    { 
                      color: quizDifficulty === level 
                        ? '#ffffff' 
                        : (isDarkMode ? '#e5e7eb' : '#1f2937')
                    }
                  ]}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#e5e7eb' : '#1f2937' }]}>
            Data Management
          </Text>
          
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              { backgroundColor: isDarkMode ? '#1f2937' : '#ffffff' }
            ]}
            onPress={handleDownloadData}
          >
            <Download size={20} color={isDarkMode ? '#60a5fa' : '#2563eb'} />
            <Text style={[styles.actionText, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
              Download Offline Data
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#e5e7eb' : '#1f2937' }]}>
            About
          </Text>
          
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              { backgroundColor: isDarkMode ? '#1f2937' : '#ffffff' }
            ]}
            onPress={handleShareApp}
          >
            <Share2 size={20} color={isDarkMode ? '#60a5fa' : '#2563eb'} />
            <Text style={[styles.actionText, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
              Share App
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              { backgroundColor: isDarkMode ? '#1f2937' : '#ffffff' }
            ]}
            onPress={handleRateApp}
          >
            <Star size={20} color={isDarkMode ? '#60a5fa' : '#2563eb'} />
            <Text style={[styles.actionText, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
              Rate App
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              { backgroundColor: isDarkMode ? '#1f2937' : '#ffffff' }
            ]}
            onPress={handleContactSupport}
          >
            <Mail size={20} color={isDarkMode ? '#60a5fa' : '#2563eb'} />
            <Text style={[styles.actionText, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
              Contact Support
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              { backgroundColor: isDarkMode ? '#1f2937' : '#ffffff' }
            ]}
            onPress={handleAbout}
          >
            <Info size={20} color={isDarkMode ? '#60a5fa' : '#2563eb'} />
            <Text style={[styles.actionText, { color: isDarkMode ? '#ffffff' : '#000000' }]}>
              About World Atlas
            </Text>
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.versionText, { color: isDarkMode ? '#6b7280' : '#9ca3af' }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
  },
  settingControl: {
    marginLeft: 8,
  },
  themeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  actionText: {
    fontSize: 16,
    marginLeft: 12,
  },
  versionText: {
    textAlign: 'center',
    marginVertical: 24,
    fontSize: 14,
  },
});