export default function FrameworkPillar({ number, title, description }) {
    return (
      <div
        className="
          group
          relative
          h-full
          rounded-[32px]
          border border-white/10
          bg-white/[0.04]
          p-10
          transition-all
          duration-300
          ease-out
          hover:-translate-y-1
          hover:border-white/20
          hover:bg-white/[0.06]
        "
      >
        {/* Number */}
        <div className="mb-6 text-6xl font-light text-white/15">
          {number}
        </div>
  
        {/* Title */}
        <h3 className="mb-4 text-xl font-semibold tracking-tight text-white">
          {title}
        </h3>
  
        {/* Description */}
        <p className="text-sm leading-relaxed text-white/60">
          {description}
        </p>
      </div>
    );
  }