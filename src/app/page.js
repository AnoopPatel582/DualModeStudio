import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import Hero from "@/sections/homepage/Hero";
import HeroVideoSection from "@/sections/homepage/HeroVideoSection";
import GrowthFrameworkSection from "@/sections/homepage/GrowthFrameworkSection";
import TrustSection from "@/sections/homepage/TrustSection";
import AuthorityAndAdvantageSection from "@/sections/homepage/AuthorityAndAdvantageSection";
// import ExecutionCapabilitiesSection from "@/sections/homepage/ExecutionCapabilitiesSection";
import FoundersSection from "@/sections/homepage/FoundersSection";
import ContactSection from "@/sections/homepage/ContactSection";
import MotionGraphicsSection from "@/sections/homepage/MotionGraphicsSection";
import ResultsSection from "@/sections/homepage/ResultsSection";
import PainPointsSection from "@/sections/homepage/PainPointsSection";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const description =
  "DualMode Studio is a Delhi-based video editing agency serving creators and brands worldwide with long-form editing, short-form editing, and YouTube thumbnail design.";

export const metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Video Editing Agency in Delhi, India | DualMode Studio",
    description,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Editing Agency in Delhi, India | DualMode Studio",
    description,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: [
        "Dual Mode Studio",
        "DualMode",
        "Dual Mode",
        "dualmode",
        "dualmodestudio.com",
      ],
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "Dual Mode Studio",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      email: "business@dualmodestudio.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi",
        addressCountry: "IN",
      },
      areaServed: ["Delhi", "India", "Worldwide"],
      sameAs: [
        "https://www.instagram.com/bydualmodestudio",
        "https://linktr.ee/dualmodestudio",
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
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
        <ResultsSection />
      </ScrollReveal>
      <ScrollReveal>
        <PainPointsSection />
      </ScrollReveal>
      <ScrollReveal>
        <FoundersSection />
      </ScrollReveal>
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>
    </>
  );
} 
