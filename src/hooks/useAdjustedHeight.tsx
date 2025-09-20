import { useWindowDimensions } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

/**
 * @returns {number} Available screen height minus the bottom tab bar height
 */
export function useAdjustedHeight() {
  const { height } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();

  return height - tabBarHeight;
}
