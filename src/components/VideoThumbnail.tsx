import React from "react";
import { useThumbnails } from "@/stores/use-thumbnails";
import { Image } from "expo-image";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

type Props = {
  id: string;
};

const VideoThumbnail = ({ id }: Props) => {
  const { theme } = useUnistyles();
  const uri = useThumbnails((s) => s.cache.get(id));

  return (
    <View style={styles.container}>
      {uri ? (
        <Image
          source={uri}
          style={styles.thumbnail}
          cachePolicy={"memory-disk"}
          testID="thumbnail-image"
        />
      ) : (
        <ActivityIndicator
          style={styles.loading}
          testID="loading-indicator"
          size="small"
          color={theme.colors.activityIndicator}
        />
      )}
    </View>
  );
};

export default VideoThumbnail;

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: theme.colors.backgroundColor,
  },
  thumbnail: {
    flex: 1,
    width: "100%",
  },
  loading: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
}));
