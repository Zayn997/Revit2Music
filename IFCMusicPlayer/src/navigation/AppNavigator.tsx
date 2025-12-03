import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";

import LibraryScreen from "../screens/LibraryScreen";
import PlayerScreen from "../screens/PlayerScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
          borderTopColor: "#333",
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: "#1DB954",
        tabBarInactiveTintColor: "#888",
        headerStyle: {
          backgroundColor: "#1a1a1a",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: "Library",
          tabBarIcon: ({ color }: { color: string }) => (
            <TabIcon icon="📚" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Player"
        component={PlayerScreen}
        options={{
          tabBarLabel: "Player",
          tabBarIcon: ({ color }: { color: string }) => (
            <TabIcon icon="▶️" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }: { color: string }) => (
            <TabIcon icon="⚙️" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function TabIcon({ icon, color }: { icon: string; color: string }) {
  return <Text style={{ fontSize: 24, color }}>{icon}</Text>;
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
