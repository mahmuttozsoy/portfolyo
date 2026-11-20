"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaExternalLinkAlt,
  FaPaperPlane,
} from "react-icons/fa";
import {
  fallbackProfile,
  fallbackExperiences,
  fallbackEducations,
  fallbackSkills,
  fallbackProjects,
} from "@/lib/fallbackData";

// HAKKIMDA (About)
function AboutSection() {
  const [profile, setProfile] = useState<any>(fallbackProfile);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const json = await res.json();
          if (json.data?.profile) {
            setProfile(json.data.profile);
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    })();
  }, []);

  return (
    <section id="about" className="py-20 bg-zinc-900/30">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-emerald-400"
        >
          Hakkımda
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-6 text-gray-300 leading-relaxed text-lg"
        >
          {profile ? (
            <>
              <p className="whitespace-pre-line">{profile.bio}</p>
              <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-400">
                {profile.location && <span>📍 {profile.location}</span>}
                {profile.title && <span>💼 {profile.title}</span>}
              </div>
            </>
          ) : (
            <p className="text-gray-400">Yükleniyor...</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// DENEYİM (Experience)
function ExperienceSection() {
  const [experiences, setExperiences] = useState<any[]>(fallbackExperiences);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const json = await res.json();
          if (json.data?.experiences && json.data.experiences.length > 0) {
            setExperiences(json.data.experiences);
          }
        }
      } catch (err) {
        console.error("Failed to fetch experiences", err);
      }
    })();
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
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id || idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="relative"
            >
              <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-black" />
              <h3 className="text-xl font-bold text-white">{exp.position}</h3>
              <div className="text-emerald-300 font-medium mb-1">
                {exp.companyName}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                {exp.startDate
                  ? new Date(exp.startDate).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                    })
                  : ""}
                {" - "}
                {exp.isCurrent
                  ? "Günümüz"
                  : exp.endDate
                  ? new Date(exp.endDate).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                    })
                  : ""}
                {exp.location ? ` | ${exp.location}` : ""}
              </div>
              <p className="text-gray-400 whitespace-pre-line">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// EĞİTİM (Education)
