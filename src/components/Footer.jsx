import Link from "next/link";
import { servicesData } from "@/lib/servicesData";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-8">
      <div className="mx-auto max-w-[1400px] px-6">
        
        {/* Top Grid */}
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1 — Brand */}
          <div>
            <Link href="/">
                    <Image
                        src="/logo_title.png"
                        alt="DualModeStudio Logo"
                        width={300}
                        height={100}
                        priority
                    />
                </Link>
            <p className="mt-4 text-white/60 leading-relaxed">
              Performance-driven YouTube growth systems engineered for scale.
            </p>

            <div className="mt-6 space-y-2 text-white/70">
              <p>business@dualmostudio.com</p>
              <p>Operating remotely worldwide.</p>
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h4 className="mb-4 text-sm uppercase tracking-wider text-white/50">
              Navigation
            </h4>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#growth-framework" className="hover:text-white transition-colors">
                  Growth Framework
                </Link>
              </li>
              <li>
                <Link href="/#execution-capabilities" className="hover:text-white transition-colors">
                  Execution Capabilities
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Capabilities */}
          <div>
            <h4 className="mb-4 text-sm uppercase tracking-wider text-white/50">
              Capabilities
            </h4>
            <ul className="space-y-3 text-white/70">
              {servicesData.map((service) => (
                <li key={service.title}>
                  <Link
                    href={service.slug}
                    className="hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Legal */}
          <div>
            <h4 className="mb-4 text-sm uppercase tracking-wider text-white/50">
              Legal
            </h4>
            <ul className="space-y-3 text-white/70">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-white transition-colors">
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} DualMode Studio. All rights reserved.
          </p>

          {/* Social Icons (minimal text placeholders for now) */}
          <div className="flex items-center gap-6 text-white/50">
            <Link href="#" className="hover:text-white transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Instagram
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              X
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}