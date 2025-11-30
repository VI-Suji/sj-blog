import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SUJITH V I",
  description: "The Developer's Log - Building Digital Worlds, One Line at a Time",
  icons: {
    icon: "/sujith.png",
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased animate-in fade-in duration-500 min-h-screen flex flex-col`}>
      {children}
    </div>
  );
}
