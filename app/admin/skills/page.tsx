"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";

export default function AdminSkills() {
    const [skills, setSkills] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Skill Form State
    const [isSkillFormOpen, setIsSkillFormOpen] = useState(false);
    const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
    const [skillFormData, setSkillFormData] = useState({
        name: "",
        categoryId: "",
        level: "INTERMEDIATE",
    });

    // Category Form State
    const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
    const [categoryFormData, setCategoryFormData] = useState({
        name: "",
        order: 0,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const [resSkills, resCats] = await Promise.all([
            fetch('/api/skills'),
            fetch('/api/categories')
        ]);

        if (resSkills.ok && resCats.ok) {
            const dataSkills = await resSkills.json();
            const dataCats = await resCats.json();
            setSkills(dataSkills.data);
            setCategories(dataCats.data);
        }
        setLoading(false);
    };

    // --- SKILL ACTIONS ---
    const handleDeleteSkill = async (id: string) => {
        if (!confirm("Bu yeteneği silmek istediğinize emin misiniz?")) return;
        const res = await fetch(`/api/skills?id=${id}`, { method: 'DELETE' });
        if (res.ok) fetchData();
    };

    const handleEditSkill = (skill: any) => {
        setEditingSkillId(skill.id);
        setSkillFormData({
            name: skill.name,
            categoryId: skill.categoryId,
            level: skill.level,
        });
        setIsSkillFormOpen(true);
    };

    const handleSkillSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingSkillId ? 'PUT' : 'POST';
        const body = editingSkillId ? { ...skillFormData, id: editingSkillId } : skillFormData;

        const res = await fetch('/api/skills', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            setIsSkillFormOpen(false);
            setEditingSkillId(null);
            setSkillFormData({ name: "", categoryId: "", level: "INTERMEDIATE" });
            fetchData();
        }
    };

    // --- CATEGORY ACTIONS ---
    const handleDeleteCategory = async (id: string) => {
        if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz? Altındaki yetenekler de silinebilir.")) return;
        const res = await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
        if (res.ok) fetchData();
    };

    const handleEditCategory = (cat: any) => {
        setEditingCategoryId(cat.id);
        setCategoryFormData({
            name: cat.name,
            order: cat.order,
        });
        setIsCategoryFormOpen(true);
    };

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingCategoryId ? 'PUT' : 'POST';
        const body = editingCategoryId ? { ...categoryFormData, id: editingCategoryId } : categoryFormData;

        const res = await fetch('/api/categories', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            setIsCategoryFormOpen(false);
            setEditingCategoryId(null);
            setCategoryFormData({ name: "", order: 0 });
            fetchData();
        }
    };

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Yetenek & Kategori Yönetimi</h1>
            </div>

            {/* Categories Management Area */}
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-emerald-400">Kategoriler</h2>
                    <button
                        onClick={() => {
                            setEditingCategoryId(null);
                            setCategoryFormData({ name: "", order: categories.length + 1 });
                            setIsCategoryFormOpen(true);
                        }}
                        className="flex items-center gap-2 px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded-lg hover:bg-emerald-600/30 transition text-sm border border-emerald-600/30"
                    >
                        <FaPlus /> Kategori Ekle
                    </button>
                </div>
                <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-zinc-950 border border-zinc-700 px-4 py-2 rounded-lg flex items-center gap-3 group">
                            <span className="font-medium text-white">{cat.name}</span>
                            <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEditCategory(cat)} className="text-blue-400 hover:text-blue-300"><FaEdit /></button>
                                <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 hover:text-red-400"><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills Management Area */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Yetenekler</h2>
                    <button
                        onClick={() => {
                            if (categories.length === 0) {
                                alert("Önce en az bir kategori eklemelisiniz!");
                                return;
                            }
                            setEditingSkillId(null);
                            setSkillFormData({ name: "", categoryId: categories[0]?.id || "", level: "INTERMEDIATE" });
                            setIsSkillFormOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition"
                    >
                        <FaPlus /> Yeni Yetenek Ekle
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((category) => {
                        const categorySkills = skills.filter(s => s.categoryId === category.id);
                        return (
                            <div key={category.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                                <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                                    <h3 className="font-bold text-emerald-400">{category.name}</h3>
                                    <span className="text-xs text-zinc-500">{categorySkills.length} yetenek</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {categorySkills.map((skill: any) => (
                                        <span key={skill.id} className="bg-black border border-zinc-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 group cursor-pointer hover:border-emerald-500 transition-colors" onClick={() => handleEditSkill(skill)}>
                                            {skill.name}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteSkill(skill.id);
                                                }}
                                                className="text-red-500 hover:text-red-400 ml-1 opacity-60 group-hover:opacity-100"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                    {categorySkills.length === 0 && (
                                        <span className="text-zinc-600 text-sm italic">Henüz yetenek eklenmemiş.</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Category Modal */}
            {isCategoryFormOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-zinc-900 w-full max-w-sm rounded-2xl border border-zinc-700 p-6">
                        <h2 className="text-xl font-bold mb-4">{editingCategoryId ? 'Kategori Düzenle' : 'Yeni Kategori'}</h2>
                        <form onSubmit={handleCategorySubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1">Kategori Adı</label>
                                <input
                                    value={categoryFormData.name}
                                    placeholder="Örn: Mobil, Yapay Zeka..."
                                    required
                                    className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                    onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1">Sıralama (Opsiyonel)</label>
                                <input
                                    type="number"
                                    value={categoryFormData.order}
                                    className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                    onChange={(e) => setCategoryFormData({ ...categoryFormData, order: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={() => setIsCategoryFormOpen(false)} className="px-4 py-2 rounded hover:bg-zinc-800 text-white">İptal</button>
                                <button type="submit" className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white">Kaydet</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Skill Modal */}
            {isSkillFormOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-zinc-900 w-full max-w-sm rounded-2xl border border-zinc-700 p-6">
                        <h2 className="text-xl font-bold mb-4">{editingSkillId ? 'Yetenek Düzenle' : 'Yeni Yetenek Ekle'}</h2>
                        <form onSubmit={handleSkillSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-1">Yetenek Adı</label>
                                <input
                                    value={skillFormData.name}
                                    placeholder="Örn: React, Python..."
                                    required
                                    className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                    onChange={(e) => setSkillFormData({ ...skillFormData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-1">Kategori</label>
                                <select
                                    value={skillFormData.categoryId}
                                    onChange={(e) => setSkillFormData({ ...skillFormData, categoryId: e.target.value })}
                                    className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-1">Seviye</label>
                                <select
                                    value={skillFormData.level}
                                    onChange={(e) => setSkillFormData({ ...skillFormData, level: e.target.value })}
                                    className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                >
                                    <option value="BEGINNER">Başlangıç</option>
                                    <option value="INTERMEDIATE">Orta</option>
                                    <option value="ADVANCED">İleri</option>
                                    <option value="EXPERT">Uzman</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button type="button" onClick={() => setIsSkillFormOpen(false)} className="px-4 py-2 rounded hover:bg-zinc-800 text-white">İptal</button>
                                <button type="submit" className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700 text-white">Kaydet</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
