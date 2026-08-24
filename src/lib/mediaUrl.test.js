import { describe, expect, it } from "vitest";
import {
  appendQueryParams,
  buildYouTubePortfolioCardEmbedSrc,
  isImageMediaUrl,
  isVimeoUrl,
  isYouTubeUrl,
  toVimeoEmbedUrl,
  toYouTubeEmbedUrl,
} from "./mediaUrl";

describe("media URL detection", () => {
  it("detects supported YouTube URL formats", () => {
    expect(isYouTubeUrl("https://www.youtube.com/watch?v=abc123")).toBe(true);
    expect(isYouTubeUrl("https://www.youtube.com/embed/abc123")).toBe(true);
    expect(isYouTubeUrl("https://youtu.be/abc123")).toBe(true);
    expect(isYouTubeUrl("https://vimeo.com/123456")).toBe(false);
  });

  it("detects Vimeo URLs", () => {
    expect(isVimeoUrl("https://vimeo.com/123456")).toBe(true);
    expect(isVimeoUrl("https://player.vimeo.com/video/123456")).toBe(true);
    expect(isVimeoUrl("https://www.youtube.com/watch?v=abc123")).toBe(false);
  });

  it("detects supported image paths, including query strings", () => {
    expect(isImageMediaUrl("/thumb1.png")).toBe(true);
    expect(isImageMediaUrl("/thumb4.jpeg?version=2")).toBe(true);
    expect(isImageMediaUrl("/video.mp4")).toBe(false);
  });

  it("returns false for missing or non-string values", () => {
    expect(isYouTubeUrl()).toBe(false);
    expect(isVimeoUrl(null)).toBe(false);
    expect(isImageMediaUrl(123)).toBe(false);
  });
});

describe("media URL conversion", () => {
  it("converts YouTube watch and short URLs to embed URLs", () => {
    expect(toYouTubeEmbedUrl("https://www.youtube.com/watch?v=abc123&feature=share"))
      .toBe("https://www.youtube.com/embed/abc123");
    expect(toYouTubeEmbedUrl("https://youtu.be/abc123?t=10"))
      .toBe("https://www.youtube.com/embed/abc123");
  });

  it("keeps existing YouTube embed URLs unchanged", () => {
    const url = "https://www.youtube.com/embed/abc123?rel=0";
    expect(toYouTubeEmbedUrl(url)).toBe(url);
  });

  it("converts Vimeo share URLs and keeps player URLs unchanged", () => {
    expect(toVimeoEmbedUrl("https://vimeo.com/123456?share=copy"))
      .toBe("https://player.vimeo.com/video/123456");

    const playerUrl = "https://player.vimeo.com/video/123456";
    expect(toVimeoEmbedUrl(playerUrl)).toBe(playerUrl);
  });

  it("appends query parameters with the correct separator", () => {
    expect(appendQueryParams("https://example.com/video", "autoplay=1"))
      .toBe("https://example.com/video?autoplay=1");
    expect(appendQueryParams("https://example.com/video?rel=0", "autoplay=1"))
      .toBe("https://example.com/video?rel=0&autoplay=1");
  });

  it("builds a non-autoplay YouTube portfolio preview URL", () => {
    const result = new URL(
      buildYouTubePortfolioCardEmbedSrc(
        "https://www.youtube.com/embed/abc123?autoplay=1&mute=1"
      )
    );

    expect(result.pathname).toBe("/embed/abc123");
    expect(result.searchParams.get("autoplay")).toBeNull();
    expect(result.searchParams.get("mute")).toBeNull();
    expect(result.searchParams.get("controls")).toBe("1");
    expect(result.searchParams.get("playsinline")).toBe("1");
    expect(result.searchParams.get("rel")).toBe("0");
  });
});
