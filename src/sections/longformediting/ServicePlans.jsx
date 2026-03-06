"use client";

import { motion } from "framer-motion";

const plans = [
    {
        title: "Essential Plan",
        subtitle: "Up to 8 min video",
        price: "$100 / video",
        features: [
            "Talking head videos",
            "Business explainers",
            "Basic cuts & transitions",
            "Color correction",
            "3–5 day turnaround",
        ],
    },
    {
        title: "Creator Growth",
        subtitle: "Up to 15 min video",
        price: "$240 / video",
        features: [
            "Story-driven editing",
            "B-roll & stock footage",
            "Sound effects",
            "Motion titles",
            "3–4 day turnaround",
        ],
    },
    {
        title: "Cinematic Plan",
        subtitle: "Up to 25 min video",
        price: "$300 / video",
        features: [
            "Cinematic storytelling",
            "Advanced transitions",
            "Dynamic motion graphics",
            "Sound design",
            "Priority delivery",
        ],
    },
    {
        title: "Custom Category",
        subtitle: "Advanced edits",
        price: "$500 / video",
        features: [
            "Documentaries",
            "Podcast editing",
            "Gaming content",
            "YouTube series",
            "Fully custom workflow",
        ],
    },
];

export default function ServicePlans() {
    return (
        <section className="py-16 px-6 bg-[#071028]">

            {/* Section Heading */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center max-w-3xl mx-auto"
            >
                <h2 className="text-3xl md:text-4xl font-semibold">
                    DualMode Service Plans
                </h2>

                <p className="mt-4 text-gray-400">
                    Choose the perfect editing plan tailored for your content style and
                    production needs.
                </p>
            </motion.div>

            {/* Pricing Cards */}
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">

                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-[#0b1736] p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2"
                    >

                        <h3 className="text-xl font-semibold">{plan.title}</h3>

                        <p className="text-gray-400 mt-2">{plan.subtitle}</p>

                        <p className="text-2xl font-bold mt-6">{plan.price}</p>

                        <ul className="mt-6 space-y-3 text-gray-300">
                            {plan.features.map((feature, i) => (
                                <li key={i}>• {feature}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() =>
                                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="mt-8 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-medium"
                        >
                            Get Started
                        </button>

                    </motion.div>
                ))}

            </div>

        </section>
    );
}