/**
 * AuthStack - Native Stack Navigator for authentication flow
 * 
 * Navigation Flow:
 * - Contains LoginScreen as the initial route
 * - After successful login, navigates to MainTabs using navigation.replace()
 * - This stack is separate from MainTabs to manage authentication state
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList } from './AppNavigator';

// Create native stack navigator for authentication flow
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * AuthStack Component
 * Handles the authentication flow of the app
 * Initial route: LoginScreen
 */
const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, // Hide header for auth screens
        animation: 'slide_from_right', // Smooth transition animation
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
          // Prevent back navigation from login (initial screen)
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

