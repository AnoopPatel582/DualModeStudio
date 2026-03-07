"use client";

import { useState } from "react";
import { worksData } from "@/lib/worksData";
import WorkCard from "@/components/WorkCard";
import VideoModal from "@/components/VideoModal";

export default function MotionGraphicsSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">
            Motion Graphics Works
          </h2>

          <p className="mt-6 text-white/60">
            A glimpse into the motion graphics and editing systems powering our clients' content.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {worksData.map((work, index) => (
            <WorkCard
              key={index}
              work={work}
              openModal={setActiveVideo}
            />
          ))}
        </div>

        {/* Modal */}
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      </div>
    </section>
  );
}