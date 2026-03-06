import Navbar from "@/components/Navbar";

import ThumbnailHero from "@/sections/thumbnaildesign/ThumbnailHero";
import ThumbnailCarousel from "@/sections/thumbnaildesign/ThumbnailCarousel";
import ThumbnailPlans from "@/sections/thumbnaildesign/ThumbnailPlans";
import DeliveryHighlight from "@/sections/thumbnaildesign/DeliveryHighlight";
import ThumbnailContact from "@/sections/thumbnaildesign/ThumbnailContact";

export default function ThumbnailDesignPage() {
  return (
    <main className="bg-[#071028] text-white min-h-screen">
      <Navbar />
      <ThumbnailHero />
      <ThumbnailCarousel />
      <ThumbnailPlans />
      <DeliveryHighlight />
      <ThumbnailContact />
    </main>
  );
}