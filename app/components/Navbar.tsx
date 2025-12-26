"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";




const navItems = [
    { label: "Ana Sayfa", href: "#home" },
    { label: "Hakkımda", href: "#about" },
    { label: "Projeler", href: "#projects" },
    { label: "İletişim", href: "#contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="border-b border-gray-800 relative">
            <nav className="max-w-5xl mx-auto flex justify-between items-center p-4 relative">
                <button
                    className="md:hidden text-gray-300 hover:text-white transition"
                    onClick={() => setOpen(!open)}
                    aria-label="Menüyü aç"
                >
                    {open ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* logo removed per request */}

                <ul className="hidden md:flex ml-auto gap-8 text-lg md:text-xl uppercase tracking-wider font-semibold">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className="text-emerald-200 hover:text-emerald-300 transition focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            {open && (
                <div className="md:hidden border-t border-gray-800
                  bg-black/90 backdrop-blur">
                    <ul className="flex flex-col items-center gap-6 py-6">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="text-gray-300 hover:text-emerald-400 transition text-lg"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}


        </header>
    );
}
