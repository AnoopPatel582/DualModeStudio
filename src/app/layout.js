import "./globals.css";
import { inter, syne } from "./fonts";
import Footer from "@/components/Footer";
import ScrollToHash from "@/components/ScrollToHash";

export const metadata = {
  title: "DualMode Studio | Video Editing Services",
  description: "Creative production agency delivering powerful digital experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} font-sans bg-black text-white antialiased`}>
        <ScrollToHash />
        {children}
        <Footer />
      </body>
    </html>
  );
}