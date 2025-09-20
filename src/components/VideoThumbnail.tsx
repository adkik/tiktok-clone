import { useThumbnails } from "@/stores/use-thumbnails";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  id: string;
};

const VideoThumbnail = ({ id }: Props) => {
  const uri = useThumbnails((s) => s.cache.get(id));

  return (
    <View style={styles.container}>
      {uri ? (
        <Image source={uri} style={styles.thumbnail} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default VideoThumbnail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  thumbnail: {
    flex: 1,
    width: "100%",
  },
});
