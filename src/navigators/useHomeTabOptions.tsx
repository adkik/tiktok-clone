import React from "react";
import { useUnistyles } from "react-native-unistyles";
import { Ionicons } from "@expo/vector-icons";

export const useHomeTabOptions = () => {
  const { theme } = useUnistyles();

  return {
    tabBarActiveTintColor: theme.colors.icon,
    tabBarInactiveTintColor: theme.colors.icon,
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
      <Ionicons
        name={focused ? "home" : "home-outline"}
        size={25}
        color={color}
      />
    ),
  };
};
