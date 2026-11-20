export const fallbackProfile = {
  fullName: "Mahmut Özsoy",
  title: "Yazılım Mühendisi & AI Geliştirici",
  bio: "Yapay Zeka ve Mobil Uygulama geliştirme alanlarında tutkulu bir Yazılım Mühendisi. Flutter ile mobil uygulamalar, Python ile derin öğrenme modelleri ve Next.js ile modern web siteleri geliştiriyorum. Karmaşık problemleri çözmekten ve kullanıcı dostu ürünler ortaya çıkarmaktan keyif alıyorum.",
  location: "Eskişehir, Türkiye",
  phone: "+90 555 555 55 55",
  githubUrl: "https://github.com/mahmuttozsoy",
  linkedinUrl: "https://www.linkedin.com/in/mahmuttozsoy/",
  websiteUrl: "https://ucmimarlik.com.tr"
};

export const fallbackExperiences = [
  {
    id: "exp_1",
    companyName: "Freelance",
    position: "Full Stack Geliştirici",
    employmentType: "FREELANCE",
    location: "Remote",
    startDate: "2023-01-01",
    endDate: null,
    isCurrent: true,
    description: "Çeşitli müşteriler için web ve mobil uygulamalar geliştiriyorum. Flutter, React ve Node.js teknolojilerini kullanarak özel çözümler üretiyorum."
  },
  {
    id: "exp_2",
    companyName: "Teknoloji Şirketi",
    position: "Stajyer Yazılım Mühendisi",
    employmentType: "INTERNSHIP",
    location: "İstanbul",
    startDate: "2022-06-01",
    endDate: "2022-09-01",
    isCurrent: false,
    description: "Yapay zeka destekli görüntü işleme projelerinde görev aldım. Python ve OpenCV kütüphanelerini kullanarak veri setleri hazırladım ve model eğitimi süreçlerine katkıda bulundum."
  }
];

export const fallbackEducations = [
  {
    id: "edu_1",
    schoolName: "Eskişehir Osmangazi Üniversitesi",
    degree: "Lisans",
    fieldOfStudy: "Bilgisayar Mühendisliği",
    startDate: "2020-09-01",
    endDate: "2024-06-01",
    grade: "3.50",
    isCurrent: false,
    description: "Yapay Zeka, Veri Yapıları ve Algoritmalar üzerine yoğunlaştım."
  }
];

export const fallbackSkills = [
  { id: "s1", name: "Flutter", category: "MOBILE", level: "EXPERT" },
  { id: "s2", name: "Dart", category: "MOBILE", level: "EXPERT" },
  { id: "s3", name: "Python", category: "AI", level: "ADVANCED" },
  { id: "s4", name: "YOLOv8", category: "AI", level: "ADVANCED" },
  { id: "s5", name: "TensorFlow", category: "AI", level: "INTERMEDIATE" },
  { id: "s6", name: "React", category: "FRONTEND", level: "ADVANCED" },
  { id: "s7", name: "Next.js", category: "FRONTEND", level: "ADVANCED" },
  { id: "s8", name: "TypeScript", category: "FRONTEND", level: "ADVANCED" },
  { id: "s9", name: "Tailwind CSS", category: "FRONTEND", level: "EXPERT" },
  { id: "s10", name: "Node.js", category: "BACKEND", level: "INTERMEDIATE" },
  { id: "s11", name: "MySQL", category: "DATABASE", level: "INTERMEDIATE" },
  { id: "s12", name: "Prisma", category: "DATABASE", level: "INTERMEDIATE" },
  { id: "s13", name: "Git", category: "DEVOPS", level: "ADVANCED" }
];

export const fallbackProjects = [
  {
    id: "proj_1",
    title: "AI Voice Assistant",
    slug: "ai-voice-assistant",
    shortDescription: "Gelişmiş sesli komut işleme ve doğal dil anlama özelliklerine sahip akıllı asistan.",
    description: "Python ve NLP kütüphaneleri kullanılarak geliştirilen bu asistan, kullanıcı komutlarını anlar ve çeşitli görevleri yerine getirir. Ev otomasyonu entegrasyonu mevcuttur.",
    image: "https://placehold.co/800x600/7e22ce/ffffff?text=AI+Voice+Assistant",
    tags: "Python, AI, NLP, Voice Recognition",
    repoUrl: "https://github.com/mahmuttozsoy/voice-assistant",
    demoUrl: "#",
    isFeatured: true
  },
  {
    id: "proj_2",
    title: "Modern E-Ticaret Uygulaması",
    slug: "ecommerce-mobile-app",
    shortDescription: "Flutter ile geliştirilmiş, yüksek performanslı ve modern tasarımlı mobil e-ticaret uygulaması.",
    description: "Kullanıcı dostu arayüz, sepet yönetimi, ödeme entegrasyonu ve gerçek zamanlı ürün takibi özelliklerini içerir. Clean Architecture prensiplerine uygun olarak geliştirilmiştir.",
    image: "https://placehold.co/800x600/f97316/ffffff?text=E-Commerce+App",
    tags: "Flutter, Dart, Mobile, E-Commerce",
    repoUrl: "https://github.com/mahmuttozsoy/ecommerce-flutter",
    demoUrl: "#",
    isFeatured: true
  },
  {
    id: "proj_3",
    title: "Kripto Takip Paneli",
    slug: "crypto-tracker-dashboard",
    shortDescription: "Gerçek zamanlı kripto para borsası verilerini görselleştiren web tabanlı analiz aracı.",
    description: "React ve Chart.js kullanılarak geliştirilen bu panel, anlık fiyat değişimlerini grafiklerle sunar. WebSocket bağlantısı ile veriler canlı olarak güncellenir.",
    image: "https://placehold.co/800x600/10b981/ffffff?text=Crypto+Dashboard",
    tags: "React, Next.js, API, WebSocket",
    repoUrl: "https://github.com/mahmuttozsoy/crypto-tracker",
    demoUrl: "#",
    isFeatured: true
  },
  {
    id: "proj_4",
    title: "Fitness & Sağlık Takibi",
    slug: "fitness-health-tracker",
    shortDescription: "Kişisel antrenman programları ve sağlık verilerini takip eden kapsamlı mobil uygulama.",
    description: "Adım sayar, kalori takibi ve antrenman günlüğü özelliklerini barındırır. Kullanıcıların hedeflerine ulaşmasına yardımcı olmak için istatistiksel analizler sunar.",
    image: "https://placehold.co/800x600/ef4444/ffffff?text=Fitness+Tracker",
    tags: "Flutter, Mobile, Health, Analytics",
    repoUrl: "https://github.com/mahmuttozsoy/fitness-app",
    demoUrl: "#",
    isFeatured: true
  }
];
