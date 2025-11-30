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
                elements.push(<strong key={`bold-${key++}`} className="font-bold text-gray-900">{boldMatch[1]}</strong>);
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
                    <a key={`link-${key++}`} href={linkMatch[2]} className="text-blue-600 underline hover:text-blue-800 transition-colors" target="_blank" rel="noopener noreferrer">
                        {linkMatch[1]}
                    </a>
                );
                remaining = remaining.slice(linkMatch[0].length);
                continue;
            }

            // Inline code
            const codeMatch = remaining.match(/^`(.+?)`/);
            if (codeMatch) {
                elements.push(
                    <code key={`code-${key++}`} className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200">
                        {codeMatch[1]}
                    </code>
                );
                remaining = remaining.slice(codeMatch[0].length);
                continue;
            }

            const nextSpecialChar = remaining.search(/[\*\[`]/);
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

    // Markdown renderer with subtle manga styling
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
                const isFirstParagraph = elements.length === 0;

                elements.push(
                    <p key={elements.length} className={`
                        font-serif text-lg md:text-xl leading-relaxed md:leading-loose 
                        text-gray-800 mb-8
                        ${isFirstParagraph ? 'first-letter:text-5xl first-letter:font-black first-letter:mr-2 first-letter:float-left first-letter:font-merriweather first-letter:leading-[1] first-letter:text-black' : ''}
                    `}>
                        {parseInlineMarkdown(text)}
                    </p>
                );
                currentParagraph = [];
            }
        };

        const flushList = () => {
            if (inList && listItems.length > 0) {
                const ListTag = listType;
                elements.push(
                    <ListTag key={elements.length} className={`mb-6 space-y-2 ${listType === 'ul' ? 'list-none' : 'list-decimal list-inside'}`}>
                        {listItems.map((item, idx) => (
                            <li key={idx} className="font-serif text-lg text-gray-800 leading-relaxed flex items-start gap-3">
                                {listType === 'ul' && <span className="w-1.5 h-1.5 bg-black mt-3 flex-shrink-0"></span>}
                                <span className="flex-1">{parseInlineMarkdown(item)}</span>
                            </li>
                        ))}
                    </ListTag>
                );
                listItems = [];
                inList = false;
            }
        };

        const flushCodeBlock = () => {
            if (inCodeBlock) {
                elements.push(
                    <pre key={elements.length} className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6 border-l-4 border-blue-500">
                        <code className="text-sm font-mono">{codeContent.join('\n')}</code>
                    </pre>
                );
                codeContent = [];
                inCodeBlock = false;
            }
        };

        lines.forEach((line, index) => {
            // Code blocks
            if (line.startsWith('```')) {
                if (!inCodeBlock) {
                    flushParagraph();
                    flushList();
                    inCodeBlock = true;
                    codeLanguage = line.slice(3).trim();
                } else {
                    flushCodeBlock();
                }
                return;
            }

            if (inCodeBlock) {
                codeContent.push(line);
                return;
            }

            // Empty line
            if (line.trim() === '') {
                flushParagraph();
                flushList();
                return;
            }

            // Headers
            if (line.startsWith('# ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <h1 key={elements.length} className="font-merriweather text-5xl md:text-6xl font-bold italic text-gray-900 mt-16 mb-8 pb-4 border-b border-gray-200">
                        {line.slice(2)}
                    </h1>
                );
            } else if (line.startsWith('## ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <h2 key={elements.length} className="font-merriweather text-4xl md:text-5xl font-bold text-gray-900 mt-14 mb-6 border-l-4 border-black pl-6">
                        {line.slice(3)}
                    </h2>
                );
            } else if (line.startsWith('### ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <h3 key={elements.length} className="font-merriweather text-3xl md:text-4xl font-bold text-gray-900 mt-12 mb-5">
                        {line.slice(4)}
                    </h3>
                );
            } else if (line.startsWith('#### ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <h4 key={elements.length} className="font-merriweather text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4">
                        {line.slice(5)}
                    </h4>
                );
            } else if (line.startsWith('##### ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <h5 key={elements.length} className="font-merriweather text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-3">
                        {line.slice(6)}
                    </h5>
                );
            } else if (line.startsWith('###### ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <h6 key={elements.length} className="font-merriweather text-lg md:text-xl font-bold text-gray-700 mt-6 mb-2 uppercase tracking-wider">
                        {line.slice(7)}
                    </h6>
                );
            }
            // Blockquote
            else if (line.startsWith('> ')) {
                flushParagraph();
                flushList();
                elements.push(
                    <blockquote key={elements.length} className="my-12 pl-8 md:pl-12 border-l-4 border-black relative">
                        <div className="absolute -left-2 -top-4 text-6xl md:text-7xl text-gray-200 font-merriweather leading-none">"</div>
                        <p className="font-serif text-xl md:text-2xl text-gray-800 leading-relaxed italic relative z-10">
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
                    <div key={elements.length} className="my-10 flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    </div>
                );
            }
            // Images
            else if (line.match(/^!\[(.+?)\]\((.+?)\)/)) {
                flushParagraph();
                flushList();
                const match = line.match(/^!\[(.+?)\]\((.+?)\)/);
                if (match) {
                    const alt = match[1];
                    const src = match[2];
                    elements.push(
                        <div key={elements.length} className="my-8">
                            <img
                                src={src}
                                alt={alt}
                                className="w-full rounded-lg border-2 border-gray-200"
                            />
                            {alt && (
                                <p className="text-sm text-gray-500 text-center mt-2 italic">{alt}</p>
                            )}
                        </div>
                    );
                }
            }
            // Lists
            else if (line.match(/^[\-\*]\s/)) {
                flushParagraph();
                if (!inList) {
                    inList = true;
                    listType = 'ul';
                }
                listItems.push(line.slice(2));
            } else if (line.match(/^\d+\.\s/)) {
                flushParagraph();
                if (!inList) {
                    inList = true;
                    listType = 'ol';
                }
                listItems.push(line.replace(/^\d+\.\s/, ''));
            }
            // Regular paragraph
            else {
                flushList();
                currentParagraph.push(line);
            }
        });

        flushParagraph();
        flushList();
        flushCodeBlock();

        return elements;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Scroll Progress Bar - Above Navbar */}
            <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-100 z-50">
                <div
                    className="h-full bg-blue-600 transition-all duration-150"
                    style={{ width: `${scrollProgress * 100}%` }}
                ></div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

                {/* COMPACT BANNER - Manga-style heading with side-by-side layout */}
                <header className="mb-10 sm:mb-12 relative">
                    {/* Speed lines background - matching Topics/Latest Scrolls */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,#000_4px,#000_5px)] transform -skew-y-12"></div>
                    </div>

                    <div className="relative">
                        {/* Manga-style heading - matching Topics/Latest Scrolls but smaller */}
                        <div className="mb-8">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">
                                {post.title}
                            </h1>
                            {/* Manga-style underline accent */}
                            <div className="flex gap-1 mt-2">
                                <span className="w-12 h-1 bg-black"></span>
                                <span className="w-8 h-1 bg-black"></span>
                                <span className="w-4 h-1 bg-black"></span>
                            </div>
                        </div>

                        {/* Compact info banner with image and meta side-by-side */}
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            {/* Cover Image - Smaller, left side on desktop */}
                            {post.cover && (
                                <div className="relative w-full md:w-80 aspect-[16/10] flex-shrink-0 border-2 border-black overflow-hidden">
                                    <Image
                                        src={post.cover}
                                        alt={post.title}
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                        priority
                                        unoptimized
                                    />
                                </div>
                            )}

                            {/* Meta info - Right side on desktop */}
                            <div className="flex-1 flex flex-col justify-between min-h-full">
                                {post.description && (
                                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                                        {post.description}
                                    </p>
                                )}

                                <div className="space-y-3 mt-auto">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        {post.category && (
                                            <span className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider">
                                                {post.category}
                                            </span>
                                        )}
                                        {readTime && (
                                            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
                                                {readTime} min read
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                                        <div className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                                            S
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-gray-900 text-sm">Sujith V I</div>
                                            <div className="text-gray-500 text-xs">
                                                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* CONTENT - Story reading optimized */}
                <div className="max-w-3xl mx-auto">
                    {markdownContent ? (
                        renderMarkdown(markdownContent)
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-lg">
                            <p className="text-gray-500 font-semibold">No content available</p>
                        </div>
                    )}
                </div>

                {/* TAGS - Subtle */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-12 sm:mt-16 pt-8 border-t border-gray-200">
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* FOOTER - Clean CTA */}
                <div className="mt-12 sm:mt-16 pt-8 border-t-2 border-black text-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Thanks for reading!</h3>
                    <p className="text-gray-600 mb-6">Enjoyed this post? Check out more articles.</p>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-bold hover:bg-gray-800 transition-all"
                    >
                        <span>More Posts</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </Link>
                </div>
            </article>
        </div>
    );
}
