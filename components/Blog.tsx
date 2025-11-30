"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { BlogPost } from "@/lib/types";

interface BlogProps {
    posts?: BlogPost[];
    selectedCategory?: string | null;
    selectedTag?: string | null;
}

export default function Blog({ posts = [], selectedCategory: initialCategory, selectedTag: initialTag }: BlogProps) {
    const [currentCategory, setCurrentCategory] = useState<string | null>(initialCategory || null);
    const [selectedTag, setSelectedTag] = useState<string | null>(initialTag || null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4; // Show 4 items per page

    // Filter logic
    const filteredPosts = useMemo(() => {
        let filtered = posts;
        if (currentCategory) {
            filtered = filtered.filter(post =>
                post.category?.toLowerCase() === currentCategory.toLowerCase()
            );
        }
        if (selectedTag) {
            filtered = filtered.filter(post => {
                const postTags = post.tags?.map((t: string) => t.toLowerCase()) || [];
                return postTags.includes(selectedTag.toLowerCase());
            });
        }
        return filtered;
    }, [posts, currentCategory, selectedTag]);

    // Extract unique categories from ALL posts (case-insensitive)
    const allCategories = useMemo(() => {
        const categories = new Set<string>();
        posts.forEach(post => {
            if (post.category) {
                categories.add(post.category.toLowerCase());
            }
        });
        // Capitalize first letter for display
        return Array.from(categories).sort().map(cat => cat.charAt(0).toUpperCase() + cat.slice(1));
    }, [posts]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    const handleCategoryClick = (category: string) => {
        const catLower = category.toLowerCase();
        const currentLower = currentCategory?.toLowerCase();
        setCurrentCategory(currentLower === catLower ? null : category);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="max-w-4xl mx-auto px-6 py-20 min-h-screen">

            {/* HEADER - MANGA STYLE */}
            <header className="mb-16 relative">
                {/* Speed lines radiating from center */}
                <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,#000_4px,#000_5px)] transform -skew-y-12"></div>
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
                    <div className="relative inline-block">
                        <h1 className="font-merriweather text-5xl sm:text-6xl md:text-7xl font-extrabold italic text-black mb-2 tracking-tight uppercase">
                            THE ARCHIVE
                        </h1>
                        {/* Manga-style underline accent */}
                        <div className="flex gap-1 mt-2">
                            <span className="w-12 h-1 bg-black"></span>
                            <span className="w-8 h-1 bg-black"></span>
                            <span className="w-4 h-1 bg-black"></span>
                        </div>
                    </div>

                    {/* Minimal Filters - Dynamic Categories */}
                    <div className="flex gap-2 flex-wrap self-start md:self-end mb-2 max-w-md justify-end">
                        {allCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`px-3 py-1 text-xs font-bold uppercase border-2 border-black transition-all ${currentCategory?.toLowerCase() === category.toLowerCase()
                                    ? "bg-black text-white"
                                    : "bg-white text-black hover:bg-gray-100"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* ACTIVE FILTER INDICATOR */}
            {(currentCategory || selectedTag) && (
                <div className="mb-8 flex items-center gap-2 animate-fade-in flex-wrap">
                    <span className="text-sm font-bold text-gray-500 uppercase">
                        Viewing:
                    </span>
                    {currentCategory && (
                        <span className="px-3 py-1 bg-black text-white text-xs font-black uppercase border-2 border-black">
                            Category: {currentCategory}
                        </span>
                    )}
                    {selectedTag && (
                        <span className="px-3 py-1 bg-white text-black text-xs font-black uppercase border-2 border-black flex items-center gap-2">
                            Tag: {selectedTag}
                            <button
                                onClick={() => setSelectedTag(null)}
                                className="hover:text-red-500 font-bold"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {(currentCategory || selectedTag) && (
                        <button
                            onClick={() => {
                                setCurrentCategory(null);
                                setSelectedTag(null);
                            }}
                            className="text-xs font-bold text-gray-400 hover:text-black underline ml-2"
                        >
                            Clear All
                        </button>
                    )}
                </div>
            )}

            {/* COMPACT LIST WITH THUMBNAILS */}
            <div className="flex flex-col gap-8 mb-20">
                {currentPosts.map((post) => (
                    <Link
                        href={`/post/${post.slug}`}
                        key={post.id || post.slug}
                        className="group flex flex-col md:flex-row gap-6 items-start p-4 border-2 border-black md:border-transparent hover:border-black hover:bg-gray-50 transition-all rounded-lg"
                    >
                        {/* 1. Thumbnail Image (Visible) */}
                        <div className="relative w-full md:w-48 aspect-[16/9] md:aspect-[3/2] shrink-0 border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-0.5 transition-all">
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
                        </div>

                        {/* 3. Arrow (Desktop) */}
                        <div className="hidden md:flex self-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </div>
                    </Link>
                ))}

                {filteredPosts.length === 0 && (
                    <div className="py-20 text-center text-gray-400 font-mono text-sm border-2 border-dashed border-gray-200">
                        // NO DATA FOUND IN SECTOR
                    </div>
                )}
            </div>

            {/* PAGINATION - SLEEK DOCK STYLE */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-6 bg-white border-2 border-black px-6 py-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        {/* Prev Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 disabled:hover:bg-transparent transition-colors group"
                            title="Previous Page"
                        >
                            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>

                        {/* Page Indicator */}
                        <span className="font-mono text-sm font-bold tracking-widest text-gray-500">
                            PAGE <span className="text-black">{currentPage}</span> / {totalPages}
                        </span>

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 disabled:hover:bg-transparent transition-colors group"
                            title="Next Page"
                        >
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
