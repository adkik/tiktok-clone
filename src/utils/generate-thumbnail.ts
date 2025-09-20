import * as VideoThumbnails from "expo-video-thumbnails";

export async function generateThumbnail(url: string) {
  if (!url) {
    console.warn("Cannot generate thumbnail: URL is undefined");
    return null;
  }

  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(url, {
      time: 3000,
    });
    return uri;
  } catch (e) {
    console.warn("Thumbnail generation failed:", e);
    return null;
  }
}
