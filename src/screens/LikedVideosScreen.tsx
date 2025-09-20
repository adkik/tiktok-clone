import Feed from "@/components/Feed";
import { ProfileStackParamList } from "@/navigators/ProfileStackNavigator";
import { fetchVideos } from "@/services/fetch-videos";
import { useLikedVideos } from "@/stores/use-liked-videos";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const LikedVideosScreen = (props: Props) => {
  const route = useRoute<RouteProp<ProfileStackParamList, "LikedVideos">>();
  const { liked } = useLikedVideos();
  const { startID } = route.params ?? {};

  const { data } = useQuery({
    queryKey: ["liked_videos"],
    queryFn: async () => {
      return (await fetchVideos()).filter(({ id }) => liked.includes(id));
    },
  });

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <Feed videos={data} startID={startID} />
    </SafeAreaView>
  );
};

export default LikedVideosScreen;
