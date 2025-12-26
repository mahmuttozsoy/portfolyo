export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-16">
      <div className="max-w-5xl mx-auto py-6 px-4  text-emerald-300 text-center">
        <span>© {new Date().getFullYear()} Tüm Hakları Saklıdır</span>
        {/*<span>AI • Mobile • Intelligent Systems</span>*/}
      </div>
    </footer>
  );
}
