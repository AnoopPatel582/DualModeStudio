"use client";

import { motion } from "framer-motion";

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
    <section className="py-24 px-6 bg-[#071028]">

      {/* Heading */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
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
            className={`rounded-2xl p-8 text-center transition-all duration-300
              
              ${plan.highlight
                ? "bg-white text-black shadow-2xl scale-105"
                : "bg-white/90 text-black shadow-xl hover:-translate-y-2"
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

            <p className="text-gray-600 text-sm leading-relaxed">
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
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-[#071028] text-white hover:bg-[#0f1f4a]"
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