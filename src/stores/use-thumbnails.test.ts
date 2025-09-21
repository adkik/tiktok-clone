import { useThumbnails } from "./use-thumbnails";
import { act } from "@testing-library/react-native";

describe("useThumbnails", () => {
  beforeEach(() => {
    act(() => {
      useThumbnails.setState({ cache: new Map() });
    });
  });

  it("should start with an empty cache", () => {
    expect(useThumbnails.getState().cache.size).toBe(0);
  });

  it("should update cache with thumbnail", () => {
    act(() => {
      useThumbnails.getState().set("1", "file:///thumb.jpg");
    });
    const uri = useThumbnails.getState().get("1");
    expect(uri).toBe("file:///thumb.jpg");
  });

  it("should return array of thumbnails on `getAll`", () => {
    act(() => {
      useThumbnails.getState().set("1", "file:///thumb.jpg");
      useThumbnails.getState().set("2", "file:///thumb_2.jpg");
    });
    const all = useThumbnails.getState().getAll();

    expect(all).toEqual([
      { id: "1", uri: "file:///thumb.jpg" },
      { id: "2", uri: "file:///thumb_2.jpg" },
    ]);
    expect(Array.isArray(all)).toBe(true);
    expect(all).toHaveLength(2);
  });
});
