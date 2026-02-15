"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminProfile() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        title: "",
        bio: "",
        location: "",
        phone: "",
        githubUrl: "",
        linkedinUrl: "",
        twitterUrl: "",
        websiteUrl: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch('/api/profile');
            if (res.ok) {
                const data = await res.json();
                if (data.data.profile) {
                    setFormData({
                        fullName: data.data.profile.fullName || "",
                        title: data.data.profile.title || "",
                        bio: data.data.profile.bio || "",
                        location: data.data.profile.location || "",
                        phone: data.data.profile.phone || "",
                        githubUrl: data.data.profile.githubUrl || "",
                        linkedinUrl: data.data.profile.linkedinUrl || "",
                        twitterUrl: data.data.profile.twitterUrl || "",
                        websiteUrl: data.data.profile.websiteUrl || "",
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch profile", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert("Profil güncellendi!");
            } else {
                alert("Hata oluştu.");
            }
        } catch (error) {
            console.error("Save error", error);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="text-white">Yükleniyor...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white mb-8">Profil Yönetimi</h1>

            <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 max-w-4xl">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Ad Soyad</label>
                        <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-emerald-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Ünvan (Title)</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-emerald-500 transition-colors"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Biyografi</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-emerald-500 transition-colors"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Konum</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-emerald-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Telefon</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-emerald-500 transition-colors"
                        />
                    </div>
                </div>

                <div className="pt-6 border-t border-zinc-800">
                    <h3 className="text-lg font-semibold text-emerald-400 mb-4">Sosyal Medya</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">GitHub URL</label>
                            <input
                                name="githubUrl"
                                value={formData.githubUrl}
                                onChange={handleChange}
                                className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">LinkedIn URL</label>
                            <input
                                name="linkedinUrl"
                                value={formData.linkedinUrl}
                                onChange={handleChange}
                                className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Website URL</label>
                            <input
                                name="websiteUrl"
                                value={formData.websiteUrl}
                                onChange={handleChange}
                                className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50"
                    >
                        {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                    </button>
                </div>

            </form>
        </div>
    );
}
