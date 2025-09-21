import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureDetector, GestureType } from "react-native-gesture-handler";
import { useLikedVideos } from "@/stores/use-liked-videos";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

type Props = {
  id: string;
  onTap: GestureType;
};

const { height } = Dimensions.get("window");

const LikeButton = ({ id, onTap }: Props) => {
  const liked = useLikedVideos((s) => s.liked.has(id));
  const { theme } = useUnistyles();

  const scale = useSharedValue(1);
  const progress = useSharedValue(liked ? 1 : 0);

  useEffect(() => {
    if (liked) {
      scale.value = withTiming(
        1.05,
        { duration: 200, easing: Easing.out(Easing.quad) },
        () => {
          scale.value = withTiming(1, { duration: 200 });
        }
      );
    } else {
      scale.value = withTiming(1, { duration: 200 });
    }

    progress.value = withTiming(liked ? 1 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  }, [liked]);

  const animatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ["#fff", theme.colors.accent] // from white to accent
    );

    return {
      transform: [{ scale: scale.value }],
      color,
    };
  });

  return (
    <GestureDetector gesture={onTap}>
      <Animated.View
        style={[styles.button, animatedStyle]}
        accessible
        accessibilityRole="button"
        accessibilityLabel={liked ? "Unlike video" : "Like video"}
        accessibilityState={{ selected: liked }}
        accessibilityHint={liked ? "Tap to unlike" : "Tap to like"}
      >
        <AnimatedIonicon
          name={"heart"}
          size={45}
          color={liked ? theme.colors.accent : "#fff"}
          style={[styles.icon, animatedStyle]}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default LikeButton;

const AnimatedIonicon = Animated.createAnimatedComponent(Ionicons);

const styles = StyleSheet.create((theme, rt) => ({
  button: {
    position: "absolute",
    bottom: 40,
    right: 5,
    top: height / 2,
    transform: [{ translateY: -40 }],
    alignItems: "center",
  },
  icon: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
}));
