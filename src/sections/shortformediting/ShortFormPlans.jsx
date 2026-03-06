"use client";

import { motion } from "framer-motion";

const plans = [
  {
    title: "Pay-Per-Reel",
    price: "$20 / reel",
    features: [
      "Up to 60 sec",
      "Delivery within 24 hours",
      "2 minor revisions",
    ],
  },
  {
    title: "Momentum Plan",
    price: "$240 / month",
    features: [
      "12 reels/month",
      "Priority turnaround",
      "3 revisions/reel",
    ],
  },
  {
    title: "Scale Plan",
    price: "$550 / month",
    features: [
      "Up to 30 reels",
      "Unlimited revisions",
      "Thumbnail + caption suggestions",
    ],
  },
  {
    title: "Unlimited Plan",
    price: "$750 / month",
    features: [
      "Unlimited video submissions",
      "Dedicated editor",
      "Same-day edits possible",
    ],
  },
];

export default function ShortFormPlans() {
  return (
    <section className="py-16 px-6 bg-[#071028]">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-semibold">
          DualMode Service Plans
        </h2>
      </motion.div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">

        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#0b1736] p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all hover:-translate-y-2"
          >

            <h3 className="text-xl font-semibold">{plan.title}</h3>

            <p className="text-2xl font-bold mt-6">{plan.price}</p>

            <ul className="mt-6 space-y-3 text-gray-300">
              {plan.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>

            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-8 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              Get Started
            </button>

          </motion.div>
        ))}
      </div>
    </section>
  );
}