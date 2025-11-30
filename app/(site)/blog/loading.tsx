import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Loading() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <section className="max-w-4xl mx-auto px-6 py-20 min-h-screen">

                    {/* HEADER SKELETON - Matches Blog.tsx */}
                    <header className="mb-16 relative">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
                            <div className="relative inline-block animate-pulse">
                                <div className="h-16 w-64 bg-gray-200 mb-2"></div>
                                <div className="flex gap-1 mt-2">
                                    <span className="w-12 h-1 bg-gray-300"></span>
                                    <span className="w-8 h-1 bg-gray-300"></span>
                                    <span className="w-4 h-1 bg-gray-300"></span>
                                </div>
                            </div>

                            {/* Filters Skeleton */}
                            <div className="flex gap-2 flex-wrap self-start md:self-end mb-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-8 w-16 bg-gray-200 border-2 border-gray-100"></div>
                                ))}
                            </div>
                        </div>
                    </header>

                    {/* LIST SKELETON - Matches Blog.tsx List Layout */}
                    <div className="flex flex-col gap-6 mb-20">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col md:flex-row gap-6 items-start p-4 border-2 border-transparent"
                            >
                                {/* Thumbnail Skeleton */}
                                <div className="relative w-full md:w-48 aspect-[3/2] shrink-0 bg-gray-200 animate-pulse border-2 border-gray-100"></div>

                                {/* Content Skeleton */}
                                <div className="flex-1 w-full">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                        <div className="h-3 w-16 bg-gray-200 rounded"></div>
                                    </div>

                                    <div className="h-8 w-3/4 bg-gray-200 mb-2 rounded animate-pulse"></div>
                                    <div className="h-4 w-full bg-gray-200 mb-1 rounded"></div>
                                    <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
