
"use client";
import ContactForm from "./ContactForm";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaInstagram,
} from "react-icons/fa";

export default function ContactSection() {
    const [copied, setCopied] = useState<string | null>(null);

    const items = [
        {
            href: "mailto:mahmutozsoy2604@gmail.com",
            icon: <FaEnvelope />,
            label: "E-posta",
            desc: "mahmutozsoy2604@gmail.com",
            type: "email",
        },
        {
            href: "https://github.com/mahmuttozsoy",
            icon: <FaGithub />,
            label: "GitHub",
            desc: "Kod örnekleri ve projeler",
            type: "link",
        },
        {
            href: "https://www.linkedin.com/in/mahmuttozsoy/",
            icon: <FaLinkedin />,
            label: "LinkedIn",
            desc: "Profesyonel profil",
            type: "link",
        },
        {
            href: "https://www.instagram.com/mahmuttozsoy/",
            icon: <FaInstagram />,
            label: "Instagram",
            desc: "Güncellemeler ve görseller",
            type: "link",
        },
    ];

    return (
        <section id="contact" className="py-12 md:py-24">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">

                {/* SOL TARAF – FORM */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className=" text-3xl font-bold mb-12
    text-zinc-300
    inline-block px-4 py-2 rounded-lg
    transition-all duration-300
    hover:text-zinc-100
    hover:bg-zinc-300/10
    hover:shadow-lg hover:shadow-zinc-400/20">İletişim</h2>

                    <p className="text-gray-400 max-w-md">
                        Yeni bir proje, iş birliği veya fikir hakkında
                        konuşmak istersen aşağıdaki formu doldurup gönder butonuna
                        tıklayabilirsin — e-posta istemcinizde yeni bir mesaj açılacaktır.
                    </p>

                    <ContactForm />
                </motion.div>

                {/* SAĞ TARAF – İKON KARTLAR */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex md:justify-end items-end"
                >
                    <div className="flex flex-col gap-3 w-full md:w-auto mt-8 md:mt-48">
                        {items.map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                aria-label={item.label}
                                whileHover={{ y: -6, scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.25 }}
                                className="group
flex items-center gap-4
p-3
rounded-xl
border border-gray-800
bg-black/30
text-gray-300

hover:bg-gray-900/60
hover:border-gray-400
hover:text-gray-100
hover:shadow-lg
hover:shadow-white/15

focus:outline-none
focus:ring-2
focus:ring-gray-400
transition-all duration-300"
                            >
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg text-xl md:text-2xl bg-black/20 border border-gray-700">
                                    {item.icon}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-white">{item.label}</div>
                                    <div className="text-sm text-gray-400 truncate">{item.desc}</div>
                                </div>

                                {item.type === "email" && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigator.clipboard?.writeText(item.desc || "");
                                            setCopied(item.desc);
                                            setTimeout(() => setCopied(null), 1500);
                                        }}
                                        className="ml-2 text-sm text-gray-300 hover:text-white bg-black/20 px-3 py-1 rounded-full border border-gray-800"
                                        aria-label="E-posta adresini kopyala"
                                    >
                                        {copied === item.desc ? "Kopyalandı" : "Kopyala"}
                                    </button>
                                )}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
