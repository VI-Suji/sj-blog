"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Blog from "@/components/Blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

import { BlogPost } from "@/lib/notion";

function BlogContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const selectedCategory = searchParams.get('category');

    useEffect(() => {
        fetch('/api/posts', { cache: 'force-cache' })
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    const handlePostClick = (post: BlogPost) => {
        router.push(`/post/${post.slug}`);
    };

    return (
        <Blog posts={posts} onPostClick={handlePostClick} selectedCategory={selectedCategory} />
    );
}

export default function BlogPage() {
    const router = useRouter();

    const handleViewChange = (view: string) => {
        router.push(`/${view === 'home' ? '' : view}`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar setCurrentView={handleViewChange} currentView="blog" />
            <div className="flex-grow">
                <Suspense fallback={<Loader />}>
                    <BlogContent />
                </Suspense>
            </div>
            <Footer onNavClick={handleViewChange} />
        </div>
    );
}
