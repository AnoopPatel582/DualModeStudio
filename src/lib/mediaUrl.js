/**
 * Detect media type from a URL string for portfolio / modal rendering.
 * YouTube embed/watch URLs must use <iframe>, not <video src>.
 */

export function isYouTubeUrl(url) {
  if (!url || typeof url !== "string") return false;
  return /youtube\.com\/(embed\/|watch\?v=)|youtu\.be\//i.test(url);
}

/** Detect Vimeo share or embed links. */
export function isVimeoUrl(url) {
  if (!url || typeof url !== "string") return false;
  return /vimeo\.com\//i.test(url);
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
