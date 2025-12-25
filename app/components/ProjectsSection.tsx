"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
    {
        title: "Akıllı Ev Otomasyon Sistemi",
        description:
            "IoT ve yapay zekâ destekli, sensör verileriyle çalışan akıllı ev otomasyonu sistemi.",
        image: "/images/downlod.png",
    },
    {
        title: "Domates Yaprak Hastalığı Tespiti",
        description:
            "YOLOv8 ve derin öğrenme kullanılarak domates yapraklarındaki hastalıkları tespit eden yapay zekâ sistemi. Mobil ve API entegrasyonu ile gerçek zamanlı analiz.",
        image: "/images/tomato.png",
    },
    {
        title: "CampusApp",
        description:
            "Üniversite öğrencileri için kampüs, yurt ve çevre hizmetlerini tek uygulamada toplayan mobil platform. Flutter, API ve modüler mimari ile geliştirildi.",
        image: "/images/campus.png",
    },
    {
        title: "İlaç Asistan",
        description:
            "Karekod/GTIN tarama ile ilaç bilgilerini sunan, hasta dostu mobil uygulama. Yerel veritabanı ve yapay zekâ destekli açıklamalar içerir.",
        image: "/images/medicine.png",
    },

];

export default function ProjectsSection() {
    return (
        <section id="projects" className="space-y-10">
            {/* Başlık */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="text-3xl font-bold"
            >
                Projeler
            </motion.h2>

            {/* Proje Listesi */}
            <div className="space-y-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="border border-gray-800 rounded-xl p-6
                       grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
                    >
                        {/* Metin */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 text-sm leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Görsel */}
                        <div className="flex justify-center md:justify-end">
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={420}
                                height={260}
                                className="rounded-lg"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
