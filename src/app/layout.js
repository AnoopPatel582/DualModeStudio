import "./globals.css";
import { inter, syne } from "./fonts";
import Footer from "@/components/Footer";
import ScrollToHash from "@/components/ScrollToHash";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Video Editing Agency in Delhi, India | DualMode Studio",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "DualMode Studio is a Delhi-based video editing agency serving creators and brands worldwide with long-form editing, short-form editing, and YouTube thumbnail design.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${syne.variable} font-sans bg-black text-white antialiased`}>
        <ScrollToHash />
        {children}
        <Footer />
      </body>
    </html>
  );
}
