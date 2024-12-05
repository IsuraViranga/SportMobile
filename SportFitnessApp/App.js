import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { ClickProvider } from './context/ClickContext';

export default function App() {
  return (
    <ClickProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ClickProvider>
  );
}
