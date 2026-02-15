"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Experience {
    id: string;
    companyName: string;
    position: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    description: string;
    location: string;
}

export default function ExperienceSection() {
    const [experiences, setExperiences] = useState<Experience[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/profile');
                if (res.ok) {
                    const data = await res.json();
                    setExperiences(data.data.experiences);
                }
            } catch (error) {
                console.error("Failed to fetch experiences", error);
            }
        };
        fetchData();
    }, []);

    if (experiences.length === 0) return null;

    return (
        <section id="experience" className="py-20">
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-emerald-400"
                >
                    Deneyim
                </motion.h2>

                <div className="space-y-12 border-l-2 border-emerald-900/50 pl-8 ml-4">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-black" />

                            <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                            <div className="text-emerald-300 font-medium mb-1">{exp.companyName}</div>
                            <div className="text-sm text-gray-500 mb-4">
                                {new Date(exp.startDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })} -
                                {exp.isCurrent ? " Günümüz" : (exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })}` : "")}
                                {exp.location && ` | ${exp.location}`}
                            </div>
                            <p className="text-gray-400 whitespace-pre-line">{exp.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
