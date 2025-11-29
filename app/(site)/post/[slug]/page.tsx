import { notFound } from "next/navigation";
import BlogPostComponent from "@/components/BlogPost";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug, portableTextToMarkdown } from "@/lib/sanity.queries";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postData = await getPostBySlug(slug);

    if (!postData) {
        notFound();
    }

    const { post, content, markdown: rawMarkdown } = postData;
    const markdown = rawMarkdown || portableTextToMarkdown(content);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <BlogPostComponent post={post} markdownContent={markdown} />
            </div>
            <Footer />
        </div>
    );
}
