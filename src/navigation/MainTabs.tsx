/**
 * MainTabs - Bottom Tab Navigator for authenticated users
 * 
 * Navigation Flow:
 * - Contains Home (Expense List) and Profile tabs
 * - This is the main app after successful authentication
 * - User cannot navigate back to Login from this screen due to stack management
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AttendeesScreen from '../screens/AttendeesScreen';

/**
 * MainTabs Param List
 * Defines routes for the bottom tab navigator
 */
export type MainTabsParamList = {
  Home: undefined;      // Home screen (Expense List)
  Profile: undefined;  // Profile screen
  Attendees: undefined; // Attendees screen (Concert attendees)
};

// Create bottom tab navigator
const Tab = createBottomTabNavigator<MainTabsParamList>();

/**
 * Custom Tab Icon Component
 */
const TabIcon: React.FC<{ name: string; focused: boolean }> = ({ name, focused }) => {
  const getIcon = () => {
    switch (name) {
      case 'Home':
        return '🏠';
      case 'Profile':
        return '👤';
      case 'Attendees':
        return '🎵';
      default:
        return '•';
    }
  };

  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.icon, focused && styles.iconFocused]}>
        {getIcon()}
      </Text>
    </View>
  );
};

/**
 * MainTabs Component
 * Bottom Tab Navigator with Home and Profile tabs
 */
const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1a73e8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#1a73e8',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      {/* Home Tab - Expense List */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Expenses',
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} />,
          // Custom header for Home screen
          headerTitle: 'ExpenseTracker',
        }}
      />

      {/* Profile Tab - User Profile */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} />,
          headerTitle: 'My Profile',
        }}
      />

      {/* Attendees Tab - Concert Attendees */}
      <Tab.Screen
        name="Attendees"
        component={AttendeesScreen}
        options={{
          title: 'Attendees',
          tabBarLabel: 'Attendees',
          tabBarIcon: ({ focused }) => <TabIcon name="Attendees" focused={focused} />,
          headerTitle: 'Concert Attendees',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    opacity: 0.6,
  },
  iconFocused: {
    opacity: 1,
  },
});

export default MainTabs;

