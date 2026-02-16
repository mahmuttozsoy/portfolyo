"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Skill {
    id: string;
    name: string;
    category: string;
}

export default function SkillSection() {
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/skills');
                if (res.ok) {
                    const data = await res.json();
                    setSkills(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch skills", error);
            }
        };
        fetchData();
    }, []);

    if (skills.length === 0) return null;

    // Group skills by category
    const groupedSkills: Record<string, Skill[]> = skills.reduce((acc, skill) => {
        const category = skill.category || 'OTHER';
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <section id="skills" className="py-20">
            <div className="max-w-6xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-emerald-400 text-center"
                >
                    Yetenekler
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(groupedSkills).map(([category, items], index) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800"
                        >
                            <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
                                {category.replace('_', ' ')}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {items.map(skill => (
                                    <span
                                        key={skill.id}
                                        className="px-3 py-1 bg-emerald-900/20 text-emerald-300 text-sm rounded-lg border border-emerald-900/30"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
