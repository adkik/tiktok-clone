/**
 * Custom hydration function to serialize
 * a Map and merge it back to a Zustand store.
 *
 * Used in `PersistOptions.merge`
 *
 */
export function persistMerge<T extends object, K extends keyof T>(
  persisted: unknown,
  current: T,
  key: K
) {
  const persistedObj = persisted as Record<string, unknown>;
  const serialized = Array.isArray(persistedObj?.[String(key)])
    ? (persistedObj[String(key)] as [string, any][])
    : [];

  return {
    ...current,
    [key]: new Map(serialized),
  };
}
