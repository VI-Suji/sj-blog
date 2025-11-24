import Topics from "@/components/Topics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublishedPosts } from "@/lib/notion";

export default async function TopicsPage() {
    const posts = await getPublishedPosts();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <Topics posts={posts} />
            </div>
            <Footer />
        </div>
    );
}
