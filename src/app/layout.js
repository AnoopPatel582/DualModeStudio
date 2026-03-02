import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "DualModeStudio",
  description: "Creative production agency delivering powerful digital experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}