"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Blog from "@/components/Blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { BlogPost } from "@/lib/notion";

function BlogContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const selectedCategory = searchParams.get('category');

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    const handlePostClick = (post: BlogPost) => {
        router.push(`/post/${post.slug}`);
    };

    const handleViewChange = (view: string) => {
        router.push(`/${view === 'home' ? '' : view}`);
    };

    return (
        <>
            <Navbar setCurrentView={handleViewChange} currentView="blog" />
            <Blog posts={posts} onPostClick={handlePostClick} selectedCategory={selectedCategory} />
            <Footer onNavClick={handleViewChange} />
        </>
    );
}

import Loader from "@/components/Loader";

export default function BlogPage() {
    return (
        <Suspense fallback={<Loader />}>
            <BlogContent />
        </Suspense>
    );
}
