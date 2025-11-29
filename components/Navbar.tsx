"use client";

import { useState } from "react";
import { Bangers } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="w-full py-4 relative z-50 border-b border-gray-100 sticky top-0">
            {/* Glass Background Layer */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md -z-10" />

            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 relative z-10">

                {/* LOGO */}
                <Link href="/" className={`${bangers.className} text-3xl tracking-wide text-black z-50 relative hover:scale-105 active:scale-95 transition-transform`}>
                    SUJITH V I
                </Link>

                {/* DESKTOP NAV LINKS */}
                <ul className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-900">
                    <li>
                        <Link
                            href="/"
                            className={isActive('/') ? "text-black underline decoration-4 underline-offset-4" : "text-gray-500 hover:text-black hover:underline decoration-2 underline-offset-4 transition-all active:scale-95"}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/blog"
                            className={isActive('/blog') ? "text-black underline decoration-4 underline-offset-4" : "text-gray-500 hover:text-black hover:underline decoration-2 underline-offset-4 transition-all active:scale-95"}
                        >
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/topics"
                            className={isActive('/topics') ? "text-black underline decoration-4 underline-offset-4" : "text-gray-500 hover:text-black hover:underline decoration-2 underline-offset-4 transition-all active:scale-95"}
                        >
                            Topics
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className={isActive('/about') ? "text-black underline decoration-4 underline-offset-4" : "text-gray-500 hover:text-black hover:underline decoration-2 underline-offset-4 transition-all active:scale-95"}
                        >
                            About
                        </Link>
                    </li>
                </ul>

                {/* MOBILE MENU TOGGLE */}
                <button
                    className="md:hidden z-[101] p-2 hover:bg-gray-100 active:bg-gray-200 active:scale-90 rounded-full transition-all relative"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                    )}
                </button>

                {/* MOBILE MENU OVERLAY */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[100] flex flex-col overflow-y-auto animate-in fade-in duration-200">
                        <div className="pt-24 px-6 pb-10">

                            {/* HEADER */}
                            <header className="mb-20 relative text-center">
                                {/* Speed lines radiating from center */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,#000_4px,#000_5px)] transform -skew-y-12"></div>
                                </div>

                                <div className="relative inline-block">
                                    <h1 className="text-3xl md:text-7xl font-black text-gray-900 mb-2 tracking-tight">
                                        THE SCROLL <br /> SELECTION
                                    </h1>
                                    {/* Manga-style underline accent */}
                                    <div className="flex gap-1 justify-center mt-2">
                                        <span className="w-12 h-1 bg-black"></span>
                                        <span className="w-8 h-1 bg-black"></span>
                                        <span className="w-4 h-1 bg-black"></span>
                                    </div>
                                </div>
                                <p className="text-lg text-gray-600 mt-6 font-medium">
                                    Navigating Your Saga
                                </p>
                            </header>

                            {/* MAIN PATH */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest border-2 border-black px-2 py-1 rounded-full">Main Path</span>
                                    <div className="h-px bg-black flex-1"></div>
                                </div>

                                <nav className="flex flex-col gap-4 pl-2">
                                    <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between text-lg font-bold hover:text-gray-600 active:text-black active:scale-[0.98] transition-all group w-full p-2 rounded-lg active:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                            <span>Home</span>
                                        </div>
                                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                    </Link>
                                    <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between text-lg font-bold hover:text-gray-600 active:text-black active:scale-[0.98] transition-all group w-full p-2 rounded-lg active:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                                            <span>Blog</span>
                                        </div>
                                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                                    </Link>
                                    <Link href="/topics" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between text-lg font-bold hover:text-gray-600 active:text-black active:scale-[0.98] transition-all group w-full p-2 rounded-lg active:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
                                            <span>Topics</span>
                                        </div>
                                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 011 12V7a4 4 0 014-4z"></path></svg>
                                    </Link>
                                    <Link href="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between text-lg font-bold hover:text-gray-600 active:text-black active:scale-[0.98] transition-all group w-full p-2 rounded-lg active:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                            <span>About</span>
                                        </div>
                                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    </Link>
                                </nav>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </nav>
    );
}
