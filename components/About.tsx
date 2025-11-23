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
                                <span className="font-bold text-2xl block mb-2">Level 25 DevOps Engineer.</span>
                                I don&apos;t just manage servers; I orchestrate chaos. My mission is to build unbreakable pipelines, automate the un-automatable, and ensure that code flows from commit to production faster than a speedster.
                            </p>
                            <p>
                                Specializing in the <span className="font-bold bg-yellow-200 px-1">Cloud Native Ecosystem</span>, I bridge the gap between development and operations. Whether it&apos;s architecting self-healing infrastructure on Kubernetes or optimizing cloud costs, I bring a strategic, tactical approach to every deployment.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <span className="bg-black text-white px-3 py-1 text-sm font-bold rounded-full">#CI/CD</span>
                                <span className="bg-black text-white px-3 py-1 text-sm font-bold rounded-full">#CloudNative</span>
                                <span className="bg-black text-white px-3 py-1 text-sm font-bold rounded-full">#IaC</span>
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
                                    <h3 className={`${bangers.className} text-2xl`}>Senior DevOps Engineer</h3>
                                    <p className="font-bold text-gray-500 text-sm mb-2">CloudCorp Inc. | 2023 - Present</p>
                                    <p className="text-sm font-medium">Architecting zero-downtime deployments. Managing multi-region Kubernetes clusters and implementing GitOps workflows with ArgoCD.</p>
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
                                    <h3 className={`${bangers.className} text-2xl`}>Cloud Infrastructure Eng.</h3>
                                    <p className="font-bold text-gray-500 text-sm mb-2">ScaleUp Solutions | 2021 - 2023</p>
                                    <p className="text-sm font-medium">Migrated legacy monoliths to microservices. Dockerized the entire stack and reduced deployment time from hours to minutes.</p>
                                </div>
                            </div>
                        </div>

                        {/* Chapter 1 */}
                        <div className="flex flex-col md:flex-row items-center justify-between relative">
                            <div className="w-full md:w-5/12 order-2 md:order-1 text-left md:text-right pr-0 md:pr-8">
                                <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-transform">
                                    <h3 className={`${bangers.className} text-2xl`}>SysAdmin / Linux Ninja</h3>
                                    <p className="font-bold text-gray-500 text-sm mb-2">TechHub | 2019 - 2021</p>
                                    <p className="text-sm font-medium">The origin story. Managed bare metal servers, wrote endless Bash scripts, and learned the art of troubleshooting in production.</p>
                                </div>
                            </div>
                            <div className="w-8 h-8 bg-gray-400 border-4 border-black rounded-full absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10 hidden md:block"></div>
                            <div className="w-full md:w-5/12 order-1 md:order-2 pl-0 md:pl-8 mb-2 md:mb-0">
                                <span className={`${bangers.className} text-4xl text-gray-300`}>CHAPTER 01</span>
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
                                <span className="text-sm font-bold text-gray-600">AWS, Azure, GCP, Terraform</span>
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
                                <span className="text-sm font-bold text-gray-600">Docker, Kubernetes, Helm, Prometheus</span>
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
                                <span className="text-sm font-bold text-gray-600">Node.js, Python, PostgreSQL, GraphQL</span>
                            </div>
                        </div>

                        {/* Tools */}
                        <div className="flex flex-col items-center gap-4 group cursor-pointer">
                            <div className="w-24 h-24 border-4 border-black rounded-full flex items-center justify-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                <span className="text-4xl">🛠️</span>
                            </div>
                            <div className="flex flex-col">
                                <span className={`${bangers.className} text-xl tracking-wide mb-2`}>The Toolkit</span>
                                <span className="text-sm font-bold text-gray-600">Git, Linux, Figma, Vercel</span>
                            </div>
                        </div>

                    </div>
                </section>

            </div>

            {/* CTA SECTION */}
            <div className="flex flex-col md:flex-row justify-center gap-6 mt-16">
                <a href="mailto:sujith@example.com" className="bg-black text-white text-xl font-bold py-4 px-12 rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-95 transition-all text-center">
                    HIRE ME
                </a>
                <a href="/resume.pdf" target="_blank" className="bg-white border-4 border-black text-black text-xl font-bold py-4 px-12 rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-95 transition-all text-center">
                    VIEW RESUME
                </a>
            </div>

        </div>
    );
}
