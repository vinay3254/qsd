/**
 * AppNavigator - Root navigation container
 * 
 * Navigation Architecture:
 * 
 * Root Stack Navigator (Native Stack)
 * ├── AuthStack (when not logged in)
 * │   └── LoginScreen
 * └── MainTabs (when logged in) - Bottom Tab Navigator
 *     ├── HomeScreen (Expense List)
 *     └── ProfileScreen
 * 
 * Navigation Flow:
 * 1. App starts with LoginScreen (AuthStack)
 * 2. After successful login → navigation.replace('MainTabs') removes Login from stack
 * 3. MainTabs shows bottom tabs with Home and Profile
 * 4. From Profile, logout → navigation.replace('Login') removes MainTabs from stack
 * 
 * Key Navigation Methods:
 * - navigation.replace() - Replaces current route with new one (no back navigation possible)
 * - This ensures clean stack management for auth flows
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';

/**
 * Root Stack Param List
 * Defines all possible routes in the app
 */
export type RootStackParamList = {
  Login: undefined;      // Login screen (initial route)
  MainTabs: undefined;   // Main app with bottom tabs (after login)
};

/**
 * Root Stack Navigator
 * Manages the top-level navigation between Auth and Main app
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * AppNavigator Component
 * Root navigation container that manages auth state navigation
 */
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide header at root level
        }}
      >
        {/* 
          Auth Stack - Contains Login screen
          This is the initial route when app starts
        */}
        <Stack.Screen 
          name="Login" 
          component={AuthStack} 
        />
        
        {/*
          Main Tabs - Contains bottom tab navigator with Home and Profile
          After login, we navigate here using replace()
        */}
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs}
          options={{
            // Header is managed by individual screens in MainTabs
            // But we can add header customization here if needed
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

