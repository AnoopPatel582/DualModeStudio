"use client";

import { motion } from "framer-motion";
import { syne } from "@/app/fonts";

const plans = [
  {
    title: "Basic",
    price: "$5",
    description:
      "Professional thumbnail design for YouTube videos. Clean layout and attention-grabbing visuals.",
  },
  {
    title: "Standard",
    price: "$15",
    description:
      "Premium thumbnail design with advanced composition, expressive elements and stronger CTR potential.",
    highlight: true,
  },
  {
    title: "Premium",
    price: "$20",
    description:
      "Fully custom high-converting thumbnail with detailed design and maximum visual impact.",
  },
];

export default function ThumbnailPlans() {
  return (
    <section id="services" className="py-24 px-6 bg-[#071028]">

      {/* Heading */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className={`${syne.className} text-3xl md:text-4xl font-semibold text-white`}>
          DualMode Service Plans
        </h2>
      </motion.div>


      {/* Cards */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {plans.map((plan, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-8 text-center transition-all duration-300 border border-gray-700 hover:border-blue-500 hover:-translate-y-2
              
              ${plan.highlight
                ? "bg-[#0b1736] text-white shadow-2xl scale-105"
                : "bg-[#0b1736] text-white shadow-xl hover:-translate-y-2"
              }
              
            `}
          >

            {/* Title */}

            <h3 className="text-xl font-semibold mb-4">
              {plan.title}
            </h3>


            {/* Price */}

            <p className="text-3xl font-bold mb-4">
              {plan.price}
            </p>


            {/* Description */}

            <p className="text-gray-300 text-sm leading-relaxed">
              {plan.description}
            </p>


            {/* CTA */}

            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`mt-8 w-full py-3 rounded-lg font-medium transition
              
              ${plan.highlight
                ? "bg-primary text-black hover:bg-blue-500"
                : "bg-primary text-black hover:bg-blue-500"
              }
              
              `}
            >
              Get Started
            </button>

          </motion.div>

        ))}

      </div>

    </section>
  );
}