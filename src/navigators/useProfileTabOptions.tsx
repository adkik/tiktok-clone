import React from "react";
import { useUnistyles } from "react-native-unistyles";
import { Ionicons } from "@expo/vector-icons";

export const useProfileTabOptions = () => {
  const { theme } = useUnistyles();

  return {
    tabBarActiveTintColor: theme.colors.icon,
    tabBarInactiveTintColor: theme.colors.icon,
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
      <Ionicons
        name={focused ? "person" : "person-outline"}
        size={25}
        color={color}
      />
    ),
  };
};
