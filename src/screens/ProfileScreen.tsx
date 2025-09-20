import Grid from "@/components/Grid";
import { useLikedVideos } from "@/stores/use-liked-videos";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

const ProfileScreen = () => {
  const { liked } = useLikedVideos();

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <Grid videoIDs={liked} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
