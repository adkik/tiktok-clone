import { Thumbnail } from "@/types";
import * as VideoThumbnails from "expo-video-thumbnails";
import { create } from "zustand";

type LikedVideosState = {
  liked: Map<string, string | null>;
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
  getAllLikedVideos?: () => { id: string; thumbnailURI: string | null }[];
  thumbnails: Map<string, string | null>;
  generateAndCache: (id: string, url: string) => void;
  getAllThumbnails: () => Thumbnail[];
};

async function generateThumbnail(url?: string) {
  if (!url) {
    console.warn("Cannot generate thumbnail: URL is undefined");
    return null;
  }

  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(url, {
      time: 15000,
    });
    console.log(uri);
    return uri;
  } catch (e) {
    console.warn("Thumbnail generation failed:", e);
    return null;
  }
}

export const useLikedVideos = create<LikedVideosState>((set, get) => ({
  liked: new Map(),
  toggleLike: async (id) => {
    set((state) => {
      const updated = new Map(state.liked);

      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.set(id, null);
        console.log("Liked!");
      }
      return {
        liked: updated,
      };
    });
  },
  isLiked: (id) => get().liked.has(id),
  getAll: () =>
    [...get().liked].map(([key, value]) => ({ id: key, thumbnailURI: value })),
  thumbnails: new Map(),
  generateAndCache: async (id, url) => {
    try {
      let thumbnail = get().thumbnails.get(id) ?? null;
      if (thumbnail) return;

      if (!thumbnail) {
        thumbnail = (await generateThumbnail(url)) || "";

        set((state) => {
          const updated = new Map(state.thumbnails);
          updated.set(id, thumbnail);
          return { thumbnails: updated };
        });
      }
    } catch (e) {
      console.error(e);
    }
  },
  getAllThumbnails: () =>
    [...get().thumbnails].map(([key, value]) => ({
      id: key,
      uri: value,
    })),
}));
