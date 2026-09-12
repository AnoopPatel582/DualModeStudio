import { describe, expect, it } from "vitest";
import { parseCreateMedia, parseMediaStatusChange } from "./mediaSchema";

const portfolioVideo = {
  title: "Portfolio video",
  mediaType: "video",
  videoUrl: "https://www.youtube.com/watch?v=example",
  portfolio: {
    enabled: true,
    category: "Long Form Video",
    order: 3,
  },
  homepage: {
    enabled: false,
  },
};

describe("media creation validation", () => {
  it("accepts the minimum portfolio-video information", () => {
    const result = parseCreateMedia(portfolioVideo);

    expect(result.success).toBe(true);
    expect(result.data.description).toBeNull();
    expect(result.data.thumbnail).toBeNull();
  });

  it("accepts explicit null values from disabled dashboard placements", () => {
    const result = parseCreateMedia({
      ...portfolioVideo,
      description: null,
      thumbnail: null,
      homepage: {
        enabled: false,
        section: null,
        category: null,
        order: null,
      },
    });

    expect(result.success).toBe(true);
  });

  it("accepts a Cloudinary-backed thumbnail project", () => {
    const result = parseCreateMedia({
      title: "Thumbnail design",
      mediaType: "image",
      thumbnail: {
        url: "https://res.cloudinary.com/demo/image/upload/example.jpg",
        publicId: "dualmode-studio/thumbnails/example",
      },
      portfolio: {
        enabled: true,
        category: "Thumbnails",
        order: 1,
      },
      homepage: {
        enabled: false,
      },
    });

    expect(result.success).toBe(true);
  });

  it("requires placement details when portfolio placement is enabled", () => {
    const result = parseCreateMedia({
      ...portfolioVideo,
      portfolio: { enabled: true },
    });

    expect(result.success).toBe(false);
  });

  it("prevents standalone images from being placed on the homepage", () => {
    const result = parseCreateMedia({
      title: "Thumbnail design",
      mediaType: "image",
      thumbnail: {
        url: "https://res.cloudinary.com/demo/image/upload/example.jpg",
        publicId: "dualmode-studio/thumbnails/example",
      },
      portfolio: {
        enabled: true,
        category: "Thumbnails",
        order: 1,
      },
      homepage: {
        enabled: true,
        section: "landscape",
        order: 1,
      },
    });

    expect(result.success).toBe(false);
  });
});

describe("media status validation", () => {
  it("accepts active and archived statuses only", () => {
    expect(parseMediaStatusChange({ status: "active" }).success).toBe(true);
    expect(parseMediaStatusChange({ status: "archived" }).success).toBe(true);
    expect(parseMediaStatusChange({ status: "deleted" }).success).toBe(false);
  });
});
