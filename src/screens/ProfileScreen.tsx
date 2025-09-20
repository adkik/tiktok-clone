import Grid from "@/components/Grid";
import { useLikedVideos } from "@/stores/use-liked-videos";
import React, { useEffect, useMemo } from "react";

const ProfileScreen = () => {
  const liked = useLikedVideos((state) => state.liked);

  const sortedLiked = useMemo(
    () => [...liked.values()].sort((a, b) => b.addedAt - a.addedAt),
    [liked]
  );

  return <Grid videoIDs={sortedLiked} />;
};

export default ProfileScreen;
