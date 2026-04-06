"use client";

import { motion } from "framer-motion";
import { syne } from "@/app/fonts";
import DarkVeil from "@/components/DarkVeil";

const heading = "DualMode Studio";
const subheading = "Social Media production, retention editing & more";

function splitWords(text) {
  return text.split(" ");
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] flex justify-center text-center px-6 pt-32 md:pt-32 lg:pt-36 overflow-hidden"
    >
      {/* Background: DarkVeil WebGL animation */}
      <div className="absolute inset-0 z-0 opacity-50">
        <DarkVeil
          hueShift={25}
          noiseIntensity={0.05}
          scanlineIntensity={0}
          speed={2}
          scanlineFrequency={0.5}
          warpAmount={3}
        />
      </div>
      {/* Overlay to keep text readable */}
      <div className="absolute inset-0 z-[1] bg-black/40" aria-hidden />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Main Heading */}
        <motion.h1
          className={`${syne.className} font-bold text-[48px] md:text-[72px] lg:text-[100px] leading-normal md:whitespace-nowrap`}
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
          className={`${syne.className} font-bold mt-6 text-[18px] md:text-[24px] lg:text-[30px] leading-normal`}
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
          className="mt-8 text-[14px] md:text-[16px] lg:text-[18px] max-w-2xl tracking-tight lg:max-w-4xl mx-auto text-white/80 leading-[28px] md:leading-[32px] lg:leading-[34px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          We&apos;re a video editing agency that fuses data-driven strategy with
          cinematic execution—transforming underperforming content into viewer
          magnets that grow your audience, brand, and revenue.

          <br /><br />

          Spending hours editing but still watching your retention flatline?
          <br />
          DualMode Studio changes that.
        </motion.p>
      </div>
    </section>
  );
}