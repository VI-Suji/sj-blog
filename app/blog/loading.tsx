import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bangers } from "next/font/google";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

export default function Loading() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <section className="max-w-6xl mx-auto px-6 py-12">
                    {/* HEADER & FILTERS CONTAINER */}
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-8">

                        {/* HEADER TITLE */}
                        <div className="relative bg-white p-6 transform -rotate-1">
                            {/* Double border effect */}
                            <div className="absolute inset-0 border-4 border-black transform translate-x-1 translate-y-1"></div>
                            <div className="absolute inset-0 border-4 border-black"></div>

                            <h1 className={`${bangers.className} relative z-10 text-5xl md:text-7xl text-center uppercase tracking-wider px-8`}>
                                THE SCROLL ARCHIVE
                            </h1>
                        </div>

                        {/* FILTER DOCK SKELETON */}
                        <div className="flex gap-4 p-3 rounded-full bg-white/30 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
                            {[1, 2, 3, 4].map((_, idx) => (
                                <div key={idx} className="w-12 h-12 border-4 border-black bg-white rounded-full animate-pulse"></div>
                            ))}
                        </div>
                    </div>

                    {/* GRID SKELETON */}
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse"
                            >
                                <div className="relative w-full h-48 bg-gray-200 mb-4"></div>
                                <div className="h-6 bg-gray-200 mb-3 w-3/4"></div>
                                <div className="h-4 bg-gray-200 mb-2 w-full"></div>
                                <div className="h-4 bg-gray-200 mb-4 w-5/6"></div>
                                <div className="flex gap-2 mb-3">
                                    <div className="h-6 w-16 bg-gray-200"></div>
                                    <div className="h-6 w-20 bg-gray-200"></div>
                                </div>
                                <div className="h-4 bg-gray-200 w-24"></div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
