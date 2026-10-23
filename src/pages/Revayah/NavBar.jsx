import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Globe, 
  Search, 
  ChevronDown, 
  Menu, 
  X
} from "lucide-react";

const NavBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/", isHome: true },
    { label: "Digital Identity", href: "/#digital-identity" },
    { label: "Digital Tools", href: "/#digital-tools" },
    { label: "Industry Solutions", href: "/#industry-solutions" },
    { label: "Digital Health", href: "/#digital-health" },
    { label: "One Academy", href: "/#academy" },
    { label: "Partner With Us", href: "/partner-opportunities" },
    { label: "About Reva-Yah", href: "/#about-revayah" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isSticky
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xs border-b border-slate-200/90 dark:border-slate-800"
          : "bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800"
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[68px] gap-2 lg:gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            {/* Stylized R Icon */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <span className="font-black text-lg sm:text-xl tracking-tighter">R</span>
            </div>
            
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white leading-tight">
                REVA-YAH ONE
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] font-medium text-slate-500 dark:text-slate-400 tracking-tight leading-none mt-0.5 whitespace-nowrap">
                One Link. One Identity. Infinite Possibilities.
              </span>
            </div>
          </Link>

          {/* Desktop & Laptop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-3.5 xl:gap-6 flex-1 px-2">
            {navLinks.map((link) => {
              const isActive = link.isHome && location.pathname === "/";
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-[12px] xl:text-[13px] font-medium transition-colors relative py-2 whitespace-nowrap shrink-0 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-[2.5px] bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Utilities: Language, Search & Get Started */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Language Selector */}
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>EN</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Get Started Button */}
            <Link
              to="/signin"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-xs shrink-0 whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile / Tablet Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <Link
              to="/signin"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 shrink-0"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Search Bar Overlay */}
      {searchOpen && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, builders, solutions, or guides..."
              className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-5 pt-3 pb-6 shadow-xl">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;