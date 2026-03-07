"use client";

import { motion } from "framer-motion";
import AdaptiveVideo from "@/components/AdaptiveVideo";

export default function HeroVideoSection() {
  return (
    <section className="relative py-16 px-6 bg-black">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Video */}
        <motion.div
          className="w-full rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AdaptiveVideo className="w-full h-auto rounded-xl" loop />
        </motion.div>

        {/* Book a call button */}
        <motion.a
          href="https://calendly.com/business-dualmodestudio/strategy-session"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center justify-center px-10 py-4 rounded-full text-white font-medium text-lg transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: "linear-gradient(180deg, #1e1e1e 0%, #121212 45%, #050505 100%)",
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.08),
              0 1px 0 rgba(220,228,240,0.4),
              0 2px 0 rgba(180,190,210,0.25),
              2px 4px 24px rgba(0,0,0,0.5),
              2px 6px 28px rgba(180,210,255,0.12),
              -1px 2px 12px rgba(180,210,255,0.08)
            `,
            border: "1px solid rgba(200,210,225,0.5)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `
              inset 0 1px 0 rgba(255,255,255,0.1),
              0 1px 0 rgba(230,238,250,0.45),
              0 2px 0 rgba(190,200,220,0.3),
              2px 6px 28px rgba(0,0,0,0.5),
              3px 8px 32px rgba(180,210,255,0.18),
              -2px 4px 16px rgba(180,210,255,0.12)
            `;
            e.currentTarget.style.borderColor = "rgba(215,225,240,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `
              inset 0 1px 0 rgba(255,255,255,0.08),
              0 1px 0 rgba(220,228,240,0.4),
              0 2px 0 rgba(180,190,210,0.25),
              2px 4px 24px rgba(0,0,0,0.5),
              2px 6px 28px rgba(180,210,255,0.12),
              -1px 2px 12px rgba(180,210,255,0.08)
            `;
            e.currentTarget.style.borderColor = "rgba(200,210,225,0.5)";
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Book a call
        </motion.a>
      </div>
    </section>
  );
}
