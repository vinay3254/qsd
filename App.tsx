0/**
 * ExpenseTracker App
 * 
 * Main entry point for the React Native application
 * Uses React Navigation for routing
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#fff"
      />
      {/* AppNavigator handles all navigation flow */}
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;

