import type { Metadata } from "next";
import { Lora, Merriweather } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import "../globals.css";

// Serif font for body text - excellent for reading
const lora = Lora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

// Display font for headings - readable and distinctive
const merriweather = Merriweather({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
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
    <html lang="en" className={`${lora.variable} ${merriweather.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <body>
        <AuthProvider>
          <div className="antialiased animate-in fade-in duration-500 min-h-screen flex flex-col">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
