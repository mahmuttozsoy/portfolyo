"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function AdminEducation() {
    const [educations, setEducations] = useState<any[]>([]); // Using any for brevity locally
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        schoolName: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        grade: "",
        description: "",
    });

    useEffect(() => { fetchEducation(); }, []);

    const fetchEducation = async () => {
        const res = await fetch('/api/education');
        if (res.ok) {
            const data = await res.json();
            setEducations(data.data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Silmek istediğinize emin misiniz?")) return;
        const res = await fetch(`/api/education?id=${id}`, { method: 'DELETE' });
        if (res.ok) fetchEducation();
    };

    const handleEdit = (edu: any) => {
        setEditingId(edu.id);
        setFormData({
            schoolName: edu.schoolName,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy || "",
            startDate: edu.startDate ? new Date(edu.startDate).toISOString().split('T')[0] : "",
            endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : "",
            isCurrent: edu.isCurrent || false,
            grade: edu.grade || "",
            description: edu.description || "",
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const method = editingId ? 'PUT' : 'POST';
        const body = editingId ? { ...formData, id: editingId } : formData;

        const res = await fetch('/api/education', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            setIsFormOpen(false);
            setEditingId(null);
            setFormData({ schoolName: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", isCurrent: false, grade: "", description: "" });
            fetchEducation();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, isCurrent: e.target.checked }));
    };

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Eğitim Yönetimi</h1>
                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData({ schoolName: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", isCurrent: false, grade: "", description: "" });
                        setIsFormOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 transition"
                >
                    <FaPlus /> Yeni Ekle
                </button>
            </div>

            <div className="space-y-4">
                {educations.map((edu) => (
                    <div key={edu.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center group">
                        <div>
                            <h3 className="font-bold text-lg text-white">{edu.schoolName}</h3>
                            <div className="text-emerald-400">{edu.degree} - {edu.fieldOfStudy}</div>
                            <div className="text-sm text-gray-500">
                                {edu.startDate ? new Date(edu.startDate).getFullYear() : ''} -
                                {edu.isCurrent ? " Devam Ediyor" : (edu.endDate ? new Date(edu.endDate).getFullYear() : '')}
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(edu)} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/30">
                                Düzenle
                            </button>
                            <button onClick={() => handleDelete(edu.id)} className="px-3 py-1 bg-red-600/20 text-red-400 rounded hover:bg-red-600/30">
                                Sil
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-zinc-900 w-full max-w-lg rounded-2xl border border-zinc-700 p-6 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">{editingId ? 'Eğitimi Düzenle' : 'Yeni Eğitim Ekle'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="schoolName" value={formData.schoolName} placeholder="Okul Adı" required className="w-full bg-black border border-zinc-700 rounded p-2" onChange={handleChange} />
                            <input name="degree" value={formData.degree} placeholder="Derece (Lisans, Yüksek Lisans)" required className="w-full bg-black border border-zinc-700 rounded p-2" onChange={handleChange} />
                            <input name="fieldOfStudy" value={formData.fieldOfStudy} placeholder="Bölüm" required className="w-full bg-black border border-zinc-700 rounded p-2" onChange={handleChange} />

                            <div className="grid grid-cols-2 gap-4">
                                <input type="date" name="startDate" value={formData.startDate} className="w-full bg-black border border-zinc-700 rounded p-2" onChange={handleChange} />
                                <input type="date" name="endDate" value={formData.endDate} disabled={formData.isCurrent} className="w-full bg-black border border-zinc-700 rounded p-2" onChange={handleChange} />
                            </div>

                            <label className="flex items-center gap-2 text-gray-300">
                                <input type="checkbox" name="isCurrent" checked={formData.isCurrent} onChange={handleCheck} />
                                Devam Ediyor
                            </label>

                            <input name="grade" value={formData.grade} placeholder="Not Ortalaması" className="w-full bg-black border border-zinc-700 rounded p-2" onChange={handleChange} />

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
