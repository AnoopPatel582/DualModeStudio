import { Inter, Syne } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const syne = Syne({
  subsets: ["latin"],
  // Load a few weights so usage isn't accidentally missing.
  weight: ["400", "500", "600", "700"],
  variable: "--font-syne",
  display: "swap",
});

