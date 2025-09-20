import { useLikedVideos } from "@/stores/use-liked-videos";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Pressable } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

type Props = {
  id: string;
};

const { height } = Dimensions.get("window");

const LikeButton = ({ id }: Props) => {
  const { isLiked, toggleLike } = useLikedVideos();
  const { theme } = useUnistyles();

  const liked = isLiked(id);
  return (
    <Pressable style={styles.button} onPress={() => toggleLike(id)}>
      <Ionicons
        name={"heart"}
        size={60}
        color={liked ? theme.colors.accent : "#fff"}
        style={styles.icon}
      />
    </Pressable>
  );
};

export default LikeButton;

const styles = StyleSheet.create((theme, rt) => ({
  button: {
    position: "absolute",
    bottom: 40,
    right: 15,
    top: height / 2, // halfway down the visible area
    transform: [{ translateY: -40 }], // shift up so icon stack is truly centered
    alignItems: "center",
  },
  icon: {
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
}));
