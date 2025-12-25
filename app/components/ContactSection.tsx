"use client";

import { motion } from "framer-motion";
import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaInstagram,
} from "react-icons/fa";

export default function ContactSection() {
    return (
        <section id="contact" className="py-24">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* SOL TARAF – METİN */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl font-bold">
                        İletişim
                    </h2>

                    <h3 className="text-xl font-semibold">
                        Benimle İletişime Geç
                    </h3>

                    <p className="text-gray-400 leading-relaxed max-w-md">
                        Yeni bir proje, iş birliği veya fikir hakkında
                        konuşmak istersen benimle dilediğin kanaldan
                        iletişime geçebilirsin.
                    </p>

                    <a
                        href="mailto:mahmutozsoy2604@gmail.com"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                       border border-gray-800 bg-black/40 backdrop-blur
                       hover:border-green-500 hover:text-green-400 transition"
                    >
                        Mail Gönder →
                    </a>
                </motion.div>

                {/* SAĞ TARAF – İKON KARTLAR */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex md:justify-end"
                >
                    <div className="flex flex-col gap-4">

                        {[
                            {
                                href: "mailto:mahmutozsoy2604@gmail.com",
                                icon: <FaEnvelope />,
                            },
                            {
                                href: "https://github.com/mahmutozsoy21",
                                icon: <FaGithub />,
                            },
                            {
                                href: "https://www.linkedin.com/in/mahmuttozsoy/",
                                icon: <FaLinkedin />,
                            },
                            {
                                href: "https://www.instagram.com/mahmuttozsoy/",
                                icon: <FaInstagram />,
                            },
                        ].map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                whileHover={{ y: -6, scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="w-12 h-12 flex items-center justify-center
                           rounded-full border border-gray-800
                           bg-black/40 backdrop-blur
                           hover:border-green-500 hover:text-green-400 transition"
                            >
                                {item.icon}
                            </motion.a>
                        ))}

                    </div>
                </motion.div>

            </div>
        </section>
    );
}
