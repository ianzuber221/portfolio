import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Components
import Navbar from "@/components/Navbar";
import RecruiterModal from "@/components/RecruiterModal";
import ScriptedBackground from "@/components/ScriptedBackground"; // ✅ New client-side wrapper

// Context
import { RecruiterProvider } from "@/context/RecruiterContext";

// Fonts
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
      <body>
        <ScriptedBackground>
          <RecruiterProvider>
            <RecruiterModal />
              <Navbar />
              <main className="p-6 max-w-5xl mx-auto">{children}</main>
          </RecruiterProvider>
        </ScriptedBackground>
      </body>
    </html>
  );
}