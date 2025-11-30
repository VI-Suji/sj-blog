import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
    title: "CMS Admin",
    description: "Content Management System",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // Redirect to sign-in if not authenticated
    if (!session || session.user?.email !== "sujithvi06@gmail.com") {
        redirect("/auth/signin");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader />
            {children}
        </div>
    );
}
