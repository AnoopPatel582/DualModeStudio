const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
]);

export function normalizeVideoUrl(value) {
  const rawUrl = value?.trim();

  if (!rawUrl) {
    throw new Error("A static video entry is missing its video URL.");
  }

  const url = new URL(rawUrl, "https://www.dualmodestudio.com");

  if (!YOUTUBE_HOSTS.has(url.hostname.toLowerCase())) return rawUrl;

  let videoId = null;

  if (url.hostname.toLowerCase() === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0];
  } else if (url.pathname.startsWith("/embed/")) {
    videoId = url.pathname.split("/")[2];
  } else if (url.pathname.startsWith("/shorts/")) {
    videoId = url.pathname.split("/")[2];
  } else {
    videoId = url.searchParams.get("v");
  }

  if (!videoId) {
    throw new Error(`Unable to identify the YouTube video in ${rawUrl}`);
  }

  return `https://www.youtube.com/embed/${videoId}`;
}

function buildHomepageMap(worksLandscape, worksReels) {
  const homepageByVideo = new Map();

  for (const [section, works] of [
    ["landscape", worksLandscape],
    ["reel", worksReels],
  ]) {
    works.forEach((work, index) => {
      const normalizedUrl = normalizeVideoUrl(work.video);

      if (homepageByVideo.has(normalizedUrl)) {
        throw new Error(
          `The same video is configured in multiple homepage positions: ${normalizedUrl}`,
        );
      }

      homepageByVideo.set(normalizedUrl, {
        enabled: true,
        section,
        category: work.category || null,
        order: index + 1,
        description: work.description?.trim() || null,
      });
    });
  }

  return homepageByVideo;
}

export function buildStaticMediaRecords(
  portfolioData,
  worksLandscape,
  worksReels,
) {
  const homepageByVideo = buildHomepageMap(worksLandscape, worksReels);
  const portfolioOrders = new Map();
  const seenKeys = new Set();
  const matchedHomepageVideos = new Set();

  const records = portfolioData.map((item) => {
    const category = item.category;
    const portfolioOrder = (portfolioOrders.get(category) || 0) + 1;
    portfolioOrders.set(category, portfolioOrder);

    const isThumbnail = category === "Thumbnails";
    const videoUrl = isThumbnail ? null : normalizeVideoUrl(item.video);
    const legacyKey = isThumbnail
      ? `static:image:${item.video.toLowerCase()}`
      : `static:video:${videoUrl}`;

    if (seenKeys.has(legacyKey)) {
      throw new Error(`Duplicate active static entry detected: ${legacyKey}`);
    }
    seenKeys.add(legacyKey);

    const homepageMatch = videoUrl ? homepageByVideo.get(videoUrl) : null;

    if (homepageMatch) matchedHomepageVideos.add(videoUrl);

    return {
      legacyKey,
      title: item.title.trim(),
      mediaType: isThumbnail ? "image" : "video",
      videoUrl,
      description: homepageMatch?.description || null,
      thumbnail: null,
      thumbnailSource: isThumbnail ? item.video : null,
      portfolio: {
        enabled: true,
        category,
        order: portfolioOrder,
      },
      homepage: homepageMatch
        ? {
            enabled: true,
            section: homepageMatch.section,
            category: homepageMatch.category,
            order: homepageMatch.order,
          }
        : {
            enabled: false,
            section: null,
            category: null,
            order: null,
          },
    };
  });

  const unmatchedHomepageVideos = [...homepageByVideo.keys()].filter(
    (videoUrl) => !matchedHomepageVideos.has(videoUrl),
  );

  if (unmatchedHomepageVideos.length > 0) {
    throw new Error(
      `Homepage videos are missing from the portfolio: ${unmatchedHomepageVideos.join(", ")}`,
    );
  }

  return records;
}
