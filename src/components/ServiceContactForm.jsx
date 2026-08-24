"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { syne } from "@/app/fonts";
import { sendContactEmail } from "@/lib/emailjsContact";

export default function ServiceContactForm({ serviceName }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const channel = (formData.get("channel") || "").toString().trim();
    const projectDetails = (formData.get("message") || "").toString().trim();
    const message = [
      `Service: ${serviceName}`,
      channel ? `YouTube Channel / Business: ${channel}` : "",
      projectDetails ? `Project Details:\n${projectDetails}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      await sendContactEmail({
        title: `${serviceName} Inquiry - ${name}`,
        name,
        email,
        message,
      });
      setSuccess(true);
      form.reset();
    } catch (emailError) {
      console.error("EmailJS error:", emailError);
      setError("Something went wrong. Please try again or reach out directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-16 px-6 bg-[#071028]">
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

      <motion.form
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mt-16 max-w-3xl mx-auto space-y-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor={`${serviceName}-name`} className="text-sm text-gray-400">Name *</label>
          <input id={`${serviceName}-name`} name="name" type="text" required className="w-full mt-2 bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none py-2 transition-colors" placeholder="Enter your name" />
        </div>
        <div>
          <label htmlFor={`${serviceName}-email`} className="text-sm text-gray-400">Email *</label>
          <input id={`${serviceName}-email`} name="email" type="email" required className="w-full mt-2 bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none py-2 transition-colors" placeholder="Enter your email" />
        </div>
        <div>
          <label htmlFor={`${serviceName}-channel`} className="text-sm text-gray-400">YouTube Channel / Business</label>
          <input id={`${serviceName}-channel`} name="channel" type="text" className="w-full mt-2 bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none py-2 transition-colors" placeholder="Channel name or business" />
        </div>
        <div>
          <label htmlFor={`${serviceName}-message`} className="text-sm text-gray-400">Project Details</label>
          <textarea id={`${serviceName}-message`} name="message" rows="4" className="w-full mt-2 bg-transparent border-b border-gray-600 focus:border-blue-500 outline-none py-2 transition-colors resize-none" placeholder="Tell us about your project..." />
        </div>
        <button type="submit" disabled={loading} className="mt-6 px-8 py-3 bg-primary hover:bg-blue-500 text-black rounded-lg transition-colors font-medium disabled:opacity-70 cursor-pointer">
          {loading ? "Sending..." : "Send Message"}
        </button>
        {success && <p className="mt-4 text-green-400 text-center">Message sent successfully. We’ll get back to you soon.</p>}
        {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
      </motion.form>
    </section>
  );
}
