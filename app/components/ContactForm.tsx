"use client";

import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    function validate() {
        if (!name.trim() || !email.trim() || !message.trim()) {
            setError("Lütfen ad, e-posta ve mesaj alanlarını doldurun.");
            return false;
        }

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
        setSending(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message);
        formData.append("_replyto", email);


        const res = await fetch("https://formspree.io/f/xgoeyydy", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });

        const data = await res.json();
        setSending(false);

        if (res.ok) {
            setSent(true);
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
            setTimeout(() => setSent(false), 5000);
        } else {
            setError(
                data?.errors?.[0]?.message ||
                "Gönderim başarısız oldu. Lütfen tekrar deneyin."
            );
        }

    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* AD */}
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adın"
                    name="name"
                    className="
            w-full px-5 py-4 rounded-xl
            bg-zinc-900/50 backdrop-blur-sm
            border border-zinc-800
            text-white placeholder-zinc-600
            focus:outline-none
            focus:ring-2 focus:ring-emerald-500/20
            focus:border-emerald-500/50
            transition-all duration-300
          "
                />

                {/* EMAIL */}
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresin"
                    type="email"
                    name="email"
                    className="
            w-full px-5 py-4 rounded-xl
            bg-zinc-900/50 backdrop-blur-sm
            border border-zinc-800
            text-white placeholder-zinc-600
            focus:outline-none
            focus:ring-2 focus:ring-emerald-500/20
            focus:border-emerald-500/50
            transition-all duration-300
          "
                />
            </div>

            <div className="grid grid-cols-1 gap-4">

                {/* SUBJECT */}
                <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Konu"
                    name="subject"
                    className="
            w-full px-5 py-4 rounded-xl
            bg-zinc-900/50 backdrop-blur-sm
            border border-zinc-800
            text-white placeholder-zinc-600
            focus:outline-none
            focus:ring-2 focus:ring-emerald-500/20
            focus:border-emerald-500/50
            transition-all duration-300
          "
                />

                {/* MESSAGE */}
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mesajınız"
                    rows={5}
                    name="message"
                    className="
            w-full px-5 py-4 rounded-xl
            bg-zinc-900/50 backdrop-blur-sm
            border border-zinc-800
            text-white placeholder-zinc-600
            focus:outline-none
            focus:ring-2 focus:ring-emerald-500/20
            focus:border-emerald-500/50
            resize-none
            transition-all duration-300
          "
                />
            </div>

            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={sending}
                className="
            group flex items-center justify-center gap-2
            w-full sm:w-auto px-8 py-4 rounded-xl
            bg-white text-black font-semibold
            hover:bg-emerald-400 hover:text-black hover:scale-[1.02]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300
          "
            >
                {sending ? "Gönderiliyor..." : (
                    <>
                        Gönder <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
            {sent && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center">
                    Mesajınız başarıyla gönderildi! En kısa sürede döneceğim.
                </div>
            )}
        </form>
    );
}
