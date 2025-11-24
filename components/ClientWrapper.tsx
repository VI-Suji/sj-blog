"use client";

import { useRouter } from "next/navigation";
import { BlogPost } from "@/lib/notion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LatestScrolls from "@/components/Latestscrolls";
import Hero from "@/components/Hero";

interface ClientWrapperProps {
    posts: BlogPost[];
    currentView: string;
    children: React.ReactNode;
}

export default function ClientWrapper({ posts, currentView, children }: ClientWrapperProps) {
    const router = useRouter();

    const handlePostClick = (post: BlogPost) => {
        router.push(`/post/${post.slug}`);
    };

    const handleViewChange = (view: string) => {
        router.push(`/${view === 'home' ? '' : view}`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar setCurrentView={handleViewChange} currentView={currentView} />
            <div className="flex-grow">
                {currentView === 'home' ? (
                    <>
                        <Hero onNavClick={handleViewChange} />
                        <LatestScrolls posts={posts} onPostClick={handlePostClick} onNavClick={handleViewChange} />
                    </>
                ) : (
                    children
                )}
            </div>
            <Footer onNavClick={handleViewChange} />
        </div>
    );
}
