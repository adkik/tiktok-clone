import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

export type LikedVideoEntry = {
  id: string;
  addedAt: number;
};

type SerializedLiked = [string, LikedVideoEntry][];

type LikedVideosState = {
  liked: Map<string, LikedVideoEntry>;
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
};

export const useLikedVideos = create<LikedVideosState>()(
  persist(
    (set, get) => ({
      liked: new Map<string, LikedVideoEntry>(),

      toggleLike: (id: string) =>
        set((state) => {
          const updated = new Map(state.liked);
          if (updated.has(id)) {
            updated.delete(id);
          } else {
            updated.set(id, { id, addedAt: Date.now() });
          }
          return { liked: updated };
        }),

      isLiked: (id) => get().liked.has(id),
    }),
    {
      name: "liked_videos",
      partialize: (state) => ({
        liked: [...state.liked.entries()],
      }),
      storage: mmkvStorage,
      merge: (persisted, current) => {
        const restored = new Map(
          (persisted as { liked?: SerializedLiked }).liked ?? []
        );
        return { ...current, liked: restored };
      },
    }
  )
);
