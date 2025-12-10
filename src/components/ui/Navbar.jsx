import React, { useEffect, useState } from "react";
import { LogIn, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [navClass, setNavClass] = useState("");
  const navigate = useNavigate();

  // Scroll to change navbar background
  const scrollNavigation = () => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop >= 50) {
      setNavClass("bg-white shadow-md dark:bg-zinc-900");
    } else {
      setNavClass("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
    return () => {
      window.removeEventListener("scroll", scrollNavigation, true);
    };
  }, []);

  // Scroll to section function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { label: "Home", href: "#home", path: "/Home" },
    { label: "Product", href: "#product", path: "/Product" },
    { label: "Features", href: "#features", path: "/Features" },
    { label: "About Us", href: "#about", path: "/About" },
    { label: "Feedback", href: "#feedback", path: "/Feedback" },
    { label: "Plans", href: "#plan", path: "/PlanSelection" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}>
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center gap-1">
            <img
              src={logoDark}
              alt="Logo"
              className="h-12 w-auto max-w-[200px] block dark:hidden"
            />
            <img
              src={logoLight}
              alt="Logo"
              className="h-10 w-auto hidden dark:block"
            />
          </Link>
        </div>

        {/* Menu links */}
        <ul
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white dark:bg-zinc-800 md:bg-transparent md:flex md:items-center gap-2 lg:gap-4 px-7 py-5 md:py-0 md:px-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out ${
            isToggle ? "block" : "hidden md:flex"
          }`}
        >
          {links.map((item) => (
            <li key={item.path}>
              <a
                href={item.href}
                className="block md:inline-block px-3 py-2 text-sm font-medium text-black hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors duration-200 whitespace-nowrap"
              >
                {item.label}
              </a>
            </li>
          ))}

          {/* Mobile View Buttons */}
          <div className="md:hidden flex flex-col gap-3 mt-3">
            <button
              onClick={() => navigate("/signin")}
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2"
            >
              <LogIn size={14} />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => {
                scrollToSection("plan");
                setIsToggle(false); // close menu after click
              }}
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg"
            >
              Create DigitalCard
            </button>
          </div>
        </ul>

        {/* Right Buttons - Desktop */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate("/signin")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-lg transition whitespace-nowrap"
            >
              <LogIn size={14} />
              <span>Sign In</span>
            </button>

            <button
              onClick={() => scrollToSection("plan")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-lg transition whitespace-nowrap"
            >
              <span>Create DigitalCard</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            onClick={() => setIsToggle(!isToggle)}
            aria-label="Toggle menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
