import * as VideoThumbnails from "expo-video-thumbnails";
import { generateThumbnail } from "./generate-thumbnail";

jest.mock("expo-video-thumbnails", () => ({
  getThumbnailAsync: jest.fn(),
}));

const EXAMPLE_URI = "http://example.com/video.mp4";

describe("generateThumbnail", () => {
  const getThumbnailAsync = VideoThumbnails.getThumbnailAsync as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns a URI on success", async () => {
    getThumbnailAsync.mockResolvedValueOnce({ uri: "mock-uri.png" });

    const result = await generateThumbnail(EXAMPLE_URI, 5000);

    expect(getThumbnailAsync).toHaveBeenCalledWith(
      EXAMPLE_URI,

      { time: 3000 }
    );
    expect(result).toBe("mock-uri.png");
  });

  it("clamps time when video is shorter than 3s", async () => {
    getThumbnailAsync.mockResolvedValueOnce({ uri: "mock-uri.png" });

    await generateThumbnail("http://example.com/video.mp4", 2000);

    expect(getThumbnailAsync).toHaveBeenCalledWith(
      EXAMPLE_URI,

      { time: 1500 }
    );
  });

  it("never uses a negative time when video is very short", async () => {
    getThumbnailAsync.mockResolvedValueOnce({ uri: "mock-uri.png" });

    await generateThumbnail(EXAMPLE_URI, 300);

    expect(getThumbnailAsync).toHaveBeenCalledWith(EXAMPLE_URI, { time: 0 });
  });

  it("returns null if url is undefined or malformed", async () => {
    const undefinedUriResult = await generateThumbnail(
      undefined as unknown as string,
      5000
    );
    const malformedUrlResult = await generateThumbnail("bad_uri", 5000);
    expect(undefinedUriResult).toBeNull();
    expect(malformedUrlResult).toBeNull();
  });

  it("returns null on error", async () => {
    getThumbnailAsync.mockRejectedValueOnce(new Error());

    const result = await generateThumbnail(EXAMPLE_URI, 1000);
    expect(result).toBeNull();
  });
});
