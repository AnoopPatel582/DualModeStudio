"use client";

import { X } from "lucide-react";
import {
  isYouTubeUrl,
  isVimeoUrl,
  toVimeoEmbedUrl,
  isImageMediaUrl,
  appendQueryParams,
  toYouTubeEmbedUrl,
} from "@/lib/mediaUrl";

export default function VideoModal({ video, onClose }) {
  if (!video) return null;

  return (
    <div
      className="fixed inset-0 cursor-pointer bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/50 hover:bg-black/70 border border-white/10 transition-all duration-200 cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          {isYouTubeUrl(video) ? (
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black">
              <iframe
                src={appendQueryParams(
                  toYouTubeEmbedUrl(video),
                  "autoplay=1&rel=0"
                )}
                title="Portfolio video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : isVimeoUrl(video) ? (
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black">
              <iframe
                src={appendQueryParams(toVimeoEmbedUrl(video), "autoplay=1")}
                title="Portfolio video"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : isImageMediaUrl(video) ? (
            <img
              src={video}
              alt=""
              className="w-full max-h-[85vh] object-contain rounded-xl border border-white/10 mx-auto"
            />
          ) : (
            <div className="aspect-video w-full rounded-xl border border-white/10 bg-black flex items-center justify-center">
              <video
                src={video}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
