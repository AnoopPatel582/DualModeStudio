"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { syne } from "@/app/fonts";

export default function ServiceContact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.target);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const channel = (formData.get("channel") || "").toString().trim();
    const projectDetails = (formData.get("message") || "").toString().trim();

    const parts = name.split(/\s+/).filter(Boolean);
    const firstName = parts[0] || name || "—";
    const lastName = parts.slice(1).join(" ") || "";

    const message = [
      channel ? `YouTube Channel / Business: ${channel}` : "",
      projectDetails ? `Project Details:\n${projectDetails}` : "",
    ]
      .filter(Boolean)
      .join("\n\n") || "—";

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, message }),
    });

    if (res.ok) {
      setSuccess(true);
      e.target.reset();
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err?.error || "Something went wrong. Please try again.");
    }
    setLoading(false);
  }

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
        <h2 className={`${syne.className} text-3xl md:text-4xl font-semibold`}>
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
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div>
          <label className="text-sm text-gray-400">Name *</label>
          <input
            name="name"
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
            name="email"
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
            name="channel"
            type="text"
            className="w-full mt-2 bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none py-2 transition-colors"
            placeholder="Channel name or business"
          />
        </div>

        {/* Message */}
        <div>
          <label className="text-sm text-gray-400">Project Details</label>
          <textarea
            name="message"
            rows="4"
            className="w-full mt-2 bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none py-2 transition-colors resize-none"
            placeholder="Tell us about your project..."
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 px-8 py-3 bg-primary hover:bg-blue-500 text-black rounded-lg transition-colors font-medium disabled:opacity-70 cursor-pointer"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {success && (
          <p className="mt-4 text-green-400 text-center">
            ✓ Message sent successfully. We'll get back to you soon.
          </p>
        )}
      </motion.form>

    </section>
  );
}