"use client";

import { syne } from "@/app/fonts";
import { Clock, TrendingDown, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
const painPoints = [
    {
        icon: <Clock className="w-10 h-10 text-white/70" />,
        title: "No Time to Build Your Brand",
        description:
            "You're buried running your business — and your content? It's always the first thing that gets pushed to 'tomorrow'.",
    },
    {
        icon: <TrendingDown className="w-10 h-10 text-white/70" />,
        title: "Content That Gets Views, Not Clients",
        description:
            "Likes and impressions look nice. But you need content that actually drives leads, builds authority, and converts — not just entertains.",
    },
    {
        icon: <RefreshCcw className="w-10 h-10 text-white/70" />,
        title: "Inconsistent Quality & Freelancer Chaos",
        description:
            "You've tried managing freelancers. The result? Missed deadlines, inconsistent branding, and content that doesn't feel like you.",
    },
];

export default function PainPointsSection() {
    return (
        <section className="relative w-full py-4">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6">
                {/* ── Heading ── */}
                <div className="text-center mb-8">
                    <h2
                        className={`${syne.className} text-4xl md:text-5xl font-semibold text-white leading-tight inline-block px-6 py-4 md:px-24 md:py-6 rounded-3xl`}
                        style={{
                            background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)",
                            boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.08),
        inset 0 -1px 0 rgba(0,0,0,0.4),
        0 4px 24px rgba(0,0,0,0.5)
      `,
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        Are You Currently
                        <br />
                        Struggling With?
                    </h2>
                </div>

                {/* ── 3 Columns ── */}
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {painPoints.map((point, i) => (
                        <div
                            key={i}
                            className={`flex flex-col items-center text-center px-10 py-8
                ${i !== painPoints.length - 1
                                    ? "border-b border-white/10 md:border-b-0 md:border-r md:border-white/10"
                                    : ""}
              `}
                        >
                            {/* Icon */}
                            <div className="mb-6">
                                {point.icon}
                            </div>

                            {/* Title */}
                            <h3 className={" text-xl font-semibold text-white mb-4"}>
                                {point.title}
                            </h3>

                            {/* Description */}
                            <p className="text-white/60 leading-relaxed">
                                {point.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ── Divider ── */}
                <div className="mt-16 h-px w-full bg-white/10" />

                {/* ── That's Exactly Why We Exist ── */}
                <div className="mt-8 text-center">
                    <h3 className={`${syne.className} text-3xl md:text-4xl font-semibold text-white mb-4`}>
                        That's Exactly Why We Exist.
                    </h3>

                    {/* Book a call button */}

                    <motion.a
                        href="https://calendly.com/business-dualmodestudio/strategy-session"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-10 mb-8 inline-flex items-center justify-center px-10 py-4 rounded-full text-white font-medium text-lg transition-all duration-300 hover:scale-[1.02]"
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
                            border: "2px solid rgba(200,210,225,0.5)",
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

            </div>
        </section>
    );
}