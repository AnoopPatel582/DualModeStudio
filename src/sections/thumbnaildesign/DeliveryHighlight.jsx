"use client";

import { motion } from "framer-motion";

export default function DeliveryHighlight() {
  return (
    <section className="py-8 px-6 bg-[#071028]">

      <div className="max-w-4xl mx-auto text-center">

        {/* Main Heading */}

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold text-white relative inline-block"
        >
          Same Day Delivery

          {/* Animated underline */}

          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute left-0 -bottom-2 h-[3px] bg-yellow-400 rounded"
          />
        </motion.h2>


        {/* Subtitle */}

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 text-xl md:text-2xl text-gray-300"
        >
          Maximum 24 hour turnaround time
        </motion.p>

      </div>

    </section>
  );
}