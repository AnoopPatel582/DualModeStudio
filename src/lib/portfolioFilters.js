export const portfolioTabs = [
  "All",
  "Long Form Video",
  "Podcast",
  "Short Form Video",
  "Thumbnails",
];

export function filterPortfolioWorks(works, activeTab) {
  if (activeTab === "All") return works;
  return works.filter((work) => work.category === activeTab);
}
