"use client";

import { motion } from "framer-motion";

export default function ServiceContact() {
  return (
    <section id="contact" className="py-16 px-6 bg-[#071028]">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-semibold">
          Start Your Next Video Project
        </h2>

        <p className="mt-4 text-gray-400">
          You are one step away from elevating your content. Tell us about your
          project and we’ll help you bring your vision to life.
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mt-16 max-w-3xl mx-auto space-y-6"
      >
        {/* Name */}
        <div>
          <label className="text-sm text-gray-400">Name *</label>
          <input
            type="text"
            required
            className="w-full mt-2 bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none py-2 transition-colors"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-400">Email *</label>
          <input
            type="email"
            required
            className="w-full mt-2 bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none py-2 transition-colors"
            placeholder="Enter your email"
          />
        </div>

        {/* Channel or Business */}
        <div>
          <label className="text-sm text-gray-400">
            YouTube Channel / Business
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none py-2 transition-colors"
            placeholder="Channel name or business"
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-sm text-gray-400">Project Details</label>
          <textarea
            rows="4"
            className="w-full mt-2 bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none py-2 transition-colors resize-none"
            placeholder="Tell us about your project..."
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
        >
          Send Message
        </button>
      </motion.form>

    </section>
  );
}