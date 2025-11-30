"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
    const { data: session } = useSession();
    const pathname = usePathname();

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3 sm:py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo/Title */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Link href="/admin" className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
                            CMS Admin
                        </Link>
                        <span className="hidden sm:inline-block text-xs px-2 sm:px-3 py-1 bg-gray-100 rounded-full font-semibold text-gray-600">
                            Dashboard
                        </span>
                    </div>

                    {/* User Info & Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {session?.user && (
                            <div className="hidden lg:flex items-center gap-3 px-3 sm:px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    {session.user.email?.charAt(0).toUpperCase()}
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-semibold text-gray-900 truncate max-w-[150px]">
                                        {session.user.email}
                                    </p>
                                    <p className="text-xs text-gray-500">Admin</p>
                                </div>
                            </div>
                        )}

                        {/* View Site Link */}
                        <Link
                            href="/"
                            target="_blank"
                            className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all rounded-lg border border-gray-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span className="hidden lg:inline">View Site</span>
                        </Link>

                        {/* Logout Button */}
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-all rounded-lg shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
