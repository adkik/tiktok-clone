import { MMKV } from "react-native-mmkv";
import { createJSONStorage } from "zustand/middleware";

export const storage = new MMKV({
  id: "app-storage",
});

export const mmkvStorage = createJSONStorage(() => ({
  setItem: (key, value) => storage.set(key, value),
  getItem: (key) => storage.getString(key) ?? null,
  removeItem: (key) => storage.delete(key),
}));
