"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import LatestScrolls from "@/components/Latestscrolls";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

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
      <Navbar setCurrentView={handleViewChange} currentView="home" />
      <Hero onNavClick={handleViewChange} />
      <LatestScrolls posts={posts} onPostClick={handlePostClick} onNavClick={handleViewChange} />
      <Footer onNavClick={handleViewChange} />
    </>
  );
}
