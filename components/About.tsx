export default function About() {
    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

            {/* HEADER - MANGA STYLE (matching Latest Scrolls, Topics, Blog) - CENTERED */}
            <header className="mb-12 sm:mb-16 relative">
                {/* Speed lines radiating from center */}
                <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,#000_4px,#000_5px)] transform -skew-y-12"></div>
                </div>

                <div className="relative flex justify-center">
                    <div className="inline-block text-center">
                        <h1 className="font-merriweather text-5xl sm:text-6xl md:text-7xl font-extrabold italic text-black mb-2 tracking-tight uppercase">
                            ABOUT ME
                        </h1>
                        {/* Manga-style underline accent */}
                        <div className="flex gap-1 mt-2 justify-center">
                            <span className="w-12 h-1 bg-black"></span>
                            <span className="w-8 h-1 bg-black"></span>
                            <span className="w-4 h-1 bg-black"></span>
                        </div>
                    </div>
                </div>
            </header>

            {/* CONTENT */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">

                {/* Introduction Card */}
                <div className="border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200">
                    <h2 className="font-merriweather text-3xl sm:text-4xl font-extrabold text-black mb-4">
                        The Developer's Log
                    </h2>
                    <p className="font-serif text-base sm:text-lg text-black leading-relaxed mb-4">
                        Welcome to my digital garden. I'm Sujith, a developer who loves building things that live on the internet.
                    </p>
                    <p className="font-serif text-base sm:text-lg text-black leading-relaxed">
                        This blog is where I document my journey, share what I learn, and explore new technologies. It's a mix of technical deep dives, random thoughts, and everything in between.
                    </p>
                </div>

                {/* Philosophy Card */}
                <div className="border-4 border-black bg-black text-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200">
                    <h2 className="font-merriweather text-3xl sm:text-4xl font-extrabold mb-4 uppercase tracking-tight">
                        My Approach
                    </h2>
                    <p className="font-serif text-base sm:text-lg text-gray-300 leading-relaxed">
                        "Building digital worlds, one line at a time" isn't just a tagline—it's a philosophy.
                        Every project is an opportunity to learn, every bug is a lesson, and every line of code
                        is a step toward creating something meaningful.
                    </p>
                </div>
            </div>

            {/* What You'll Find Section */}
            <div className="border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 sm:mb-16">
                <h2 className="font-merriweather text-3xl sm:text-4xl font-extrabold text-black mb-6 sm:mb-8 uppercase tracking-tight">
                    What You'll Find Here
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">

                    <div className="flex gap-3 sm:gap-4 p-4 border-2 border-black hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 border-2 border-black flex items-center justify-center">
                            <span className="text-xl sm:text-2xl">💻</span>
                        </div>
                        <div>
                            <h3 className="font-merriweather font-extrabold text-black mb-1 text-lg sm:text-xl uppercase">Technical Insights</h3>
                            <p className="font-serif text-sm sm:text-base text-black">Deep dives into code, frameworks, and development practices</p>
                        </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4 p-4 border-2 border-black hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 border-2 border-black flex items-center justify-center">
                            <span className="text-xl sm:text-2xl">💭</span>
                        </div>
                        <div>
                            <h3 className="font-merriweather font-extrabold text-black mb-1 text-lg sm:text-xl uppercase">Thoughts & Ideas</h3>
                            <p className="font-serif text-sm sm:text-base text-black">Reflections on technology, creativity, and problem-solving</p>
                        </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4 p-4 border-2 border-black hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 border-2 border-black flex items-center justify-center">
                            <span className="text-xl sm:text-2xl">📚</span>
                        </div>
                        <div>
                            <h3 className="font-merriweather font-extrabold text-black mb-1 text-lg sm:text-xl uppercase">Learning Journey</h3>
                            <p className="font-serif text-sm sm:text-base text-black">Lessons learned, mistakes made, and growth achieved</p>
                        </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4 p-4 border-2 border-black hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 border-2 border-black flex items-center justify-center">
                            <span className="text-xl sm:text-2xl">🎨</span>
                        </div>
                        <div>
                            <h3 className="font-merriweather font-extrabold text-black mb-1 text-lg sm:text-xl uppercase">Creative Projects</h3>
                            <p className="font-serif text-sm sm:text-base text-black">Photography, design, and other creative endeavors</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
                <p className="text-sm sm:text-base text-gray-600 mb-6 font-medium">
                    Thanks for stopping by. Feel free to explore the blog and reach out if you'd like to connect.
                </p>
                <a
                    href="/blog"
                    className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all text-sm sm:text-base"
                >
                    Read The Blog
                </a>
            </div>
        </section>
    );
}
