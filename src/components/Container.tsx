import React, { type FunctionComponent, type PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { type UnistylesVariants, StyleSheet } from "react-native-unistyles";

interface ContainerProps
  extends PropsWithChildren,
    UnistylesVariants<typeof styles> {
  style?: StyleProp<ViewStyle>;
}

export const Container: FunctionComponent<ContainerProps> = ({
  children,
  style,
}) => {
  styles.useVariants({
    //...
  });

  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: rt.insets.top,
    paddingBottom: rt.insets.bottom,
    paddingLeft: rt.insets.left,
    paddingRight: rt.insets.right,
    backgroundColor: theme.colors.backgroundColor,
    variants: {},
  },
}));
