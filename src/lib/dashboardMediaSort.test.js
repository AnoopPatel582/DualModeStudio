import { describe, expect, it } from "vitest";
import { sortDashboardMedia } from "./dashboardMediaSort";

function project(id, category, order, mediaType = "video") {
  return {
    id,
    mediaType,
    portfolio: { category, order },
  };
}

describe("sortDashboardMedia", () => {
  it("groups projects by the requested category order", () => {
    const media = [
      project("thumbnail", "Thumbnails", 1, "image"),
      project("short", "Short Form Video", 1),
      project("long", "Long Form Video", 1),
      project("podcast", "Podcast", 1),
    ];

    expect(sortDashboardMedia(media).map(({ id }) => id)).toEqual([
      "long",
      "podcast",
      "short",
      "thumbnail",
    ]);
  });

  it("sorts each category from position one upward", () => {
    const media = [
      project("long-3", "Long Form Video", 3),
      project("long-1", "Long Form Video", 1),
      project("long-2", "Long Form Video", 2),
    ];

    expect(sortDashboardMedia(media).map(({ id }) => id)).toEqual([
      "long-1",
      "long-2",
      "long-3",
    ]);
  });

  it("does not mutate the API response order", () => {
    const media = [
      project("short", "Short Form Video", 1),
      project("long", "Long Form Video", 1),
    ];

    sortDashboardMedia(media);

    expect(media.map(({ id }) => id)).toEqual(["short", "long"]);
  });
});
