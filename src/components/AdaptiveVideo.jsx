"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

const HLS_SOURCE =
  "https://res.cloudinary.com/dkeeyufv7/video/upload/sp_auto/v1772531569/file_jfxids.m3u8";

export default function AdaptiveVideo({
  src = HLS_SOURCE,
  className = "w-full rounded-xl",
  autoPlay = true,
  muted = true,
  controls = true,
  ...props
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // Optional: log when ready
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          hls.destroy();
        }
      });

      return () => hls.destroy();
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return () => {
        video.src = "";
      };
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      playsInline
      className={className}
      {...props}
    />
  );
}