"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

interface Experience {
    id: string;
    companyName: string;
    position: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
}

export default function AdminExperience() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        companyName: "",
        position: "",
        employmentType: "FULL_TIME",
        location: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
    });

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        const res = await fetch('/api/experience');
        if (res.ok) {
            const data = await res.json();
            setExperiences(data.data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu deneyimi silmek istediğinize emin misiniz?")) return;

        const res = await fetch(`/api/experience?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchExperiences();
        }
    };

    const handleEdit = (exp: any) => {
        setEditingId(exp.id);
        setFormData({
            companyName: exp.companyName,
            position: exp.position,
            employmentType: exp.employmentType,
            location: exp.location || "",
            // Format dates for input[type="date"] (YYYY-MM-DD)
            startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : "",
            endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : "",
            isCurrent: exp.isCurrent,
            description: exp.description || "",
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingId ? 'PUT' : 'POST';
            const body = editingId ? { ...formData, id: editingId } : formData;

            const res = await fetch('/api/experience', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (res.ok) {
                setIsFormOpen(false);
                setEditingId(null);
                setFormData({
                    companyName: "",
                    position: "",
                    employmentType: "FULL_TIME",
                    location: "",
                    startDate: "",
                    endDate: "",
                    isCurrent: false,
                    description: "",
                });
                fetchExperiences();
            }
        } catch (error) {
            console.error("Failed to add/update", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Checkbox handler
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, isCurrent: e.target.checked }));
    };

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Deneyim Yönetimi</h1>
                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData({
                            companyName: "",
                            position: "",
                            employmentType: "FULL_TIME",
                            location: "",
                            startDate: "",
                            endDate: "",
                            isCurrent: false,
                            description: "",
                        });
                        setIsFormOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition"
                >
                    <FaPlus /> Yeni Ekle
                </button>
            </div>

            <div className="space-y-4">
                {experiences.map((exp) => (
                    <div key={exp.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center group">
                        <div>
                            <h3 className="font-bold text-lg text-white">{exp.position}</h3>
                            <div className="text-emerald-400">{exp.companyName}</div>
                            <div className="text-sm text-gray-500">
                                {new Date(exp.startDate).toLocaleDateString()} -
                                {exp.isCurrent ? " Devam Ediyor" : (exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "")}
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(exp)} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/30">
                                Düzenle
                            </button>
                            <button onClick={() => handleDelete(exp.id)} className="text-red-400 hover:text-red-300 p-2">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-zinc-900 w-full max-w-lg rounded-2xl border border-zinc-700 p-6 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">{editingId ? 'Deneyimi Düzenle' : 'Yeni Deneyim Ekle'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="companyName" value={formData.companyName} placeholder="Şirket Adı" required className="w-full bg-black border border-zinc-700 rounded p-2" onChange={handleChange} />
                            <input name="position" value={formData.position} placeholder="Pozisyon" required className="w-full bg-black border border-zinc-700 rounded p-2" onChange={handleChange} />

                            <select name="employmentType" value={formData.employmentType} className="w-full bg-black border border-zinc-700 rounded p-2" onChange={handleChange}>
                                <option value="FULL_TIME">Tam Zamanlı</option>
                                <option value="PART_TIME">Yarı Zamanlı</option>
                                <option value="FREELANCE">Freelance</option>
                                <option value="INTERNSHIP">Staj</option>
                            </select>

                            <input name="location" value={formData.location} placeholder="Lokasyon" className="w-full bg-black border border-zinc-700 rounded p-2" onChange={handleChange} />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-400">Başlangıç</label>
                                    <input type="date" name="startDate" value={formData.startDate} required className="w-full bg-black border border-zinc-700 rounded p-2" onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400">Bitiş</label>
                                    <input type="date" name="endDate" value={formData.endDate} disabled={formData.isCurrent} className="w-full bg-black border border-zinc-700 rounded p-2" onChange={handleChange} />
                                </div>
                            </div>

                            <label className="flex items-center gap-2 text-gray-300">
                                <input type="checkbox" name="isCurrent" checked={formData.isCurrent} onChange={handleCheck} />
                                Şu an çalışıyorum
                            </label>

                            <textarea name="description" value={formData.description} placeholder="Açıklama" rows={3} className="w-full bg-black border border-zinc-700 rounded p-2" onChange={handleChange} />

                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 rounded hover:bg-zinc-800">İptal</button>
                                <button type="submit" className="px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700">{editingId ? 'Güncelle' : 'Kaydet'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
