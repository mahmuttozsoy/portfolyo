import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="space-y-32">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">

        {/* 1. Dekoratif arka plan katmanı */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[20rem] font-bold opacity-5">

          </span>
        </div>


        {/* 2. Asıl içerik */}
        <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 min-h-screen">

          {/* Sol kolon */}
          <div className="space-y-6">
            <p className="text-sm tracking-widest uppercase opacity-70">
              Merhaba, Ben Mahmut Özsoy
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Yapay zekâ, Mobil ve Akıllı sistemler
            </h1>

            <p className="max-w-md opacity-80">
              İle
              gerçek problemlerle çalışan ürünler geliştiriyorum.
            </p>

            {/* Sosyal ikonlar */}
            <div className="flex gap-4 pt-4">
              {/* ikonlar */}
            </div>
          </div>

          {/* Sağ kolon */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-[280px] h-[360px] rounded-2xl overflow-hidden">
              {
                <Image
                  src="/images/mahmut.jpeg"
                  alt="Mahmut Tozsoy"
                  fill
                  className="object-cover"
                />
              }
            </div>
          </div>

        </div>
      </section>

      <AboutSection />

      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
