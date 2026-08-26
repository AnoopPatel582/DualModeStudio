import Navbar from "@/components/Navbar";

import LongFormHero from "@/sections/longformediting/LongFormHero";
import LongFormWorks from "@/sections/longformediting/LongFormWorks";
import ServicePlans from "@/sections/longformediting/ServicePlans";
import ServiceContact from "@/sections/longformediting/ServiceContact";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Long-Form Video Editing Services",
  description:
    "Professional long-form video editing for YouTube creators, podcasts, documentaries, gaming, business content, and vlogs by DualMode Studio.",
  path: "/long-form-editing",
});

export default function LongFormEditingPage() {
  return (
    <main className="bg-[#071028] text-white min-h-screen">
      <Navbar />
      <LongFormHero />
      <LongFormWorks />
      <ServicePlans />
      <ServiceContact />
    </main>
  );
}
