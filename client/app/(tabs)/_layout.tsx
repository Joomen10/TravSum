import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons } from '@expo/vector-icons';

import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name = "home"
        options = {{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size = { 28 } name = "home" color = {color} />,
        }}
      />
      <Tabs.Screen
        name = "upload"
        options = {{
          title: 'Upload',
          tabBarIcon: ({ color }) => <Ionicons name = "add-circle" size = { 28 } color = {color} />,
        }}
      />
      <Tabs.Screen
        name = "index"
        options = {{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size = { 28 } name = "person" color = {color} />,
        }}
      />
    </Tabs>
  );
}
