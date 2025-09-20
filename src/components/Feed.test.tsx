// Feed.test.tsx
import { render } from "@testing-library/react-native";
import Feed from "./Feed";
import videos from "@/data/videos.json";
import { NavigationContainer } from "@react-navigation/native";
import { getInitialIndex } from "@/utils/get-initial-index";

describe("getInitialIndex", () => {
  const videos = [{ id: "a" }, { id: "b" }, { id: "c" }];

  it("returns correct index when startID matches", () => {
    expect(getInitialIndex(videos, "a")).toBe(0);
    expect(getInitialIndex(videos, "b")).toBe(1);
    expect(getInitialIndex(videos, "c")).toBe(2);
  });

  it("returns 0 if startID does not match", () => {
    expect(getInitialIndex(videos, "x")).toBe(0);
  });

  it("returns 0 if videos is empty", () => {
    expect(getInitialIndex([], "a")).toBe(0);
  });

  it("returns 0 if startID is undefined", () => {
    expect(getInitialIndex(videos, undefined)).toBe(0);
  });
});
