import Blog from "@/components/Blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublishedPosts } from "@/lib/sanity.queries";

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function BlogContent({ searchParams }: { searchParams: Promise<{ category?: string; tag?: string }> }) {
    const posts = await getPublishedPosts();
    const { category, tag } = await searchParams;

    return (
        <Blog posts={posts} selectedCategory={category} selectedTag={tag} />
    );
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string; tag?: string }> }) {
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
