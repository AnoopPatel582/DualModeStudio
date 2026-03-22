"use client";
import { useState } from "react";
import { portfolioData } from "@/lib/portfolioData";
import PortfolioCard from "@/components/PortfolioCard";
import VideoModal from "@/components/VideoModal";
import { syne } from "@/app/fonts";

const tabs = ["All", "Long Form Video", "Short Form Video", "Thumbnails"];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [activeVideo, setActiveVideo] = useState(null);

  const filtered =
    activeTab === "All"
      ? portfolioData
      : portfolioData.filter((work) => work.category === activeTab);

  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-[1200px] px-6 py-20">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 py-8">
          <h1
            className={`${syne.className} text-6xl md:text-5xl font-bold text-white`}
          >
            Our Portfolio
          </h1>
          <p className="mt-4 text-white/60">
            A glimpse into the work powering our clients' growth on YouTube.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200
                ${
                  activeTab === tab
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((work, index) => (
            <PortfolioCard
              key={index}
              work={work}
              openModal={setActiveVideo}
            />
          ))}
        </div>

        {/* Modal */}
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />

      </div>
    </main>
  );
}