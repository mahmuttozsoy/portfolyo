import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar - Fixed width */}
            <AdminSidebar />

            {/* Main Content - Offset by sidebar width */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
