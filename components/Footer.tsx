import Link from "next/link";
import { Bangers } from "next/font/google";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

export default function Footer() {
    return (
        <footer className="w-full border-t-4 border-black bg-white mt-12 relative z-10">
            <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Left Side: Brand & Links */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <Link href="/" className={`${bangers.className} text-2xl tracking-wide text-black hover:scale-105 active:scale-95 transition-transform`}>
                        SUJITH V I
                    </Link>
                    <div className="flex gap-6 text-sm font-bold text-gray-600">
                        <Link href="/about" className="hover:text-black hover:underline decoration-2 underline-offset-4 active:text-gray-900 transition-all">About Me</Link>
                        {/* <Link href="/about" className="hover:text-black hover:underline decoration-2 underline-offset-4 active:text-gray-900 transition-all">Support</Link> */}
                        <a href="mailto:sujithvi06@gmail.com" className="hover:text-black hover:underline decoration-2 underline-offset-4 active:text-gray-900 transition-all">Contact</a>
                    </div>
                </div>

                {/* Right Side: Socials & Copyright */}
                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex items-center gap-6">
                        {/* LinkedIn */}
                        <Link href="https://www.linkedin.com/in/sujith-v-i" target="_blank" className="text-black hover:scale-110 active:scale-95 transition-transform p-2 hover:bg-gray-100 rounded-full">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </Link>
                        {/* GitHub */}
                        <Link href="https://github.com/VI-Suji" target="_blank" className="text-black hover:scale-110 active:scale-95 transition-transform p-2 hover:bg-gray-100 rounded-full">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </Link>
                        {/* Twitter/X */}
                        <Link href="https://x.com/394df51ea5534c4" target="_blank" className="text-black hover:scale-110 active:scale-95 transition-transform p-2 hover:bg-gray-100 rounded-full">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                        </Link>
                        {/* Mail */}
                        <a href="mailto:sujithvi06@gmail.com" className="text-black hover:scale-110 active:scale-95 transition-transform p-2 hover:bg-gray-100 rounded-full">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="font-serif text-sm text-gray-500">
                            © 2025 Sujith V I. All rights reserved.
                        </p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
