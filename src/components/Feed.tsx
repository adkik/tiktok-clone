import VideoCard from "@/components/VideoCard";
import { Video } from "@/types";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlashList, FlashListRef } from "@shopify/flash-list";
import React, { useRef, useState } from "react";
import { Dimensions, View, ViewToken } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type Props = {
  videos: Video[] | undefined;
};
const { height } = Dimensions.get("window");

const Feed = ({ videos }: Props) => {
  const [currentId, setCurrentId] = useState<string | null>(null);

  const tabBarHeight = useBottomTabBarHeight();
  const itemHeight = height - tabBarHeight;

  const listRef = useRef<FlashListRef<any>>(null);

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

  return (
    <View style={[styles.container]}>
      <FlashList
        data={videos}
        ref={listRef}
        pagingEnabled
        snapToInterval={itemHeight}
        decelerationRate="fast"
        disableIntervalMomentum={true}
        renderItem={({ item }) => (
          <VideoCard video={item} isActive={item.id === currentId} />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
