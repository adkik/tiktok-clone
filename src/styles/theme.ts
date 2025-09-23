import { StyleSheet } from "react-native-unistyles";

export const sharedColors = {
  salmon: "#ff6b6b",
  heartIcon: (liked: boolean) => (liked ? sharedColors.salmon : "#ffffff"),
};

export const lightTheme = {
  colors: {
    ...sharedColors,
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    icon: "#000000",
    typography: "#000000",
    accent: sharedColors.salmon,
    gray: "#F1F1F1",
    activityIndicator: "#000000",
  },
  gap: (v: number) => v * 8,
};

const darkTheme = {
  colors: {
    ...sharedColors,
    backgroundColor: "#000000",
    gray: "#191B1C",
    borderColor: "#ffffff",
    typography: "#ffffff",
    icon: "#ffffff",
    accent: sharedColors.salmon,
    activityIndicator: "#ffffff",
  },
  gap: (v: number) => v * 8,
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  breakpoints,
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
});
