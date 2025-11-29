import Image from "next/image";

export default function About() {
    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Manga halftone pattern background */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
                style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            ></div>

            <article className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
                {/* TITLE PAGE - MANGA COVER STYLE */}
                <header className="mb-20 relative text-center">
                    {/* Speed lines radiating from center */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,#000_4px,#000_5px)] transform -skew-y-12"></div>
                    </div>

                    <div className="relative inline-block">
                        <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-2 tracking-tight">
                            ABOUT ME
                        </h1>
                        {/* Manga-style underline accent */}
                        <div className="flex gap-1 justify-center mt-2">
                            <span className="w-12 h-1 bg-black"></span>
                            <span className="w-8 h-1 bg-black"></span>
                            <span className="w-4 h-1 bg-black"></span>
                        </div>
                    </div>
                    <p className="text-lg text-gray-600 mt-6 font-medium">
                        A Developer's Chronicle
                    </p>
                </header>

                {/* CHAPTER 1: INTRODUCTION */}
                <section className="mb-16 border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] relative">
                    {/* Chapter number in corner */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xl border-2 border-white shadow-md">
                        01
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-wide">
                        Chapter 1: Origin
                    </h2>
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            Extrovert coder who talks as much as I type, loves tidying up chaos, and can turn wild ideas into neat, working code—sometimes obsessively, always creatively.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            "Life is like music—if you want to hear it, you first need to tune it."
                        </p>
                    </div>
                </section>

                {/* CHAPTER 2: INTERESTS */}
                <section className="mb-16 border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xl border-2 border-white shadow-md">
                        02
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-wide">
                        Chapter 2: Icebreaker Topics
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {[
                            "Songs that hit differently",
                            "Movies that stick with you",
                            <span key="wild">
                                Gossip (the <span className="line-through">fun</span> kind)
                            </span>,
                            "Wild ideas… that won't work.",
                            "Procrastination? I do it like a pro."
                        ].map((topic, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 bg-white text-gray-800 text-sm font-bold border-2 border-black hover:bg-black hover:text-white transition-all cursor-default shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            >
                                {topic}
                            </span>
                        ))}
                    </div>
                </section>

                {/* CHAPTER 3: SKILLS */}
                <section className="mb-16 border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xl border-2 border-white shadow-md">
                        03
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-wide">
                        Chapter 3: Skill Arsenal
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["Next.js", "TypeScript", "Tailwind CSS", "Rust", "PostgreSQL", "Docker", "Kubernetes", "Git"].map((skill, i) => (
                            <div
                                key={i}
                                className="p-4 bg-white border-2 border-black text-center hover:bg-black hover:text-white transition-all group relative"
                            >
                                {/* Panel corner decoration */}
                                <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black group-hover:border-white"></span>
                                <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black group-hover:border-white"></span>

                                <div className="font-black text-sm uppercase tracking-tight">
                                    {skill}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CHAPTER 4: ACHIEVEMENTS */}
                {/* <section className="mb-16 border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xl border-2 border-white shadow-md">
                        04
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-wide">
                        Chapter 4: Quest Log
                    </h2>
                    <ul className="space-y-4">
                        {[
                            "Built and launched 4+ products with Cursor in under a month",
                            "Ranked 71st in the IBM Quantum Challenge 2020",
                            "Youngest person in the first batch of Qiskit Advocates Program",
                            "Top 3 best outgoing students, CSE Dept, MACE",
                            "Most Creative Hack Winner at Rookie Hacks (MLH)",
                            "OSS contributions to Qiskit, CoronaSafe, and Kerala Rescue",
                            "Localization contributions to Mozilla and KDE"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-gray-800 group">
                                <span className="mt-1 flex-shrink-0 w-6 h-6 bg-black text-white flex items-center justify-center text-xs font-black group-hover:bg-white group-hover:text-black group-hover:border-2 group-hover:border-black transition-all">
                                    ▸
                                </span>
                                <span className="leading-relaxed font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </section> */}

                {/* CHAPTER 4: WORK HISTORY */}
                <section className="mb-16 border-2 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xl border-2 border-white shadow-md">
                        04
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-wide">
                        Chapter 4: Previous Arcs
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                "role": "QA/DevOps Engineer",
                                "company": "IBM ISL 2024 - Present",
                                "description": "Making systems behave and automating everything in sight."
                            },
                            {
                                "role": "QA Automation Engineer",
                                "company": "IBM ISL 2022 - 2024",
                                "description": "Breaking things on purpose and using automation to fix the mess."
                            },
                            {
                                "role": "Software Developer Intern",
                                "company": "IBM ISL - 2022",
                                "description": "Learning by breaking code and pretending it was the plan."
                            }
                        ].map((job, i) => (
                            <div key={i} className="border-l-4 border-black pl-6 hover:bg-gray-50 transition-colors p-4 -ml-4">
                                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">
                                    {job.role}
                                </h3>
                                <p className="text-sm font-bold text-gray-600 mb-2">
                                    @ {job.company}
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    {job.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FINAL CHAPTER: CONTACT */}
                <section className="border-2 border-black p-8 bg-black text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-white text-black flex items-center justify-center font-black text-xl border-2 border-black shadow-md">
                        ∞
                    </div>

                    {/* Manga panel effect */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-white opacity-20"></div>

                    <h2 className="text-3xl font-black mb-4 uppercase tracking-wide">
                        To Be Continued...
                    </h2>
                    <p className="text-lg mb-6 font-medium">
                        New chapter time! Let’s collaborate before I overthink it.
                    </p>
                    <a
                        href="mailto:hello@sujith.dev"
                        className="inline-block px-8 py-3 bg-white text-black font-black uppercase tracking-wide border-2 border-white hover:bg-black hover:text-white hover:border-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]"
                    >
                        Send Signal →
                    </a>
                </section>
            </article>
        </div>
    );
}
