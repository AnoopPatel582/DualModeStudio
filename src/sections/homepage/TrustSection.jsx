"use client";
import { useState } from "react";
import { syne } from "@/app/fonts";
import Image from "next/image";

const logos = [
  { src: "/Trust Logo/logo1.jpg", alt: "Client Logo 1" },
  { src: "/Trust Logo/logo2.jpg", alt: "Client Logo 2" },
  { src: "/Trust Logo/logo3.jpg", alt: "Client Logo 3" },
  { src: "/Trust Logo/logo4.jpg", alt: "Client Logo 4" },
  { src: "/Trust Logo/logo5.jpg", alt: "Client Logo 5" },
  { src: "/Trust Logo/logo6.jpg", alt: "Client Logo 6" },
  { src: "/Trust Logo/logo7.jpg", alt: "Client Logo 7" },
  { src: "/Trust Logo/logo8.png", alt: "Client Logo 8" },
  { src: "/Trust Logo/logo9.png", alt: "Client Logo 9" },
];

const feedbackRow1 = [
  { src: "/Feedback/feedback1.png", alt: "Feedback 1" },
  { src: "/Feedback/feedback2.png", alt: "Feedback 2" },
  { src: "/Feedback/feedback3.png", alt: "Feedback 3" },
  { src: "/Feedback/feedback4.png", alt: "Feedback 4" },
  { src: "/Feedback/feedback5.png", alt: "Feedback 5" },
];

const feedbackRow2 = [
  { src: "/Feedback/feedback6.png", alt: "Feedback 6" },
  { src: "/Feedback/feedback7.png", alt: "Feedback 7" },
  { src: "/Feedback/feedback8.png", alt: "Feedback 8" },
  { src: "/Feedback/feedback9.png", alt: "Feedback 9" },
  { src: "/Feedback/feedback10.png", alt: "Feedback 10" },
];

const feedbackPortrait = [
  { src: "/Feedback/feedback11.jpg", alt: "Feedback 11" },
  { src: "/Feedback/feedback12.jpg", alt: "Feedback 12" },
];

const stats = [
  { number: "50+", label: "Global Creators & Brands Served" },
  { number: "1000+", label: "Videos Produced" },
  { number: "50m+", label: "Views on YouTube Alone" },
];

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

      {/* ── Logo Marquee ── */}
      <div className="relative mb-16">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
          style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }}
        />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
          style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }}
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

      {/* ── Feedback Row 1 — scrolls left ── */}
      <div className="relative mb-6">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
          style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }}
        />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
          style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }}
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

      {/* ── Feedback Row 2 — scrolls right ── */}
      <div className="relative mb-12">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
          style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }}
        />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
          style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }}
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
          {stats.map((stat, i) => (
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