import Image from "next/image";
import { Bangers } from "next/font/google";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

interface HeroProps {
    onNavClick: (view: string) => void;
}

export default function Hero({ onNavClick }: HeroProps) {
    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-8">
            {/* MAIN COMIC PANEL */}
            <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">

                <div className="flex flex-col md:flex-row min-h-[600px] md:min-h-0 md:h-[400px]">

                    {/* IMAGE SECTION */}
                    {/* Mobile: Absolute Background | Desktop: Right Panel (50%) */}
                    <div className="absolute inset-0 w-full h-full md:relative md:w-1/2 md:order-2 md:border-l-4 md:border-black bg-gray-100">
                        <Image
                            src="/sujith.png"
                            alt="Sujith"
                            fill
                            priority
                            className="object-cover object-top grayscale-0"
                        />
                    </div>

                    {/* TEXT SECTION */}
                    {/* Mobile: Floating Overlay | Desktop: Left Panel (50%) */}
                    <div className="absolute bottom-8 left-6 right-6 z-10 md:relative md:bottom-auto md:left-auto md:right-auto md:w-1/2 md:order-1 md:flex md:items-center md:justify-center md:p-12 pointer-events-none md:pointer-events-auto">

                        {/* TEXT CONTENT */}
                        {/* Mobile: Card Style | Desktop: Clean Text */}
                        <div className="bg-white border-4 border-black p-2 max-w-[90%] md:max-w-xl md:bg-transparent md:border-0 md:shadow-none md:p-0 pointer-events-auto">
                            <h1 className={`${bangers.className} text-5xl md:text-7xl font-bold leading-none text-black mb-6`}>
                                The best way to predict the future is to <span onClick={() => onNavClick('about')} className="text-red-600 inline-block cursor-pointer hover:scale-105 active:scale-95 transition-transform">invent</span> it.
                            </h1>
                            {/* <div className="flex gap-4 mb-6 md:hidden">
                                <button onClick={() => onNavClick('blog')} className="bg-black text-white px-6 py-3 font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none transition-all">
                                    START SAGA
                                </button>
                            </div> */}
                            <p className="text-xl font-bold text-gray-500 italic text-right flex items-center justify-end gap-3">
                                <span className="h-1 w-12 bg-gray-300 rounded-full"></span>
                                Alan Kay
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
