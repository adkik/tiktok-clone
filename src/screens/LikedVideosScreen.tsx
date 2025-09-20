import Feed from "@/components/Feed";
import { ProfileStackParamList } from "@/navigators/ProfileStackNavigator";
import { fetchVideos } from "@/services/fetch-videos";
import { useLikedVideos } from "@/stores/use-liked-videos";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const LikedVideosScreen = () => {
  const route = useRoute<RouteProp<ProfileStackParamList, "LikedVideos">>();
  const { liked } = useLikedVideos();
  const { startID } = route.params ?? {};

  const { data } = useQuery({
    queryKey: ["liked_videos"],
    queryFn: async () => {
      const allVideos = await fetchVideos();
      const likedVideos = allVideos.filter(({ id }) => liked.has(id));

      likedVideos.sort((a, b) => {
        const aDate = liked.get(a.id)?.addedAt ?? 0;
        const bDate = liked.get(b.id)?.addedAt ?? 0;
        return bDate - aDate;
      });

      return likedVideos;
    },
  });

  return (
    <GestureHandlerRootView>
      <Feed videos={data} startID={startID} />
    </GestureHandlerRootView>
  );
};

export default LikedVideosScreen;
