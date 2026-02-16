import { Link, useLocation } from "react-router-dom";
import { FaUser, FaBriefcase, FaGraduationCap, FaCode, FaProjectDiagram, FaEnvelope, FaSignOutAlt, FaHome } from "react-icons/fa";

const menuItems = [
    { name: "Genel Bakış", href: "/admin/dashboard", icon: FaHome },
    { name: "Profil", href: "/admin/profile", icon: FaUser },
    { name: "Deneyim", href: "/admin/experience", icon: FaBriefcase },
    { name: "Eğitim", href: "/admin/education", icon: FaGraduationCap },
    { name: "Yetenekler", href: "/admin/skills", icon: FaCode },
    { name: "Projeler", href: "/admin/projects", icon: FaProjectDiagram },
    { name: "Mesajlar", href: "/admin/messages", icon: FaEnvelope },
];

export default function AdminSidebar() {
    const { pathname } = useLocation();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/admin'; // Force reload/redirect to login
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
            <div className="p-6 border-b border-zinc-800">
                <h2 className="text-xl font-bold text-white tracking-wider">
                    Admin Panel
                </h2>
                <p className="text-xs text-gray-400 mt-1">v2.0 Yönetim Sistemi</p>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30"
                                : "text-gray-400 hover:bg-zinc-800 hover:text-white"
                                }`}
                        >
                            <item.icon size={18} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-zinc-800">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600/10 text-red-500 hover:bg-red-600/20 rounded-xl transition-all duration-200"
                >
                    <FaSignOutAlt size={18} />
                    <span>Çıkış Yap</span>
                </button>
            </div>
        </aside>
    );
}
