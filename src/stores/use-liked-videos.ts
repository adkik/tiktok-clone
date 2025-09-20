import { create } from "zustand";

type LikedVideosState = {
  liked: string[];
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
};

export const useLikedVideos = create<LikedVideosState>((set, get) => ({
  liked: [],
  toggleLike: async (id) => {
    set((state) => ({
      liked: state.liked.includes(id)
        ? state.liked.filter((x) => x !== id)
        : [...state.liked, id],
    }));
  },
  isLiked: (id) => get().liked.includes(id),
}));
