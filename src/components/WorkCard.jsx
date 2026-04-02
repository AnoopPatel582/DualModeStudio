"use client";
export default function WorkCard({ work, openModal }) {
  return (
    <div className="cursor-pointer shrink-0 w-[360px] group" onClick={() => openModal(work.video)}>

      {/* Video Card */}
      <div className="relative w-full aspect-video rounded-xl border border-white/10 overflow-hidden bg-black transition-all duration-300 group-hover:border-white/25 group-hover:-translate-y-1">

        {/* Category Badge */}
        {work.category && (
          <span className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm text-white/90 text-xs font-medium px-3 py-1 rounded-full border border-white/10">
            {work.category}
          </span>
        )}

        <video
          src={work.video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-contain"
          onMouseEnter={(e) => e.target.setAttribute("controls", true)}
          onMouseLeave={(e) => e.target.removeAttribute("controls")}
        />
      </div>

      {/* Title & Description — outside the card */}
      <div className="mt-3 px-1">
        <h3 className="text-white text-base font-semibold leading-snug">
          {work.title}
        </h3>
        {work.description && (
          <p className="mt-1 text-white/50 text-sm leading-relaxed line-clamp-2">
            {work.description}
          </p>
        )}
      </div>

    </div>
  );
}