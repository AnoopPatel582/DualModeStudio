export const SITE_URL = "https://dualmodestudio.com";
export const SITE_NAME = "DualMode Studio";

export function createPageMetadata({ title, description, path }) {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path || "/",
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
