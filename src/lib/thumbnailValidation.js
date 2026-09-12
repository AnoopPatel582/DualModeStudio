export const MAX_THUMBNAIL_BYTES = 10 * 1024 * 1024;
export const ACCEPTED_THUMBNAIL_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const REQUIREMENTS_MESSAGE =
  "Upload a JPG, JPEG, PNG, or WebP image. The maximum accepted size is 10 MB.";

export function validateThumbnailFile(file) {
  if (!file || typeof file.arrayBuffer !== "function") {
    return {
      valid: false,
      code: "FILE_REQUIRED",
      message: `Select an image to upload. ${REQUIREMENTS_MESSAGE}`,
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      code: "EMPTY_FILE",
      message: `The selected image is empty. ${REQUIREMENTS_MESSAGE}`,
    };
  }

  if (!ACCEPTED_THUMBNAIL_TYPES.includes(file.type?.toLowerCase())) {
    return {
      valid: false,
      code: "UNSUPPORTED_FORMAT",
      message: `This file format is not supported. ${REQUIREMENTS_MESSAGE}`,
    };
  }

  if (file.size > MAX_THUMBNAIL_BYTES) {
    return {
      valid: false,
      code: "FILE_TOO_LARGE",
      message:
        "This image is larger than 10 MB. Choose an image with a maximum size of 10 MB.",
    };
  }

  return { valid: true };
}
