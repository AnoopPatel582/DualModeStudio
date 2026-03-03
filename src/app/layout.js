import "./globals.css";
import { inter, syne } from "./fonts";

export const metadata = {
  title: "DualModeStudio",
  description: "Creative production agency delivering powerful digital experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${syne.variable} font-sans bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}