"use client";
import ContactForm from "./ContactForm";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaInstagram,
} from "react-icons/fa";

export default function ContactSection() {
    const [profile, setProfile] = useState<any>(null);
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/profile');
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, []);

    const items = [
        {
            href: "mailto:mahmutozsoy2604@gmail.com",
            icon: <FaEnvelope />,
            label: "E-posta",
            desc: "mahmutozsoy2604@gmail.com",
            type: "email",
        },
        {
            href: profile?.githubUrl || "https://github.com/mahmuttozsoy",
            icon: <FaGithub />,
            label: "GitHub",
            desc: "Kod örnekleri ve projeler",
            type: "link",
        },
        {
            href: profile?.linkedinUrl || "https://www.linkedin.com/in/mahmuttozsoy/",
            icon: <FaLinkedin />,
            label: "LinkedIn",
            desc: "Profesyonel profil",
            type: "link",
        },
        {
            href: profile?.twitterUrl || profile?.instagramUrl || "https://www.instagram.com/mahmuttozsoy/",
            icon: <FaInstagram />,
            label: "Instagram",
            desc: "Güncellemeler ve görseller",
            type: "link",
        },
    ];

    const handleCopy = (e: React.MouseEvent, text: string) => {
        e.preventDefault();
        navigator.clipboard?.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <section id="contact" className="py-12 md:py-24 relative">
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-900/10 rounded-full blur-[80px] md:blur-[128px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">

                {/* Left Side - Form */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-4">
                            İletişim
                        </h2>
                        <div className="w-20 h-1 bg-emerald-500 rounded-full mb-6" />
                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                            Yeni bir proje, iş birliği veya sadece merhaba demek için
                            aşağıdaki formu kullanabilirsiniz. En kısa sürede dönüş yapacağım.
                        </p>
                    </div>

                    <ContactForm />
                </motion.div>

                {/* Right Side - Links */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-4"
                >
                    {items.map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            viewport={{ once: true }}
                            className="group flex items-center gap-5 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-800/60 transition-all duration-300"
                        >
                            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-zinc-800/80 text-2xl text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>

                            <div className="flex-1">
                                <h4 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                                    {item.label}
                                </h4>
                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                    {item.desc}
                                </p>
                            </div>

                            {item.type === "email" && (
                                <button
                                    onClick={(e) => handleCopy(e, item.desc)}
                                    className="px-4 py-2 text-xs font-medium text-zinc-400 bg-zinc-800/50 hover:bg-emerald-500/20 hover:text-emerald-400 rounded-full transition-all"
                                >
                                    {copied === item.desc ? "Kopyalandı!" : "Kopyala"}
                                </button>
                            )}
                        </motion.a>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
