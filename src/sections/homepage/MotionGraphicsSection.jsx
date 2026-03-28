"use client";
import { useState, useRef } from "react";
import { worksData } from "@/lib/worksData";
import WorkCard from "@/components/WorkCard";
import VideoModal from "@/components/VideoModal";
import { syne } from "@/app/fonts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function MotionGraphicsSection() {
  const [activeVideo, setActiveVideo] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="motion-graphics" className="py-8">
      <div className="mx-auto max-w-[1400px] px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className={`${syne.className} text-4xl md:text-5xl font-semibold text-white`}>
            Motion Graphics Works
          </h2>
          <p className="mt-6 text-white/60">
            A glimpse into the motion graphics and editing systems powering our clients' content.
          </p>
        </div>

        {/* Scroll Row + Buttons */}
        <div className="relative">

          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-[40%] -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full p-2 transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
          >
            {worksData.map((work, index) => (
              <WorkCard
                key={index}
                work={work}
                openModal={setActiveVideo}
              />
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-[40%] -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full p-2 transition-all duration-200 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

        </div>

        {/* View All Projects Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/portfolio"
            className="px-8 py-3 rounded-full border-2 border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 text-lg font-medium"
          >
            View All Projects
          </Link>
        </div>

        {/* Modal */}
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />

      </div>
    </section>
  );
}