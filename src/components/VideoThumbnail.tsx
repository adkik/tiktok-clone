import React from "react";
import { useThumbnails } from "@/stores/use-thumbnails";
import { Image } from "expo-image";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type Props = {
  id: string;
};

const VideoThumbnail = ({ id }: Props) => {
  const uri = useThumbnails((s) => s.cache.get(id));

  return (
    <View style={styles.container}>
      {uri ? (
        <Image
          source={uri}
          style={styles.thumbnail}
          cachePolicy={"memory-disk"}
        />
      ) : (
        <View style={styles.loading} />
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
  },
}));
