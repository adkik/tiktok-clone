import { act } from "@testing-library/react-native";
import { useLikedVideos } from "./use-liked-videos";

describe("useThumbnails", () => {
  beforeEach(() => {
    useLikedVideos.setState({ liked: new Map() });
  });

  it("should start with an empty liked state", () => {
    expect(useLikedVideos.getState().liked.size).toBe(0);
  });

  it("adds a new entry with a timestamp when liking a video", () => {
    act(() => {
      useLikedVideos.getState().toggleLike("1");
    });
    const addedAt = useLikedVideos.getState().liked.get("1")?.addedAt;
    expect(addedAt).toBeLessThanOrEqual(Date.now());
  });

  it("removes an entry when already liked", () => {
    const { toggleLike } = useLikedVideos.getState();

    act(() => {
      toggleLike("1"); // like
      toggleLike("1"); // unlike
    });

    const updated = useLikedVideos.getState().liked;
    expect(updated.has("1")).toBe(false);
  });

  it("returns false when video is not liked", () => {
    const { isLiked } = useLikedVideos.getState();
    expect(isLiked("1")).toBe(false);
  });
});
