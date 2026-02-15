import "./globals.css";
import Footer from "./components/Footer";
import NavbarWrapper from "./components/NavbarWrapper";
import Script from "next/script";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mahmut Özsoy | Software Engineer",
    template: "%s | Mahmut Özsoy",
  },
  applicationName: "Mahmut Özsoy",
  authors: [{ name: "Mahmut Özsoy", url: "https://mahmutozsoy.dev" }],
  creator: "Mahmut Özsoy",
  publisher: "Mahmut Özsoy",
  metadataBase: new URL("https://mahmutozsoy.dev"),
  icons: {
    icon: "/images/logo1.png",
    apple: "/images/logo1.png",
  },
  description:
    "Yapay zekâ, Flutter ile mobil uygulama ve makine öğrenmesi alanlarında çalışan yazılım mühendisi.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://mahmutozsoy.dev",
    title: "Mahmut Özsoy | Software Engineer",
    description:
      "Yapay zekâ, Flutter ile mobil uygulama ve makine öğrenmesi alanlarında çalışan yazılım mühendisi.",
    siteName: "Mahmut Özsoy",
    images: [
      {
        url: "/images/foto.JPG",
        width: 1200,
        height: 630,
        alt: "Mahmut Özsoy",
      },
    ],
  },
  keywords: [
    "Mahmut Özsoy",
    "Yazılım Mühendisi",
    "Software Engineer",
    "Yapay Zeka",
    "Flutter",
    "Machine Learning",
    "Derin Öğrenme",
    "Mobile Developer",
    "Full Stack Developer"
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema verisini dışarıda tanımlayalım ki kod okunabilir olsun
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://mahmutozsoy.dev/#website",
        "url": "https://mahmutozsoy.dev",
        "name": "Mahmut Özsoy", // Google'da çıkacak site adı BURASI
        "description": "Mahmut Özsoy Kişisel Web Sitesi",
        "publisher": {
          "@id": "https://mahmutozsoy.dev/#person"
        },
        "inLanguage": "tr-TR"
      },
      {
        "@type": "Person",
        "@id": "https://mahmutozsoy.dev/#person",
        "name": "Mahmut Özsoy",
        "url": "https://mahmutozsoy.dev",
        "image": "https://mahmutozsoy.dev/images/foto.JPG",
        "jobTitle": "Software Engineer",
        "description": "Mahmut Özsoy, yapay zekâ, mobil uygulama ve makine öğrenmesi alanlarında çalışan bir yazılım mühendisidir.",
        "sameAs": [
          "https://www.linkedin.com/in/mahmuttozsoy/",
          "https://github.com/mahmuttozsoy",
          "https://www.instagram.com/mahmuttozsoy/",
          "mailto:mahmutozsoy2604@gmail.com"
        ],
        "alumniOf": [
          {
            "@type": "CollegeOrUniversity",
            "name": "Bandırma Onyedi Eylül Üniversitesi",
            "sameAs": "https://www.bandirma.edu.tr/"
          }
        ],
        "knowsAbout": [
          "Artificial Intelligence",
          "Machine Learning",
          "Deep Learning",
          "Flutter",
          "Computer Vision",
          "Mobile Application Development",
          "Intelligent Systems"
        ]
      }
    ]
  };

  return (
    <html lang="tr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="antialiased">
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <NavbarWrapper />
        <div className="relative z-10">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}