"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center px-6">
            {/* Manga halftone pattern background */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
                style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            ></div>

            <div className="max-w-md w-full relative z-10">
                {/* Header - Manga Style */}
                <header className="mb-12 relative text-center">
                    {/* Speed lines radiating from center */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,#000_4px,#000_5px)] transform -skew-y-12"></div>
                    </div>

                    <div className="relative inline-block">
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-2 tracking-tight uppercase">
                            ACCESS DENIED
                        </h1>
                        {/* Manga-style underline accent */}
                        <div className="flex gap-1 justify-center mt-2">
                            <span className="w-12 h-1 bg-black"></span>
                            <span className="w-8 h-1 bg-black"></span>
                            <span className="w-4 h-1 bg-black"></span>
                        </div>
                    </div>
                    <p className="text-lg text-gray-600 mt-6 font-medium">
                        Unauthorized Entry Blocked
                    </p>
                </header>

                {/* Error Card - Manga Panel Style */}
                <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] relative mb-6">
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-black"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-black"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-black"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-black"></div>

                    {/* Error Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-black flex items-center justify-center">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight text-center">
                        Chapter: Error
                    </h2>

                    <p className="text-gray-700 font-medium leading-relaxed text-center mb-6">
                        {error === "AccessDenied"
                            ? "You are not authorized to access the admin panel. Only specific email addresses are allowed."
                            : "An error occurred during authentication. Please try again or contact the administrator."}
                    </p>

                    <div className="flex flex-col gap-3">
                        <Link
                            href="/auth/signin"
                            className="w-full bg-black text-white px-6 py-3 font-black text-sm uppercase tracking-wide hover:bg-gray-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-1 active:shadow-none text-center border-2 border-black"
                        >
                            Try Again
                        </Link>
                        <Link
                            href="/"
                            className="w-full bg-white text-black px-6 py-3 font-black text-sm uppercase tracking-wide hover:bg-gray-50 transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-none text-center"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>

                {/* Info Panel */}
                <div className="border-2 border-black bg-gray-50 p-4 text-center">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                        Need Access?
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                        Contact the site administrator if you believe this is an error.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function AuthError() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <ErrorContent />
        </Suspense>
    );
}
