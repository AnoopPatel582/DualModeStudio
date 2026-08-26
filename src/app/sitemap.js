const SITE_URL = "https://dualmodestudio.com";

const routes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/portfolio", changeFrequency: "weekly", priority: 0.9 },
  { path: "/long-form-editing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/short-form-editing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/thumbnail-design", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap() {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}
