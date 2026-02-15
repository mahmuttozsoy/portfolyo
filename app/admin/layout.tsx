"use client";

import AdminSidebar from "./components/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Login sayfasında sidebar gösterme
    if (pathname === '/admin') {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar - Fixed width */}
            <AdminSidebar />

            {/* Main Content - Offset by sidebar width */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
