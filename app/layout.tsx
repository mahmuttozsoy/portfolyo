import "./globals.css";
import Footer from "./components/Footer";
import NavbarWrapper from "./components/NavbarWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <NavbarWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export const metadata = {
  title: "Mahmut Özsoy | AI & Mobile Software Engineer",
  description:
    "Mahmut Özsoy — Yapay zekâ ve mobil uygulama. Projeler, portföy ve iletişim.",
  keywords: [
    "Mahmut Özsoy",
    "Mahmut Ozsoy",
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
    "Bandırma Onyedi Eylül Üniversitesi Yazılım",
    "Harran Üniversitesi Yazılım",
    "mahmutozsoy.dev",
  ],

};

