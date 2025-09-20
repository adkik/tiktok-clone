import Feed from "@/components/Feed";
import { fetchVideos } from "@/services/fetch-videos";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const HomeScreen = () => {
  const { data } = useQuery({
    queryKey: ["home_feed"],
    queryFn: fetchVideos,
  });

  return <Feed videos={data} />;
};

export default HomeScreen;
