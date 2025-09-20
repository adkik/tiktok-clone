import { Thumbnail } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

type ThumbnailsStoreState = {
  cache: Map<string, string | null>;
  getAll: () => Thumbnail[];
  get: (id: string) => string | undefined | null;
  set: (id: string, uri: string) => void;
};

type SerializedCache = [string, string | null][];

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
      merge: (persisted: unknown, current: ThumbnailsStoreState) => {
        const restored = new Map(
          (persisted as { cache?: SerializedCache }).cache ?? []
        );
        return { ...current, cache: restored };
      },
    }
  )
);
