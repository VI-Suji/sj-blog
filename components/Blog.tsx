"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { BlogPost } from "@/lib/types";

interface BlogProps {
    posts?: BlogPost[];
    selectedCategory?: string | null;
}

export default function Blog({ posts = [], selectedCategory }: BlogProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6; // 2 rows of 3 posts
    const isLoading = false;

    // Filter by category first, then by tag
    let filteredPosts = posts;

    if (selectedCategory) {
        filteredPosts = filteredPosts.filter(post =>
            post.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
    }

    if (selectedTag) {
        filteredPosts = filteredPosts.filter(post => {
            // Case-insensitive tag matching
            const postTags = post.tags?.map((t: string) => t.toLowerCase()) || [];
            return postTags.includes(selectedTag.toLowerCase());
        });
    }

    // Calculate pagination
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, endIndex);

    const handleTagClick = (tag: string) => {
        if (selectedTag === tag) {
            setSelectedTag(null);
        } else {
            setSelectedTag(tag);
        }
        setCurrentPage(1); // Reset to first page when filter changes
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            {/* HEADER - MANGA STYLE */}
            <header className="mb-12 relative text-center">
                {/* Speed lines radiating from center */}
                <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,#000_4px,#000_5px)] transform -skew-y-12"></div>
                </div>

                <div className="relative inline-block">
                    <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-2 tracking-tight uppercase">
                        THE SCROLL ARCHIVE
                    </h1>
                    {/* Manga-style underline accent */}
                    <div className="flex gap-1 justify-center mt-2">
                        <span className="w-12 h-1 bg-black"></span>
                        <span className="w-8 h-1 bg-black"></span>
                        <span className="w-4 h-1 bg-black"></span>
                    </div>
                </div>
            </header>

            {/* FILTERS ROW - Applied filters on left, Filter buttons on right */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-6">
                {/* LEFT: Applied Filters */}
                <div className="flex flex-col gap-3">
                    {selectedCategory && (
                        <span className="px-4 py-2 bg-black text-white text-sm font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
                            Category: {selectedCategory}
                        </span>
                    )}
                    {selectedTag && (
                        <span className="px-4 py-2 bg-white text-black text-sm font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
                            Filter: {selectedTag}
                        </span>
                    )}
                    {!selectedCategory && !selectedTag && (
                        <span className="text-sm text-gray-500 font-medium">
                            No filters applied
                        </span>
                    )}
                </div>

                {/* RIGHT: Filter Dock */}
                <div className="flex gap-4 p-3 rounded-full bg-white/30 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
                    {/* Thoughts */}
                    <button
                        onClick={() => handleTagClick("Thoughts")}
                        className={`w-12 h-12 border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:scale-90 transition-all rounded-full group ${selectedTag === "Thoughts" ? "bg-yellow-400" : "bg-white"}`}
                        title="Thoughts"
                    >
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                    </button>
                    {/* Books */}
                    <button
                        onClick={() => handleTagClick("Books")}
                        className={`w-12 h-12 border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:scale-90 transition-all rounded-full group ${selectedTag === "Books" ? "bg-blue-400" : "bg-white"}`}
                        title="Books"
                    >
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </button>
                    {/* Tech */}
                    <button
                        onClick={() => handleTagClick("Tech")}
                        className={`w-12 h-12 border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:scale-90 transition-all rounded-full group ${selectedTag === "Tech" ? "bg-green-400" : "bg-white"}`}
                        title="Tech"
                    >
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    </button>
                    {/* Pictures */}
                    <button
                        onClick={() => handleTagClick("Pictures")}
                        className={`w-12 h-12 border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:scale-90 transition-all rounded-full group ${selectedTag === "Pictures" ? "bg-pink-400" : "bg-white"}`}
                        title="Pictures"
                    >
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </button>
                </div>
            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {isLoading ? (
                    // Skeleton Loader
                    Array.from({ length: 6 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse"
                        >
                            <div className="relative w-full h-48 bg-gray-200 mb-4"></div>
                            <div className="h-6 bg-gray-200 mb-3 w-3/4"></div>
                            <div className="h-4 bg-gray-200 mb-2 w-full"></div>
                            <div className="h-4 bg-gray-200 mb-4 w-5/6"></div>
                            <div className="flex gap-2 mb-3">
                                <div className="h-6 w-16 bg-gray-200"></div>
                                <div className="h-6 w-20 bg-gray-200"></div>
                            </div>
                            <div className="h-4 bg-gray-200 w-24"></div>
                        </div>
                    ))
                ) : currentPosts.length > 0 ? (
                    currentPosts.map((post, idx) => (
                        <Link
                            href={`/post/${post.slug}`}
                            key={idx}
                            className="border-4 border-black bg-white p-4 flex flex-col hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 transition-all duration-200 cursor-pointer group"
                        >
                            {/* Image Container */}
                            <div className="border-2 border-black relative mb-4 overflow-hidden h-64 md:h-auto md:aspect-[4/3]">
                                <Image
                                    src={post.cover || "/latest1.png"}
                                    alt={post.title}
                                    fill
                                    className="object-cover object-center transition-transform duration-300 grayscale group-hover:grayscale-0"
                                    unoptimized
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col">
                                <h3 className="font-black text-2xl leading-none mb-2 group-hover:underline truncate md:whitespace-normal">{post.title}</h3>

                                <div className="text-xs font-bold text-gray-500 mb-4 flex justify-between border-b-2 border-gray-100 pb-2">
                                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    <span>{post.readTime || "5 min read"}</span>
                                </div>

                                <p className="text-sm text-gray-700 mb-6 line-clamp-3 font-medium">
                                    {post.description}
                                </p>

                                <button className="mt-auto bg-black text-white text-xs font-bold py-2 px-6 rounded-full w-fit self-end hover:bg-gray-800 active:bg-gray-600 transition transform group-hover:-translate-y-1 group-active:translate-y-0">
                                    Read More
                                </button>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-20">
                        <p className="font-black text-3xl text-gray-400 mb-4">
                            {selectedCategory
                                ? `NO SCROLLS FOUND IN "${selectedCategory.toUpperCase()}"`
                                : selectedTag
                                    ? `NO SCROLLS FOUND FOR "${selectedTag.toUpperCase()}"`
                                    : "NO SCROLLS FOUND IN THE ARCHIVE..."}
                        </p>
                        {(selectedTag || selectedCategory) && (
                            <button
                                onClick={() => {
                                    setSelectedTag(null);
                                    setCurrentPage(1);
                                }}
                                className="mt-4 px-6 py-2 border-2 border-black bg-white font-bold hover:bg-black hover:text-white transition-colors"
                            >
                                CLEAR FILTERS
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-16">
                    {/* PREV Button */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`w-full md:w-auto px-6 py-3 border-4 border-black font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${currentPage === 1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-white hover:bg-gray-50'
                            }`}
                    >
                        ← PREV
                    </button>

                    {/* Page Numbers */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-12 h-12 border-4 border-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${currentPage === page
                                    ? 'bg-black text-white'
                                    : 'bg-white hover:bg-gray-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    {/* NEXT Button */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`w-full md:w-auto px-6 py-3 border-4 border-black font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${currentPage === totalPages
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-white hover:bg-gray-50'
                            }`}
                    >
                        NEXT →
                    </button>
                </div>
            )}
        </section>
    );
}
