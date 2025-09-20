import * as VideoThumbnails from "expo-video-thumbnails";
/**
 * Generates a thumbnail from a video
 *
 * @param url Video URL.
 * @param duration Video duration in seconds.
 * @returns Promise of thumbnail URI, or null on failure.
 */
export async function generateThumbnail(url: string, duration: number) {
  if (!url) {
    return null;
  }

  // 5s or duration - 0.5s, but never below 0
  const safeTime = duration
    ? Math.max(Math.min(5000, duration * 1000 - 500), 0)
    : 5000;

  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(url, {
      time: safeTime,
    });
    return uri;
  } catch (e) {
    return null;
  }
}
