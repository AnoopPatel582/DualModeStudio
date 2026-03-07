import FrameworkPillar from "@/components/FrameworkPillar";
import { frameworkData } from "@/lib/frameworkData";
import { syne } from "@/app/fonts";

export default function GrowthFrameworkSection() {
  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-[1400px] px-6">
        
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className={`${syne.className} text-4xl font-semibold tracking-tight text-white md:text-5xl`}>
            The DualMode Growth Framework
          </h2>
          <p className="mt-6 text-lg text-white/60">
            A structured system engineered to transform YouTube channels into
            scalable digital assets.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-12 md:grid-cols-2">
          {frameworkData.map((item) => (
            <FrameworkPillar
              key={item.number}
              number={item.number}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}