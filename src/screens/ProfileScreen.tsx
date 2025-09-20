import React, { useMemo } from "react";
import { useLikedVideos } from "@/stores/use-liked-videos";
import Grid from "@/components/Grid";

const ProfileScreen = () => {
  const liked = useLikedVideos((state) => state.liked);

  const sortedLiked = useMemo(
    () => [...liked.values()].sort((a, b) => b.addedAt - a.addedAt),
    [liked]
  );

  return <Grid videoIDs={sortedLiked} />;
};

export default ProfileScreen;
