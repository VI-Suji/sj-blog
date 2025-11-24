import { notFound } from "next/navigation";
import BlogPostComponent from "@/components/BlogPost";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getPostBySlug } from "@/lib/notion";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const postData = await getPostBySlug(slug);

    if (!postData) {
        notFound();
    }

    const { page, markdown } = postData;
    const props = page.properties;

    // Handle Cover Image
    let cover = "/latest1.png"; // Default fallback
    try {
        const coverProp = props.Cover || props.cover;
        if (coverProp?.files?.length > 0) {
            const fileObj = coverProp.files[0];
            if (fileObj.type === "file" && fileObj.file?.url) {
                cover = fileObj.file.url;
            } else if (fileObj.type === "external" && fileObj.external?.url) {
                cover = fileObj.external.url;
            }
        } else if (page.cover) {
            if (page.cover.type === "file" && page.cover.file?.url) {
                cover = page.cover.file.url;
            } else if (page.cover.type === "external" && page.cover.external?.url) {
                cover = page.cover.external.url;
            }
        }
    } catch (e) {
        console.error("Error processing cover image:", e);
    }

    const post: any = {
        id: page.id,
        title: props.Name?.title?.[0]?.plain_text || "Untitled",
        slug: slug,
        date: props.Date?.date?.start || new Date().toISOString(),
        tags: props.Tags?.multi_select?.map((tag: any) => tag.name) || [],
        category: props.Category?.select?.name || "",
        description: props.Description?.rich_text?.[0]?.plain_text || "",
        published: props.Published?.checkbox || false,
        cover: cover,
        readTime: "5 min read", // Calculated in component or server
    };

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
