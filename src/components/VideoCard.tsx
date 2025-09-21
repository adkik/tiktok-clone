import React, { useEffect, useMemo, useState } from "react";
import { useThumbnails } from "@/stores/use-thumbnails";
import { Video as VideoType } from "@/types";
import { generateThumbnail } from "@/utils/generate-thumbnail";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useEventListener } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import LikeButton from "./LikeButton";
import { Typography } from "./Typography";
import { useAdjustedHeight } from "@/hooks/useAdjustedHeight";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useLikedVideos } from "@/stores/use-liked-videos";
import { scheduleOnRN } from "react-native-worklets";

type Props = {
  video: VideoType;
  isActive: boolean;
};

const VideoCard = ({ video, isActive }: Props) => {
  const [paused, setPaused] = useState(false);
  const isFocused = useIsFocused();
  const adjustedHeight = useAdjustedHeight();
  const { toggleLike } = useLikedVideos();

  const thumbnails = useThumbnails();

  const player = useVideoPlayer(video.url, async (player) => {
    player.loop = true;
  });

  useEventListener(player, "statusChange", async ({ status }) => {
    if (status === "readyToPlay") {
      const existing = thumbnails.get(video.id);
      if (!existing) {
        const uri = await generateThumbnail(video.url, player.duration);
        if (uri) thumbnails.set(video.id, uri);
      }
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
  function togglePlay() {
    if (player.playing) {
      pause();
    } else {
      play();
    }
  }

  const likeTap = Gesture.Tap().onEnd(() => {
    scheduleOnRN(toggleLike, video.id);
  });

  const doubleTap = useMemo(
    () =>
      Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
          scheduleOnRN(toggleLike, video.id);
        }),
    [toggleLike, video.id]
  );

  const singleTap = useMemo(
    () =>
      Gesture.Tap()
        .requireExternalGestureToFail(doubleTap)
        .onEnd(() => {
          scheduleOnRN(togglePlay);
        }),
    [togglePlay, doubleTap]
  );

  const composed = Gesture.Exclusive(doubleTap, singleTap);

  return (
    <View style={{ height: adjustedHeight, flex: 1 }}>
      <GestureDetector gesture={composed}>
        <View
          style={{ flex: 1 }}
          accessible
          accessibilityRole="image" // TikTok treats video as an image element
          accessibilityLabel={video.caption}
          accessibilityHint="Tap to toggle playback, double tap to like"
        >
          <VideoView
            player={player}
            style={[styles.video]}
            contentFit="cover"
            nativeControls={false}
          />
          {paused ? (
            <View
              style={styles.playButton}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Play video"
              onAccessibilityTap={play}
            >
              <Ionicons name={"play"} size={80} style={styles.playButtonIcon} />
            </View>
          ) : null}
        </View>
      </GestureDetector>
      <Typography isCaption style={styles.caption} accessible={false}>
        {video.caption}
      </Typography>
      <LikeButton id={video.id} onTap={likeTap} />
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    width: "100%",
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
    opacity: 0.5,
    color: "#fff",
  },
}));
