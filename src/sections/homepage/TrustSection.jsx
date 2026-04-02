"use client";
import { useState } from "react";
import { syne } from "@/app/fonts";
import Image from "next/image";
import {
  logos,
  feedbackRow1,
  feedbackRow2,
  feedbackPortrait,
  trustStats,
} from "@/lib/trustSectionData";

export default function TrustSection() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="relative w-full py-8 overflow-hidden">

      {/* ── Heading ── */}
      <div className="text-center max-w-2xl mx-auto px-6 mb-16">
        <h2 className={`${syne.className} text-4xl md:text-5xl font-semibold text-white`}>
          Trusted by creators worldwide
        </h2>
        <p className="mt-4 text-white/60">
          Real feedback from real clients who've grown with us.
        </p>
      </div>

      {/* ── Logo Marquee (clipped to content width) ── */}
      <div className="mx-auto mb-16 max-w-[1400px] px-6">
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent"
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black to-transparent"
          />
          <div className="flex overflow-hidden">
            <div className="flex gap-10 animate-marquee-left">
              {[...logos, ...logos, ...logos].map((logo, i) => (
                <div
                  key={i}
                  className="shrink-0 w-16 h-16 rounded-full border border-white/10 overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Feedback Row 1 — scrolls left (clipped to content width) ── */}
      <div className="mx-auto mb-6 max-w-[1400px] px-6">
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent"
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black to-transparent"
          />
          <div className="flex overflow-hidden">
            <div className="flex gap-6 animate-marquee-left">
              {[...feedbackRow1, ...feedbackRow1].map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(item.src)}
                  className="shrink-0 w-[320px] h-[250px] rounded-xl border border-white/10 overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={320}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Feedback Row 2 — scrolls right (clipped to content width) ── */}
      <div className="mx-auto mb-12 max-w-[1400px] px-6">
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent"
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black to-transparent"
          />
          <div className="flex overflow-hidden">
            <div className="flex gap-6 animate-marquee-right">
              {[...feedbackRow2, ...feedbackRow2].map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(item.src)}
                  className="shrink-0 w-[320px] h-[220px] rounded-xl border border-white/10 overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={320}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Portrait Feedbacks — static centered row ── */}
      <div className="flex justify-center gap-6 px-6 mb-20">
        {feedbackPortrait.map((item, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(item.src)}
            className="w-[220px] h-[360px] rounded-xl border border-white/10 overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={220}
              height={360}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* ── Stats Section ── */}
      <div className="mx-auto max-w-[1000px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4 border-y border-white/10">
          {trustStats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className={`${syne.className} text-5xl md:text-6xl font-bold text-white`}>
                {stat.number}
              </p>
              <p className="mt-2 text-white/60 text-sm font-medium tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center px-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all duration-200"
            >
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="Feedback enlarged"
              width={900}
              height={600}
              className="w-full h-auto rounded-xl border border-white/10 object-contain"
            />
          </div>
        </div>
      )}

    </section>
  );
}