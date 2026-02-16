import { useParams } from "react-router-dom";
import Image from "../components/Image";

// In a real app, this data might be fetched from an API or shared constant file
const projectDetails = {
    "domates-yaprak-hastaligi": {
        title: "Domates Yaprak Hastalığı Tespiti",
        shortDescription:
            <p>Domates Yaprak Hastalığı Tespiti Projesi

                Bu proje, domates bitkilerinde görülen yaprak hastalıklarını erken aşamada tespit edebilmek amacıyla geliştirilmiş, yapay zekâ tabanlı bir görüntü işleme sistemidir. Tarımda hastalıkların geç fark edilmesi; verim kaybına, yanlış ilaç kullanımına ve ciddi ekonomik zararlara yol açabilmektedir. Bu çalışma, bu problemleri minimize etmeyi hedeflemektedir.

                Projenin temelinde, YOLOv8 tabanlı derin öğrenme modeli yer almaktadır. Model; farklı domates yaprak hastalıklarına ait binlerce görsel ile eğitilmiş ve yaprak üzerindeki hastalık belirtilerini gerçek zamanlı olarak tespit edebilecek şekilde optimize edilmiştir. Eğitim sürecinde veri dengesi, overfitting ve model doğruluğu gibi kritik konulara özellikle dikkat edilmiştir.

                Sistem yalnızca bir hastalık tespiti yapmakla kalmaz; tespit edilen hastalığa ait açıklayıcı bilgiler, risk seviyesi ve genel müdahale önerileri de sunar. Bu sayede kullanıcı, yalnızca “ne olduğu”nu değil, “ne yapması gerektiğini” de anlayabilir. Amaç, teknik bilgisi olmayan kullanıcılar için bile kullanılabilir ve anlaşılır bir çözüm sunmaktır.

                Proje, API tabanlı bir mimari ile geliştirilmiştir. Yaprak görüntüsü sisteme yüklendiğinde, arka planda çalışan model görüntüyü analiz eder ve sonucu yapılandırılmış bir çıktı olarak üretir. Bu yapı; mobil uygulama, web arayüzü veya farklı sistemlerle kolay entegrasyon imkânı sağlar.

                Bu çalışma, yapay zekânın tarım alanında pratik ve gerçek dünyaya dokunan bir kullanım örneğidir. Geliştirilen sistem; erken teşhis, bilinçli müdahale ve sürdürülebilir tarım hedeflerine katkı sağlamayı amaçlamaktadır.</p>,
        technologies: ["YOLOv8", "Python", "Deep Learning", "Flask"],
        image: "/images/tomato.png",
    },
    campusapp: {
        title: "CampusApp",
        shortDescription:
            "Üniversite öğrencileri için kampüs, yurt ve çevre hizmetlerini bir araya getiren mobil uygulama.",
        technologies: ["Flutter", "REST API", "Firebase"],
        image: "/images/campus.png",
    },
};

export default function ProjectDetail() {
    const { slug } = useParams<{ slug: string }>();

    const project = slug ? projectDetails[slug as keyof typeof projectDetails] : null;

    if (!project) {
        return <div className="min-h-screen pt-32 text-center">Proje bulunamadı.</div>;
    }

    return (
        <section className="max-w-4xl mx-auto px-6 py-32 space-y-6">
            <h1 className="text-3xl font-bold">{project.title}</h1>

            <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={450}
                className="rounded-lg w-full h-auto object-cover"
            />

            <div className="text-gray-400 leading-relaxed whitespace-pre-line">
                {project.shortDescription}
            </div>

            <div>
                <h3 className="font-semibold mb-2">
                    Kullanılan Teknolojiler
                </h3>

                <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                        <li
                            key={tech}
                            className="px-3 py-1 text-sm border border-zinc-700 rounded-full"
                        >
                            {tech}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
