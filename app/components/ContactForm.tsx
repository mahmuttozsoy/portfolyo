"use client";

import React, { useState } from "react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    function validate() {
        if (!name.trim() || !email.trim() || !message.trim()) {
            setError("Lütfen ad, e-posta ve mesaj alanlarını doldurun.");
            return false;
        }
        setError("");
        return true;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        const body = `İsim: ${name}\nE-posta: ${email}\n\n${message}`;
        const mailto = `mailto:mahmutozsoy2604@gmail.com?subject=${encodeURIComponent(
            subject || "Web sitesi üzerinden iletişim"
        )}&body=${encodeURIComponent(body)}`;

        // Open mail client
        window.location.href = mailto;
        setSent(true);
        // Reset form after short delay
        setTimeout(() => {
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
            setSent(false);
        }, 1200);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
            <div className="grid grid-cols-1 gap-3">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adın"
                    className="w-full px-4 py-2 rounded-lg bg-black/20 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresin"
                    type="email"
                    className="w-full px-4 py-2 rounded-lg bg-black/20 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />

                <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Konu (opsiyonel)"
                    className="w-full px-4 py-2 rounded-lg bg-black/20 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mesajınız"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-black/20 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                />
            </div>

            {error && <div className="text-sm text-red-400">{error}</div>}

            <div className="flex items-center gap-3">
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-800 bg-black/40 backdrop-blur hover:border-emerald-400 hover:text-emerald-300 transition"
                >
                    Gönder
                </button>

                {sent && <span className="text-sm text-emerald-300">E-posta istemcisi açıldı.</span>}
            </div>
        </form>
    );
}
