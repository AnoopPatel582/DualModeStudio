"use client";

import { motion } from "framer-motion";

export default function ThumbnailHero() {
  return (
    <section className="relative h-[85vh] overflow-hidden">

      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('thumbnail.avif')",
        }}
      />

      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent" />

      {/* content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6">

          <motion.h1
            initial={{ opacity:0, y:40 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Create an <span className="text-yellow-400">Irresistible</span> YouTube
            Thumbnail for Your Video
          </motion.h1>

          <motion.p
            initial={{ opacity:0, y:40 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.9 }}
            className="mt-6 max-w-2xl text-gray-300 text-lg"
          >
            No matter your niche, our YouTube thumbnails are designed to stop
            the scroll and spark curiosity. Bold visuals, emotional cues, and
            strategic text placement help creators boost CTR and grow their
            audience faster.
          </motion.p>

        </div>
      </div>

    </section>
  );
}