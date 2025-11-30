"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { BlogPost } from "@/lib/types";

interface TopicsProps {
    posts?: BlogPost[];
}

export default function Topics({ posts = [] }: TopicsProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<BlogPost[]>([]);

    // Icon and color options for categories
    const iconOptions = ["💻", "📷", "💭", "✈️", "📚", "🌟", "🎨", "🎯", "🚀", "⚡"];
    const colorOptions = ["bg-blue-50", "bg-purple-50", "bg-yellow-50", "bg-green-50", "bg-pink-50", "bg-orange-50", "bg-red-50", "bg-indigo-50", "bg-teal-50", "bg-cyan-50"];

    // Helper to normalize tag names (Title Case)
    const toTitleCase = (str: string) => {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };

    // Dynamically generate tags from posts (Case Insensitive Grouping)
    const uniqueTags = Array.from(new Set(posts.flatMap(post => post.tags || []).map(tag => tag.toLowerCase()).filter(Boolean)));

    const tags = uniqueTags.map((lowerTag, index) => {
        // Find original name (first match) to use for display, or convert to Title Case
        const originalName = posts.flatMap(p => p.tags || []).find(t => t?.toLowerCase() === lowerTag) || toTitleCase(lowerTag as string);

        return {
            name: toTitleCase(originalName), // Ensure consistent display
            originalValue: lowerTag,
            icon: iconOptions[index % iconOptions.length],
            color: colorOptions[index % colorOptions.length]
        };
    });

    // Get post count for each tag (Case Insensitive)
    const getTagCount = (tagLower: string) => {
        return posts.filter(post =>
            post.tags?.some(t => t.toLowerCase() === tagLower)
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
        <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">

            {/* HEADER - MANGA STYLE */}
            <header className="mb-20 relative text-center">
                {/* Speed lines radiating from center */}
                <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,#000_4px,#000_5px)] transform -skew-y-12"></div>
                </div>

                <div className="relative inline-block">
                    <h1 className="font-merriweather text-5xl sm:text-6xl md:text-7xl font-extrabold italic text-black mb-2 tracking-tight uppercase">
                        TOPICS
                    </h1>
                    {/* Manga-style underline accent */}
                    <div className="flex gap-1 justify-center mt-2">
                        <span className="w-12 h-1 bg-black"></span>
                        <span className="w-8 h-1 bg-black"></span>
                        <span className="w-4 h-1 bg-black"></span>
                    </div>
                </div>
                <p className="font-serif text-base sm:text-lg text-gray-600 mt-6">
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
                    <h2 className="font-merriweather text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-6">
                        SEARCH RESULTS ({searchResults.length})
                    </h2>
                    <div className="flex flex-col gap-6">
                        {searchResults.map((post, idx) => (
                            <Link
                                key={idx}
                                href={`/post/${post.slug}`}
                                className="group flex flex-col md:flex-row gap-6 items-start p-4 border-2 border-black hover:bg-gray-50 transition-all rounded-lg"
                            >
                                {/* 1. Thumbnail Image */}
                                <div className="relative w-full md:w-48 aspect-[3/2] shrink-0 border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-0.5 transition-all">
                                    <Image
                                        src={post.cover || "/latest1.png"}
                                        alt={post.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        unoptimized
                                        loading="lazy"
                                    />
                                </div>

                                {/* 2. Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-mono text-xs text-gray-400">
                                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="text-[10px] font-black uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                            {post.category}
                                        </span>
                                    </div>

                                    <h3 className="font-merriweather text-xl sm:text-2xl md:text-3xl font-extrabold text-black mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                                        {post.title}
                                    </h3>

                                    <p className="font-serif text-base sm:text-lg text-black line-clamp-2 leading-relaxed max-w-xl">
                                        {post.description}
                                    </p>

                                    {/* Tags */}
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex gap-2 mt-3">
                                            {post.tags.map((tag: string, i: number) => (
                                                <span key={i} className="text-xs px-2 py-1 bg-gray-100 border border-gray-300 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* 3. Arrow (Desktop) */}
                                <div className="hidden md:flex self-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* EXPLORE CATEGORIES */}
            <div className="text-center mb-8">
                <h2 className="font-merriweather text-xl sm:text-2xl md:text-3xl font-extrabold text-black inline-flex items-center gap-4">
                    <span className="h-1 w-8 bg-black rounded-full"></span>
                    EXPLORE TAGS
                    <span className="h-1 w-8 bg-black rounded-full"></span>
                </h2>
            </div>

            {/* TAG LIST */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {tags.map((tag, idx) => {
                    const count = getTagCount(tag.originalValue as string);
                    return (
                        <Link
                            key={idx}
                            href={`/blog?tag=${encodeURIComponent(tag.name)}`}
                            className={`${tag.color} border-2 border-black rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none active:scale-[0.98] transition-all cursor-pointer group h-full`}
                        >
                            <div className="text-2xl">{tag.icon}</div>
                            <div className="flex flex-col">
                                <span className="font-merriweather font-bold text-sm sm:text-base leading-tight group-hover:text-gray-700">{tag.name}</span>
                                <span className="font-serif text-[10px] sm:text-xs text-gray-500 mt-1">{count} Scroll{count !== 1 ? 's' : ''}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>

        </div>
    );
}
