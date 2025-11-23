"use client";

import { useRouter } from "next/navigation";
import Topics from "@/components/Topics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogPost } from "@/lib/notion";

export default function TopicsPage() {
    const router = useRouter();

    const handleCategoryClick = (category: string) => {
        router.push(`/blog?category=${encodeURIComponent(category)}`);
    };

    const handlePostClick = (post: BlogPost) => {
        router.push(`/post/${post.slug}`);
    };

    const handleViewChange = (view: string) => {
        router.push(`/${view === 'home' ? '' : view}`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar setCurrentView={handleViewChange} currentView="topics" />
            <div className="flex-grow">
                <Topics onCategoryClick={handleCategoryClick} onPostClick={handlePostClick} />
            </div>
            <Footer onNavClick={handleViewChange} />
        </div>
    );
}
