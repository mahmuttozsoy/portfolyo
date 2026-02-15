"use client";

import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import EducationSection from "./components/EducationSection";
import SkillSection from "./components/SkillSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white font-sans selection:bg-emerald-500/30">

      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">

        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for new projects
          </motion.div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
            <span className="block text-gray-500 text-2xl md:text-4xl lg:text-5xl font-light mb-2 tracking-normal">
              Hi, I'm Mahmut Özsoy
            </span>
            <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
              Software Engineer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Specializing in <span className="text-emerald-400 font-medium">Artificial Intelligence</span>, <span className="text-blue-400 font-medium">Mobile Development (Flutter)</span>, and building intelligent systems that solve real-world problems.
          </p>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
            <a
              href="#projects"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-full transition-all backdrop-blur-sm"
            >
              Contact Me
            </a>
          </div>

          {/* Socials */}
          <div className="flex gap-6 justify-center pt-12 text-gray-400">
            {[
              { icon: FaGithub, href: "https://github.com/mahmuttozsoy" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/mahmuttozsoy/" },
              { icon: FaInstagram, href: "https://www.instagram.com/mahmuttozsoy" },
              { icon: FaEnvelope, href: "mailto:mahmutozsoy2604@gmail.com" },
            ].map((Item, i) => (
              <a
                key={i}
                href={Item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:scale-110 transition-transform duration-200"
              >
                <Item.icon size={24} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-sm"
        >
          <span>Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        </motion.div>
      </section>

      <div className="space-y-32 pb-32">
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillSection />
        <ProjectsSection />
        <ContactSection />
      </div>

    </main>
  );
}
