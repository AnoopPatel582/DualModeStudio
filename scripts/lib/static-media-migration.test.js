import { describe, expect, it } from "vitest";
import {
  buildStaticMediaRecords,
  normalizeVideoUrl,
} from "./static-media-migration.mjs";

describe("static media migration", () => {
  it("normalizes supported YouTube URL forms", () => {
    const expected = "https://www.youtube.com/embed/example";

    expect(normalizeVideoUrl("https://youtu.be/example?si=value")).toBe(
      expected,
    );
    expect(
      normalizeVideoUrl("https://www.youtube.com/watch?v=example&feature=share"),
    ).toBe(expected);
    expect(normalizeVideoUrl("https://youtube.com/shorts/example")).toBe(
      expected,
    );
  });

  it("merges homepage placement into its portfolio record", () => {
    const records = buildStaticMediaRecords(
      [
        {
          title: "Example",
          video: "https://www.youtube.com/embed/example?si=value",
          category: "Long Form Video",
        },
      ],
      [
        {
          title: "Example",
          video: "https://youtu.be/example",
          description: "Homepage description",
        },
      ],
      [],
    );

    expect(records).toHaveLength(1);
    expect(records[0].homepage).toEqual({
      enabled: true,
      section: "landscape",
      category: null,
      order: 1,
    });
    expect(records[0].description).toBe("Homepage description");
  });

  it("rejects a homepage video that is absent from the portfolio", () => {
    expect(() =>
      buildStaticMediaRecords(
        [],
        [{ title: "Missing", video: "https://youtu.be/missing" }],
        [],
      ),
    ).toThrow("Homepage videos are missing from the portfolio");
  });
});
