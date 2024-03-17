import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1db954",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          color: "#FFFFFF",
        },
      }}
    >
      <Tabs.Screen
        name="Artists"
        options={{
          title: "Top Artists",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="audiotrack" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Tracks"
        options={{
          title: "Top Tracks",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="track-changes" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
