"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaEnvelopeOpen } from "react-icons/fa";

export default function AdminMessages() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchMessages(); }, []);

    const fetchMessages = async () => {
        const res = await fetch('/api/contact');
        if (res.ok) {
            const data = await res.json();
            setMessages(data.data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Mesajı silmek istediğinize emin misiniz?")) return;
        const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
        if (res.ok) fetchMessages();
    };

    if (loading) return <div>Yükleniyor...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Gelen Mesajlar</h1>

            <div className="space-y-4">
                {messages.length === 0 ? (
                    <p className="text-gray-500">Henüz mesaj yok.</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative group">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-lg text-white">{msg.subject || "Konusuz"}</h3>
                                    <div className="text-sm text-emerald-400">{msg.name} ({msg.email})</div>
                                </div>
                                <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString()}</span>
                            </div>

                            <p className="text-gray-300 mt-2 whitespace-pre-wrap">{msg.message}</p>

                            <button
                                onClick={() => handleDelete(msg.id)}
                                className="absolute top-4 right-4 text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
