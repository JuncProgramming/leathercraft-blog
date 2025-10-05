import { Link } from '@tanstack/react-router';

const Header = () => {
  return (
    <header className="bg-stone-800 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2 text-stone-50">
            <h1 className="text-2xl font-bold">The Leathercraft Blog</h1>
          </Link>
        </div>

        <nav className="flex items-center space-x-4">
          <Link
            to="/projects"
            className="text-stone-50 hover:text-stone-200 font-medium transition px-3 py-2 leading-none">
            Projects
          </Link>
          <Link
            to="/tools"
            className="text-stone-50 hover:text-stone-200 font-medium transition px-3 py-2 leading-none">
            Tools
          </Link>
          <Link
            to="/about"
            className="text-stone-50 hover:text-stone-200 font-medium transition px-3 py-2 leading-none">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
