import Image from "next/image";
import { Bangers } from "next/font/google";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

interface LatestScrollsProps {
    posts?: any[];
    onPostClick?: (post: any) => void;
    onNavClick: (view: string) => void;
}

export default function LatestScrolls({ posts = [], onPostClick, onNavClick }: LatestScrollsProps) {
    const displayPosts = posts.slice(0, 3);

    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            {/* HEADER */}
            <div className="flex justify-start mb-16">
                <div className="relative bg-white p-6 transform -rotate-1">
                    {/* Double border effect */}
                    <div className="absolute inset-0 border-4 border-black transform translate-x-1 translate-y-1"></div>
                    <div className="absolute inset-0 border-4 border-black"></div>

                    <h2 className={`${bangers.className} relative z-10 text-4xl md:text-7xl text-center uppercase tracking-wider px-8`}>
                        LATEST SCROLLS
                    </h2>
                </div>
            </div>

            {/* CARDS */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {displayPosts.length > 0 ? (
                    displayPosts.map((post, idx) => (
                        <div
                            key={idx}
                            onClick={() => onPostClick && onPostClick(post)}
                            className="border-4 border-black bg-white p-4 flex flex-col hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 transition-all duration-200 cursor-pointer group"
                        >
                            {/* Image Container */}
                            <div className="border-2 border-black relative mb-4 overflow-hidden h-64 md:h-auto md:aspect-[4/3]">
                                <Image
                                    src={post.cover || "/latest1.png"}
                                    alt={post.title}
                                    fill
                                    className="object-cover object-center transition-transform duration-300 grayscale group-hover:grayscale-0"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col">
                                <h3 className={`${bangers.className} text-2xl leading-none mb-2 group-hover:underline`}>{post.title}</h3>

                                <div className="text-xs font-bold text-gray-500 mb-4 flex justify-between border-b-2 border-gray-100 pb-2">
                                    <span>{new Date(post.date).toLocaleDateString()}</span>
                                    <span>{post.readTime || "5 min read"}</span>
                                </div>

                                <p className="text-sm text-gray-700 mb-6 line-clamp-3 font-medium">
                                    {post.description}
                                </p>

                                <button className="mt-auto bg-black text-white text-xs font-bold py-2 px-6 rounded-full w-fit self-end hover:bg-gray-800 active:bg-gray-600 transition transform group-hover:-translate-y-1 group-active:translate-y-0">
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-12 font-bold text-gray-500">
                        Summoning scrolls from the void...
                    </div>
                )}
            </div>

            {/* REDIRECT LINK */}
            <div
                onClick={() => onNavClick('blog')}
                className="mt-8 flex items-center gap-2 text-black font-bold hover:underline cursor-pointer w-fit border-b-2 border-transparent hover:border-black active:text-gray-600 transition-all text-sm md:text-base"
            >
                <span>View All Posts</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </section>
    );
}
