import { Link, useLocation } from 'react-router-dom';
import { Home, Search, BookMarked, BookOpen, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from 'react';
import { IoLibraryOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export default function Navbar({ isDarkMode, toggleTheme }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, [location]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    sessionStorage.setItem("showLogoutToast", "true");
    navigate('/');
  };

  return (
    <>
      <nav
        className={`navbar-modern fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="navbar-container max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="navbar-logo flex items-center gap-x-3 animate-fade-in-left"
            data-tour="navbar-logo"
          >
            <div className="text-3xl">
              <BookOpen size={42} className="text-[#0f766e]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "var(--primary-700)" }}>
                Pouranik
              </h1>
              <p className="text-sm" style={{ color: "var(--text-muted)", marginTop: "-2px" }}>
                Book Discovery
              </p>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-toggle hidden max-md:flex"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation Links */}
          <div className="navbar-menu flex gap-2 items-center max-md:hidden">
            {[
              { path: "/", label: "Home", icon: <Home size={18} /> },
              { path: "/explore", label: "Explore", icon: <Search size={18} /> },
              { path: "/genres", label: "Genres", icon: <BookMarked size={18} /> },
              ...(isLoggedIn ? [{ path: "/library", label: "Your Library", icon: <IoLibraryOutline size={18} /> }] : []),
            ].map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                className={`navbar-link flex items-center gap-2 px-2.5 py-2 rounded-md transition-all duration-500 ease-in-out ${
                  isActive(path)
                    ? "bg-[#0f766e] text-white"
                    : "hover:underline hover:text-[#0f766e]"
                }`}
                data-tour={`navbar-link-${label.toLowerCase()}`}
              >
                <span className="text-base">{icon}</span>
                <span>{label}</span>
              </Link>
            ))}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="theme-toggle">Logout</button>
            ) : (
              <Link to="/signup" className="navbar-link">Get Started</Link>
            )}
            <button
              onClick={toggleTheme}
              className="theme-toggle flex items-center gap-2 px-3 py-2 rounded-md bg-[#0f766e] text-white hover:opacity-90 transition-all duration-500"
              aria-label="Toggle dark mode"
              data-tour="navbar-theme-toggle"
            >
              <span className="theme-icon">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </span>
              <span className="theme-label">
                {isDarkMode ? "Light" : "Dark"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu md:hidden">
            <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
            <div className="mobile-menu-content">
              {[
                { path: "/", label: "Home", icon: <Home size={20} /> },
                { path: "/explore", label: "Explore", icon: <Search size={20} /> },
                { path: "/genres", label: "Genres", icon: <BookMarked size={20} /> },
                ...(isLoggedIn ? [{ path: "/library", label: "Your Library", icon: <IoLibraryOutline size={20} /> }] : []),
              ].map(({ path, label, icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`mobile-menu-link ${isActive(path) ? "active" : ""}`}
                  onClick={closeMobileMenu}
                  data-tour={`mobile-navbar-link-${label.toLowerCase()}`}
                >
                  <span className="mobile-menu-icon">{icon}</span>
                  <span className="mobile-menu-label">{label}</span>
                </Link>
              ))}
              {/* Dark Mode Toggle - Mobile */}
              <button
                onClick={() => {
                  toggleTheme();
                  closeMobileMenu();
                }}
                className="mobile-theme-toggle"
                aria-label="Toggle dark mode"
              >
                <span className="mobile-menu-icon">
                  {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-900" />}
                </span>
                <span className="mobile-menu-label">
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
              {isLoggedIn && (
                <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="mobile-menu-link">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* Spacer for fixed navbar */}
      <div style={{ height: "7rem" }}></div>
    </>
  );
}