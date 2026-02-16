import { useEffect, useState } from "react";
import { FaProjectDiagram, FaEnvelope, FaCode, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        projects: 0,
        messages: 0,
        skills: 0,
        experience: 0
    });

    useEffect(() => {
        // Fetch stats from various APIs
        const fetchStats = async () => {
            try {
                const [pRes, mRes, sRes, eRes] = await Promise.all([
                    fetch('/api/projects'),
                    fetch('/api/contact'),
                    fetch('/api/skills'),
                    fetch('/api/experience')
                ]);

                const pData = await pRes.json();
                const mData = await mRes.json();
                const sData = await sRes.json();
                const eData = await eRes.json();

                setStats({
                    projects: pData.data?.length || 0,
                    messages: mData.data?.length || 0,
                    skills: sData.data?.length || 0,
                    experience: eData.data?.length || 0
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: "Toplam Proje", value: stats.projects, icon: FaProjectDiagram, color: "bg-blue-500", href: "/admin/projects" },
        { label: "Okunmamış Mesaj", value: stats.messages, icon: FaEnvelope, color: "bg-red-500", href: "/admin/messages" },
        { label: "Yetenek Sayısı", value: stats.skills, icon: FaCode, color: "bg-purple-500", href: "/admin/skills" },
        { label: "Deneyim Kaydı", value: stats.experience, icon: FaBriefcase, color: "bg-emerald-500", href: "/admin/experience" },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Genel Bakış</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <Link key={index} to={card.href} className="block group">
                        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${card.color} bg-opacity-20 text-white`}>
                                    <card.icon size={24} />
                                </div>
                                <span className="text-3xl font-bold text-white">{card.value}</span>
                            </div>
                            <h3 className="text-gray-400 font-medium group-hover:text-white transition">{card.label}</h3>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-12">
                <h2 className="text-xl font-bold text-white mb-4">Hızlı Yapılacaklar</h2>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <ul className="space-y-3 text-gray-400">
                        <li>• Yeni bir proje ekle</li>
                        <li>• Gelen mesajları kontrol et</li>
                        <li>• Profil bilgilerini güncelle</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
