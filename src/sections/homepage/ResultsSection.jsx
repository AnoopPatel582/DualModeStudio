"use client";

import { syne } from "@/app/fonts";
import Image from "next/image";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { TfiStatsUp } from "react-icons/tfi";
import { beforeAfterData, viewsData } from "@/lib/resultsSectionData";

function openResultLink(link) {
  if (!link) return;
  window.open(link, "_blank", "noopener,noreferrer");
}

export default function ResultsSection() {
  return (
    <section className="relative w-full py-20">
      <div className="mx-auto max-w-[1200px] px-6">

        {/* ── Views We Generated ── */}
        <div className="mb-20">

          {/* Heading — left aligned */}
          <div className="mb-10">
            <h2 className={`${syne.className} text-4xl md:text-5xl font-semibold text-white inline-flex items-center gap-3 flex-wrap`}>
              <span>Views We Generated</span>
              <IoArrowDownCircleOutline className="text-white shrink-0" />
            </h2>
            <div className="mt-3 h-px w-full bg-white/10" />
          </div>

          {/* Cards — centered */}
          <div className="flex justify-center">
            <div className="w-full max-w-[800px]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {viewsData.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => openResultLink(item.link)}
                    className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[10/16] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:shadow-lg hover:shadow-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover scale-[1.03] transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ── Channel Growth We Delivered ── */}
        <div>

          {/* Heading — left aligned */}
          <div className="mb-10">
            <h2 className={`${syne.className} text-4xl md:text-5xl font-semibold text-white inline-flex items-center gap-3 flex-wrap`}>
              <span>Channel Growth We Delivered</span>
              <TfiStatsUp className="text-white shrink-0" />
            </h2>
            <div className="mt-3 h-px w-full bg-white/10" />
          </div>

          {/* Cards — centered */}
          <div className="flex justify-center">
            <div className="w-full max-w-[800px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {beforeAfterData.map((item, i) => (
                  <div
                    key={i}
                    className="relative rounded-2xl overflow-hidden border border-white/10 w-full"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={400}
                      height={300}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}