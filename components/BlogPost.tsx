"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { BlogPost as BlogPostType } from "@/lib/types";

interface BlogPostProps {
    post: BlogPostType;
    markdownContent: string;
}

export default function BlogPost({ post, markdownContent }: BlogPostProps) {
    const [readTime, setReadTime] = useState<number | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        if (markdownContent) {
            const wordCount = markdownContent.split(/\s+/).filter(Boolean).length;
            const minutes = Math.ceil(wordCount / 200);
            setReadTime(minutes);
        }
    }, [markdownContent]);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Parse inline markdown
    const parseInlineMarkdown = (text: string) => {
        const elements: React.ReactNode[] = [];
        let remaining = text;
        let key = 0;

        while (remaining.length > 0) {
            const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
            if (boldMatch) {
                elements.push(<strong key={`bold-${key++}`} className="font-black text-gray-900">{boldMatch[1]}</strong>);
                remaining = remaining.slice(boldMatch[0].length);
                continue;
            }

            const italicMatch = remaining.match(/^\*(.+?)\*/);
            if (italicMatch) {
                elements.push(<em key={`italic-${key++}`} className="italic text-gray-800">{italicMatch[1]}</em>);
                remaining = remaining.slice(italicMatch[0].length);
                continue;
            }

            const linkMatch = remaining.match(/^\[(.+?)\]\((.+?)\)/);
            if (linkMatch) {
                elements.push(
                    <a key={`link-${key++}`} href={linkMatch[2]} className="text-black underline decoration-2 hover:bg-black hover:text-white transition-all px-1" target="_blank" rel="noopener noreferrer">
                        {linkMatch[1]}
                    </a>
                );
                remaining = remaining.slice(linkMatch[0].length);
                continue;
            }

            const nextSpecialChar = remaining.search(/[\*\[]/);
            if (nextSpecialChar === -1) {
                elements.push(remaining);
                break;
            } else if (nextSpecialChar > 0) {
                elements.push(remaining.slice(0, nextSpecialChar));
                remaining = remaining.slice(nextSpecialChar);
            } else {
                elements.push(remaining[0]);
                remaining = remaining.slice(1);
            }
        }

        return elements.length > 0 ? elements : [text];
    };

    // Markdown renderer with manga styling
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
                    <p key={elements.length} className="text-lg leading-8 text-gray-800 mb-6 font-medium">
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
                    <div key={elements.length} className="mb-8 border-l-4 border-black pl-6">
                        <ListTag className={`space-y-3 text-lg text-gray-800 ${listType === 'ol' ? 'list-decimal' : 'list-none'}`}>
                            {listItems.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    {listType === 'ul' && (
                                        <span className="mt-1.5 flex-shrink-0 w-2 h-2 bg-black transform rotate-45"></span>
                                    )}
                                    <span>{parseInlineMarkdown(item)}</span>
                                </li>
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
                        <div key={elements.length} className="my-10 border-2 border-black bg-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]">
                            {codeLanguage && (
                                <div className="px-4 py-2 bg-black border-b-2 border-gray-700 flex items-center justify-between">
                                    <span className="text-xs font-black text-white uppercase tracking-wider">{codeLanguage}</span>
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 bg-white"></div>
                                        <div className="w-2.5 h-2.5 bg-white"></div>
                                        <div className="w-2.5 h-2.5 bg-white"></div>
                                    </div>
                                </div>
                            )}
                            <div className="p-6 overflow-x-auto">
                                <pre className="text-sm md:text-base font-mono text-gray-300 leading-relaxed">
                                    <code>{codeContent.join('\n')}</code>
                                </pre>
                            </div>
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
                    <h1 key={elements.length} className="text-4xl md:text-5xl font-black text-gray-900 mt-12 mb-6 tracking-tight uppercase border-b-4 border-black pb-4">
                        {line.slice(2)}
                    </h1>
                );
            } else if (line.startsWith('## ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <h2 key={elements.length} className="text-3xl md:text-4xl font-black text-gray-900 mt-10 mb-5 tracking-tight uppercase border-l-4 border-black pl-4">
                        {line.slice(3)}
                    </h2>
                );
            } else if (line.startsWith('### ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <h3 key={elements.length} className="text-2xl md:text-3xl font-black text-gray-900 mt-8 mb-4 tracking-tight uppercase">
                        {line.slice(4)}
                    </h3>
                );
            }
            // Blockquote
            else if (line.startsWith('> ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <blockquote key={elements.length} className="my-10 pl-8 border-l-4 border-black bg-gray-50 p-6 relative">
                        <div className="absolute top-4 left-4 text-6xl text-black opacity-20 font-black">"</div>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed relative z-10">
                            {line.slice(2)}
                        </p>
                    </blockquote>
                );
            }
            // Horizontal rule
            else if (line.trim() === '---' || line.trim() === '***') {
                flushParagraph();
                flushList();
                elements.push(
                    <div key={elements.length} className="my-12 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-black transform rotate-45"></div>
                        <div className="w-2 h-2 bg-black transform rotate-45"></div>
                        <div className="w-2 h-2 bg-black transform rotate-45"></div>
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
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Manga halftone background */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0"
                style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            ></div>

            {/* Reading Progress Bar - Manga style */}
            <div className="fixed top-0 left-0 w-full h-2 z-50 bg-gray-200 border-b-2 border-black">
                <div
                    className="h-full bg-black transition-all duration-100 ease-out"
                    style={{ width: `${scrollProgress * 100}%` }}
                />
            </div>

            <article className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
                {/* NAVIGATION */}
                <div className="mb-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm font-black uppercase tracking-wide text-gray-900 hover:bg-black hover:text-white transition-all px-4 py-2 border-2 border-black"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                        Back to Archive
                    </Link>
                </div>

                {/* HEADER - MANGA TITLE PAGE STYLE */}
                <header className="mb-16 border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] relative">
                    {/* Speed lines in background */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,#000_4px,#000_5px)] transform -skew-y-12"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                            {post.category && (
                                <span className="px-4 py-1 bg-black text-white text-xs font-black uppercase tracking-wider border-2 border-black">
                                    {post.category}
                                </span>
                            )}
                            {readTime && (
                                <span className="text-gray-600 text-xs font-black uppercase tracking-wider">
                                    • {readTime} min read
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight text-center uppercase">
                            {post.title}
                        </h1>

                        {/* Manga-style underline accent */}
                        <div className="flex gap-1 justify-center mb-6">
                            <span className="w-16 h-1 bg-black"></span>
                            <span className="w-12 h-1 bg-black"></span>
                            <span className="w-6 h-1 bg-black"></span>
                        </div>

                        {post.description && (
                            <p className="text-xl text-gray-700 mb-8 font-medium leading-relaxed text-center max-w-2xl mx-auto">
                                {post.description}
                            </p>
                        )}

                        <div className="flex items-center justify-center gap-4 pt-6 border-t-2 border-black">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black text-lg border-2 border-black">
                                    S
                                </div>
                                <div className="text-left">
                                    <div className="font-black text-gray-900 text-sm uppercase">Sujith</div>
                                    <div className="text-gray-600 text-xs font-bold">
                                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* COVER IMAGE - MANGA PANEL STYLE */}
                {post.cover && (
                    <div className="relative w-full aspect-[16/9] mb-16 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] overflow-hidden">
                        <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                            unoptimized
                        />
                        {/* Corner decoration */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white"></div>
                    </div>
                )}

                {/* CONTENT */}
                <div className="prose prose-lg md:prose-xl max-w-none">
                    {markdownContent ? (
                        renderMarkdown(markdownContent)
                    ) : (
                        <div className="text-center py-20 border-2 border-black bg-gray-50">
                            <p className="text-gray-600 font-black uppercase">No content available</p>
                        </div>
                    )}
                </div>

                {/* TAGS */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-16 pt-8 border-t-2 border-black">
                        <div className="flex flex-wrap gap-3">
                            {post.tags.map((tag, idx) => (
                                <span key={idx} className="px-4 py-2 bg-white text-gray-800 text-sm font-bold border-2 border-black hover:bg-black hover:text-white transition-all cursor-default shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* FOOTER - TO BE CONTINUED STYLE */}
                <div className="mt-16 border-2 border-black p-8 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] relative">
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-white opacity-20"></div>

                    <h3 className="text-2xl font-black mb-4 uppercase tracking-wide">End of Chapter</h3>
                    <p className="text-white/90 mb-6 font-medium">Enjoyed this post? Share it with your network or check out more posts.</p>
                    <div className="flex gap-4">
                        <Link
                            href="/blog"
                            className="px-6 py-3 bg-white text-black font-black uppercase tracking-wide border-2 border-white hover:bg-black hover:text-white hover:border-white transition-all"
                        >
                            More Posts →
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
