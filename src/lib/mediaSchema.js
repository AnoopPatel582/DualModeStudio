import { z } from "zod";
import {
  HOMEPAGE_SECTIONS,
  MEDIA_TYPES,
  PORTFOLIO_CATEGORIES,
} from "./mediaConstants";

export {
  HOMEPAGE_SECTIONS,
  MEDIA_STATUSES,
  MEDIA_TYPES,
  PORTFOLIO_CATEGORIES,
} from "./mediaConstants";

const optionalText = (maximum) =>
  z
    .string()
    .trim()
    .max(maximum)
    .nullable()
    .optional()
    .transform((value) => value || null);

const optionalUrl = z
  .string()
  .trim()
  .url()
  .nullable()
  .optional()
  .transform((value) => value || null);

const thumbnailSchema = z
  .object({
    url: z.string().trim().url(),
    publicId: z.string().trim().min(1).max(255),
  })
  .strict()
  .nullable()
  .optional()
  .transform((value) => value || null);

const portfolioPlacementSchema = z
  .object({
    enabled: z.boolean(),
    category: z
      .enum(PORTFOLIO_CATEGORIES)
      .nullable()
      .optional()
      .transform((value) => value || null),
    order: z
      .number()
      .int()
      .positive()
      .nullable()
      .optional()
      .transform((value) => value || null),
  })
  .strict();

const homepagePlacementSchema = z
  .object({
    enabled: z.boolean(),
    section: z
      .enum(HOMEPAGE_SECTIONS)
      .nullable()
      .optional()
      .transform((value) => value || null),
    category: optionalText(80),
    order: z
      .number()
      .int()
      .positive()
      .nullable()
      .optional()
      .transform((value) => value || null),
  })
  .strict();

export const createMediaSchema = z
  .object({
    title: z.string().trim().min(1).max(200),
    mediaType: z.enum(MEDIA_TYPES),
    videoUrl: optionalUrl,
    description: optionalText(500),
    thumbnail: thumbnailSchema,
    portfolio: portfolioPlacementSchema,
    homepage: homepagePlacementSchema,
  })
  .strict()
  .superRefine((media, context) => {
    if (!media.portfolio.enabled && !media.homepage.enabled) {
      context.addIssue({
        code: "custom",
        message: "Select at least one website placement.",
        path: ["portfolio", "enabled"],
      });
    }

    if (media.mediaType === "video" && !media.videoUrl) {
      context.addIssue({
        code: "custom",
        message: "A video URL is required for video projects.",
        path: ["videoUrl"],
      });
    }

    if (media.mediaType === "image" && !media.thumbnail) {
      context.addIssue({
        code: "custom",
        message: "A Cloudinary image is required for thumbnail projects.",
        path: ["thumbnail"],
      });
    }

    if (media.portfolio.enabled && !media.portfolio.category) {
      context.addIssue({
        code: "custom",
        message: "A portfolio category is required.",
        path: ["portfolio", "category"],
      });
    }

    if (media.portfolio.enabled && !media.portfolio.order) {
      context.addIssue({
        code: "custom",
        message: "A portfolio position is required.",
        path: ["portfolio", "order"],
      });
    }

    if (media.homepage.enabled && media.mediaType !== "video") {
      context.addIssue({
        code: "custom",
        message: "Only videos can be placed on the homepage.",
        path: ["homepage", "enabled"],
      });
    }

    if (media.homepage.enabled && !media.homepage.section) {
      context.addIssue({
        code: "custom",
        message: "A homepage section is required.",
        path: ["homepage", "section"],
      });
    }

    if (media.homepage.enabled && !media.homepage.order) {
      context.addIssue({
        code: "custom",
        message: "A homepage position is required.",
        path: ["homepage", "order"],
      });
    }
  });

export function parseCreateMedia(input) {
  return createMediaSchema.safeParse(input);
}

const mediaStatusChangeSchema = z
  .object({
    status: z.enum(["active", "archived"]),
  })
  .strict();

export function parseMediaStatusChange(input) {
  return mediaStatusChangeSchema.safeParse(input);
}
