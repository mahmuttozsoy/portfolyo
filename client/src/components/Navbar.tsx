"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import Image from "./Image";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Hakkımda", href: "about" },
    { label: "Projeler", href: "projects" },
    { label: "İletişim", href: "contact" },
];

export default function Navbar({ pathname }: { pathname: string }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [open]);

    const resolveHref = (section: string) => {
        if (section === "/") return "/";
        return pathname === "/" ? `#${section}` : `/#${section}`;
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-black/70 backdrop-blur-md border-b border-gray-800/50 py-3"
                    : "bg-transparent py-5"
                    }`}
            >
                <nav className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    {/* LOGO */}
                    <Link to="/" className="relative z-50 group flex items-center gap-3">
                        <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-zinc-800 flex items-center justify-center">
                            <Image src="/images/logomm.png" alt="Logo" width={40} height={40} className="object-cover" />
                        </div>
                        <span className="font-bold text-lg tracking-wide group-hover:text-emerald-400 transition-colors">
                            MAHMUT ÖZSOY
                        </span>
                    </Link>

                    {/* DESKTOP MENU */}
                    <ul className="hidden md:flex gap-8 items-center">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    to={resolveHref(item.href)}
                                    className="relative text-sm uppercase tracking-widest font-medium text-gray-400 hover:text-white transition-colors py-2 group"
                                >
                                    {item.label}
                                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left" />
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a
                                href="mailto:mahmutozsoy2604@gmail.com"
                                className="ml-4 px-5 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-600/20 rounded-full text-sm font-medium transition-all hover:scale-105"
                            >
                                İletişime Geç
                            </a>
                        </li>
                    </ul>

                    {/* MOBILE MENU TOGGLE */}
                    <button
                        className="md:hidden relative z-50 text-gray-300 hover:text-white transition p-2"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle Menu"
                    >
                        {open ? null : <FiMenu size={28} />}
                    </button>
                </nav>
            </header>

            {/* MOBILE OVERLAY - MOVED OUTSIDE HEADER */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 flex flex-col md:hidden"
                        style={{
                            backgroundColor: "#000000",
                            zIndex: 99999,
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh"
                        }}
                    >
                        {/* Close Button Header */}
                        <div className="flex justify-between items-center p-6 border-b border-zinc-900">
                            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                                <div className="relative w-8 h-8 overflow-hidden rounded-lg bg-zinc-800">
                                    <Image src="/images/logomm.png" alt="Logo" width={32} height={32} className="object-cover" />
                                </div>
                                <span className="font-bold text-white">MAHMUT ÖZSOY</span>
                            </Link>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 text-zinc-400 hover:text-white transition-colors"
                            >
                                <FiX size={32} />
                            </button>
                        </div>

                        {/* Menu Content */}
                        <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6 overflow-y-auto">
                            <div className="flex flex-col items-center gap-6">
                                {navItems.map((item, idx) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.1 }}
                                    >
                                        <Link
                                            to={resolveHref(item.href)}
                                            onClick={() => setOpen(false)}
                                            className="text-3xl font-black tracking-tighter text-white hover:text-emerald-400 transition-colors uppercase"
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.3 }}
                                className="w-12 h-[2px] bg-emerald-500/50"
                            />

                            <div className="flex gap-4">
                                <a href="https://www.instagram.com/mahmuttozsoy/" target="_blank" className="p-3 bg-zinc-900 rounded-xl text-zinc-400 hover:text-white border border-zinc-800">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="https://www.linkedin.com/in/mahmuttozsoy/" target="_blank" className="p-3 bg-zinc-900 rounded-xl text-zinc-400 hover:text-white border border-zinc-800">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                </a>
                                <a href="mailto:mahmutozsoy2604@gmail.com" target="_blank" className="p-3 bg-zinc-900 rounded-xl text-zinc-400 hover:text-white border border-zinc-800">
                                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </a>
                            </div>

                            <motion.a
                                href="tel:05510549921"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-3 w-full justify-center shadow-lg shadow-emerald-500/20"
                            >
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 512-255.9 512-512 0-11.3-7.8-20.9-18.6-23.4z"></path></svg>
                                0551 054 99 21
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
