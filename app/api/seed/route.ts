import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        // 1. Admin User
        const username = 'admin';
        const password = 'password123';
        await prisma.user.upsert({
            where: { username },
            update: {},
            create: {
                username,
                passwordHash: await bcrypt.hash(password, 10),
                role: 'ADMIN'
            }
        });

        // 2. Profile
        const profileData = {
            fullName: 'Mahmut Özsoy',
            title: 'Yazılım Mühendisi & AI Geliştirici',
            bio: 'Yapay Zeka ve Mobil Uygulama geliştirme alanlarında tutkulu bir Yazılım Mühendisi. Flutter ile mobil uygulamalar, Python ile derin öğrenme modelleri ve Next.js ile modern web siteleri geliştiriyorum. Karmaşık problemleri çözmekten ve kullanıcı dostu ürünler ortaya çıkarmaktan keyif alıyorum.',
            location: 'Eskişehir, Türkiye',
            phone: '+90 555 555 55 55',
            githubUrl: 'https://github.com/mahmuttozsoy',
            linkedinUrl: 'https://www.linkedin.com/in/mahmuttozsoy/',
            websiteUrl: 'https://ucmimarlik.com.tr',
        };

        const existingProfile = await prisma.profile.findFirst();
        if (existingProfile) {
            await prisma.profile.update({ where: { id: existingProfile.id }, data: profileData });
        } else {
            await prisma.profile.create({ data: profileData });
        }

        // 3. Experience
        await prisma.experience.deleteMany({});
        await prisma.experience.createMany({
            data: [
                {
                    companyName: 'Freelance',
                    position: 'Full Stack Geliştirici',
                    employmentType: 'FREELANCE',
                    location: 'Remote',
                    startDate: new Date('2023-01-01'),
                    isCurrent: true,
                    description: 'Çeşitli müşteriler için web ve mobil uygulamalar geliştiriyorum. Flutter, React ve Node.js teknolojilerini kullanarak özel çözümler üretiyorum.'
                },
                {
                    companyName: 'Teknoloji Şirketi',
                    position: 'Stajyer Yazılım Mühendisi',
                    employmentType: 'INTERNSHIP',
                    location: 'İstanbul',
                    startDate: new Date('2022-06-01'),
                    endDate: new Date('2022-09-01'),
                    isCurrent: false,
                    description: 'Yapay zeka destekli görüntü işleme projelerinde görev aldım. Python ve OpenCV kütüphanelerini kullanarak veri setleri hazırladım ve model eğitimi süreçlerine katkıda bulundum.'
                }
            ]
        });

        // 4. Education
        await prisma.education.deleteMany({});
        await prisma.education.createMany({
            data: [
                {
                    schoolName: 'Eskişehir Osmangazi Üniversitesi',
                    degree: 'Lisans',
                    fieldOfStudy: 'Bilgisayar Mühendisliği',
                    startDate: new Date('2020-09-01'),
                    endDate: new Date('2024-06-01'),
                    grade: '3.50',
                    isCurrent: false,
                    description: 'Yapay Zeka, Veri Yapıları ve Algoritmalar üzerine yoğunlaştım.'
                }
            ]
        });

        // 5. Skill Categories & Skills
        await prisma.skill.deleteMany({});
        await prisma.skillCategory.deleteMany({});

        const categoriesData = [
            { name: 'MOBILE', order: 1 },
            { name: 'AI', order: 2 },
            { name: 'FRONTEND', order: 3 },
            { name: 'BACKEND', order: 4 },
            { name: 'DATABASE', order: 5 },
            { name: 'DEVOPS', order: 6 },
            { name: 'OTHER', order: 7 },
        ];

        const categoryMap = new Map();

        for (const cat of categoriesData) {
            const created = await prisma.skillCategory.create({ data: cat });
            categoryMap.set(cat.name, created.id);
        }

        const skills = [
            { name: 'Flutter', category: 'MOBILE', level: 'EXPERT' },
            { name: 'Dart', category: 'MOBILE', level: 'EXPERT' },
            { name: 'Python', category: 'AI', level: 'ADVANCED' },
            { name: 'YOLOv8', category: 'AI', level: 'ADVANCED' },
            { name: 'TensorFlow', category: 'AI', level: 'INTERMEDIATE' },
            { name: 'React', category: 'FRONTEND', level: 'ADVANCED' },
            { name: 'Next.js', category: 'FRONTEND', level: 'ADVANCED' },
            { name: 'TypeScript', category: 'FRONTEND', level: 'ADVANCED' },
            { name: 'Tailwind CSS', category: 'FRONTEND', level: 'EXPERT' },
            { name: 'Node.js', category: 'BACKEND', level: 'INTERMEDIATE' },
            { name: 'MySQL', category: 'DATABASE', level: 'INTERMEDIATE' },
            { name: 'Prisma', category: 'DATABASE', level: 'INTERMEDIATE' },
            { name: 'Git', category: 'DEVOPS', level: 'ADVANCED' },
        ];

        for (const s of skills) {
            await prisma.skill.create({
                data: {
                    name: s.name,
                    level: s.level as any,
                    categoryId: categoryMap.get(s.category)
                }
            });
        }

        // 6. Projects (6 items)
        await prisma.project.deleteMany({});

        const projects = [
            {
                title: 'AI Voice Assistant',
                slug: 'ai-voice-assistant',
                shortDescription: 'Gelişmiş sesli komut işleme ve doğal dil anlama özelliklerine sahip akıllı asistan.',
                description: 'Python ve NLP kütüphaneleri kullanılarak geliştirilen bu asistan, kullanıcı komutlarını anlar ve çeşitli görevleri yerine getirir. Ev otomasyonu entegrasyonu mevcuttur.',
                image: 'https://placehold.co/800x600/7e22ce/ffffff?text=AI+Voice+Assistant',
                tags: 'Python, AI, NLP, Voice Recognition',
                repoUrl: 'https://github.com/mahmuttozsoy/voice-assistant',
                demoUrl: '#',
                isFeatured: true
            },
            {
                title: 'Modern E-Ticaret Uygulaması',
                slug: 'ecommerce-mobile-app',
                shortDescription: 'Flutter ile geliştirilmiş, yüksek performanslı ve modern tasarımlı mobil e-ticaret uygulaması.',
                description: 'Kullanıcı dostu arayüz, sepet yönetimi, ödeme entegrasyonu ve gerçek zamanlı ürün takibi özelliklerini içerir. Clean Architecture prensiplerine uygun olarak geliştirilmiştir.',
                image: 'https://placehold.co/800x600/f97316/ffffff?text=E-Commerce+App',
                tags: 'Flutter, Dart, Mobile, E-Commerce',
                repoUrl: 'https://github.com/mahmuttozsoy/ecommerce-flutter',
                demoUrl: '#',
                isFeatured: true
            },
            {
                title: 'Kripto Takip Paneli',
                slug: 'crypto-tracker-dashboard',
                shortDescription: 'Gerçek zamanlı kripto para borsası verilerini görselleştiren web tabanlı analiz aracı.',
                description: 'React ve Chart.js kullanılarak geliştirilen bu panel, anlık fiyat değişimlerini grafiklerle sunar. WebSocket bağlantısı ile veriler canlı olarak güncellenir.',
                image: 'https://placehold.co/800x600/10b981/ffffff?text=Crypto+Dashboard',
                tags: 'React, Next.js, API, WebSocket',
                repoUrl: 'https://github.com/mahmuttozsoy/crypto-tracker',
                demoUrl: '#',
                isFeatured: true
            },
            {
                title: 'Fitness & Sağlık Takibi',
                slug: 'fitness-health-tracker',
                shortDescription: 'Kişisel antrenman programları ve sağlık verilerini takip eden kapsamlı mobil uygulama.',
                description: 'Adım sayar, kalori takibi ve antrenman günlüğü özelliklerini barındırır. Kullanıcıların hedeflerine ulaşmasına yardımcı olmak için istatistiksel analizler sunar.',
                image: 'https://placehold.co/800x600/ef4444/ffffff?text=Fitness+Tracker',
                tags: 'Flutter, Mobile, Health, Analytics',
                repoUrl: 'https://github.com/mahmuttozsoy/fitness-app',
                demoUrl: '#',
                isFeatured: true
            },
            {
                title: 'Akıllı Ev Otomasyonu',
                slug: 'smart-home-hub',
                shortDescription: 'IoT cihazlarını tek bir merkezden yönetmeyi sağlayan ev otomasyon sistemi.',
                description: 'Raspberry Pi ve Python tabanlı bu sistem, aydınlatma, ısıtma ve güvenlik cihazlarını kontrol eder. Mobil uyumlu web arayüzü ile uzaktan erişim imkanı sunar.',
                image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Smart+Home+Hub',
                tags: 'IoT, Python, Raspberry Pi, Home Automation',
                repoUrl: 'https://github.com/mahmuttozsoy/smart-home',
                demoUrl: '#',
                isFeatured: false
            },
            {
                title: 'Task Management SaaS',
                slug: 'task-management-saas',
                shortDescription: 'Ekipler için geliştirilmiş, Kanban tabanlı proje ve görev yönetim platformu.',
                description: 'Modern iş akışlarını destekleyen, sürükle-bırak özellikli görev yönetim aracı. Next.js ve Prisma kullanılarak Full Stack olarak geliştirilmiştir.',
                image: 'https://placehold.co/800x600/6366f1/ffffff?text=Task+SaaS',
                tags: 'Next.js, Prisma, SaaS, Productivity',
                repoUrl: 'https://github.com/mahmuttozsoy/task-saas',
                demoUrl: '#',
                isFeatured: false
            }
        ];

        for (const p of projects) {
            await prisma.project.create({ data: p });
        }

        return NextResponse.json({ success: true, message: 'Database seeded with Dynamic Categories!' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Seed failed' }, { status: 500 });
    }
}
