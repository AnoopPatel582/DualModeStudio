import Link from "next/link";

export default function CapabilityCard({ title, description, slug }) {
  return (
    <Link
      href={slug}
      className="
        group
        relative
        block
        h-full
        rounded-[24px]
        border border-white/10
        bg-white/[0.03]
        p-10
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:border-white/20
        hover:bg-white/[0.05]
      "
    >
      {/* Title */}
      <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-6 text-base leading-relaxed text-white/60">
        {description}
      </p>

      {/* Arrow Indicator */}
      <div className="mt-10 flex justify-end">
        <span className="text-white/40 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}