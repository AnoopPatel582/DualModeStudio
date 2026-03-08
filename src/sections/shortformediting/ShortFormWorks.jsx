"use client";

import { motion } from "framer-motion";
import { syne } from "@/app/fonts";
import { shortFormWorksData } from "@/lib/shortFormWorksData";

export default function ShortFormWorks() {
  return (
    <section id="portfolio" className="py-20 px-6 bg-[#071028]">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className={`${syne.className} text-3xl md:text-4xl font-semibold`}>
          Sample Short Form Works
        </h2>

        <p className="mt-4 text-gray-400">
          Don’t forget to check our premium work done with our creative hands
          and expertise.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">

        {shortFormWorksData.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl "
          >
            <div className="aspect-[9/16]">
              <iframe
                src={`${video}?autoplay=1&mute=1`}
                className="w-full h-full"
                allow="autoplay"
                allowFullScreen
              />
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}