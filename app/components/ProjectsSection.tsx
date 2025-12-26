"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
    {
        title: "Domates Yaprak Hastalığı Tespiti",
        slug: "domates-yaprak-hastaligi",
        shortDescription:
            "YOLOv8 ve derin öğrenme ile domates yapraklarındaki hastalıkları tespit eden, mobil ve API entegrasyonlu yapay zekâ sistemi.",
        image: "/images/tomato.png",
    },
    {
        title: "İlaç Asistan",
        slug: "ilac-asistan",
        shortDescription:
            "Karekod/GTIN tarama ile ilaç bilgilerini sunan, yapay zekâ destekli hasta dostu mobil uygulama.",
        image: "",
    },
];

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-16">
            <div className="max-w-6xl mx-auto px-6">

                {/* Başlık */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-emerald-200"
                >
                    Projeler
                </motion.h2>

                {/* Kartlar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <motion.a
                            key={project.slug}
                            href={`/projects/${project.slug}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative border border-gray-800 rounded-xl overflow-hidden
                                 bg-black/40 backdrop-blur hover:border-emerald-300 transition"
                        >
                            {/* Görsel (sadece proje için image tanımlıysa göster) */}
                            {project.image && (
                                <div className="overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        width={600}
                                        height={320}
                                        className="object-cover w-full h-[180px] md:h-[220px] group-hover:scale-105 transition"
                                    />
                                </div>
                            )}

                            {/* İçerik */}
                            <div className="p-6 space-y-3">
                                <h3 className="text-xl font-semibold">
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {project.shortDescription}
                                </p>

                                <span className="inline-block text-sm text-emerald-300 group-hover:underline">
                                    Detayları Gör →
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>

            </div>
        </section>
    );
}
