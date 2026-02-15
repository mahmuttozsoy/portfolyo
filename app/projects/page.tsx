"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from "react-icons/fa";

interface Project {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    image?: string;
    tags?: string | null;
    demoUrl?: string;
    repoUrl?: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">

                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors">
                        <FaArrowLeft /> Ana Sayfaya Dön
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-4">
                        Tüm Projeler
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        Geliştirdiğim web, mobil ve yapay zeka projelerinin tamamı.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-[400px] bg-zinc-900 rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                variants={itemVariants}
                                className="group relative bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-colors duration-300 flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-3 text-gray-400 shrink-0 ml-2">
                                            {project.repoUrl && (
                                                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors z-10">
                                                    <FaGithub size={18} />
                                                </a>
                                            )}
                                            {project.demoUrl && (
                                                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors z-10">
                                                    <FaExternalLinkAlt size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                                        {project.shortDescription}
                                    </p>

                                    {/* Tags */}
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        {project.tags?.split(',').map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 text-[10px] font-medium text-emerald-300 bg-emerald-900/20 border border-emerald-900/30 rounded-full"
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>

                                    <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0" aria-label={`View ${project.title}`} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </main>
    );
}
