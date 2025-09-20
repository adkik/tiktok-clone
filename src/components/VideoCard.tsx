import { useThumbnails } from "@/stores/use-thumbnails";
import { Video as VideoType } from "@/types";
import { generateThumbnail } from "@/utils/generate-thumbnail";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useEventListener } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import LikeButton from "./LikeButton";
import { Typography } from "./Typography";
import { Container } from "./Container";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

type Props = {
  video: VideoType;
  isActive: boolean;
};

const { height } = Dimensions.get("window");

const VideoCard = ({ video, isActive }: Props) => {
  const [paused, setPaused] = useState(false);
  const isFocused = useIsFocused();
  const tabBarHeight = useBottomTabBarHeight();
  const adjustedHeight = height - tabBarHeight;

  const thumbnails = useThumbnails();

  const player = useVideoPlayer(video.url, async (player) => {
    player.loop = true;
  });

  useEventListener(player, "statusChange", async ({ status }) => {
    if (status === "readyToPlay") {
      const uri = await generateThumbnail(video.url);
      if (uri) thumbnails.set(video.id, uri);
    }
  });

  useEffect(() => {
    setPaused(false);

    if (isActive && isFocused) {
      player?.play();
    } else {
      player?.pause();
    }
  }, [isActive, isFocused, player]);

  function play() {
    player.play();
    setPaused(false);
  }
  function pause() {
    player.pause();
    setPaused(true);
  }

  return (
    <View style={{ height: adjustedHeight, flex: 1 }}>
      <Pressable onPress={pause} style={[styles.videoWrapper]}>
        <VideoView
          player={player}
          style={[styles.video]}
          contentFit="cover"
          nativeControls={false}
        />
      </Pressable>
      <Typography isCaption style={styles.caption}>
        {video.caption}
      </Typography>
      <LikeButton id={video.id} />
      {paused ? (
        <Pressable style={styles.playButton} onPress={play}>
          <Ionicons name={"play"} size={80} style={styles.playButtonIcon} />
        </Pressable>
      ) : null}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    width: "100%",
  },
  videoWrapper: {
    flex: 1,
  },
  video: {
    flex: 1,
    width: "100%",
  },
  caption: {
    position: "absolute",
    bottom: rt.insets.bottom + 40,
    left: 15,
  },
  playButton: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonIcon: {
    opacity: 0.45,
    color: "#fff",
  },
}));
