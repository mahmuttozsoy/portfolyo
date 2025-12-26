import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-gray-950 text-gray-100 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto p-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
export const metadata = {
  title: "Mahmut Özsoy | AI & Mobile Software Engineer",
  description:
    "Mahmut Özsoy — Yapay zekâ, mobil uygulama ve akıllı sistemler geliştiren yazılım mühendisi. Projeler, portföy ve iletişim.",
};

