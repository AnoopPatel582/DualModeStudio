import ContactForm from "@/components/ContactForm";
import { syne } from "@/app/fonts";

export default function ContactPage() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-[700px] px-6">
        
        <div className="text-center mb-16">
          <h1 className={`${syne.className} text-4xl md:text-5xl font-semibold text-white`}>
            Contact Us
          </h1>
          <p className="mt-4 text-white/60">
            Tell us about your project and we’ll get back to you shortly.
          </p>
        </div>

        <ContactForm />

      </div>
    </section>
  );
}