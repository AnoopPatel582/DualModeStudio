import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import HeroVideoSection from "@/sections/HeroVideoSection";
import GrowthFrameworkSection from "@/sections/GrowthFrameworkSection";
import AuthorityAndAdvantageSection from "@/sections/AuthorityAndAdvantageSection";
import ExecutionCapabilitiesSection from "@/sections/ExecutionCapabilitiesSection";
import FoundersSection from "@/sections/FoundersSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HeroVideoSection />
      <GrowthFrameworkSection />
      <AuthorityAndAdvantageSection />
      <ExecutionCapabilitiesSection />
      <FoundersSection />
    </>
  );
} 
