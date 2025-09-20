// Feed.test.tsx
import { getInitialIndex } from "@/utils/get-initial-index";

const videos = [
  {
    id: "1",
    caption: "Big Buck Bunny",
  },
  {
    id: "2",
    caption: "Elephant's Dream",
  },
  {
    id: "3",
    caption: "For Bigger Blazes",
  },
];

describe("getInitialIndex", () => {
  it("returns correct index when startID matches", () => {
    expect(getInitialIndex(videos, "1")).toBe(0);
    expect(getInitialIndex(videos, "2")).toBe(1);
    expect(getInitialIndex(videos, "3")).toBe(2);
  });

  it("returns 0 if startID does not match", () => {
    expect(getInitialIndex(videos, "7")).toBe(0);
  });

  it("returns 0 if videos is empty", () => {
    expect(getInitialIndex([], "1")).toBe(0);
  });

  it("returns 0 if startID is undefined", () => {
    expect(getInitialIndex(videos, undefined)).toBe(0);
  });
});
