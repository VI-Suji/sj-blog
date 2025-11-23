"use client";

import { useState } from "react";
import { Bangers } from "next/font/google";
import Link from "next/link";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

interface NavbarProps {
  setCurrentView: (view: string) => void;
  currentView: string;
}

export default function Navbar({ setCurrentView, currentView }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full py-4 relative z-50 border-b border-gray-100 sticky top-0">
      {/* Glass Background Layer */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md -z-10" />

      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 relative z-10">

        {/* LOGO */}
        <button onClick={() => handleNavClick('home')} className={`${bangers.className} text-3xl tracking-wide text-black z-50 relative hover:scale-105 active:scale-95 transition-transform`}>
          SUJITH V I
        </button>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-900">
          <li>
            <button
              onClick={() => handleNavClick('home')}
              className={currentView === 'home' ? "text-black underline decoration-4 underline-offset-4" : "text-gray-500 hover:text-black hover:underline decoration-2 underline-offset-4 transition-all active:scale-95"}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick('blog')}
              className={currentView === 'blog' ? "text-black underline decoration-4 underline-offset-4" : "text-gray-500 hover:text-black hover:underline decoration-2 underline-offset-4 transition-all active:scale-95"}
            >
              Blog
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick('topics')}
              className={currentView === 'topics' ? "text-black underline decoration-4 underline-offset-4" : "text-gray-500 hover:text-black hover:underline decoration-2 underline-offset-4 transition-all active:scale-95"}
            >
              Topics
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavClick('about')}
              className={currentView === 'about' ? "text-black underline decoration-4 underline-offset-4" : "text-gray-500 hover:text-black hover:underline decoration-2 underline-offset-4 transition-all active:scale-95"}
            >
              About
            </button>
          </li>
        </ul>

        {/* DESKTOP CTA BUTTON */}
        <button className="hidden md:block bg-black text-white px-5 py-2 text-sm font-bold hover:bg-gray-800 transition hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
          Join The Crew
        </button>

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
              <div className="mb-8 text-center relative">
                <div className="border-2 border-black p-4 inline-block relative bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 transition-transform active:scale-95 active:rotate-0">
                  <h2 className={`${bangers.className} text-3xl md:text-4xl leading-none`}>THE SCROLL <br /> SELECTION</h2>
                  <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-wider">Navigating Your Saga</p>

                  {/* Speech bubble tail simulation */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-black transform rotate-45"></div>
                </div>
              </div>

              {/* MAIN PATH */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest border-2 border-black px-2 py-1 rounded-full">Main Path</span>
                  <div className="h-px bg-black flex-1"></div>
                </div>

                <nav className="flex flex-col gap-4 pl-2">
                  <button onClick={() => handleNavClick('home')} className="flex items-center justify-between text-lg font-bold hover:text-gray-600 active:text-black active:scale-[0.98] transition-all group w-full p-2 rounded-lg active:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                      <span>Home</span>
                    </div>
                    <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                  </button>
                  <button onClick={() => handleNavClick('blog')} className="flex items-center justify-between text-lg font-bold hover:text-gray-600 active:text-black active:scale-[0.98] transition-all group w-full p-2 rounded-lg active:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                      <span>Blog</span>
                    </div>
                    <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                  </button>
                  <button onClick={() => handleNavClick('topics')} className="flex items-center justify-between text-lg font-bold hover:text-gray-600 active:text-black active:scale-[0.98] transition-all group w-full p-2 rounded-lg active:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
                      <span>Topics</span>
                    </div>
                    <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 011 12V7a4 4 0 014-4z"></path></svg>
                  </button>
                  <button onClick={() => handleNavClick('about')} className="flex items-center justify-between text-lg font-bold hover:text-gray-600 active:text-black active:scale-[0.98] transition-all group w-full p-2 rounded-lg active:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      <span>About</span>
                    </div>
                    <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </button>
                </nav>
              </div>

              {/* CONNECT */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest border-2 border-black px-2 py-1 rounded-full">Connect</span>
                  <div className="h-px bg-black flex-1"></div>
                </div>
                <nav className="flex flex-col gap-4 pl-2">
                  <Link href="#" className="flex items-center gap-3 text-lg font-bold hover:text-gray-600 active:scale-[0.98] transition-transform origin-left">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    Join The Crew!
                  </Link>
                  <Link href="#" className="flex items-center gap-3 text-lg font-bold hover:text-gray-600 active:scale-[0.98] transition-transform origin-left">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    Support My Work
                  </Link>
                  <Link href="#" className="flex items-center gap-3 text-lg font-bold hover:text-gray-600 active:scale-[0.98] transition-transform origin-left">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    Contact
                  </Link>
                </nav>
              </div>

              {/* EMAIL & SOCIALS */}
              <div className="mt-auto pt-8 text-center">
                <p className="text-gray-500 font-medium mb-4">www.slonigmenil.com</p>
                <div className="flex justify-center gap-6 text-gray-400">
                  <Link href="#" className="hover:text-black active:scale-90 transition-transform"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></Link>
                  <Link href="#" className="hover:text-black active:scale-90 transition-transform"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></Link>
                  <Link href="#" className="hover:text-black active:scale-90 transition-transform"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></Link>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}
