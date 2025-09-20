import { ProfileStackParamList } from "@/navigators/ProfileStackNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import VideoThumbnail from "./VideoThumbnail";

type Props = {
  videoIDs: string[] | undefined;
};

type ProfileNav = NavigationProp<ProfileStackParamList>;

const Grid = ({ videoIDs }: Props) => {
  const navigation = useNavigation<ProfileNav>();

  return (
    <View style={styles.container}>
      <FlashList
        style={styles.grid}
        data={videoIDs}
        keyExtractor={(item) => item}
        numColumns={3}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("LikedVideos", { startID: item })
            }
          >
            <VideoThumbnail id={item} />
          </Pressable>
        )}
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
