"use client";

import { useState } from "react";
import validator from "validator";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.target);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSuccess(true);
      e.target.reset();
    }
    if (!validator.isEmail(data.email)) {
        alert("Please enter a valid email address");
        setLoading(false);
        return;
    }

    setLoading(false);
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
        className="mt-8 w-full rounded-lg bg-white text-black py-3 font-medium hover:bg-white/90 transition"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {success && (
        <p className="mt-6 text-green-400 text-center">
          ✓ Message sent successfully. We'll get back to you soon.
        </p>
      )}
    </form>
  );
}