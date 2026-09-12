/**
 * Detect media type from a URL string for portfolio / modal rendering.
 * YouTube embed/watch URLs must use <iframe>, not <video src>.
 */

export function isYouTubeUrl(url) {
  if (!url || typeof url !== "string") return false;
  return /youtube\.com\/(embed\/|shorts\/|watch\?v=)|youtu\.be\//i.test(url);
}

/** Extract a YouTube video ID from watch, embed, Shorts or youtu.be URLs. */
export function getYouTubeVideoId(url) {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();
  const match = trimmed.match(
    /(?:youtube\.com\/(?:embed\/|shorts\/|watch\?v=)|youtu\.be\/)([^?&#/]+)/i,
  );

  return match?.[1] || null;
}

/** Lightweight dashboard preview without mounting a YouTube player. */
export function getYouTubeThumbnailUrl(url) {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
}

/** Convert stored player URLs into normal public video-page URLs. */
export function getPublicVideoUrl(url) {
  if (!url || typeof url !== "string") return url;

  const trimmed = url.trim();
  const youtubeId = getYouTubeVideoId(trimmed);

  if (youtubeId) {
    return `https://www.youtube.com/watch?v=${youtubeId}`;
  }

  const vimeoId = trimmed.match(
    /(?:player\.)?vimeo\.com\/(?:video\/)?(\d+)/i,
  )?.[1];

  if (vimeoId) {
    return `https://vimeo.com/${vimeoId}`;
  }

  return trimmed;
}

/**
 * Let Cloudinary resize/compress dashboard thumbnails before the browser loads
 * them. Non-Cloudinary URLs are returned unchanged.
 */
export function isCloudinaryImageUrl(url) {
  return (
    typeof url === "string" &&
    url.includes("res.cloudinary.com") &&
    url.includes("/image/upload/")
  );
}

export function getCloudinaryImageUrl(url, transformation) {
  if (!url || typeof url !== "string") return url;

  const uploadMarker = "/image/upload/";
  if (!isCloudinaryImageUrl(url)) return url;

  return url.replace(
    uploadMarker,
    `${uploadMarker}${transformation}/`,
  );
}

export function getCloudinaryDashboardThumbnailUrl(url) {
  return getCloudinaryImageUrl(
    url,
    "f_auto,q_auto,c_fill,w_480,h_270",
  );
}

export function getCloudinaryPortfolioThumbnailUrl(url) {
  return getCloudinaryImageUrl(
    url,
    "f_auto,q_auto,c_fill,w_960,h_540",
  );
}

/** Prefer an uploaded thumbnail, otherwise derive a lightweight YouTube one. */
export function getDashboardMediaPreviewUrl({ thumbnailUrl, videoUrl }) {
  if (thumbnailUrl) return getCloudinaryDashboardThumbnailUrl(thumbnailUrl);
  return getYouTubeThumbnailUrl(videoUrl);
}

/** Detect Vimeo share or embed links. */
export function isVimeoUrl(url) {
  if (!url || typeof url !== "string") return false;
  return /vimeo\.com\//i.test(url);
}

export function getVideoPreviewType(url) {
  if (!url || typeof url !== "string") return null;

  try {
    const parsedUrl = new URL(url.trim());
    if (!new Set(["http:", "https:"]).has(parsedUrl.protocol)) return null;
  } catch {
    return null;
  }

  if (isYouTubeUrl(url)) return "youtube";
  if (isVimeoUrl(url)) return "vimeo";
  return "video";
}

/**
 * Convert any Vimeo URL (share link or existing embed link) to an embed URL.
 * e.g. https://vimeo.com/1180262717?share=copy → https://player.vimeo.com/video/1180262717
 */
export function toVimeoEmbedUrl(url) {
  if (!url || typeof url !== "string") return url;
  const trimmed = url.trim();
  // Already an embed URL
  if (/player\.vimeo\.com\/video\//i.test(trimmed)) return trimmed;
  // Extract numeric ID from share / standard link
  const match = trimmed.match(/vimeo\.com\/(\d+)/);
  if (match) {
    return `https://player.vimeo.com/video/${match[1]}`;
  }
  return trimmed;
}

/** Use embed URL for iframes (handles watch?v= and youtu.be). */
export function toYouTubeEmbedUrl(url) {
  if (!url || typeof url !== "string") return url;
  const trimmed = url.trim();
  if (/youtube\.com\/embed\//i.test(trimmed)) return trimmed;
  const fromWatch = trimmed.match(/[?&]v=([^&]+)/);
  if (fromWatch) {
    return `https://www.youtube.com/embed/${fromWatch[1]}`;
  }
  const fromShort = trimmed.match(/youtu\.be\/([^?&]+)/i);
  if (fromShort) {
    return `https://www.youtube.com/embed/${fromShort[1]}`;
  }
  const fromShorts = trimmed.match(/youtube\.com\/shorts\/([^?&/]+)/i);
  if (fromShorts) {
    return `https://www.youtube.com/embed/${fromShorts[1]}`;
  }
  return trimmed;
}

/** Local or remote image paths (thumbnails, etc.) */
export function isImageMediaUrl(url) {
  if (!url || typeof url !== "string") return false;
  return /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(url.trim());
}

export function appendQueryParams(url, params) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${params}`;
}

/**
 * YouTube portfolio card preview: no autoplay; click opens modal to play.
 */
export function buildYouTubePortfolioCardEmbedSrc(url) {
  const embed = toYouTubeEmbedUrl(url);
  try {
    const u = new URL(
      embed.startsWith("//") ? `https:${embed}` : embed
    );
    u.searchParams.delete("autoplay");
    u.searchParams.delete("mute");
    u.searchParams.set("controls", "1");
    u.searchParams.set("playsinline", "1");
    u.searchParams.set("rel", "0");
    return u.toString();
  } catch {
    return appendQueryParams(embed, "controls=1&playsinline=1&rel=0");
  }
}
