import Feed from "@/components/Feed";
import { fetchVideos } from "@/services/fetch-videos";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const HomeScreen = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["home_feed"],
    queryFn: fetchVideos,
  });

  return (
    <GestureHandlerRootView>
      <Feed
        videos={data}
        isError={isError}
        isLoading={isLoading}
        refetch={refetch}
      />
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
