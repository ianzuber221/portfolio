import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // You'll create this

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ian Zuber – Developer Portfolio",
  description: "A portfolio site powered by Next.js and AI, built by Ian Zuber.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-zinc-100 text-zinc-900 antialiased min-h-screen">
        <Navbar />
        <main className="p-6 max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}