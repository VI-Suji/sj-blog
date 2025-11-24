import Blog from "@/components/Blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getPublishedPosts } from "@/lib/notion";

async function BlogContent({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const posts = await getPublishedPosts();
    const { category } = await searchParams;

    return (
        <Blog posts={posts} selectedCategory={category} />
    );
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <BlogContent searchParams={searchParams} />
            </div>
            <Footer />
        </div>
    );
}
