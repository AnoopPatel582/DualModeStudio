"use client";

import { motion } from "framer-motion";
import { syne } from "@/app/fonts";

// Replace with your Cloudinary video URL for the hero background animation
const HERO_BG_VIDEO_URL =
  "https://res.cloudinary.com/dkeeyufv7/video/upload/v1772741825/Nested_Sequence_719_1_mwalpc.mp4";

const heading = "DualMode Studio";
const subheading = "Social Media production, retention editing & more";

function splitWords(text) {
  return text.split(" ");
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center px-6 pt-32 md:pt-40 overflow-hidden"
    >
      {/* Background video with reduced opacity */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src={HERO_BG_VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" aria-hidden />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Main Heading */}
        <motion.h1
          className={`${syne.className} font-bold text-[48px] md:text-[72px] lg:text-[96px] leading-normal md:whitespace-nowrap`}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
        >
          {splitWords(heading).map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-3"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          className={`${syne.className} font-bold mt-6 text-[18px] md:text-[24px] lg:text-[30px]`}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.04,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {splitWords(subheading).map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-2"
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          className="mt-8 text-[16px] md:text-[18px] lg:text-[20px] leading-[28px] md:leading-[32px] lg:leading-[34px] max-w-2xl mx-auto text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          We're a video editing agency that fuses data-driven strategy with cinematic execution—transforming underperforming content into viewer magnets that grow your audience, brand, and revenue.

          <br /><br />

          Spending hours editing but still watching your retention flatline?
          DualMode Studio changes that.
        </motion.p>
      </div>
    </section>
  );
}