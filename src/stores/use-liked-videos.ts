import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

type LikedVideosState = {
  liked: string[];
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
};

export const useLikedVideos = create<LikedVideosState>()(
  persist(
    (set, get) => ({
      liked: [],
      toggleLike: async (id) => {
        set((state) => ({
          liked: state.liked.includes(id)
            ? state.liked.filter((x) => x !== id)
            : [...state.liked, id],
        }));
      },
      isLiked: (id) => get().liked.includes(id),
    }),
    {
      name: "liked_videos",
      partialize: (state) => ({ liked: state.liked }),
      storage: mmkvStorage,
    }
  )
);
