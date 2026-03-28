import FounderCard from "@/components/FounderCard";
import { foundersData } from "@/lib/foundersData";
import { syne } from "@/app/fonts";

export default function FoundersSection() {
  return (
    <section id="founders" className="py-8">
      <div className="mx-auto max-w-[1200px] px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className={`${syne.className} text-4xl md:text-5xl font-semibold text-white`}>
            The Minds Behind DualMode
          </h2>

          <p className="mt-6 text-lg text-white/60">
            The operators building performance-driven YouTube growth systems.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid gap-16 md:grid-cols-2">
          {foundersData.map((founder) => (
            <FounderCard key={founder.name} founder={founder} />
          ))}
        </div>

      </div>
    </section>
  );
}