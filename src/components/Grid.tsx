import React from "react";
import { ProfileStackParamList } from "@/navigators/ProfileStackNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Container } from "./Container";
import VideoThumbnail from "./VideoThumbnail";
import { LikedVideoEntry } from "@/stores/use-liked-videos";

type Props = {
  videoIDs: LikedVideoEntry[] | undefined;
};

type ProfileNav = NavigationProp<ProfileStackParamList>;

const Grid = ({ videoIDs }: Props) => {
  const navigation = useNavigation<ProfileNav>();

  return (
    <Container>
      <FlashList
        style={styles.grid}
        data={videoIDs}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item, index }) => (
          <Pressable
            accessible
            accessibilityRole="imagebutton"
            accessibilityLabel={`Liked video ${index + 1} of ${videoIDs?.length ?? 0}`}
            accessibilityHint="Tap to open and start playing"
            onPress={() =>
              navigation.navigate("LikedVideos", { startID: item.id })
            }
          >
            <VideoThumbnail id={item.id} />
          </Pressable>
        )}
      />
    </Container>
  );
};

export default Grid;

const styles = StyleSheet.create((theme, rt) => ({
  grid: {
    flex: 1,
  },
}));
