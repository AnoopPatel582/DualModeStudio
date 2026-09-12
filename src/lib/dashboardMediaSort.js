import { PORTFOLIO_CATEGORIES } from "./mediaConstants";

const CATEGORY_ORDER = new Map(
  PORTFOLIO_CATEGORIES.map((category, index) => [category, index]),
);

function getCategoryRank(media) {
  if (media.mediaType === "image") {
    return PORTFOLIO_CATEGORIES.length;
  }

  return (
    CATEGORY_ORDER.get(media.portfolio?.category) ??
    PORTFOLIO_CATEGORIES.length - 1
  );
}

function getPosition(media) {
  const position = Number(media.portfolio?.order);
  return Number.isFinite(position) && position > 0
    ? position
    : Number.MAX_SAFE_INTEGER;
}

export function sortDashboardMedia(media) {
  return [...media].sort((left, right) => {
    const categoryDifference = getCategoryRank(left) - getCategoryRank(right);

    if (categoryDifference !== 0) return categoryDifference;

    return getPosition(left) - getPosition(right);
  });
}
