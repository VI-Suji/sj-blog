import type { Metadata } from "next";
import "../(site)/globals.css";

export const metadata: Metadata = {
    title: "CMS Admin",
    description: "Content Management System",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-50">
                {children}
            </body>
        </html>
    );
}
