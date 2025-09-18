import Feed from "@/components/Feed";
import { fetchVideos } from "@/services/fetch-videos";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

const HomeScreen = () => {
  const { data } = useQuery({
    queryKey: ["home_feed"],
    queryFn: fetchVideos,
  });

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <Feed videos={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
