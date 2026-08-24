import ContactForm from "@/components/ContactForm";
import { syne } from "@/app/fonts";

export default function ContactSection() {
  return (
    <section id="contact" className="py-8">
      <div className="mx-auto max-w-[700px] px-6">
        <div className="mb-16 text-center">
          <h2 className={`${syne.className} text-4xl font-semibold text-white md:text-5xl`}>
            Contact Us
          </h2>
          <p className="mt-4 text-white/60">
            Tell us about your project and we’ll get back to you shortly.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
