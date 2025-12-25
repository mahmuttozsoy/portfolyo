"use client";

import Link from "next/link";

const navItems = [
    { label: "Ana Sayfa", href: "#home" },
    { label: "Projeler", href: "#projects" },
    { label: "Hakkımda", href: "#about" },
    { label: "İletişim", href: "#contact" },
];

export default function Navbar() {
    return (
        <header className="border-b border-gray-800">
            <nav className="max-w-5xl mx-auto flex justify-between items-center p-4">
                <span className="font-bold text-lg">Mahmudumm</span>

                <ul className="flex gap-6 text-sm">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className="text-gray-400 hover:text-white transition"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
