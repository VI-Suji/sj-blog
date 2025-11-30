import PostEditor from "@/components/admin/PostEditor";

export default function NewPostPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                        Create New Post
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 mt-2">
                        Write and publish a new blog post
                    </p>
                </div>
                <PostEditor />
            </div>
        </div>
    );
}
