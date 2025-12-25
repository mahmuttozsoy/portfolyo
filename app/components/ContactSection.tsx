"use client";

import {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
    FaInstagram,
} from "react-icons/fa";

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="min-h-[60vh] flex items-center"
        >
            <div className="max-w-6xl mx-auto w-full px-6
                      grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* SOL TARAF – METİN */}
                <div className="space-y-6">
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
                        className="inline-block px-6 py-3 rounded-full border
                       hover:bg-gray-800 transition"
                    >
                        Mail Gönder →
                    </a>
                </div>

                {/* SAĞ TARAF – İKONLAR */}
                <div className="flex md:justify-end">
                    <div className="flex flex-col gap-4">
                        <a
                            href="mailto:mahmutozsoy2604@gmail.com"
                            className="w-12 h-12 flex items-center justify-center
                         rounded-full border hover:bg-gray-800 transition"
                        >
                            <FaEnvelope />
                        </a>

                        <a
                            href="https://github.com/mahmutozsoy21"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center
                         rounded-full border hover:bg-gray-800 transition"
                        >
                            <FaGithub />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/mahmuttozsoy/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center
                         rounded-full border hover:bg-gray-800 transition"
                        >
                            <FaLinkedin />
                        </a>

                        <a
                            href="https://www.instagram.com/mahmuttozsoy/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center
                         rounded-full border hover:bg-gray-800 transition"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
