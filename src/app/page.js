import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import Hero from "@/sections/homepage/Hero";
import HeroVideoSection from "@/sections/homepage/HeroVideoSection";
import GrowthFrameworkSection from "@/sections/homepage/GrowthFrameworkSection";
import TrustSection from "@/sections/homepage/TrustSection";
import AuthorityAndAdvantageSection from "@/sections/homepage/AuthorityAndAdvantageSection";
// import ExecutionCapabilitiesSection from "@/sections/homepage/ExecutionCapabilitiesSection";
import FoundersSection from "@/sections/homepage/FoundersSection";
import ContactPage from "@/app/contact/page";
import MotionGraphicsSection from "@/sections/homepage/MotionGraphicsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ScrollReveal>
        <HeroVideoSection />
      </ScrollReveal>
      <ScrollReveal>
        <GrowthFrameworkSection />
      </ScrollReveal>
      <ScrollReveal>
        <AuthorityAndAdvantageSection />
      </ScrollReveal>
      <ScrollReveal>
        <TrustSection/>
      </ScrollReveal>
      {/* <ScrollReveal>
        <ExecutionCapabilitiesSection />
      </ScrollReveal> */}
      <ScrollReveal>
        <MotionGraphicsSection />
      </ScrollReveal>
      <ScrollReveal>
        <FoundersSection />
      </ScrollReveal>
      <ScrollReveal>
        <ContactPage />
      </ScrollReveal>
    </>
  );
} 
