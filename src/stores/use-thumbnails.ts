import { Thumbnail } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";
import { persistMerge } from "@/utils/persist-merge";

type ThumbnailsStoreState = {
  cache: Map<string, string | null>;
  getAll: () => Thumbnail[];
  get: (id: string) => string | undefined | null;
  set: (id: string, uri: string) => void;
};

export const useThumbnails = create<ThumbnailsStoreState>()(
  persist(
    (set, get) => ({
      cache: new Map(),
      get: (id) => get().cache.get(id),
      set: (id, uri) =>
        set((state) => {
          const updated = new Map(state.cache);
          updated.set(id, uri);
          return { cache: updated };
        }),
      getAll: () =>
        [...get().cache].map(([key, value]) => ({
          id: key,
          uri: value,
        })),
    }),
    {
      name: "thumbnail-cache",
      storage: mmkvStorage,
      partialize: (state) => ({
        cache: [...state.cache.entries()],
      }),
      merge: (persisted, current) => persistMerge(persisted, current, "cache"),
    }
  )
);
