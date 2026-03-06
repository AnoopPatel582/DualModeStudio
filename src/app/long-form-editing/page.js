import Navbar from "@/components/Navbar";

import LongFormHero from "@/sections/longformediting/LongFormHero";
import LongFormWorks from "@/sections/longformediting/LongFormWorks";
import ServicePlans from "@/sections/longformediting/ServicePlans";
import ServiceContact from "@/sections/longformediting/ServiceContact";

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