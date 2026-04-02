"use client";

import {
  isYouTubeUrl,
  buildYouTubePortfolioCardEmbedSrc,
} from "@/lib/mediaUrl";

export default function WorkCard({ work, openModal, variant = "landscape" }) {
  const isReel = variant === "reel";
  const aspectClass = isReel ? "aspect-[9/16]" : "aspect-video";
  const hasVideo = Boolean(work.video && String(work.video).trim());

  const handleClick = () => {
    if (!hasVideo) return;
    openModal(work.video);
  };

  return (
    <div
      className={`group w-full min-w-0 ${hasVideo ? "cursor-pointer" : "cursor-default"}`}
      onClick={handleClick}
    >
      <div
        className={`relative w-full ${aspectClass} rounded-xl border border-white/10 overflow-hidden bg-black transition-all duration-300 ${
          hasVideo
            ? "group-hover:border-white/30 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-black/40"
            : "opacity-90"
        }`}
      >
        {work.category && (
          <span className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-sm text-white/90 text-xs font-medium px-3 py-1 rounded-full border border-white/10">
            {work.category}
          </span>
        )}

        {!hasVideo ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/[0.04] px-3 text-center">
            <p className="text-xs text-white/45 leading-snug">
              <span className="text-white/80">worksData.js</span> (Featured work
              1–4)
            </p>
          </div>
        ) : isYouTubeUrl(work.video) ? (
          <iframe
            src={buildYouTubePortfolioCardEmbedSrc(work.video)}
            title={work.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <video
            src={work.video}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-contain"
            onMouseEnter={(e) => e.target.setAttribute("controls", "controls")}
            onMouseLeave={(e) => e.target.removeAttribute("controls")}
          />
        )}
      </div>

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
