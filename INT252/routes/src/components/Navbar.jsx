import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-semibold">
        <Link to="/">MyApp</Link>
      </div>

      {/* Links */}
      <ul className="flex gap-6 text-sm">
        <li>
          <Link to="/" className="hover:text-gray-300 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-300 transition">
            About
          </Link>
        </li>
        <li>
          <Link to="/projects" className="hover:text-gray-300 transition">
            Projects
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-gray-300 transition">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
