"use client";

import {
  isYouTubeUrl,
  isVimeoUrl,
  toVimeoEmbedUrl,
  isImageMediaUrl,
  buildYouTubePortfolioCardEmbedSrc,
} from "@/lib/mediaUrl";

export default function PortfolioCard({ work, openModal }) {
  const { video, title } = work;

  const isYoutube = isYouTubeUrl(video);
  const isVimeo = isVimeoUrl(video);
  const isImage = isImageMediaUrl(video);

  const handleCardClick = () => {
    openModal(video);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className="cursor-pointer group text-left"
    >
      <div className="relative w-full aspect-video rounded-xl border border-white/10 overflow-hidden bg-white/[0.02] transition-all duration-300 group-hover:border-white/25 group-hover:-translate-y-1">
        {isYoutube ? (
          <iframe
            src={buildYouTubePortfolioCardEmbedSrc(video)}
            title={title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="pointer-events-none absolute inset-0 z-0 h-full w-full border-0"
          />
        ) : isVimeo ? (
          <iframe
            src={toVimeoEmbedUrl(video)}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="pointer-events-none absolute inset-0 z-0 h-full w-full border-0"
          />
        ) : isImage ? (
          <img
            src={video}
            alt={title}
            className="pointer-events-none h-full w-full object-cover"
          />
        ) : (
          <video
            src={video}
            muted
            playsInline
            preload="metadata"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          />
        )}
      </div>

      <div className="mt-3 px-1">
        <h3 className="text-white text-sm font-medium leading-snug">
          {title}
        </h3>
      </div>
    </div>
  );
}
