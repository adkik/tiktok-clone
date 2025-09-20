import { Thumbnail } from "@/types";
import { create } from "zustand";

type ThumbnailsStore = {
  cache: Map<string, string | null>;
  //   generateAndCache: (id: string, url: string) => Promise<void>;
  getAll: () => Thumbnail[];
  get: (id: string) => string | undefined | null;
  set: (id: string, uri: string) => void;
};

export const useThumbnails = create<ThumbnailsStore>((set, get) => ({
  cache: new Map(),
  get: (id) => get().cache.get(id),
  set: (id, uri) =>
    set((state) => {
      const updated = new Map(state.cache);
      updated.set(id, uri);
      return { cache: updated };
    }),
  //   generateAndCache: async (id, url) => {
  //     try {
  //       let thumbnail = get().thumbnails.get(id) ?? null;
  //       if (thumbnail) return;

  //       if (!thumbnail) {
  //         thumbnail = (await generateThumbnail(url)) || "";

  //         set((state) => {
  //           const updated = new Map(state.thumbnails);
  //           updated.set(id, thumbnail);
  //           return { thumbnails: updated };
  //         });
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  getAll: () =>
    [...get().cache].map(([key, value]) => ({
      id: key,
      uri: value,
    })),
}));
