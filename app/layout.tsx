import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, DM_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trivum — Venture Studio",
  description:
    "Transformamos conhecimento especializado em SaaS. Três forças. Um negócio.",
  openGraph: {
    title: "Trivum — Venture Studio",
    description: "Transformamos conhecimento especializado em SaaS.",
    url: "https://trivum.app",
    siteName: "Trivum",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${outfit.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
