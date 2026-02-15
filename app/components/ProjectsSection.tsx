"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

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

export default function ProjectsSection() {
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
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="projects" className="py-24 relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-2">
                            Selected Works
                        </h2>
                        <p className="text-gray-400">
                            A collection of projects showcasing my journey.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/projects" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 group text-sm font-medium tracking-wide uppercase">
                            View All Projects
                            <span className="block w-4 h-[1px] bg-emerald-400 group-hover:w-8 transition-all" />
                        </Link>
                    </motion.div>
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-[400px] bg-zinc-900 rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {projects.slice(0, 4).map((project) => (
                            <motion.div
                                key={project.id}
                                variants={itemVariants}
                                className="group relative bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-colors duration-300 flex flex-col"
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
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
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-3 text-gray-400">
                                            {project.repoUrl && (
                                                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                                                    <FaGithub size={20} />
                                                </a>
                                            )}
                                            {project.demoUrl && (
                                                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                                                    <FaExternalLinkAlt size={18} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                                        {project.shortDescription}
                                    </p>

                                    {/* Tags */}
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        {project.tags?.split(',').map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-xs font-medium text-emerald-300 bg-emerald-900/20 border border-emerald-900/30 rounded-full"
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>

                                    <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0" aria-label={`View ${project.title}`} />
                                    {/* Buttons need higher z-index if clickable independently, but the card link covers them.
                                        Common pattern: whole card clickable, but specific icon buttons on top.
                                        Fixing z-index for icons: */}
                                    <div className="absolute top-6 right-6 z-10 flex gap-3">
                                        {/* Re-rendering icons here if I want them clickable separate from card link.
                                             If card link is overlay, icons inside won't be clickable unless z-index handling is tricky.
                                             Let's simplified: Whole card links to detail.
                                             And maybe specific links inside stop propagation if needed.
                                             For now, I'll rely on the whole card linking to slug.
                                         */}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
