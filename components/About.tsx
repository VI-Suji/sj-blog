import Image from "next/image";
import { Bangers } from "next/font/google";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">

            {/* HEADER */}
            <div className="flex justify-center mb-16 relative">
                {/* Speech Bubble */}
                <div className="relative border-4 border-black bg-white px-12 py-8 rounded-[50%_50%_50%_50%_/_20%_20%_20%_20%] shadow-lg text-center z-10">
                    <h1 className={`${bangers.className} text-5xl md:text-6xl uppercase tracking-wider transform -rotate-2`}>
                        THE DEVELOPER&apos;S LOG
                    </h1>
                    <p className="font-serif italic text-gray-600 mt-2 text-lg">Building Digital Worlds, One Line at a Time</p>
                </div>
                {/* Speech Bubble Tail */}
                {/* <div className="absolute bottom-[-20px] left-1/3 w-12 h-12 bg-white border-r-4 border-b-4 border-black transform rotate-45 z-0"></div> */}
            </div>

            {/* CONTENT SECTIONS */}
            <div className="space-y-16">

                {/* PLAYER PROFILE (WHO AM I) */}
                <section className="border-2 border-dashed border-gray-400 p-6 md:p-10 rounded-lg relative">
                    <h2 className={`${bangers.className} text-4xl mb-8 border-b-4 border-black inline-block transform -rotate-1`}>PLAYER PROFILE</h2>
                    <div className="flex flex-col md:flex-row gap-10 items-start">
                        <div className="flex-1 space-y-6 text-gray-800 leading-relaxed text-lg font-medium">
                            <p>
                                <span className="font-bold text-2xl block mb-2">Level 25 QA/DevOps Engineer.</span>
                                I bridge the gap between code and cloud. With a strong foundation in Quality Assurance, I build reliable, automated pipelines that ensure speed without sacrificing stability. Specializing in <span className="font-bold bg-yellow-200 px-1">AWS & OpenShift</span>, I turn complex infrastructure into smooth, self-healing systems.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <span className="bg-black text-white px-3 py-1 text-sm font-bold rounded-full">#DevOps</span>
                                <span className="bg-black text-white px-3 py-1 text-sm font-bold rounded-full">#OpenShift</span>
                                <span className="bg-black text-white px-3 py-1 text-sm font-bold rounded-full">#AWS</span>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 relative border-4 border-black bg-white p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-2 h-96 md:h-auto md:aspect-[3/4]">
                            <div className="w-full h-full relative overflow-hidden border-2 border-black">
                                <Image
                                    src="/sujith.png"
                                    alt="Sujith Profile"
                                    fill
                                    className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* THE SAGA SO FAR (EXPERIENCE) */}
                <section className="border-2 border-dashed border-gray-400 p-6 md:p-10 rounded-lg">
                    <h2 className={`${bangers.className} text-4xl mb-10 border-b-4 border-black inline-block transform rotate-1`}>THE SAGA SO FAR</h2>

                    <div className="space-y-8 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-black transform -translate-x-1/2 hidden md:block"></div>

                        {/* Chapter 3 */}
                        <div className="flex flex-col md:flex-row items-center justify-between relative">
                            <div className="w-full md:w-5/12 order-2 md:order-1 text-left md:text-right pr-0 md:pr-8">
                                <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-transform">
                                    <h3 className={`${bangers.className} text-2xl`}>QA/DevOps Engineer</h3>
                                    <p className="font-bold text-gray-500 text-sm mb-2">IBM | Oct 2024 - Present</p>
                                    <p className="text-sm font-medium">Bridging the gap between quality and operations. Automating CI/CD pipelines, ensuring robust test coverage, and optimizing deployment workflows for maximum efficiency.</p>
                                </div>
                            </div>
                            <div className="w-8 h-8 bg-black border-4 border-white rounded-full absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10 hidden md:block"></div>
                            <div className="w-full md:w-5/12 order-1 md:order-2 pl-0 md:pl-8 mb-2 md:mb-0">
                                <span className={`${bangers.className} text-4xl text-gray-300`}>CHAPTER 03</span>
                            </div>
                        </div>

                        {/* Chapter 2 */}
                        <div className="flex flex-col md:flex-row items-center justify-between relative">
                            <div className="w-full md:w-5/12 order-1 text-right md:text-left pr-0 md:pr-8 mb-2 md:mb-0">
                                <span className={`${bangers.className} text-4xl text-gray-300`}>CHAPTER 02</span>
                            </div>
                            <div className="w-8 h-8 bg-white border-4 border-black rounded-full absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10 hidden md:block"></div>
                            <div className="w-full md:w-5/12 order-2 pl-0 md:pl-8">
                                <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-transform">
                                    <h3 className={`${bangers.className} text-2xl`}>Associate QA/Automation Developer</h3>
                                    <p className="font-bold text-gray-500 text-sm mb-2">IBM | Jul 2022 - Oct 2024</p>
                                    <p className="text-sm font-medium">Developed automated test suites to ensure software reliability. Collaborated with dev teams to catch bugs early and streamline the release process.</p>
                                </div>
                            </div>
                        </div>

                        {/* Chapter 1 */}
                        <div className="flex flex-col md:flex-row items-center justify-between relative">
                            <div className="w-full md:w-5/12 order-2 md:order-1 text-left md:text-right pr-0 md:pr-8">
                                <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-transform">
                                    <h3 className={`${bangers.className} text-2xl`}>QA Intern</h3>
                                    <p className="font-bold text-gray-500 text-sm mb-2">IBM | Jan 2022 - Jul 2022</p>
                                    <p className="text-sm font-medium">The beginning of the journey. Learned the fundamentals of quality assurance, manual testing, and the importance of delivering bug-free software.</p>
                                </div>
                            </div>
                            <div className="w-8 h-8 bg-gray-400 border-4 border-black rounded-full absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10 hidden md:block"></div>
                            <div className="w-full md:w-5/12 order-1 md:order-2 pl-0 md:pl-8 mb-2 md:mb-0">
                                <span className={`${bangers.className} text-4xl text-gray-300`}>CHAPTER 01</span>
                            </div>
                        </div>

                    </div>
                </section>

                {/* SIDE QUESTS & ACHIEVEMENTS */}
                <section className="border-2 border-dashed border-gray-400 p-6 md:p-10 rounded-lg">
                    <h2 className={`${bangers.className} text-4xl mb-10 border-b-4 border-black inline-block transform -rotate-1`}>SIDE QUESTS & ACHIEVEMENTS</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* Achievements List */}
                        <div>
                            <h3 className={`${bangers.className} text-2xl mb-6 text-gray-700`}>🏆 TROPHY CASE</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 border-2 border-black bg-yellow-200 flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                                        🚀
                                    </div>
                                    <div>
                                        <span className="font-bold block text-lg">RBH Winner</span>
                                        <span className="text-sm text-gray-600 font-medium">Winner of Reboot Kerala Hackathon</span>
                                    </div>
                                </li>
                                {/* <li className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 border-2 border-black bg-blue-200 flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                                        🚀
                                    </div>
                                    <div>
                                        <span className="font-bold block text-lg">Deployment Master</span>
                                        <span className="text-sm text-gray-600 font-medium">Achieved 99.99% uptime during peak traffic.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 border-2 border-black bg-green-200 flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                                        📜
                                    </div>
                                    <div>
                                        <span className="font-bold block text-lg">Certified Cloud Architect</span>
                                        <span className="text-sm text-gray-600 font-medium">Mastered the AWS & Azure clouds.</span>
                                    </div>
                                </li> */}
                            </ul>
                        </div>

                        {/* Icebreakers */}
                        <div>
                            <h3 className={`${bangers.className} text-2xl mb-6 text-gray-700`}>🧊 ICEBREAKERS</h3>
                            <p className="mb-6 font-medium text-gray-800 text-lg leading-relaxed">
                                When I&apos;m not orchestrating containers, you can find me geeking out over:
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 border-2 border-black bg-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default hover:bg-pink-100">Malayalam Movies</span>
                                <span className="px-4 py-2 border-2 border-black bg-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default hover:bg-purple-100">Malayalam Songs</span>
                                {/* <span className="px-4 py-2 border-2 border-black bg-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default hover:bg-blue-100">Mechanical Keyboards</span>
                                <span className="px-4 py-2 border-2 border-black bg-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default hover:bg-red-100">Retro Gaming</span>
                                <span className="px-4 py-2 border-2 border-black bg-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform cursor-default hover:bg-yellow-100">Coffee Brewing</span> */}
                            </div>
                        </div>

                    </div>
                </section>

                {/* SKILL ARSENAL */}
                <section className="border-2 border-dashed border-gray-400 p-6 md:p-10 rounded-lg">
                    <h2 className={`${bangers.className} text-4xl mb-10 border-b-4 border-black inline-block`}>SKILL ARSENAL</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-center">

                        {/* Cloud */}
                        <div className="flex flex-col items-center gap-4 group cursor-pointer">
                            <div className="w-24 h-24 border-4 border-black rounded-full flex items-center justify-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                <span className="text-4xl">☁️</span>
                            </div>
                            <div className="flex flex-col">
                                <span className={`${bangers.className} text-xl tracking-wide mb-2`}>Cloud Command</span>
                                <span className="text-sm font-bold text-gray-600">AWS</span>
                            </div>
                        </div>

                        {/* Pipelines */}
                        <div className="flex flex-col items-center gap-4 group cursor-pointer">
                            <div className="w-24 h-24 border-4 border-black rounded-full flex items-center justify-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                <span className="text-4xl">🔄</span>
                            </div>
                            <div className="flex flex-col">
                                <span className={`${bangers.className} text-xl tracking-wide mb-2`}>Pipeline Mastery</span>
                                <span className="text-sm font-bold text-gray-600">Jenkins, GitHub Actions, GitLab CI</span>
                            </div>
                        </div>

                        {/* Containers */}
                        <div className="flex flex-col items-center gap-4 group cursor-pointer">
                            <div className="w-24 h-24 border-4 border-black rounded-full flex items-center justify-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                <span className="text-4xl">🐳</span>
                            </div>
                            <div className="flex flex-col">
                                <span className={`${bangers.className} text-xl tracking-wide mb-2`}>Container Ops</span>
                                <span className="text-sm font-bold text-gray-600">Docker, Kubernetes, OpenShift</span>
                            </div>
                        </div>

                        {/* Frontend */}
                        <div className="flex flex-col items-center gap-4 group cursor-pointer">
                            <div className="w-24 h-24 border-4 border-black rounded-full flex items-center justify-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                <span className="text-4xl">⚛️</span>
                            </div>
                            <div className="flex flex-col">
                                <span className={`${bangers.className} text-xl tracking-wide mb-2`}>Frontend Mastery</span>
                                <span className="text-sm font-bold text-gray-600">React, Next.js, Tailwind, TypeScript</span>
                            </div>
                        </div>

                        {/* Backend */}
                        <div className="flex flex-col items-center gap-4 group cursor-pointer">
                            <div className="w-24 h-24 border-4 border-black rounded-full flex items-center justify-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                <span className="text-4xl">⚙️</span>
                            </div>
                            <div className="flex flex-col">
                                <span className={`${bangers.className} text-xl tracking-wide mb-2`}>Backend Logic</span>
                                <span className="text-sm font-bold text-gray-600">Node.js, Python, Gin, PostgreSQL</span>
                            </div>
                        </div>

                        {/* Tools */}
                        <div className="flex flex-col items-center gap-4 group cursor-pointer">
                            <div className="w-24 h-24 border-4 border-black rounded-full flex items-center justify-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                <span className="text-4xl">🛠️</span>
                            </div>
                            <div className="flex flex-col">
                                <span className={`${bangers.className} text-xl tracking-wide mb-2`}>The Toolkit</span>
                                <span className="text-sm font-bold text-gray-600">Git, Linux, Vercel</span>
                            </div>
                        </div>

                    </div>
                </section>

            </div>

            {/* CTA SECTION */}
            <div className="flex flex-col md:flex-row justify-center gap-6 mt-16">
                <a href="mailto:sujithvi06@gmail.com" className="bg-black text-white text-xl font-bold py-4 px-12 rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-95 transition-all text-center">
                    HIRE ME
                </a>
                <a href="/resume.pdf" target="_blank" className="bg-white border-4 border-black text-black text-xl font-bold py-4 px-12 rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-95 transition-all text-center">
                    VIEW RESUME
                </a>
            </div>

        </div>
    );
}
