import Navbar from "@/components/Navbar";
import PortfolioPage from "@/sections/portfolio/page";
import { listPortfolioMedia } from "@/lib/mediaRepository";
import { toPortfolioWorks } from "@/lib/publicMedia";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = {
  ...createPageMetadata({
    title: "Video Editing Portfolio",
    description:
      "Explore video editing and thumbnail design work created by DualMode Studio for creators and brands across long-form and short-form content.",
    path: "/portfolio",
  }),
  title: {
    absolute: "DualMode Studio | Video Editing Agency in Delhi, India",
  },
};

export default async function Portfolio() {
  const media = await listPortfolioMedia();
  const portfolioData = toPortfolioWorks(media);

  return (
    <>
      <Navbar />
      <PortfolioPage portfolioData={portfolioData} />
    </>
  );
}
