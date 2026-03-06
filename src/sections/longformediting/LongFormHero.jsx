"use client";

import { motion } from "framer-motion";

export default function LongFormHero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden mt-16">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('long.avif')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Premium Long-Form <br />
            Video Editing Plans
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mt-6 max-w-2xl text-gray-300 text-lg"
          >
            Power your YouTube channel with cinematic, high-retention edits built
            for every niche — documentaries, podcasts, gaming, business,
            vlogs, and more. From precise cuts to full-scale storytelling,
            our plans deliver premium quality and serious time savings.
          </motion.p>

        </div>
      </div>

    </section>
  );
}