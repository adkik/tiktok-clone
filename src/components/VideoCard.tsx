import { Video as VideoType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

import { StyleSheet } from "react-native-unistyles";

type Props = {
  video: VideoType;
  isActive: boolean;
};

const { height } = Dimensions.get("window");

const VideoCard = ({ video, isActive }: Props) => {
  const tabBarHeight = useBottomTabBarHeight();
  const itemHeight = height - tabBarHeight;
  const [paused, setPaused] = useState(false);

  const player = useVideoPlayer(video.url, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    setPaused(false);

    if (isActive) {
      player?.play();
    } else {
      player?.pause();
    }
  }, [isActive]);

  return (
    <View style={[styles.container, { height: itemHeight }]}>
      <Pressable
        onPress={() => {
          player.pause();
          setPaused(true);
        }}
        style={[styles.videoWrapper, { height: itemHeight }]}
      >
        <VideoView
          player={player}
          style={[styles.video, { height: itemHeight }]}
          contentFit="cover"
          nativeControls={false}
        />
      </Pressable>
      <View style={styles.caption}>
        <Text style={{ color: "#fff", fontSize: 16 }}>{video.caption}</Text>
      </View>
      {paused ? (
        <Pressable
          style={styles.playButton}
          onPress={() => {
            player.play();
            setPaused(false);
          }}
        >
          <Ionicons name={"play"} size={80} style={styles.playButtonIcon} />
        </Pressable>
      ) : null}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
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
    bottom: 40,
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
});
