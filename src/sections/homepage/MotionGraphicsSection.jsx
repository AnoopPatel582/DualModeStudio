"use client";

import { useState } from "react";
import { worksLandscape, worksReels } from "@/lib/worksData";
import WorkCard from "@/components/WorkCard";
import VideoModal from "@/components/VideoModal";
import { syne } from "@/app/fonts";
import Link from "next/link";

export default function MotionGraphicsSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="motion-graphics" className="py-8">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            className={`${syne.className} text-4xl md:text-5xl font-semibold text-white`}
          >
            Motion Graphics Works
          </h2>
          <p className="mt-6 text-white/60">
            A glimpse into the motion graphics and editing systems powering our
            clients&apos; content.
          </p>
        </div>

        {/* Same max width + grid as Results “Views We Generated” cards */}
        <div className="mx-auto w-full max-w-[800px] space-y-8">
          {/* Row 1 — landscape; add your URLs in worksData.js (worksLandscape) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {worksLandscape.map((work, index) => (
              <WorkCard
                key={`landscape-${index}`}
                work={work}
                openModal={setActiveVideo}
                variant="landscape"
              />
            ))}
          </div>

          {/* Row 2 — reels / shorts (same cell size as Views cards: aspect 10/16) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {worksReels.map((work, index) => (
              <WorkCard
                key={`reel-${index}`}
                work={work}
                openModal={setActiveVideo}
                variant="reel"
              />
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/portfolio"
            className="px-8 py-3 rounded-full border-2 border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 text-lg font-medium"
          >
            View All Projects
          </Link>
        </div>

        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      </div>
    </section>
  );
}
