import { syne } from "@/app/fonts";

const reasons = [
  {
    number: "01",
    title: "YouTube-First Focus",
    description:
      "No distractions – we eat, sleep, and breathe platform trends.",
  },
  {
    number: "02",
    title: "Proven Frameworks",
    description:
      "Tactics refined across 500+ videos in niches from tech to lifestyle.",
  },
  {
    number: "03",
    title: "Transparent Tracking",
    description: "Real-time dashboards for every metric that matters.",
  },
];

export default function AuthorityAndAdvantageSection() {
  return (
    <section className="relative w-full py-16">
      <div className="mx-auto max-w-[1200px] px-6">

        {/* ================= Section Heading ================= */}
        <div className="mx-auto max-w-[700px] text-center">
          <h2
            className={`${syne.className} text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl`}
          >
            Why partner with us?
          </h2>
        </div>

        {/* ================= Stacked Cards ================= */}
        <div className="mx-auto mt-16 flex max-w-[700px] flex-col gap-4">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="flex items-start gap-6 rounded-2xl border border-white/10 bg-white/5 px-8 py-7"
            >
              {/* Number */}
              <span
                className=" mt-1 shrink-0 text-2xl font-semibold text-white/30"
              >
                {reason.number}
              </span>

              {/* Content */}
              <div>
                <h4 className="text-lg font-semibold text-white">
                  {reason.title}
                </h4>
                <p className="mt-2 leading-relaxed text-white/60">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
