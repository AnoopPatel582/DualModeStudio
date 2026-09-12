import {
  HOMEPAGE_SECTIONS,
  PORTFOLIO_CATEGORIES,
} from "./mediaConstants";
import {
  getCloudinaryImageUrl,
  getCloudinaryPortfolioThumbnailUrl,
  getYouTubeThumbnailUrl,
} from "./mediaUrl";

const portfolioCategoryOrder = new Map(
  PORTFOLIO_CATEGORIES.map((category, index) => [category, index]),
);

export function toPortfolioWorks(media) {
  return media
    .filter(
      (item) =>
        item.status === "active" &&
        item.portfolio?.enabled &&
        item.portfolio.category,
    )
    .sort((left, right) => {
      const categoryDifference =
        portfolioCategoryOrder.get(left.portfolio.category) -
        portfolioCategoryOrder.get(right.portfolio.category);

      if (categoryDifference !== 0) return categoryDifference;
      return left.portfolio.order - right.portfolio.order;
    })
    .map((item) => ({
      id: item.id,
      title: item.title,
      video:
        item.mediaType === "image"
          ? getCloudinaryPortfolioThumbnailUrl(item.thumbnail?.url)
          : item.videoUrl,
      category: item.portfolio.category,
    }))
    .filter((item) => item.video);
}

export function toHomepageWorks(media) {
  const works = Object.fromEntries(
    HOMEPAGE_SECTIONS.map((section) => [section, []]),
  );

  media
    .filter(
      (item) =>
        item.status === "active" &&
        item.mediaType === "video" &&
        item.videoUrl &&
        item.homepage?.enabled &&
        HOMEPAGE_SECTIONS.includes(item.homepage.section),
    )
    .sort((left, right) => left.homepage.order - right.homepage.order)
    .forEach((item) => {
      const isReel = item.homepage.section === "reel";
      const cloudinaryTransformation = isReel
        ? "f_auto,q_auto,c_fill,w_480,h_854"
        : "f_auto,q_auto,c_fill,w_960,h_540";
      const thumbnail = item.thumbnail?.url
        ? getCloudinaryImageUrl(
            item.thumbnail.url,
            cloudinaryTransformation,
          )
        : getYouTubeThumbnailUrl(item.videoUrl);

      works[item.homepage.section].push({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.homepage.category,
        thumbnail,
        video: item.videoUrl,
      });
    });

  return {
    worksLandscape: works.landscape,
    worksReels: works.reel,
  };
}
