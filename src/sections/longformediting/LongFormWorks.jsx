"use client";

import { motion } from "framer-motion";
import { syne } from "@/app/fonts";

const videos = [
  "https://www.youtube.com/embed/W1XFZLzRyZ4?si=KcEEVakhy4vwEk_q",
  "https://www.youtube.com/embed/zvHJftkJrfA?si=F8KOs9tY78mYcvzq",
  "https://www.youtube.com/embed/6SsIXjJctNU?si=FJioYKDMchfe4VGk",
  "https://www.youtube.com/embed/9OLeeo3X1dc?si=PKDPdedPE3dJ9ARl",
  "https://www.youtube.com/embed/IPn2WVt9YBc?si=XB4HCd5XRUsTWyPy",
  "https://www.youtube.com/embed/bu9IhF6z1t4?si=0KQu1csX91CNoLx4",
];

export default function LongFormWorks() {
  return (
    <section id="portfolio" className="py-20 px-6 bg-[#071028]">

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className={`${syne.className} text-3xl md:text-4xl font-semibold`}>
          Sample Long Form Works
        </h2>

        <p className="mt-4 text-gray-400">
          Don’t forget to check our premium work done with our creative hands
          and expertise.
        </p>
      </motion.div>

      {/* Video Grid */}
      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">

        {videos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative w-full overflow-hidden rounded-xl shadow-lg"
          >
            <div className="aspect-video">
              <iframe
                src={`${video}?autoplay=1&mute=1&controls=1`}
                title="YouTube video player"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        ))}

      </div>

    </section>
  );
}