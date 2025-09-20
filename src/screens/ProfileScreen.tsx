import Grid from "@/components/Grid";
import { useLikedVideos } from "@/stores/use-liked-videos";
import React from "react";

const ProfileScreen = () => {
  const { liked } = useLikedVideos();

  return <Grid videoIDs={liked} />;
};

export default ProfileScreen;
