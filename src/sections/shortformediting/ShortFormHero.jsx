"use client";

import { motion } from "framer-motion";
import { syne } from "@/app/fonts";

export default function ShortFormHero() {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('short.avif')",
        }}
      />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`${syne.className} text-4xl md:text-6xl font-bold py-8 mt-8`}
          >
            Premium Short Video Editing Plans
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mt-6 max-w-2xl text-gray-300 text-lg tracking-wide leading-loose"
          >
            Premium short-form video editing tailored for your brand. Perfect
            for YouTube Shorts, Instagram Reels, and TikTok. Boost engagement,
            scale faster, and stay on trend with cinematic cuts and viral-ready
            storytelling.
          </motion.p>

        </div>
      </div>
    </section>
  );
}