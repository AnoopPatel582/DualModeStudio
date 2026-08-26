import Navbar from "@/components/Navbar";

import ShortFormHero from "@/sections/shortformediting/ShortFormHero";
import ShortFormWorks from "@/sections/shortformediting/ShortFormWorks";
import ShortFormPlans from "@/sections/shortformediting/ShortFormPlans";
import ShortFormContact from "@/sections/shortformediting/ShortFormContact";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Short-Form Video Editing Services",
  description:
    "Short-form video editing for YouTube Shorts, Instagram Reels, and TikTok with engaging cuts and platform-ready storytelling by DualMode Studio.",
  path: "/short-form-editing",
});

export default function ShortFormEditingPage() {
  return (
    <main className="bg-[#071028] text-white min-h-screen">
      <Navbar />
      <ShortFormHero />
      <ShortFormWorks />
      <ShortFormPlans />
      <ShortFormContact />
    </main>
  );
}
