import React, { useMemo, useRef, useState } from "react";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types";
import { FlashList } from "@shopify/flash-list";
import {
  AccessibilityInfo,
  ActivityIndicator,
  Pressable,
  View,
  ViewToken,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { getInitialIndex } from "@/utils/get-initial-index";
import { useAdjustedHeight } from "@/hooks/useAdjustedHeight";
import { Typography } from "./Typography";

type Props = {
  videos: Video[] | undefined;
  startID?: string;
  isError: boolean;
  isLoading: boolean;
  refetch: () => void;
};

const Feed = ({
  videos,
  isError,
  isLoading,
  refetch,
  startID = "0",
}: Props) => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const adjustedHeight = useAdjustedHeight();

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentId(viewableItems[0].item.id);

        AccessibilityInfo.announceForAccessibility(
          `Showing video ${viewableItems[0].index! + 1} of ${videos?.length ?? 0}`
        );
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  const initialIndex = useMemo(
    () => getInitialIndex(videos, startID),
    [videos, startID]
  );

  if (isError) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Typography isCentered style={{ color: "#000" }}>
          Something went wrong. Please try again
        </Typography>
        <Pressable onPress={refetch}>
          <Typography style={styles.retry}>Tap to retry</Typography>
        </Pressable>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container} accessible={false}>
      <FlashList<Video>
        keyExtractor={(item) => item.id}
        data={videos}
        style={styles.list}
        pagingEnabled
        snapToInterval={adjustedHeight}
        initialScrollIndex={initialIndex}
        decelerationRate="fast"
        disableIntervalMomentum={true}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => (
          <VideoCard video={item} isActive={item.id === currentId} />
        )}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top,
    paddingLeft: rt.insets.left,
    paddingRight: rt.insets.right,
    backgroundColor: theme.colors.backgroundColor,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 26,
    paddingRight: 26,
    gap: 10,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  errorText: {
    color: theme.colors.salmon,
    textAlign: "center",
    marginBottom: 8,
  },
  retry: { color: theme.colors.accent, textDecorationLine: "underline" },
}));
