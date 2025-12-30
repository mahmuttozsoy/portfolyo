import "./globals.css";
import Footer from "./components/Footer";
import NavbarWrapper from "./components/NavbarWrapper";
import Script from "next/script";

export const metadata = {
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
    "Mahmut Ozsoy",
    "MAHMUT ÖZSOY",
    "mahmut özsoy"
    ,
    "mahmut ozsoy",
    "Yazılım Mühendisi",
    "Mahmut Özsoy Portfolio",
    "Mahmut Özsoy Yazılım Mühendisi",
    "Mahmut Özsoy Software Engineer",
    "Mahmut Özsoy Yapay Zeka",
    "Mahmut Özsoy AI",
    "Mahmut Özsoy Flutter",
    "Mahmut Özsoy Mobile Developer",
    "Mahmut Özsoy Machine Learning",
    "Mahmut Özsoy Derin Öğrenme",
    "Mahmut Özsoy Bandırma Onyedi Eylül Üniversitesi",
    "Mahmut Özsoy Harran Üniversitesi",
    "mahmutozsoy.dev",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <Script
          id="person-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://mahmutozsoy.dev/#person",
            name: "Mahmut Özsoy",
            url: "https://mahmutozsoy.dev",
            image: "https://mahmutozsoy.dev/images/mahmut.jpeg",
            jobTitle: "Software Engineer",
            description:
              "Mahmut Özsoy, yapay zekâ, mobil uygulama ve makine öğrenmesi alanlarında çalışan bir yazılım mühendisidir.",
            sameAs: [
              "https://www.linkedin.com/in/mahmuttozsoy/",
              "https://github.com/mahmuttozsoy",
              "https://www.instagram.com/mahmuttozsoy/",
              "mailto:mahmutozsoy2604@gmail.com"

            ],
            alumniOf: [
              {
                "@type": "CollegeOrUniversity",
                name: "Bandırma Onyedi Eylül Üniversitesi",

              },

            ],
            knowsAbout: [
              "Artificial Intelligence",
              "Machine Learning",
              "Deep Learning",
              "Flutter",
              "Computer Vision",
              "Mobile Application Development",
              "Intelligent Systems",
            ],
          })}
        </Script>
      </head>

      <body>
        <NavbarWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
