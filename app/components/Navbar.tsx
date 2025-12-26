"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";




const navItems = [
    { label: "Ana Sayfa", href: "#home" },
    { label: "Hakkımda", href: "#about" },
    { label: "Projeler", href: "#projects" },
    { label: "İletişim", href: "#contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <header className="border-b border-gray-800 sticky top-0 z-40 bg-gray-950">
            <nav className="max-w-5xl mx-auto flex justify-between items-center p-4 relative">
                <button
                    className="md:hidden text-gray-300 hover:text-white transition"
                    onClick={() => setOpen(!open)}
                    aria-label="Menüyü aç"
                >
                    {open ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
                {/* LOGO */}
                <Link href="https://www.mahmutozsoy.dev" className="flex items-center gap-2 mt-4 hover:opacity-80 hover:scale-105 transition">
                    <img
                        src="/images/logomm.png"
                        alt="Mahmut Özsoy Logo"
                        width={120}
                        height={120}
                        className="hover:opacity-80 transition"
                    />
                </Link>

                <ul className="hidden md:flex ml-auto gap-8 text-lg md:text-xl uppercase tracking-wider font-semibold">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className="relative px-1 pb-1 text-emerald-200 hover:text-emerald-300 transition rounded
                                    after:absolute after:left-1 after:right-1 after:bottom-0 after:h-2 after:rounded-b-full after:transition-all after:duration-300 after:content-['']
                                    after:bg-emerald-400/30 after:blur after:opacity-0 hover:after:opacity-80"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            {open && (
                <div className="md:hidden border-t border-gray-800 bg-black/90 backdrop-blur">
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