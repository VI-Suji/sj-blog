"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Blog from "@/components/Blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState([]);
    const selectedCategory = searchParams.get('category');

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    const handlePostClick = (post: any) => {
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
