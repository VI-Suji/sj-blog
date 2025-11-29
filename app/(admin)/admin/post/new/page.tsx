import PostEditor from "@/components/admin/PostEditor";

export default function NewPostPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Create New Post</h1>
            <PostEditor />
        </div>
    );
}
