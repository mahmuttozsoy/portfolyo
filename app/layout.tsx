import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mahmut Özsoy | Software Engineer",
  description:
    "Specializing in Artificial Intelligence, Mobile Development (Flutter), and building intelligent systems that solve real-world problems.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className="bg-[#09090b] text-white selection:bg-emerald-500/30">
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-zinc-800/60">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 group-hover:scale-105 transition-transform">
                MÖ
              </div>
              <span className="font-bold tracking-wider text-sm md:text-base text-white">
                MAHMUT ÖZSOY
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
              <Link href="/#hero" className="hover:text-emerald-400 transition-colors">
                ANA SAYFA
              </Link>
              <Link href="/#about" className="hover:text-emerald-400 transition-colors">
                HAKKIMDA
              </Link>
              <Link href="/#projects" className="hover:text-emerald-400 transition-colors">
                PROJELER
              </Link>
              <Link href="/#contact" className="hover:text-emerald-400 transition-colors">
                İLETİŞİM
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/#contact"
                className="px-5 py-2.5 text-sm font-medium rounded-xl border border-emerald-500/50 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500 hover:text-black transition-all"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </header>

        <div className="pt-20">{children}</div>

        <footer className="py-8 border-t border-zinc-800/80 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Mahmut Özsoy. Tüm hakları saklıdır.</p>
        </footer>
      </body>
    </html>
  );
}
