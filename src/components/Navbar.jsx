"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const scrollToSection = (event, id) => {
        event.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            const navOffset = 96; // approximate navbar height
            const rect = el.getBoundingClientRect();
            const targetY = rect.top + window.scrollY - navOffset;
            window.scrollTo({ top: targetY, behavior: "smooth" });
        } else {
            router.push(`/#${id}`);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">

                {/* 🔹 Logo */}
                <Link href="/" onClick={(e) => scrollToSection(e, "hero")}>
                    <Image
                        src="/logo_title.png"
                        alt="DualModeStudio Logo"
                        width={300}
                        height={80}
                        priority
                    />
                </Link>

                {/* 🔹 Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10 text-base font-normal">
                    <Link
                        href="#portfolio"
                        onClick={(e) => scrollToSection(e, "portfolio")}
                        className="hover:text-primary transition"
                    >
                        Portfolio
                    </Link>
                    <Link
                        href="#services"
                        onClick={(e) => scrollToSection(e, "services")}
                        className="hover:text-primary transition"
                    >
                        Services
                    </Link>
                    <Link
                        href="#contact"
                        onClick={(e) => scrollToSection(e, "contact")}
                        className="hover:text-primary transition"
                    >
                        Contact
                    </Link>
                    <a
                        href="https://wa.me/+918800946239"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-full hover:opacity-90 transition"
                    >
                        <Image src="/whatsapp.png" alt="WhatsApp" width={20} height={20} />
                        <span>WhatsApp Us</span>
                    </a>
                </div>

                {/* 🔹 Mobile Hamburger */}
                <button
                    className="md:hidden relative w-6 h-6 flex flex-col justify-between"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span
                        className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2.5" : ""
                            }`}
                    ></span>

                    <span
                        className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""
                            }`}
                    ></span>

                    <span
                        className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2.5" : ""
                            }`}
                    ></span>
                </button>
            </div>

            {/* 🔹 Mobile Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden w-full bg-black border-t border-white/10"
                    >
                        <div className="flex flex-col items-center justify-center space-y-6 py-8 text-lg font-medium">

                            <Link
                                href="#portfolio"
                                onClick={(e) => {
                                    scrollToSection(e, "portfolio");
                                    setIsOpen(false);
                                }}
                                className="hover:text-primary transition"
                            >
                                Portfolio
                            </Link>

                            <Link
                                href="#services"
                                onClick={(e) => {
                                    scrollToSection(e, "services");
                                    setIsOpen(false);
                                }}
                                className="hover:text-primary transition"
                            >
                                Services
                            </Link>

                            <Link
                                href="#contact"
                                onClick={(e) => {
                                    scrollToSection(e, "contact");
                                    setIsOpen(false);
                                }}
                                className="hover:text-primary transition"
                            >
                                Contact
                            </Link>

                            <a
                                href="https://wa.me/YOUR_NUMBER"
                                target="_blank"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full hover:opacity-90 transition"
                            >
                                WhatsApp Us
                            </a>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}