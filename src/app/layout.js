import { Cormorant_Garamond, Manrope } from "next/font/google";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata = {
  title: "Aryan Wanve",
  description: "Portfolio landing page for Aryan Wanve",
  icons: {
    icon: "/mono-icon.png",
    shortcut: "/mono-icon.png",
    apple: "/mono-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorantGaramond.variable}`}>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
