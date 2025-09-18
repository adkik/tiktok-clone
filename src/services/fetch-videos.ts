import videos from "@/data/videos.json";
import { Video } from "@/types";

export async function fetchVideos(): Promise<Video[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(videos), 200);
  });
}
