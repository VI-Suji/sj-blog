import Hero from "@/components/Hero";
import LatestScrolls from "@/components/Latestscrolls";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getPublishedPosts } from "@/lib/sanity.queries";

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const posts = await getPublishedPosts();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Hero />
        <LatestScrolls posts={posts} />
      </div>
      <Footer />
    </div>
  );
}
