"use client";

import { useState } from "react";
import Link from "next/link";

import { BlogPost } from "@/lib/types";

interface TopicsProps {
    posts?: BlogPost[];
}

export default function Topics({ posts = [] }: TopicsProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<BlogPost[]>([]);

    // Categories - these should match the options in your Notion Category field
    const categories = [
        { name: "Technology", icon: "💻", color: "bg-blue-50" },
        { name: "Photography", icon: "📷", color: "bg-purple-50" },
        { name: "Random Thoughts", icon: "💭", color: "bg-yellow-50" },
        { name: "Travel", icon: "✈️", color: "bg-green-50" },
        { name: "Books", icon: "📚", color: "bg-pink-50" },
        { name: "Lifestyle", icon: "🌟", color: "bg-orange-50" },
    ];

    // Get post count for each category using the actual Category field
    const getCategoryCount = (category: string) => {
        return posts.filter(post =>
            post.category?.toUpperCase() === category.toUpperCase()
        ).length;
    };

    // Search posts by keyword in title, description, or tags
    const handleSearch = (query?: string) => {
        const searchTerm = query !== undefined ? query : searchQuery;

        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }

        const lowerQuery = searchTerm.toLowerCase();
        const results = posts.filter(post =>
            post.title?.toLowerCase().includes(lowerQuery) ||
            post.description?.toLowerCase().includes(lowerQuery) ||
            post.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery)) ||
            post.category?.toLowerCase().includes(lowerQuery)
        );
        setSearchResults(results);
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        // Search in real-time as user types
        handleSearch(value);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-12 min-h-screen">

            {/* HEADER - MANGA STYLE */}
            <header className="mb-20 relative text-center">
                {/* Speed lines radiating from center */}
                <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,#000_4px,#000_5px)] transform -skew-y-12"></div>
                </div>

                <div className="relative inline-block">
                    <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-2 tracking-tight uppercase">
                        TOPICS
                    </h1>
                    {/* Manga-style underline accent */}
                    <div className="flex gap-1 justify-center mt-2">
                        <span className="w-12 h-1 bg-black"></span>
                        <span className="w-8 h-1 bg-black"></span>
                        <span className="w-4 h-1 bg-black"></span>
                    </div>
                </div>
                <p className="text-lg text-gray-600 mt-6 font-medium">
                    Find Your Focus
                </p>
            </header>

            {/* SEARCH BAR */}
            <div className="relative mb-12 max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Search posts by keyword..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full border-2 border-black rounded-lg py-3 px-10 font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow bg-white"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <button
                    onClick={() => handleSearch()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white p-1.5 rounded hover:bg-gray-800 transition"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
            </div>

            {/* SEARCH RESULTS */}
            {searchResults.length > 0 && (
                <div className="mb-12">
                    <h2 className="font-black text-2xl mb-4">
                        SEARCH RESULTS ({searchResults.length})
                    </h2>
                    <div className="space-y-3">
                        {searchResults.map((post, idx) => (
                            <Link
                                key={idx}
                                href={`/post/${post.slug}`}
                                className="block bg-white border-2 border-black p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none active:scale-[0.99] transition-all cursor-pointer"
                            >
                                <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{post.description}</p>
                                <div className="flex gap-2">
                                    {post.tags?.map((tag: string, i: number) => (
                                        <span key={i} className="text-xs px-2 py-1 bg-gray-100 border border-gray-300 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* EXPLORE CATEGORIES */}
            <div className="text-center mb-8">
                <h2 className="font-black text-3xl inline-flex items-center gap-4">
                    <span className="h-1 w-8 bg-black rounded-full"></span>
                    EXPLORE CATEGORIES
                    <span className="h-1 w-8 bg-black rounded-full"></span>
                </h2>
            </div>

            {/* CATEGORY LIST */}
            <div className="space-y-4">
                {categories.map((cat, idx) => {
                    const count = getCategoryCount(cat.name);
                    return (
                        <Link
                            key={idx}
                            href={`/blog?category=${encodeURIComponent(cat.name)}`}
                            className={`${cat.color} border-2 border-black rounded-full p-4 flex items-center justify-between hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none active:scale-[0.98] transition-all cursor-pointer group`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-2xl w-10 text-center">{cat.icon}</div>
                                <div className="flex flex-col">
                                    <span className="font-black text-xl tracking-wide group-hover:text-gray-700 uppercase">{cat.name}</span>
                                    <span className="text-xs font-bold text-gray-500">{count} Scroll{count !== 1 ? 's' : ''}</span>
                                </div>
                            </div>
                            <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    );
                })}
            </div>

        </div>
    );
}