function EducationSection() {
  const [educations, setEducations] = useState<any[]>(fallbackEducations);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const json = await res.json();
          if (json.data?.educations && json.data.educations.length > 0) {
            setEducations(json.data.educations);
          }
        }
      } catch (err) {
        console.error("Failed to fetch education", err);
      }
    })();
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
          {educations.map((edu, idx) => (
            <motion.div
              key={edu.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="bg-black/40 p-6 rounded-xl border border-zinc-800 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">
                  {edu.schoolName}
                </h3>
                <div className="text-sm text-gray-500">
                  {edu.startDate ? new Date(edu.startDate).getFullYear() : ""}
                  {edu.isCurrent || !edu.endDate
                    ? " - Devam Ediyor"
                    : ` - ${new Date(edu.endDate).getFullYear()}`}
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

// YETENEKLER (Skills)
function SkillsSection() {
  const [skills, setSkills] = useState<any[]>(fallbackSkills);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const json = await res.json();
          if (json.data?.skills && json.data.skills.length > 0) {
            setSkills(json.data.skills);
          }
        }
      } catch (err) {
        console.error("Failed to fetch skills", err);
      }
    })();
  }, []);

  if (skills.length === 0) return null;

  const grouped = skills.reduce((acc: any, item: any) => {
    const cat = item.category || "OTHER";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

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
          {Object.entries(grouped).map(([category, list]: any, idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800"
            >
              <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
                {category.replace("_", " ")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {list.map((s: any) => (
                  <span
                    key={s.id || s.name}
                    className="px-3 py-1 bg-emerald-900/20 text-emerald-300 text-sm rounded-lg border border-emerald-900/30"
                  >
                    {s.name}
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

// PROJELER (Selected Works)
function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>(fallbackProjects);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) {
            setProjects(json.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
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
            <a
              href="https://github.com/mahmuttozsoy"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 group text-sm font-medium tracking-wide uppercase"
            >
              VIEW ALL PROJECTS
              <span className="block w-4 h-[1px] bg-emerald-400 group-hover:w-8 transition-all" />
            </a>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[400px] bg-zinc-900 rounded-2xl" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {projects.slice(0, 4).map((proj) => (
              <motion.div
                key={proj.id || proj.slug}
                variants={cardVariants}
                className="group relative bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-colors duration-300 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden bg-zinc-900">
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {proj.title}
                    </h3>
                    <div className="flex gap-3 text-gray-400">
                      {proj.repoUrl && (
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-white transition-colors"
                        >
                          <FaGithub size={20} />
                        </a>
                      )}
                      {proj.demoUrl && proj.demoUrl !== "#" && (
                        <a
                          href={proj.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-white transition-colors"
                        >
                          <FaExternalLinkAlt size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {proj.shortDescription}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {proj.tags?.split(",").map((t: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium text-emerald-300 bg-emerald-900/20 border border-emerald-900/30 rounded-full"
                      >
                        {t.trim()}
                      </span>
                    ))}
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

// İLETİŞİM FORMU (Contact)
function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Lütfen ad, e-posta ve mesaj alanlarını doldurun.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Geçerli bir e-posta adresi girin.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("message", message);
      formData.append("_replyto", email);

      const res = await fetch("https://formspree.io/f/xgoeyydy", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setIsSuccess(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const json = await res.json();
        setErrorMsg(json?.errors?.[0]?.message || "Gönderim başarısız oldu.");
      }
    } catch {
      setErrorMsg("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const socialLinks = [
    {
      href: "mailto:mahmutozsoy2604@gmail.com",
      icon: <FaEnvelope />,
      label: "E-posta",
      desc: "mahmutozsoy2604@gmail.com",
    },
    {
      href: "https://github.com/mahmuttozsoy",
      icon: <FaGithub />,
      label: "GitHub",
      desc: "Kod örnekleri ve projeler",
    },
    {
      href: "https://www.linkedin.com/in/mahmuttozsoy/",
      icon: <FaLinkedin />,
      label: "LinkedIn",
      desc: "Profesyonel profil",
    },
    {
      href: "https://www.instagram.com/mahmuttozsoy/",
      icon: <FaInstagram />,
      label: "Instagram",
      desc: "Güncellemeler ve paylaşımlar",
    },
  ];

  return (
    <section id="contact" className="py-12 md:py-24 relative">
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-900/10 rounded-full blur-[80px] md:blur-[128px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent mb-4">
              İletişim
            </h2>
            <div className="w-20 h-1 bg-emerald-500 rounded-full mb-6" />
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              Yeni bir proje, iş birliği veya sadece merhaba demek için aşağıdaki
              formu kullanabilirsiniz. En kısa sürede dönüş yapacağım.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adın"
                className="w-full px-5 py-4 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="E-posta adresin"
                className="w-full px-5 py-4 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
              />
            </div>

            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Konu"
              className="w-full px-5 py-4 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mesajınız"
              rows={5}
              className="w-full px-5 py-4 rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 resize-none transition-all"
            />

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-emerald-400 hover:text-black hover:scale-[1.02] disabled:opacity-50 transition-all"
            >
              {isSubmitting ? "Gönderiliyor..." : "Gönder"}
              <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
            </button>

            {isSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center">
                Mesajınız başarıyla gönderildi! En kısa sürede döneceğim.
              </div>
            )}
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {socialLinks.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + 0.1 * idx }}
              viewport={{ once: true }}
              className="group flex items-center gap-5 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-800/60 transition-all"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-zinc-800/80 text-2xl text-emerald-400 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  {item.label}
                </h4>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ANA SAYFA
export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white font-sans selection:bg-emerald-500/30">
      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for new projects
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
            <span className="block text-gray-500 text-2xl md:text-4xl lg:text-5xl font-light mb-2 tracking-normal">
              Hi, I&apos;m Mahmut Özsoy
            </span>
            <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
              Software Engineer
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Specializing in{" "}
            <span className="text-emerald-400 font-medium">
              Artificial Intelligence
            </span>
            ,{" "}
            <span className="text-blue-400 font-medium">
              Mobile Development (Flutter)
            </span>
            , and building intelligent systems that solve real-world problems.
          </p>

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

          <div className="flex gap-6 justify-center pt-12 text-gray-400">
            <a
              href="https://github.com/mahmuttozsoy"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white hover:scale-110 transition-transform"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/mahmuttozsoy/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white hover:scale-110 transition-transform"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://www.instagram.com/mahmuttozsoy/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white hover:scale-110 transition-transform"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="mailto:mahmutozsoy2604@gmail.com"
              className="hover:text-white hover:scale-110 transition-transform"
            >
              <FaEnvelope size={24} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-sm"
        >
          <span>Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
        </motion.div>
      </section>

      {/* SECTIONS */}
      <div className="space-y-32 pb-32">
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  );
}
