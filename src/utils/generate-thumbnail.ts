import * as VideoThumbnails from "expo-video-thumbnails";
/**
 * Generates a thumbnail from a video
 *
 * @param url Video URL.
 * @param duration Video duration in milliseconds.
 * @returns Promise of thumbnail URI, or null on failure.
 */
export async function generateThumbnail(url: string, duration: number) {
  if (!url) {
    console.warn("Cannot generate thumbnail: URL is undefined");
    return null;
  }

  // 3s or duration - 0.5s, but never below 0
  const safeTime = duration
    ? Math.max(Math.min(3000, duration - 500), 0)
    : 3000;

  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(url, {
      time: safeTime,
    });
    return uri;
  } catch (e) {
    console.warn("Thumbnail generation failed:", e);
    return null;
  }
}
