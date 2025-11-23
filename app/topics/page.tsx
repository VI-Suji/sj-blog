"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Topics from "@/components/Topics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TopicsPage() {
    const router = useRouter();

    const handleCategoryClick = (category: string) => {
        router.push(`/blog?category=${encodeURIComponent(category)}`);
    };

    const handlePostClick = (post: any) => {
        router.push(`/post/${post.slug}`);
    };

    const handleViewChange = (view: string) => {
        router.push(`/${view === 'home' ? '' : view}`);
    };

    return (
        <>
            <Navbar setCurrentView={handleViewChange} currentView="topics" />
            <Topics onCategoryClick={handleCategoryClick} onPostClick={handlePostClick} />
            <Footer onNavClick={handleViewChange} />
        </>
    );
}
