import Navbar from "@/components/Navbar";

import ShortFormHero from "@/sections/shortformediting/ShortFormHero";
import ShortFormWorks from "@/sections/shortformediting/ShortFormWorks";
import ShortFormPlans from "@/sections/shortformediting/ShortFormPlans";
import ShortFormContact from "@/sections/shortformediting/ShortFormContact";

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