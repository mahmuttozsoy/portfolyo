"use client";

import { motion } from "framer-motion";

const aboutCards = [
    {
        title: "Üniversite Hayatı",
        icon: "🎓",
        description:
            "Bilgisayar mühendisliği eğitimi sürecimde yazılım geliştirme, algoritmalar ve yapay zekâ alanlarında yoğunlaştım. Akademik projeleri gerçek dünya problemleriyle birleştirmeye odaklandım.",
    },
    {
        title: "Flutter & Mobil Geliştirme",
        icon: "📱",
        description:
            "Flutter ile modern, performanslı ve kullanıcı dostu mobil uygulamalar geliştiriyorum. Temiz mimari, state management ve ölçeklenebilir yapı benim için öncelikli.",
    },
    {
        title: "Görüntü İşleme",
        icon: "👁️",
        description:
            "Görüntü işleme alanında nesne tespiti, sınıflandırma ve görsel analiz üzerine çalışmalar yaptım. Özellikle tarım ve akıllı sistemlerde pratik çözümler üretiyorum.",
    },
    {
        title: "Makine Öğrenmesi",
        icon: "🤖",
        description:
            "Veri analizi, model eğitimi ve değerlendirme süreçlerinde makine öğrenmesi algoritmalarını aktif olarak kullanıyorum. Overfitting, bias–variance gibi konulara özellikle dikkat ederim.",
    },
    {
        title: "Derin Öğrenme",
        icon: "🧠",
        description:
            "YOLO, CNN tabanlı mimariler ve derin öğrenme modelleri ile gerçek zamanlı ve yüksek doğruluklu sistemler geliştiriyorum. Model performansı ve optimizasyon önceliğimdir.",
    },
    {
        title: "Yapay Zekâ Uygulamaları",
        icon: "⚙️",
        description:
            "Yapay zekâ tabanlı çözümler geliştirerek, gerçek dünya problemlerine yenilikçi yaklaşımlar sunuyorum. Tarım, sağlık ve otomasyon gibi alanlarda projeler gerçekleştirdim.",
    },
];

export default function AboutSection() {
    return (
        <section id="about" className="py-24">
            <div className="max-w-6xl mx-auto px-6">

                {/* Başlık */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12"
                >
                    Hakkımda
                </motion.h2>

                {/* Kartlar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {aboutCards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="relative border border-gray-800 rounded-xl p-6 bg-black/40 backdrop-blur hover:border-green-300 transition"
                        >
                            <div className="text-3xl mb-4">{card.icon}</div>

                            <h3 className="text-xl font-semibold mb-2">
                                {card.title}
                            </h3>

                            <p className="text-gray-400 text-sm leading-relaxed">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
