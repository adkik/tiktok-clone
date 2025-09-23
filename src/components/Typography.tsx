import React from "react";
import type { FunctionComponent, PropsWithChildren } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import type { UnistylesVariants } from "react-native-unistyles";
import { StyleSheet } from "react-native-unistyles";

interface TypographyProps
  extends PropsWithChildren,
    TextProps,
    UnistylesVariants<typeof styles> {
  style?: StyleProp<TextStyle>;
}

export const Typography: FunctionComponent<TypographyProps> = ({
  children,
  size,
  isBold = false,
  isCentered = false,
  isPrimary,
  style,
  ...rest
}) => {
  styles.useVariants({
    isBold,
    isCentered,
    isPrimary,
    size,
  });

  return (
    <Text style={[styles.title, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  title: {
    fontFamily: theme.fonts.base,
    variants: {
      isBold: {
        true: {
          fontWeight: "bold",
        },
      },
      isCentered: {
        true: {
          textAlign: "center",
        },
      },
      isPrimary: {
        true: {
          color: theme.colors.accent,
        },
        default: {
          color: "theme.colors.typography",
        },
      },
      isCaption: {
        true: { color: "#fff" },
        default: {
          color: "#fff",
        },
      },
      size: {
        small: {
          fontSize: rt.fontScale * 10,
        },
        large: {
          fontSize: rt.fontScale * 30,
        },
        default: {
          fontSize: rt.fontScale * 20,
        },
      },
    },
  },
}));
