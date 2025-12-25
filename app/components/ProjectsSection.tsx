"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ProjectsSection() {
    return (
        <section id="projects" className="space-y-6">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="text-3xl font-bold"
            >
                Projeler
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="border border-gray-800 rounded-lg p-5"
            >
                <h6 className="font-semibold text-lg">
                    Akıllı Ev Otomasyon Sistemi
                </h6>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    <h5>IoT ve yapay zekâ destekli ev otomasyonu sistemi.</h5>
                </p>

                <Image
                    src="/images/download.png"
                    alt="Akıllı Ev Otomasyon Sistemi"
                    width={400}
                    height={250}
                    className="rounded mb-3"
                />


            </motion.div>
        </section>
    );
}
