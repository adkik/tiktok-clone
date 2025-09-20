import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import VideoThumbnail from "./VideoThumbnail";

type Props = {
  videoIDs: string[] | undefined;
};

const Grid = ({ videoIDs }: Props) => {
  return (
    <View style={styles.container}>
      <FlashList
        style={styles.grid}
        data={videoIDs}
        keyExtractor={(item) => item}
        numColumns={3}
        renderItem={({ item }) => <VideoThumbnail id={item} />}
      />
    </View>
  );
};

export default Grid;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 1,
    flex: 1,
  },
  grid: {
    flex: 1,
  },
});
