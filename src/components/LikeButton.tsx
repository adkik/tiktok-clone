import { useLikedVideos } from "@/stores/use-liked-videos";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, View } from "react-native";
import { GestureDetector, GestureType } from "react-native-gesture-handler";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

type Props = {
  id: string;
  onTap: GestureType;
};

const { height } = Dimensions.get("window");

const LikeButton = ({ id, onTap }: Props) => {
  const liked = useLikedVideos((s) => s.liked.has(id));
  const { theme } = useUnistyles();

  return (
    <GestureDetector gesture={onTap}>
      <View style={styles.button}>
        <Ionicons
          name={"heart"}
          size={60}
          color={liked ? theme.colors.accent : "#fff"}
          style={styles.icon}
        />
      </View>
    </GestureDetector>
  );
};

export default LikeButton;

const styles = StyleSheet.create((theme, rt) => ({
  button: {
    position: "absolute",
    bottom: 40,
    right: 15,
    top: height / 2,
    transform: [{ translateY: -40 }],
    alignItems: "center",
  },
  icon: {
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
}));
