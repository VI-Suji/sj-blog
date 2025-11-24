"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import LatestScrolls from "@/components/Latestscrolls";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { BlogPost } from "@/lib/notion";

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/posts', { cache: 'force-cache' })
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
    <div className="flex flex-col min-h-screen">
      <Navbar setCurrentView={handleViewChange} currentView="home" />
      <div className="flex-grow">
        <Hero onNavClick={handleViewChange} />
        <LatestScrolls posts={posts} onPostClick={handlePostClick} onNavClick={handleViewChange} />
      </div>
      <Footer onNavClick={handleViewChange} />
    </div>
  );
}
