/**
 * Returns the index of the video matching the given start ID.
 *
 * This is used by the Feed component to decide which item to
 * scroll to first when opening from a thumbnail tap.
 * @param videos Array of video objects with an `id` property.
 * @param startID The ID of the video we want to start at.
 * @returns The index of the matching video, or 0 if not found.
 */
export function getInitialIndex(
  videos: { id: string }[] = [],
  startID?: string
) {
  const index = videos.findIndex((video) => video.id === startID);
  if (index) {
    return index >= 0 ? index : 0;
  }
  return 0;
}
