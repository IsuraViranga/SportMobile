import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import LogoutPage from '../pages/LogoutPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ route }) {
  const { username ,password } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#bdbdbd',
        tabBarStyle: { borderTopWidth: 0 }, 
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Logout') {
            iconName = 'log-out';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['#4649A0', '#40AEA0']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        children={() => <HomePage username={username} password={password} />}
      />
      <Tab.Screen
        name="Profile"
        children={() => <ProfilePage username={username} password={password} />}
      />
      <Tab.Screen name="Logout" component={LogoutPage} />
    </Tab.Navigator>
  );
}
