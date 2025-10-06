import { Link } from '@tanstack/react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-800 text-stone-100 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center space-y-8 pb-8 border-b border-stone-700">
          <h3 className="text-2xl font-bold text-white">
            The Leathercraft Blog
          </h3>

          <nav className="flex flex-wrap justify-center gap-6 pb-4 border-b border-stone-700/50">
            <Link
              to="/"
              className="text-stone-300 hover:text-white transition text-sm font-medium">
              Home
            </Link>
            <Link
              to="/projects"
              className="text-stone-300 hover:text-white transition text-sm font-medium">
              Projects
            </Link>
            <Link
              to="/tools"
              className="text-stone-300 hover:text-white transition text-sm font-medium">
              Tools
            </Link>
            <Link
              to="/about"
              className="text-stone-300 hover:text-white transition text-sm font-medium">
              About
            </Link>
          </nav>

          <div className="space-y-2">
            <p className="text-stone-400 text-sm">Get in touch</p>
            <a
              href="mailto:juncmakes@gmail.com"
              className="text-stone-200 hover:text-white transition font-medium">
              juncmakes@gmail.com
            </a>
          </div>
        </div>

        <div className="pt-6 text-center">
          <p className="text-stone-400 text-sm">
            © {currentYear} The Leathercraft Blog
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
