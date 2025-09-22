import { ComponentType } from "react";

export const useSharedValue = (initial: any) => ({ value: initial });
export const useAnimatedStyle = (factory: any) => factory();
export const withTiming = (toValue: any) => toValue;
export const interpolateColor = () => "#fff";

export const Easing = {
  ease: () => {},
  inOut: () => () => {},
  out: () => () => {},
};

export default {
  ...jest.requireActual("react-native-reanimated/mock").default,
  createAnimatedComponent: (Component: ComponentType) => Component,
};
