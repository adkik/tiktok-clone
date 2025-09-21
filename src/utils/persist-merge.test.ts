import { persistMerge } from "./persist-merge";

type TestState = {
  cache: Map<string, string>;
  other: string;
};

describe("persistMerge", () => {
  it("should restore a Map from persisted [key, value] pairs", () => {
    const current: TestState = { cache: new Map(), other: "keep-me" };
    const persisted = {
      cache: [
        ["a", "foo"],
        ["b", "bar"],
      ],
    };

    const result = persistMerge(persisted, current, "cache");
    expect(result.cache).toBeInstanceOf(Map);
    expect([...result.cache.entries()]).toEqual([
      ["a", "foo"],
      ["b", "bar"],
    ]);
    expect(result.other).toBe("keep-me");
  });

  it("should override current state's Map content with restored data", () => {
    const current: TestState = {
      cache: new Map([["old", "value"]]),
      other: "stay",
    };
    const persisted = { cache: [["new", "value"]] };
    const result = persistMerge(persisted, current, "cache");

    expect(result.cache.has("old")).toBe(false);
    expect([...result.cache.entries()]).toEqual([["new", "value"]]);
  });
});
