"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * After client navigation, scroll to #id when the URL includes a hash
 * (Next.js App Router does not always do this automatically).
 */
export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash || hash.length < 2) return;
    const id = decodeURIComponent(hash.slice(1));
    const el = document.getElementById(id);
    if (!el) return;
    const navOffset = 96;
    const y = el.getBoundingClientRect().top + window.scrollY - navOffset;
    requestAnimationFrame(() => {
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  }, [pathname]);

  return null;
}
