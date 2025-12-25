"use client";

import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";

const socials = [
    {
        name: "Email",
        href: "mailto:mahmutozsoy2604@gmail.com",
        icon: FaEnvelope,
    },
    {
        name: "GitHub",
        href: "https://github.com/mahmutozsoy21",
        icon: FaGithub,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/mahmuttozsoy/",
        icon: FaLinkedin,
    },
    {
        name: "İnstagram",
        href: "https://www.instagram.com/mahmuttozsoy/",
        icon: FaInstagram,
    }
];

export default function ContactSection() {
    return (
        <section id="contact" className="space-y-6">
            <h2 className="text-3xl font-bold">İletişim</h2>

            <div className="mt-10 text-center space-y-4">
                <h3 className="text-xl font-semibold">
                    Benimle İletişime Geç
                </h3>

                <p className="text-gray-400 max-w-md mx-auto">
                    Yeni bir proje, iş birliği veya fikir hakkında konuşmak istersen
                    benimle dilediğin kanaldan iletişime geçebilirsin.
                </p>

                <a
                    href="mailto:mahmutozsoy2604@gmail.com"
                    className="inline-block mt-2 px-6 py-3 rounded-full border
               hover:bg-gray-800 transition"
                >
                    Mail Gönder →
                </a>
            </div>


            <div className="flex justify-center gap-6">
                {socials.map((item) => {
                    const Icon = item.icon;

                    return (
                        <a
                            key={item.name}
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center rounded-full border"
                            aria-label={item.name}
                        >
                            <Icon size={20} />
                        </a>
                    );
                })}
            </div>


        </section>
    );
}
