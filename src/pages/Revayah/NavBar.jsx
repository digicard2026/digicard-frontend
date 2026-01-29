// import React, { useState, useEffect } from "react";
// import { Menu, LogIn, X } from "lucide-react";

// const Logo = () => (
//     <span className="text-2xl font-bold font-sans text-slate-800 dark:text-white">
//         Revayah<span className="text-blue-500">One</span>
//     </span>
// );

// const NavBar = () => {
//     const [isSticky, setIsSticky] = useState(false);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollUp = document.documentElement.scrollTop;
//             setIsSticky(scrollUp >= 50);
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const navClasses = isSticky 
//         ? "bg-white dark:bg-slate-800 shadow-lg shadow-slate-200/25 dark:shadow-slate-900/30" 
//         : "bg-transparent";

//     return (
//         <nav className={`fixed inset-x-0 top-0 z-50 flex items-center justify-center h-20 py-3 transition-all duration-300 border-b border-transparent dark:border-slate-700 ${navClasses}`}>
//             <div className="container max-w-7xl px-4 mx-auto flex items-center justify-between w-full">
                
//                 {/* Logo */}
//                 <div className="shrink-0">
//                     <a href="/revayah-home" >
//                         <Logo />
//                     </a>
//                 </div>

//                 {/* Desktop Menu */}
//                 <div className="hidden md:block mx-auto">
//                     <ul className="flex items-center gap-8">
//                         {["Home", "Features", "Use Cases", "Contact"].map((item) => (
//                             <li key={item}>
//                                 <a 
//                                     href={`#${item.toLowerCase().replace(" ", "-")}`}
//                                     className="text-base font-medium text-slate-800 dark:text-slate-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
//                                 >
//                                     {item}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Buttons & Mobile Toggle */}
//                 <div className="flex gap-3">
//                     <button type="button" className="hidden md:inline-flex items-center justify-center py-2 px-6 text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 hover:border-blue-600 rounded transition-all shadow-md hover:shadow-blue-500/20">
//                         <span className="align-middle">Sign In</span> 
//                         <LogIn className="inline-block size-4 ml-1" />
//                     </button>

//                     <button 
//                         type="button" 
//                         className="md:hidden flex items-center justify-center size-10 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
//                         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                     >
//                         {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Menu Dropdown */}
//             {isMobileMenuOpen && (
//                 <div className="absolute top-20 inset-x-0 bg-white dark:bg-slate-800 shadow-lg md:hidden p-4 border-t border-slate-100 dark:border-slate-700">
//                     <ul className="flex flex-col gap-4">
//                         {["Home", "Features", "Use Cases", "Contact"].map((item) => (
//                             <li key={item}>
//                                 <a 
//                                     href={`#${item.toLowerCase().replace(" ", "-")}`}
//                                     className="block text-base font-medium text-slate-800 dark:text-slate-100 hover:text-blue-500"
//                                     onClick={() => setIsMobileMenuOpen(false)}
//                                 >
//                                     {item}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default NavBar;

// import React, { useState, useEffect } from "react";
// import { Menu, LogIn, X } from "lucide-react";
// import { Link } from "react-router-dom"; // Assuming you are using react-router-dom

// const Logo = () => (
//     <span className="text-2xl font-bold font-sans text-slate-800 dark:text-white">
//         Revayah<span className="text-blue-500">One</span>
//     </span>
// );

// const NavBar = () => {
//     const [isSticky, setIsSticky] = useState(false);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             const scrollUp = document.documentElement.scrollTop;
//             setIsSticky(scrollUp >= 50);
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const navClasses = isSticky 
//         ? "bg-white dark:bg-slate-800 shadow-lg shadow-slate-200/25 dark:shadow-slate-900/30" 
//         : "bg-transparent";

//     return (
//         <nav className={`fixed inset-x-0 top-0 z-50 flex items-center justify-center h-20 py-3 transition-all duration-300 border-b border-transparent dark:border-slate-700 ${navClasses}`}>
//             <div className="container max-w-7xl px-4 mx-auto flex items-center justify-between w-full">
                
//                 {/* Logo */}
//                 <div className="shrink-0">
//                     <Link to="/revayah-home">
//                         <Logo />
//                     </Link>
//                 </div>

//                 {/* Desktop Menu */}
//                 <div className="hidden md:block mx-auto">
//                     <ul className="flex items-center gap-8">
//                         <li>
//                             <Link 
//                                 to="/revayah-home"
//                                 className="text-base font-medium text-slate-800 dark:text-slate-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
//                             >
//                                 Home
//                             </Link>
//                         </li>
//                         {["Features", "Use Cases", "Contact"].map((item) => (
//                             <li key={item}>
//                                 <a 
//                                     href={`#${item.toLowerCase().replace(" ", "-")}`}
//                                     className="text-base font-medium text-slate-800 dark:text-slate-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
//                                 >
//                                     {item}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Buttons & Mobile Toggle */}
//                 <div className="flex gap-3">
//                     <button type="button" className="hidden md:inline-flex items-center justify-center py-2 px-6 text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 hover:border-blue-600 rounded transition-all shadow-md hover:shadow-blue-500/20">
//                         <span className="align-middle">Sign In</span> 
//                         <LogIn className="inline-block size-4 ml-1" />
//                     </button>

