import PostEditor from "@/components/admin/PostEditor";
import { getPostById } from "@/lib/sanity.queries";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Edit Post</h1>
            <PostEditor post={post} />
        </div>
    );
}
