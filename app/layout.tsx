import type { Metadata } from "next";
import { Outfit, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

import { ThemeToggle } from "@/components/ThemeToggle";

const itemOffset = 0; // Keeping original variable if needed, though not used in layout

export const metadata: Metadata = {
  title: "Mohit's Portfolio",
  description: "A modern, professional portfolio showcasing my work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased transition-colors duration-300`}
      >
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
