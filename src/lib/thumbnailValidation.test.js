import { describe, expect, it } from "vitest";
import {
  MAX_THUMBNAIL_BYTES,
  validateThumbnailFile,
} from "./thumbnailValidation";

function createFile({ type = "image/png", size = 1024 } = {}) {
  return {
    type,
    size,
    arrayBuffer() {},
  };
}

describe("thumbnail upload validation", () => {
  it("accepts JPG, JPEG, PNG, and WebP image MIME types", () => {
    for (const type of [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ]) {
      expect(validateThumbnailFile(createFile({ type })).valid).toBe(true);
    }
  });

  it("returns the supported formats when the file type is invalid", () => {
    const result = validateThumbnailFile(createFile({ type: "image/gif" }));

    expect(result.valid).toBe(false);
    expect(result.code).toBe("UNSUPPORTED_FORMAT");
    expect(result.message).toContain("JPG, JPEG, PNG, or WebP");
  });

  it("returns the maximum size when the image is too large", () => {
    const result = validateThumbnailFile(
      createFile({ size: MAX_THUMBNAIL_BYTES + 1 }),
    );

    expect(result.valid).toBe(false);
    expect(result.code).toBe("FILE_TOO_LARGE");
    expect(result.message).toContain("maximum size of 10 MB");
  });

  it("rejects missing and empty files with clear requirements", () => {
    expect(validateThumbnailFile(null).message).toContain("Select an image");
    expect(validateThumbnailFile(createFile({ size: 0 })).message).toContain(
      "image is empty",
    );
  });
});
