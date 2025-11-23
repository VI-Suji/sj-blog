"use client";

import { useState } from "react";
import Image from "next/image";
import { Bangers } from "next/font/google";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

interface BlogProps {
    posts?: any[];
    onPostClick?: (post: any) => void;
    selectedCategory?: string | null;
}

export default function Blog({ posts = [], onPostClick, selectedCategory }: BlogProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6; // 2 rows of 3 posts
    const isLoading = posts.length === 0;

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
            {/* HEADER & FILTERS CONTAINER */}
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-8">

                {/* HEADER TITLE */}
                <div className="relative bg-white p-6 transform -rotate-1">
                    {/* Double border effect */}
                    <div className="absolute inset-0 border-4 border-black transform translate-x-1 translate-y-1"></div>
                    <div className="absolute inset-0 border-4 border-black"></div>

                    <h1 className={`${bangers.className} relative z-10 text-5xl md:text-7xl text-center uppercase tracking-wider px-8`}>
                        THE SCROLL ARCHIVE
                    </h1>
                    {selectedCategory && (
                        <div className="relative z-10 text-center mt-2">
                            <span className="inline-block px-4 py-1 bg-yellow-300 border-2 border-black text-sm font-bold">
                                CATEGORY: {selectedCategory.toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* FILTER DOCK */}
                <div className="flex gap-4 p-3 rounded-full bg-white/30 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
                    {/* Thoughts */}
                    <button
                        onClick={() => handleTagClick("Thoughts")}
                        className={`w-12 h-12 border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all rounded-full group ${selectedTag === "Thoughts" ? "bg-yellow-400" : "bg-white"}`}
                        title="Thoughts"
                    >
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                    </button>
                    {/* Books */}
                    <button
                        onClick={() => handleTagClick("Books")}
                        className={`w-12 h-12 border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all rounded-full group ${selectedTag === "Books" ? "bg-blue-400" : "bg-white"}`}
                        title="Books"
                    >
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </button>
                    {/* Tech */}
                    <button
                        onClick={() => handleTagClick("Tech")}
                        className={`w-12 h-12 border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all rounded-full group ${selectedTag === "Tech" ? "bg-green-400" : "bg-white"}`}
                        title="Tech"
                    >
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                    </button>
                    {/* Pictures */}
                    <button
                        onClick={() => handleTagClick("Pictures")}
                        className={`w-12 h-12 border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all rounded-full group ${selectedTag === "Pictures" ? "bg-pink-400" : "bg-white"}`}
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
                        <div
                            key={idx}
                            onClick={() => onPostClick && onPostClick(post)}
                            className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer group flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative h-64 border-2 border-black mb-4 overflow-hidden">
                                <Image
                                    src={post.cover || "/latest1.png"}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                            </div>

                            {/* Text */}
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-center mb-2 border-b-2 border-gray-100 pb-2">
                                    <span className="text-xs font-bold text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                                    <span className="text-xs font-bold text-gray-500">{post.readTime || "5 min read"}</span>
                                </div>

                                <h2 className={`${bangers.className} text-3xl mb-2 leading-none group-hover:underline decoration-2 underline-offset-2`}>
                                    {post.title}
                                </h2>

                                <p className="text-gray-600 font-medium line-clamp-3 mb-6 flex-1">
                                    {post.description}
                                </p>

                                <button className="self-start bg-black text-white px-6 py-2 font-bold text-sm hover:bg-gray-800 transition-colors w-full md:w-auto text-center">
                                    READ CHAPTER
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-20">
                        <p className={`${bangers.className} text-3xl text-gray-400 mb-4`}>
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
                        className={`w-full md:w-auto px-6 py-3 border-4 border-black font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all ${currentPage === 1
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
                                className={`w-12 h-12 border-4 border-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all ${currentPage === page
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
                        className={`w-full md:w-auto px-6 py-3 border-4 border-black font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all ${currentPage === totalPages
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
