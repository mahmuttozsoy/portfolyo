export default function Footer() {
  return (
    <footer className="border-t border-gray-900 bg-black py-12 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="flex flex-col text-center md:text-left">
          <span className="font-bold text-xl text-white tracking-wide">MAHMUT ÖZSOY</span>
          <span className="text-sm text-gray-500 mt-1">Software Engineer © {new Date().getFullYear()}</span>
        </div>

        <div className="flex gap-6 text-sm text-gray-500 font-medium tracking-wide">
          <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
          <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          <a href="mailto:mahmutozsoy2604@gmail.com" className="hover:text-emerald-400 transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
