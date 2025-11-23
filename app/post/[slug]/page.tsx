"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BlogPostComponent from "@/components/BlogPost";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

import { BlogPost } from "@/lib/notion";

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [slug, setSlug] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        params.then(p => setSlug(p.slug));
    }, [params]);

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts/${slug}`);
                if (response.ok) {
                    const data = await response.json();
                    // Extract post metadata from the page object
                    const pageData = data.page || data;
                    const props = pageData.properties || {};

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
                        } else if (pageData.cover) {
                            if (pageData.cover.type === "file" && pageData.cover.file?.url) {
                                cover = pageData.cover.file.url;
                            } else if (pageData.cover.type === "external" && pageData.cover.external?.url) {
                                cover = pageData.cover.external.url;
                            }
                        }
                    } catch (e) {
                        console.error("Error processing cover image:", e);
                    }

                    const postData: BlogPost = {
                        id: pageData.id,
                        title: props.Name?.title?.[0]?.plain_text || "Untitled",
                        slug: slug,
                        date: props.Date?.date?.start || new Date().toISOString(),
                        tags: props.Tags?.multi_select?.map((tag: any) => tag.name) || [],
                        category: props.Category?.select?.name || "",
                        description: props.Description?.rich_text?.[0]?.plain_text || "",
                        published: props.Published?.checkbox || false,
                        cover: cover,
                        readTime: "5 min read",
                    };

                    setPost(postData);
                } else {
                    console.error("Post not found");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    const handleBack = () => {
        router.push("/blog");
    };

    const handleViewChange = (view: string) => {
        router.push(`/${view === 'home' ? '' : view}`);
    };


    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar setCurrentView={handleViewChange} currentView="post" />
                <div className="flex-grow flex items-center justify-center">
                    <Loader />
                </div>
                <Footer onNavClick={handleViewChange} />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar setCurrentView={handleViewChange} currentView="post" />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                        <button
                            onClick={handleBack}
                            className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-800"
                        >
                            Back to Blog
                        </button>
                    </div>
                </div>
                <Footer onNavClick={handleViewChange} />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar setCurrentView={handleViewChange} currentView="post" />
            <div className="flex-grow">
                <BlogPostComponent post={post} onBack={handleBack} />
            </div>
            <Footer onNavClick={handleViewChange} />
        </div>
    );
}
