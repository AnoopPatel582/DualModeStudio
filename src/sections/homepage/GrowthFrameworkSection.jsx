import { syne } from "@/app/fonts";
import { FiArrowRight } from "react-icons/fi";

export default function GrowthFrameworkSection() {
  return (
    <section id="growth-framework" className="relative w-full scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-6">

        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <h2 className={`${syne.className} text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl`}>
            We don’t just produce content.
            <br />
            We engineer performance.
          </h2>
          <p className="mt-6 text-lg text-white/60">
            A structured system engineered to transform YouTube channels into
            scalable digital assets.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-12 md:grid-cols-2">

          {/* First Big Card */}
          <div className="glow-card group relative rounded-[32px] border border-white/10 bg-white/[0.04] p-10 transition-all duration-300 ease-out hover:-translate-y-[5px]">
            <div className="space-y-6">

              <div className="flex items-start gap-3">
                <FiArrowRight className="mt-1 text-white/70" />
                <p className="text-white/80">
                  Short-Form Content Repurposing Engine
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FiArrowRight className="mt-1 text-white/70" />
                <p className="text-white/80">
                  Channel Automation & Publishing Workflow
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FiArrowRight className="mt-1 text-white/70" />
                <p className="text-white/80">
                  YouTube Editing & Optimization
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FiArrowRight className="mt-1 text-white/70" />
                <p className="text-white/80">
                  Educational Content for SaaS Products
                </p>
              </div>

            </div>
          </div>


          {/* Second Big Card */}
          <div className="glow-card relative rounded-[32px] border border-white/10 bg-white/[0.04] p-10 transition-all duration-300 ease-out hover:-translate-y-[5px]">
            <div className="space-y-6">

              <div className="flex items-start gap-3">
                <FiArrowRight className="mt-1 text-white/70" />
                <p className="text-white/80">
                  Founder / Personal Brand Building
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FiArrowRight className="mt-1 text-white/70" />
                <p className="text-white/80">
                  Content Automation for Founders
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FiArrowRight className="mt-1 text-white/70" />
                <p className="text-white/80">
                  Thumbnail Design & CTR Boosts
                </p>
              </div>

              <div className="flex items-start gap-3">
                <FiArrowRight className="mt-1 text-white/70" />
                <p className="text-white/80">
                  Script Writing & Narrative Structure
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}