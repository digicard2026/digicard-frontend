import React, { useEffect, useState } from "react";
import { LogIn, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [navClass, setNavClass] = useState("");
  const navigate = useNavigate();

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

  const links = [
    { label: "Home", href: "#home", path: "/Home" },
    { label: "Our Product", href: "#product", path: "/Product" },
    { label: "Features", href: "#features", path: "/Features" },
    { label: "About Us", href: "#about", path: "/About" },
    { label: "Feedback", href: "#feedback", path: "/Feedback" },
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
              className="h-[170px] w-[230px] block dark:hidden"
            />
            <img 
              src={logoLight} 
              alt="Logo" 
              className="h-[50px] w-[60px] hidden dark:block"
            />
          </Link>
        </div>

        {/* Menu links */}
        <ul
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white dark:bg-zinc-800 md:bg-transparent md:flex md:items-center gap-4 lg:gap-6 px-4 py-3 md:py-0 md:px-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out ${
            isToggle ? "block" : "hidden md:flex"
          }`}
        >
          {links.map((item) => (
            <li key={item.path}>
              <a
                href={item.href}
                className="block md:inline-block px-3 py-2 text-sm sm:text-base font-medium text-black hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
          
          {/* Mobile View Buttons */}
          <div className="md:hidden flex flex-col gap-3 mt-3">
            <button 
              onClick={() => navigate('/')}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg flex items-center justify-center gap-2"
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg"
            >
              Creat DigitalCard
            </button>
          </div>
        </ul>

        {/* Right Buttons - Desktop View */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            onClick={() => setIsToggle(!isToggle)}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>

          {/* Desktop View Buttons */}
          <div className="hidden md:flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-lg transition"
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-lg transition"
            >
              <span> Creat DigitalCard</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;