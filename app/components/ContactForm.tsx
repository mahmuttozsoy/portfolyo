"use client";

import React, { useState } from "react";

// Formspree entegrasyonu ile otomatik e-posta gönderimi
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
        // Basit e-posta regex kontrolü
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Geçerli bir e-posta adresi girin.");
            return false;
        }
        setError("");
        return true;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        // Form verisini Formspree'ye gönder
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message);

        const res = await fetch("https://formspree.io/f/xwkgyyqg", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });

        if (res.ok) {
            setSent(true);
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
            setTimeout(() => setSent(false), 2000);
        } else {
            setError("Gönderim başarısız oldu. Lütfen tekrar deneyin.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
            <div className="grid grid-cols-1 gap-3">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adın"
                    name="name"
                    className="w-full px-4 py-2 rounded-lg bg-black/20 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresin"
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 rounded-lg bg-black/20 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />

                <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Konu (opsiyonel)"
                    name="subject"
                    className="w-full px-4 py-2 rounded-lg bg-black/20 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mesajınız"
                    rows={5}
                    name="message"
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

                {sent && <span className="text-sm text-emerald-300">Mesajınız iletildi!</span>}
            </div>
        </form>
    );
}
