"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    const formData = new FormData(e.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const message = formData.get("message");

    const fullName = `${firstName} ${lastName}`.trim();

    const templateParams = {
      title: fullName,
      name: fullName,
      email: email,
      message: message,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setSuccess(true);
      e.target.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try again or reach out directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-white/10 bg-white/[0.03] p-10"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <input
          name="firstName"
          placeholder="First Name"
          required
          className="bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 focus:border-white/30 outline-none"
        />

        <input
          name="lastName"
          placeholder="Last Name"
          className="bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 focus:border-white/30 outline-none"
        />
      </div>

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        required
        className="mt-6 w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 focus:border-white/30 outline-none"
      />

      <textarea
        name="message"
        placeholder="Your Message"
        rows="5"
        required
        className="mt-6 w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 focus:border-white/30 outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full rounded-lg bg-primary text-black py-3 font-medium hover:bg-blue-500 transition cursor-pointer"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {success && (
        <p className="mt-6 text-green-400 text-center">
          ✓ Message sent successfully. We'll get back to you soon.
        </p>
      )}

      {error && (
        <p className="mt-6 text-red-400 text-center">
          ✕ {error}
        </p>
      )}
    </form>
  );
}