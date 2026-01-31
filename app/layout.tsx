import "./globals.css";
import Footer from "./components/Footer";
import NavbarWrapper from "./components/NavbarWrapper";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mahmut Özsoy | AI & Mobile Software Engineer",
    template: "%s | Mahmut Özsoy",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  description:
    "Mahmut Özsoy — yapay zekâ, mobil uygulama ve makine öğrenmesi alanlarında çalışan bir yazılım mühendisidir.",
  keywords: [
    "Mahmut Özsoy",
    "Yazılım Mühendisi",
    "Software Engineer",
    "Yapay Zeka",
    "Flutter",
    "Machine Learning",
    "Derin Öğrenme",
    "mahmutozsoy.dev",
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
        "image": "https://mahmutozsoy.dev/images/mahmut.jpeg",
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
    <html lang="tr">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        <NavbarWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}