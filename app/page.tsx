"use client";

import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Image from "next/image";
import { motion } from "framer-motion";

// Removed duplicate import of motion and AnimatePresence
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram
} from "react-icons/fa";


export default function Home() {

  return (
    <>


      <main className="space-y-6">

        {/* HERO */}
        <section className="relative min-h-[60vh] overflow-hidden">



          {/* İçerik */}
          <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 min-h-[65vh] md:min-h-[85vh]">

            {/* SOL KOLON */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >

              <h2
                className="
    text-[clamp(2.8rem,5vw,3.2rem)]
 md:text-5xl
    font-medium
    tracking-wide
    mb-2
    bg-gradient-to-r
    from-gray-400
    via-gray-300
    to-gray-100
    bg-clip-text
    text-transparent
  "
              >
                Mahmut Özsoy
              </h2>



              <h1 className="text-6xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-emerald-100 via-emerald-0 to-emerald-0 bg-clip-text text-transparent">
                Software <br /> Engineer
              </h1>


              <h2 className="max-w-md text-gray-300/90 leading-relaxed text-base md:text-lg text-">
                Yapay zekâ ve mobil uygulama üzerine çalışan bir yazılım
                mühendisiyim. Gerçek dünya problemlerine yenilikçi çözümler
                getirirken performans ve kullanıcı deneyimini ön planda tutarım.

              </h2>

              {/* Sosyal ikonlar */}
              <div className="flex gap-4 pt-4">
                {[
                  {
                    href: "mailto:mahmutozsoy2604@gmail.com",
                    icon: <FaEnvelope />,
                    label: "E-posta",
                  },
                  {
                    href: "https://github.com/mahmuttozsoy",
                    icon: <FaGithub />,
                    label: "GitHub",
                  },
                  {
                    href: "https://www.linkedin.com/in/mahmuttozsoy/",
                    icon: <FaLinkedin />,
                    label: "LinkedIn",
                  },
                  {
                    href: "https://www.instagram.com/mahmuttozsoy",
                    icon: <FaInstagram />,
                    label: "Instagram",
                  }

                ].map((item, index) => (
                  <div key={index} className="relative">
                    <motion.a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      title={item.label}
                      whileHover={{ y: -8, scale: 1.121, rotate: 6 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group
w-16 h-16 md:w-16 md:h-16
flex items-center justify-center
rounded-full
border border-gray-700
bg-black/40 backdrop-blur
text-gray-300
hover:border-gray-300
hover:text-gray-100
hover:shadow-lg
hover:shadow-white/20
text-2xl md:text-2xl
transition-all duration-300
hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]

"
                    >
                      <span className="pointer-events-none">{item.icon}</span>
                    </motion.a>

                    {/* Tooltip */}
                    <span className="absolute -bottom-9 left-1/2 transform -translate-x-1/2 bg-black/80 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* SAĞ KOLON – GÖRSEL */}
            <motion.div

              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center md:justify-end space-y-6 text-center md:text-left"

            >
              <motion.div
                whileHover={{ rotate: 0, scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="relative w-[220px] h-[300px] md:w-[280px] md:h-[360px] rounded-3xl overflow-hidden
                              rotate-6 hover:rotate-0 transition-transform duration-500
                              border border-gray-500/30 shadow-2xl mt-8 md:mt-0"
              >
                <Image
                  src="/images/foto.JPG"
                  alt="Mahmut Özsoy"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none rounded-3xl" />
              </motion.div>
            </motion.div>

          </div>
        </section>
        {/* DİĞER BÖLÜMLER */}

        <hr
          className="my-12 mx-auto max-w-4xl border-0 h-[2px] bg-gradient-to-r from-transparent via-gray-300/80 to-transparent rounded-full shadow-[0_0_6px_rgba(255,255,255,0.25)]"
        />

        <AboutSection />
        <hr
          className="my-12 mx-auto max-w-4xl border-0 h-[2px] bg-gradient-to-r from-transparent via-gray-300/80 to-transparent rounded-full shadow-[0_0_6px_rgba(255,255,255,0.25)]"
        />

        <ProjectsSection />
        <hr
          className="my-12 mx-auto max-w-4xl border-0 h-[2px] bg-gradient-to-r from-transparent via-gray-300/80 to-transparent rounded-full shadow-[0_0_6px_rgba(255,255,255,0.25)]"
        />

        <ContactSection />


      </main >
    </>
  );
}
