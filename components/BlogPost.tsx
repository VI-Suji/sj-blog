"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Bangers } from "next/font/google";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

import { BlogPost as BlogPostType } from "@/lib/notion";

interface BlogPostProps {
    post: BlogPostType;
    onBack: () => void;
}

export default function BlogPost({ post, onBack }: BlogPostProps) {
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`/api/posts/${post.slug}`);
                if (response.ok) {
                    const data = await response.json();
                    setContent(data.markdown || "");
                }
            } catch (error) {
                console.error("Error fetching post content:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [post.slug]);

    // Parse inline markdown (bold, italic, links)
    const parseInlineMarkdown = (text: string) => {
        const elements: React.ReactNode[] = [];
        let remaining = text;
        let key = 0;

        // Process the text character by character
        while (remaining.length > 0) {
            // Check for bold (**text**)
            const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
            if (boldMatch) {
                elements.push(<strong key={`bold-${key++}`}>{boldMatch[1]}</strong>);
                remaining = remaining.slice(boldMatch[0].length);
                continue;
            }

            // Check for italic (*text*)
            const italicMatch = remaining.match(/^\*(.+?)\*/);
            if (italicMatch) {
                elements.push(<em key={`italic-${key++}`}>{italicMatch[1]}</em>);
                remaining = remaining.slice(italicMatch[0].length);
                continue;
            }

            // Check for links [text](url)
            const linkMatch = remaining.match(/^\[(.+?)\]\((.+?)\)/);
            if (linkMatch) {
                elements.push(
                    <a key={`link-${key++}`} href={linkMatch[2]} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                        {linkMatch[1]}
                    </a>
                );
                remaining = remaining.slice(linkMatch[0].length);
                continue;
            }

            // No match, add the character and continue
            const nextSpecialChar = remaining.search(/[\*\[]/);
            if (nextSpecialChar === -1) {
                // No more special characters, add the rest
                elements.push(remaining);
                break;
            } else if (nextSpecialChar > 0) {
                // Add text up to the next special character
                elements.push(remaining.slice(0, nextSpecialChar));
                remaining = remaining.slice(nextSpecialChar);
            } else {
                // Special character didn't match, add it and continue
                elements.push(remaining[0]);
                remaining = remaining.slice(1);
            }
        }

        return elements.length > 0 ? elements : [text];
    };

    // Simple Markdown renderer for common patterns
    const renderMarkdown = (markdown: string) => {
        const lines = markdown.split('\n');
        const elements: React.ReactElement[] = [];
        let currentParagraph: string[] = [];
        let inCodeBlock = false;
        let codeContent: string[] = [];
        let codeLanguage = '';
        let inList = false;
        let listItems: string[] = [];
        let listType: 'ul' | 'ol' = 'ul';

        const flushParagraph = () => {
            if (currentParagraph.length > 0) {
                const text = currentParagraph.join(' ');
                elements.push(
                    <p key={elements.length} className="text-base md:text-lg leading-relaxed text-gray-800 font-normal mb-6">
                        {parseInlineMarkdown(text)}
                    </p>
                );
                currentParagraph = [];
            }
        };

        const flushList = () => {
            if (listItems.length > 0) {
                const ListTag = listType;
                elements.push(
                    <div key={elements.length} className="my-6 border-l-4 border-black pl-6 bg-yellow-50/30 py-3">
                        <ListTag className={`space-y-2 text-base md:text-lg text-gray-800 font-normal ${listType === 'ol' ? 'list-decimal ml-6' : 'list-disc ml-6'}`}>
                            {listItems.map((item, i) => (
                                <li key={i} className="pl-2">{item}</li>
                            ))}
                        </ListTag>
                    </div>
                );
                listItems = [];
                inList = false;
            }
        };

        lines.forEach((line) => {
            // Code blocks
            if (line.startsWith('```')) {
                if (!inCodeBlock) {
                    flushParagraph();
                    flushList();
                    inCodeBlock = true;
                    codeLanguage = line.slice(3).trim();
                } else {
                    elements.push(
                        <div key={elements.length} className="my-10 border-4 border-black bg-gray-900 p-6 md:p-8 overflow-x-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-gray-600"></div>
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gray-600"></div>
                            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-gray-600"></div>
                            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-gray-600"></div>
                            {codeLanguage && (
                                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                                    <span className={`${bangers.className} text-xl text-yellow-400 tracking-wider uppercase`}>{codeLanguage}</span>
                                </div>
                            )}
                            <pre className="text-sm md:text-base font-mono text-green-400 leading-relaxed">
                                <code>{codeContent.join('\n')}</code>
                            </pre>
                        </div>
                    );
                    inCodeBlock = false;
                    codeContent = [];
                    codeLanguage = '';
                }
                return;
            }

            if (inCodeBlock) {
                codeContent.push(line);
                return;
            }

            // Lists
            if (line.match(/^[\-\*]\s+/)) {
                flushParagraph();
                if (!inList || listType !== 'ul') {
                    flushList();
                    inList = true;
                    listType = 'ul';
                }
                listItems.push(line.replace(/^[\-\*]\s+/, ''));
                return;
            } else if (line.match(/^\d+\.\s+/)) {
                flushParagraph();
                if (!inList || listType !== 'ol') {
                    flushList();
                    inList = true;
                    listType = 'ol';
                }
                listItems.push(line.replace(/^\d+\.\s+/, ''));
                return;
            } else if (inList && line.trim() !== '') {
                // Continue list item on next line
                if (listItems.length > 0) {
                    listItems[listItems.length - 1] += ' ' + line;
                    return;
                }
            } else if (inList) {
                flushList();
            }

            // Headers
            if (line.startsWith('# ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <h1 key={elements.length} className={`${bangers.className} text-3xl md:text-5xl text-black mb-6 mt-12 leading-tight tracking-wide border-b-4 border-black pb-4 uppercase`}>
                        {line.slice(2)}
                    </h1>
                );
            } else if (line.startsWith('## ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <h2 key={elements.length} className={`${bangers.className} text-2xl md:text-4xl text-black mb-5 mt-10 leading-tight tracking-wide border-l-4 border-black pl-4 uppercase`}>
                        {line.slice(3)}
                    </h2>
                );
            } else if (line.startsWith('### ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <h3 key={elements.length} className={`${bangers.className} text-xl md:text-3xl text-black mb-4 mt-8 leading-tight tracking-wide uppercase`}>
                        {line.slice(4)}
                    </h3>
                );
            }
            // Blockquote
            else if (line.startsWith('> ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <div key={elements.length} className="my-10 relative p-6 md:p-8 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="absolute top-4 left-4 text-5xl text-gray-200 font-serif leading-none">&quot;</div>
                        <blockquote className="text-xl md:text-2xl font-bold italic text-black leading-relaxed text-center relative z-10 py-2">
                            {line.slice(2)}
                        </blockquote>
                        <div className="absolute -bottom-4 left-8 w-6 h-6 bg-white border-r-4 border-b-4 border-black transform rotate-45"></div>
                    </div>
                );
            }
            // Horizontal rule
            else if (line.trim() === '---' || line.trim() === '***') {
                flushParagraph();
                flushList();
                elements.push(
                    <div key={elements.length} className="my-10 flex items-center justify-center gap-4">
                        <div className="h-1 bg-black w-full max-w-[80px]"></div>
                        <div className="w-3 h-3 bg-black transform rotate-45"></div>
                        <div className="h-1 bg-black w-full max-w-[80px]"></div>
                    </div>
                );
            }
            // Empty line
            else if (line.trim() === '') {
                flushParagraph();
                flushList();
            }
            // Regular text
            else {
                if (!inList) {
                    currentParagraph.push(line);
                }
            }
        });

        flushParagraph();
        flushList();
        return elements;
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">

                {/* NAVIGATION */}
                <div className="mb-12">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-6 py-2 border-2 border-black font-bold hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                        BACK TO ARCHIVE
                    </button>
                </div>

                {/* HEADER */}
                <header className="mb-12 border-b-4 border-black pb-6">
                    {post.cover && (
                        <div className="relative w-full h-[300px] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
                            <Image
                                src={post.cover}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <h1 className={`${bangers.className} text-4xl md:text-6xl text-black mb-4 leading-tight tracking-wide`}>
                        {post.title}
                    </h1>

                    {post.description && (
                        <p className="text-lg md:text-xl font-bold text-gray-600 mb-6 italic">
                            {post.description}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 md:gap-4">
                        <div className="flex items-center gap-2 border-2 border-black px-3 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                            <div className="w-6 h-6 rounded-full bg-black"></div>
                            <span className="font-bold uppercase tracking-wider text-xs">Sujith</span>
                        </div>
                        <div className="font-bold text-gray-500 uppercase tracking-wider text-xs">
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="font-bold text-gray-500 uppercase tracking-wider text-xs">
                            • {post.readTime || "5 min read"}
                        </div>

                        {/* Tags inline */}
                        {post.tags && post.tags.length > 0 && (
                            <>
                                <div className="hidden md:block h-4 w-px bg-gray-300"></div>
                                {post.tags.map((tag, idx) => (
                                    <span key={idx} className="px-3 py-1 border-2 border-black bg-white font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        {tag}
                                    </span>
                                ))}
                            </>
                        )}
                    </div>
                </header>

                {/* CONTENT */}
                <article className="max-w-none">
                    {loading ? (
                        <div className="text-center py-20">
                            <p className={`${bangers.className} text-3xl text-gray-400`}>LOADING SCROLL...</p>
                        </div>
                    ) : content ? (
                        renderMarkdown(content)
                    ) : (
                        <div className="text-center py-20">
                            <p className={`${bangers.className} text-3xl text-gray-400`}>NO CONTENT FOUND</p>
                        </div>
                    )}
                </article>

                {/* FOOTER / SHARE */}
                <div className="mt-20 pt-10 border-t-4 border-black border-dashed">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <span className={`${bangers.className} text-3xl`}>ENJOYED THE READ?</span>
                        <div className="flex gap-4">
                            <button className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </button>
                            <button className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
