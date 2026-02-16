"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Education {
    id: string;
    schoolName: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
}

export default function EducationSection() {
    const [educations, setEducations] = useState<Education[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/education');
                if (res.ok) {
                    const data = await res.json();
                    setEducations(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch education", error);
            }
        };
        fetchData();
    }, []);

    if (educations.length === 0) return null;

    return (
        <section id="education" className="py-20 bg-zinc-900/30">
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-emerald-400"
                >
                    Eğitim
                </motion.h2>

                <div className="grid gap-8">
                    {educations.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-black/40 p-6 rounded-xl border border-zinc-800 hover:border-emerald-500/30 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-white">{edu.schoolName}</h3>
                                <div className="text-sm text-gray-500">
                                    {new Date(edu.startDate).getFullYear()}
                                    {(edu.isCurrent || !edu.endDate) ? " - Devam Ediyor" : ` - ${new Date(edu.endDate).getFullYear()}`}
                                </div>
                            </div>
                            <div className="text-emerald-300 font-medium">{edu.degree}</div>
                            <p className="text-gray-400 mt-2">{edu.fieldOfStudy}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
