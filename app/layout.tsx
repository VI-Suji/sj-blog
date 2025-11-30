import type { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider";
import { Spectral, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

// Serif font for body text - designed for screen reading
const spectral = Spectral({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    variable: '--font-spectral',
    display: 'swap',
});

// Display font for headings - elegant and literary
const cormorant = Cormorant_Garamond({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
    variable: '--font-cormorant',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Sujith V I - Blog",
    description: "Personal blog and portfolio",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${spectral.variable} ${cormorant.variable}`}>
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
