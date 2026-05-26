import { Cormorant_Garamond, Manrope } from "next/font/google";
import GoogleAnalytics from "../components/GoogleAnalytics";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";
import {
  siteDescription,
  siteEmail,
  siteName,
  siteUrl,
  socialProfiles,
} from "../lib/site";
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
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Aryan Wanve | Videographer, Editor & Visual Storyteller",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Aryan Wanve",
    "videographer",
    "video editor",
    "photographer",
    "cinematographer",
    "freelance video editor",
    "reel editor",
    "brand video creator",
    "event videography",
    "motion graphics",
    "color grading",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "Aryan Wanve | Videographer, Editor & Visual Storyteller",
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aryan Wanve visual portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Wanve | Videographer, Editor & Visual Storyteller",
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "portfolio",
  icons: {
    icon: "/mono-icon.png",
    shortcut: "/mono-icon.png",
    apple: "/mono-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteName,
    url: siteUrl,
    email: `mailto:${siteEmail}`,
    jobTitle: "Videographer, photographer, editor, and visual storyteller",
    sameAs: socialProfiles,
    knowsAbout: [
      "Videography",
      "Photography",
      "Cinematography",
      "Video editing",
      "Motion graphics",
      "Color grading",
      "Graphic design",
    ],
  };

  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorantGaramond.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <GoogleAnalytics />
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
