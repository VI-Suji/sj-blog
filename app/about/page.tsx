"use client";

import { useRouter } from "next/navigation";
import About from "@/components/About";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
    const router = useRouter();

    const handleViewChange = (view: string) => {
        router.push(`/${view === 'home' ? '' : view}`);
    };

    return (
        <>
            <Navbar setCurrentView={handleViewChange} currentView="about" />
            <About />
            <Footer onNavClick={handleViewChange} />
        </>
    );
}
