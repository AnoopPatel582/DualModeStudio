"use client";

import Image from "next/image";

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
        ) : work.thumbnail ? (
          <>
            <Image
              src={work.thumbnail}
              alt={`${work.title} preview`}
              fill
              sizes={isReel ? "(min-width: 768px) 188px, 50vw" : "(min-width: 768px) 388px, 50vw"}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 pl-0.5 text-lg text-white backdrop-blur-sm"
            >
              ▶
            </span>
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-black"
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
