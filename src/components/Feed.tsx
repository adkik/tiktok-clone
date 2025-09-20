import VideoCard from "@/components/VideoCard";
import { Video } from "@/types";
import { FlashList } from "@shopify/flash-list";
import React, { useMemo, useRef, useState } from "react";
import { View, ViewToken } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { getInitialIndex } from "@/utils/get-initial-index";
import { useAdjustedHeight } from "@/hooks/useAdjustedHeight";

type Props = {
  videos: Video[] | undefined;
  startID?: string;
};

const Feed = ({ videos, startID = "0" }: Props) => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const adjustedHeight = useAdjustedHeight();

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentId(viewableItems[0].item.id);
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

  return (
    <View style={styles.container}>
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
  list: {
    flex: 1,
    width: "100%",
  },
}));
