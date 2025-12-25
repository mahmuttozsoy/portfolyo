"use client";

import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="space-y-32">

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">

        {/* Arka plan yazı */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[20rem] font-bold text-gray-400 select-none">

          </span>
        </div>

        {/* İçerik */}
        <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-16 min-h-screen">

          {/* SOL KOLON */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >

            <p className="text-3xl text-gray-400 font-bold">Mahmut Özsoy</p>


            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-green-200">
              Software <br /> Engineer
            </h1>


            <p className="max-w-md text-gray-300 leading-relaxed">
              Yapay zekâ, mobil uygulama ve akıllı sistemler üzerine çalışan
              bir yazılım mühendisiyim. Gerçek dünya problemlerine
              yenilikçi çözümler getirirken performans ve kullanıcı
              deneyimini ön planda tutarım.
            </p>

            {/* Sosyal ikonlar */}
            <div className="flex gap-4 pt-4">
              {[
                {
                  href: "mailto:mahmutozsoy2604@gmail.com",
                  icon: <FaEnvelope />,
                },
                {
                  href: "https://github.com/mahmutozsoy21",
                  icon: <FaGithub />,
                },
                {
                  href: "https://www.linkedin.com/in/mahmuttozsoy/",
                  icon: <FaLinkedin />,
                },
                {
                  href: "https://www.instagram.com/mahmuttozsoy",
                  icon: <FaInstagram />,
                }

              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ y: -6, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-12 h-12 flex items-center justify-center
                             rounded-full border border-gray-800
                             bg-black/40 backdrop-blur
                             hover:border-green-500 hover:text-green-400 transition"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* SAĞ KOLON – GÖRSEL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-[280px] h-[360px] rounded-2xl overflow-hidden
                            rotate-6 hover:rotate-0 transition-transform duration-500
                            border border-gray-500/30 shadow-2xl">
              <Image
                src="/images/mahmut.jpeg"
                alt="Mahmut Özsoy"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* DİĞER BÖLÜMLER */}
      <AboutSection />
      <ProjectsSection />
      <ContactSection />

    </main>
  );
}
