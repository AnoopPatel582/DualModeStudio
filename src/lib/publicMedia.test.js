import { describe, expect, it } from "vitest";
import { toHomepageWorks, toPortfolioWorks } from "./publicMedia";

function media(overrides = {}) {
  return {
    id: "media-id",
    title: "Project",
    mediaType: "video",
    videoUrl: "https://www.youtube.com/embed/video-id",
    thumbnail: null,
    status: "active",
    portfolio: {
      enabled: true,
      category: "Long Form Video",
      order: 1,
    },
    homepage: {
      enabled: false,
      section: null,
      category: null,
      order: null,
    },
    ...overrides,
  };
}

describe("public portfolio media", () => {
  it("maps videos and uploaded thumbnails to the existing card shape", () => {
    const result = toPortfolioWorks([
      media(),
      media({
        id: "thumbnail-id",
        title: "Thumbnail",
        mediaType: "image",
        videoUrl: null,
        thumbnail: { url: "https://res.cloudinary.com/demo/image/upload/image.png" },
        portfolio: {
          enabled: true,
          category: "Thumbnails",
          order: 1,
        },
      }),
    ]);

    expect(result).toEqual([
      {
        id: "media-id",
        title: "Project",
        video: "https://www.youtube.com/embed/video-id",
        category: "Long Form Video",
      },
      {
        id: "thumbnail-id",
        title: "Thumbnail",
        video:
          "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,w_960,h_540/image.png",
        category: "Thumbnails",
      },
    ]);
  });

  it("sorts by the displayed category order and admin-defined position", () => {
    const result = toPortfolioWorks([
      media({ id: "long-2", portfolio: { enabled: true, category: "Long Form Video", order: 2 } }),
      media({ id: "short-1", portfolio: { enabled: true, category: "Short Form Video", order: 1 } }),
      media({ id: "long-1", portfolio: { enabled: true, category: "Long Form Video", order: 1 } }),
      media({ id: "podcast-1", portfolio: { enabled: true, category: "Podcast", order: 1 } }),
    ]);

    expect(result.map((item) => item.id)).toEqual([
      "long-1",
      "long-2",
      "podcast-1",
      "short-1",
    ]);
  });

  it("excludes archived, disabled, and incomplete records", () => {
    const result = toPortfolioWorks([
      media({ id: "archived", status: "archived" }),
      media({ id: "disabled", portfolio: { enabled: false, category: null, order: null } }),
      media({ id: "missing-video", videoUrl: null }),
      media({ id: "active" }),
    ]);

    expect(result.map((item) => item.id)).toEqual(["active"]);
  });
});

describe("public homepage media", () => {
  it("maps and sorts landscape and reel records independently", () => {
    const result = toHomepageWorks([
      media({
        id: "landscape-2",
        homepage: {
          enabled: true,
          section: "landscape",
          category: "Business",
          order: 2,
        },
      }),
      media({
        id: "reel-1",
        description: "Reel description",
        homepage: {
          enabled: true,
          section: "reel",
          category: "Podcast",
          order: 1,
        },
      }),
      media({
        id: "landscape-1",
        homepage: {
          enabled: true,
          section: "landscape",
          category: null,
          order: 1,
        },
      }),
    ]);

    expect(result.worksLandscape.map((item) => item.id)).toEqual([
      "landscape-1",
      "landscape-2",
    ]);
    expect(result.worksReels).toEqual([
      expect.objectContaining({
        id: "reel-1",
        description: "Reel description",
        category: "Podcast",
        thumbnail: "https://i.ytimg.com/vi/video-id/hqdefault.jpg",
      }),
    ]);
  });

  it("uses an aspect-specific Cloudinary transformation for uploaded previews", () => {
    const result = toHomepageWorks([
      media({
        thumbnail: {
          url: "https://res.cloudinary.com/demo/image/upload/custom.png",
        },
        homepage: {
          enabled: true,
          section: "reel",
          category: null,
          order: 1,
        },
      }),
    ]);

    expect(result.worksReels[0].thumbnail).toBe(
      "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,w_480,h_854/custom.png",
    );
  });
});
