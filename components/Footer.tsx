import Link from "next/link";
import { Bangers } from "next/font/google";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

interface FooterProps {
    onNavClick: (view: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
    return (
        <footer className="w-full border-t-4 border-black bg-white mt-12 relative z-10">
            <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Left Side: Brand & Links */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <button onClick={() => onNavClick('home')} className={`${bangers.className} text-2xl tracking-wide text-black hover:scale-105 active:scale-95 transition-transform`}>
                        SUJITH V I
                    </button>
                    <div className="flex gap-6 text-sm font-bold text-gray-600">
                        <button onClick={() => onNavClick('about')} className="hover:text-black hover:underline decoration-2 underline-offset-4 active:text-gray-900 transition-all">About Me</button>
                        <button onClick={() => onNavClick('about')} className="hover:text-black hover:underline decoration-2 underline-offset-4 active:text-gray-900 transition-all">Support</button>
                        <a href="mailto:hello@slonigmenil.com" className="hover:text-black hover:underline decoration-2 underline-offset-4 active:text-gray-900 transition-all">Contact</a>
                    </div>
                </div>

                {/* Right Side: Socials & Copyright */}
                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-black hover:scale-110 active:scale-95 transition-transform p-2 hover:bg-gray-100 rounded-full">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" /></svg>
                        </Link>
                        <Link href="#" className="text-black hover:scale-110 active:scale-95 transition-transform p-2 hover:bg-gray-100 rounded-full">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                        </Link>
                        <Link href="#" className="text-black hover:scale-110 active:scale-95 transition-transform p-2 hover:bg-gray-100 rounded-full">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </Link>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-sm font-bold text-gray-500">
                            www.sujithvi.com
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            © 2025 Sujith V I. All rights reserved.
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
