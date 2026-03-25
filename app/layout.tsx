import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Mehrzad Babaei | Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Building modern web experiences with cutting-edge technology.",
  keywords: [
    "Mehrzad Babaei",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Mehrzad Babaei" }],
  openGraph: {
    title: "Mehrzad Babaei | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in React, Next.js, TypeScript, and Node.js.",
    url: "https://portfolio.zadprogramming.com",
    siteName: "Mehrzad Babaei Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
