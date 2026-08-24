import { describe, expect, it } from "vitest";
import { portfolioData } from "./portfolioData";
import { filterPortfolioWorks, portfolioTabs } from "./portfolioFilters";

describe("portfolio filtering", () => {
  it("defines every category used by the portfolio data", () => {
    const dataCategories = [...new Set(portfolioData.map((work) => work.category))];

    expect(portfolioTabs).toContain("All");
    expect(portfolioTabs.filter((tab) => tab !== "All").sort())
      .toEqual(dataCategories.sort());
  });

  it("returns every work for the All tab", () => {
    expect(filterPortfolioWorks(portfolioData, "All")).toEqual(portfolioData);
  });

  it.each(portfolioTabs.filter((tab) => tab !== "All"))(
    "returns only %s works",
    (category) => {
      const filtered = filterPortfolioWorks(portfolioData, category);

      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every((work) => work.category === category)).toBe(true);
    }
  );

  it("returns an empty collection for an unknown category", () => {
    expect(filterPortfolioWorks(portfolioData, "Unknown")).toEqual([]);
  });
});
