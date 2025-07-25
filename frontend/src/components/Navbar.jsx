import { Link, useLocation } from "react-router-dom";
import { Home, Search, BookMarked, BookOpen } from "lucide-react";


export default function Navbar({ isDarkMode, toggleTheme }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-modern">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" data-tour="navbar-logo">
          <div className="text-2xl">
            <BookOpen size={35} className="text-[#0f766e]" />
          </div>
          <div>
            <h1
              className="text-xl font-bold"
              style={{ color: "var(--primary-700)" }}
            >
              Pouranik
            </h1>
            <p
              className="text-xs"
              style={{ color: "var(--text-muted)", marginTop: "-2px" }}
            >
              Book Discovery
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-menu">
          {[
            { path: "/", label: "Home", icon: <Home size={18} /> },
            { path: "/explore", label: "Explore", icon: <Search size={18} /> },
            { path: "/genres", label: "Genres", icon: <BookMarked size={18} /> },
          ].map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`navbar-link ${isActive(path) ? "active" : ""}`}
              data-tour={`navbar-link-${label.toLowerCase()}`}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </Link>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle dark mode"
            data-tour="navbar-theme-toggle"
          >
            <span className="theme-icon">
              {isDarkMode ? "☀️" : "🌙"}
            </span>
            <span className="theme-label">
              {isDarkMode ? "Light" : "Dark"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
