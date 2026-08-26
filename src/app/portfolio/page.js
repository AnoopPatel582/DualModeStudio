import Navbar from "@/components/Navbar";
import PortfolioPage from "@/sections/portfolio/page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Video Editing Portfolio",
  description:
    "Explore video editing and thumbnail design work created by DualMode Studio for creators and brands across long-form and short-form content.",
  path: "/portfolio",
});

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <PortfolioPage />
    </>
  );
}
