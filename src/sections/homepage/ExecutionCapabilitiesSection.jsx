import { servicesData } from "@/lib/servicesData";
import CapabilityCard from "@/components/CapabilityCard";
import { syne } from "@/app/fonts";

export default function ExecutionCapabilitiesSection() {
  return (
    <section id="services" className="relative w-full py-8">
      <div className="mx-auto max-w-[1400px] px-6">
        
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className={`${syne.className} text-4xl font-semibold tracking-tight text-white md:text-5xl`}>
            Execution Capabilities
          </h2>
          <p className="mt-6 text-lg text-white/60">
            Tactical execution powering scalable channel growth.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid gap-y-16 gap-x-12 md:grid-cols-2">
          {servicesData.map((service) => (
            <CapabilityCard
              key={service.title}
              title={service.title}
              description={service.description}
              slug={service.slug}
            />
          ))}
        </div>

      </div>
    </section>
  );
}