//                     <button 
//                         type="button" 
//                         className="md:hidden flex items-center justify-center size-10 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
//                         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                     >
//                         {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Menu Dropdown */}
//             {isMobileMenuOpen && (
//                 <div className="absolute top-20 inset-x-0 bg-white dark:bg-slate-800 shadow-lg md:hidden p-4 border-t border-slate-100 dark:border-slate-700">
//                     <ul className="flex flex-col gap-4">
//                          <li>
//                             <Link 
//                                 to="/revayah-home"
//                                 className="block text-base font-medium text-slate-800 dark:text-slate-100 hover:text-blue-500"
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 Home
//                             </Link>
//                         </li>
//                         {["Features", "Use Cases", "Contact"].map((item) => (
//                             <li key={item}>
//                                 <a 
//                                     href={`#${item.toLowerCase().replace(" ", "-")}`}
//                                     className="block text-base font-medium text-slate-800 dark:text-slate-100 hover:text-blue-500"
//                                     onClick={() => setIsMobileMenuOpen(false)}
//                                 >
//                                     {item}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default NavBar;

import React, { useState, useEffect } from "react";
import { Menu, LogIn, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// IMPORTANT: Replace this path with the actual location of your logo file.
// Ideally, use a PNG with a transparent background for the best blend.
import logo from '../../assets/images/revayah-logo.png';

const NavBar = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation(); // To detect active route

    useEffect(() => {
        const handleScroll = () => {
            const scrollUp = document.documentElement.scrollTop;
            setIsSticky(scrollUp >= 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClasses = isSticky 
        ? "bg-white dark:bg-slate-800 shadow-lg shadow-slate-200/25 dark:shadow-slate-900/30" 
        : "bg-white dark:bg-slate-800 shadow-lg shadow-slate-200/25 dark:shadow-slate-900/30";

    // Helper to check active state
    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed inset-x-0 top-0 z-50 flex items-center justify-center h-20 py-3 transition-all duration-300 border-b border-transparent dark:border-slate-700 ${navClasses}`}>
            <div className="container max-w-7xl px-4 mx-auto flex items-center justify-between w-full">
                
                {/* Logo Section */}
                <div className="shrink-0">
                    <Link to="/">
                        {/* Using Image Logo */}
                        <img 
                            src={logo} 
                            alt="Revayah One" 
                            className="h-10 md:h-12 w-auto object-contain" 
                        />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:block mx-auto">
                    <ul className="flex items-center gap-8">
                        <li>
                            <Link 
                                to="/"
                                className={`text-base font-medium transition-colors ${isActive('/') ? 'text-blue-600 font-bold' : 'text-slate-800 dark:text-slate-100 hover:text-blue-500'}`}
                            >
                                Home
                            </Link>
                        </li>
                        {["Features", "Use Cases", "Contact"].map((item) => (
                            <li key={item}>
                                <a 
                                    // Uses absolute path + hash to ensure navigation works from other pages
                                    href={`/#${item.toLowerCase().replace(" ", "-")}`}
                                    className="text-base font-medium text-slate-800 dark:text-slate-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Buttons & Mobile Toggle */}
                <div className="flex gap-3">
                    <Link to="/signin">
                        <button type="button" className="hidden md:inline-flex items-center justify-center py-2 px-6 text-white bg-rose-500 border border-rose-500 hover:bg-rosey-600 hover:border-rosey-600 rounded transition-all shadow-md hover:shadow-rose-500/20">
                            <span className="align-middle">Sign In</span> 
                            <LogIn className="inline-block size-4 ml-1" />
                        </button>
                    </Link>

                    <button 
                        type="button" 
                        className="md:hidden flex items-center justify-center size-10 text-white bg-rose-500 rounded hover:bg-rosey-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 inset-x-0 bg-white dark:bg-slate-800 shadow-lg md:hidden p-4 border-t border-slate-100 dark:border-slate-700">
                    <ul className="flex flex-col gap-4">
                        <li>
                            <Link 
                                to="/"
                                className={`block text-base font-medium ${isActive('/') ? 'text-blue-600' : 'text-slate-800 dark:text-slate-100'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        {["Features", "Use Cases", "Contact"].map((item) => (
                            <li key={item}>
                                <a 
                                    href={`/#${item.toLowerCase().replace(" ", "-")}`}
                                    className="block text-base font-medium text-slate-800 dark:text-slate-100 hover:text-blue-500"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                        <li>
                            <Link 
                                to="/signin"
                                className="block text-base font-medium text-slate-800 dark:text-slate-100 hover:text-blue-500"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;