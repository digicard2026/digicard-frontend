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

// import React, { useState, useEffect } from "react";
// import { Menu, LogIn, X } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// // IMPORTANT: Replace this path with the actual location of your logo file.
// // Ideally, use a PNG with a transparent background for the best blend.
// import logo from '../../assets/images/revayah-logo.png';

// const NavBar = () => {
//     const [isSticky, setIsSticky] = useState(false);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const location = useLocation(); // To detect active route

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
//         : "bg-white dark:bg-slate-800 shadow-lg shadow-slate-200/25 dark:shadow-slate-900/30";

//     // Helper to check active state
//     const isActive = (path) => location.pathname === path;

//     return (
//         <nav className={`fixed inset-x-0 top-0 z-50 flex items-center justify-center h-20 py-3 transition-all duration-300 border-b border-transparent dark:border-slate-700 ${navClasses}`}>
//             <div className="container max-w-7xl px-4 mx-auto flex items-center justify-between w-full">
                
//                 {/* Logo Section */}
//                 <div className="shrink-0">
//                     <Link to="/">
//                         {/* Using Image Logo */}
//                         <img 
//                             src={logo} 
//                             alt="Revayah One" 
//                             className="h-10 md:h-12 w-auto object-contain" 
//                         />
//                     </Link>
//                 </div>

//                 {/* Desktop Menu */}
//                 <div className="hidden md:block mx-auto">
//                     <ul className="flex items-center gap-8">
//                         <li>
//                             <Link 
//                                 to="/"
//                                 className={`text-base font-medium transition-colors ${isActive('/') ? 'text-rosey-600 font-bold' : 'text-slate-800 dark:text-slate-100 hover:text-rose-500'}`}
//                             >
//                                 Home
//                             </Link>
//                         </li>
//                         {["Features", "Use Cases", "Contact"].map((item) => (
//                             <li key={item}>
//                                 <a 
//                                     // Uses absolute path + hash to ensure navigation works from other pages
//                                     href={`/#${item.toLowerCase().replace(" ", "-")}`}
//                                     className="text-base font-medium text-slate-800 dark:text-slate-100 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
//                                 >
//                                     {item}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Buttons & Mobile Toggle */}
//                 <div className="flex gap-3">
//                     <Link to="/signin">
//                         <button type="button" className="hidden md:inline-flex items-center justify-center py-2 px-6 text-white bg-rosey-600 border border-rose-500 hover:bg-rose-500 hover:border-rose-600 rounded transition-all shadow-md hover:shadow-rose-500/20">
//                             <span className="align-middle">Sign In</span> 
//                             <LogIn className="inline-block size-4 ml-1" />
//                         </button>
//                     </Link>

//                     <button 
//                         type="button" 
//                         className="md:hidden flex items-center justify-center size-10 text-white bg-rose-500 rounded hover:bg-rosey-600 transition-colors"
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
//                         <li>
//                             <Link 
//                                 to="/"
//                                 className={`block text-base font-medium ${isActive('/') ? 'text-blue-600' : 'text-slate-800 dark:text-slate-100'}`}
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 Home
//                             </Link>
//                         </li>
//                         {["Features", "Use Cases", "Contact"].map((item) => (
//                             <li key={item}>
//                                 <a 
//                                     href={`/#${item.toLowerCase().replace(" ", "-")}`}
//                                     className="block text-base font-medium text-slate-800 dark:text-slate-100 hover:text-blue-500"
//                                     onClick={() => setIsMobileMenuOpen(false)}
//                                 >
//                                     {item}
//                                 </a>
//                             </li>
//                         ))}
//                         <li>
//                             <Link 
//                                 to="/signin"
//                                 className="block text-base font-medium text-slate-800 dark:text-slate-100 hover:text-blue-500"
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 Sign In
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default NavBar;

import React, { useState, useEffect } from "react";
import { Menu, LogIn, X, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Logo Import
import logo from '../../assets/images/revayah-logo.png';

const NavBar = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // State for Mobile Submenus
    const [isMobileProductOpen, setIsMobileProductOpen] = useState(false);
    const [isMobileSubProductOpen, setIsMobileSubProductOpen] = useState(false);

    const location = useLocation();

    // Scroll Logic
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

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed inset-x-0 top-0 z-50 flex items-center justify-center h-15 py-3 transition-all duration-300 border-b border-transparent dark:border-slate-700 ${navClasses}`}>
            <div className="container max-w-7xl px-4 mx-auto flex items-center justify-between w-full">
                
                {/* Logo */}
                <div className="shrink-0">
                    <Link to="/">
                        <img 
                            src={logo} 
                            alt="Revayah One" 
                            className="h-10 md:h-10 w-auto object-contain" 
                        />
                    </Link>
                </div>

                {/* --- DESKTOP MENU --- */}
                <div className="hidden md:block mx-auto">
                    <ul className="flex items-center gap-8">
                        {/* Home Link */}
                        <li>
                            <Link 
                                to="/"
                                className={`text-base font-medium transition-colors ${isActive('/') ? 'text-rose-600 font-bold' : 'text-slate-800 dark:text-slate-100 hover:text-rose-500'}`}
                            >
                                Home
                            </Link>
                        </li>

                        {/* PRODUCT DROPDOWN */}
                        <li className="relative group">
                            <button className="flex items-center gap-1 text-base font-medium text-slate-800 dark:text-slate-100 hover:text-rose-500 transition-colors">
                                Products
                                <ChevronDown className="size-4 mt-0.5" />
                            </button>

                            {/* Main Dropdown */}
                            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                <ul className="w-64 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 py-2">
                                    
                                    {/* Product 1 with Submenu */}
                                    <li className="relative group/sub">
                                        <button className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-rose-500 flex items-center justify-between">
                                            Digital Identity Solutions
                                            <ChevronRight className="size-4" />
                                        </button>

                                        {/* Sub-Product Dropdown (Right Side) */}
                                        <div className="absolute top-0 left-full pl-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 transform group-hover/sub:translate-x-0 -translate-x-2">
                                            <ul className="w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 py-2">
                                                <li>
                                                    <Link to="/revayah-business-card" className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-rose-500">
                                                        Reva-Yah Business Card (Rbiz)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/revayah-profile-builder" className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-rose-500">
                                                        Reva-Yah Profile Builder (Rpro)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/revayah-catalog" className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-rose-500">
                                                        Reva-Yah Catalog (Rcatalog)
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/revayah-resume-builder" className="block px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-rose-500">
                                                        Reva-Yah Resume Builder (Rresume)
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* Product 2 */}
                                    <li>
                                        <Link to="/smart-campus" className="block px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-rose-500">
                                            NFC-Based Smart Campus
                                        </Link>
                                    </li>

                                    {/* Product 3 */}
                                    <li>
                                        <Link to="/saas-platforms" className="block px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-rose-500">
                                            SaaS Platforms
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* Other Links */}
                        {["Use Cases", "Contact"].map((item) => (
                            <li key={item}>
                                <a 
                                    href={`/#${item.toLowerCase().replace(" ", "-")}`}
                                    className="text-base font-medium text-slate-800 dark:text-slate-100 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Buttons */}
                <div className="flex gap-3">
                    <Link to="/signin">
                        <button type="button" className="hidden md:inline-flex items-center justify-center py-2 px-6 text-white bg-rose-600 border border-rose-500 hover:bg-rose-500 hover:border-rose-600 rounded transition-all shadow-md hover:shadow-rose-500/20">
                            <span className="align-middle">Sign In</span> 
                            <LogIn className="inline-block size-4 ml-1" />
                        </button>
                    </Link>

                    <button 
                        type="button" 
                        className="md:hidden flex items-center justify-center size-10 text-white bg-rose-500 rounded hover:bg-rose-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* --- MOBILE MENU --- */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 inset-x-0 bg-white dark:bg-slate-800 shadow-lg md:hidden p-4 border-t border-slate-100 dark:border-slate-700 max-h-[80vh] overflow-y-auto">
                    <ul className="flex flex-col gap-2">
                        <li>
                            <Link 
                                to="/"
                                className={`block px-4 py-3 text-base font-medium rounded-md ${isActive('/') ? 'bg-rose-50 text-rosey-600' : 'text-slate-800 dark:text-slate-100 hover:bg-slate-50'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>

                        {/* Mobile Product Accordion */}
                        <li>
                            <button 
                                onClick={() => setIsMobileProductOpen(!isMobileProductOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 rounded-md"
                            >
                                Products
                                <ChevronDown className={`size-4 transition-transform ${isMobileProductOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {/* Level 1 Submenu */}
                            {isMobileProductOpen && (
                                <ul className="pl-4 mt-1 space-y-1 bg-slate-50 dark:bg-slate-900 rounded-md">
                                    <li>
                                        <button 
                                            onClick={() => setIsMobileSubProductOpen(!isMobileSubProductOpen)}
                                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300"
                                        >
                                            Digital Identity Solutions
                                            <ChevronDown className={`size-3 transition-transform ${isMobileSubProductOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Level 2 Submenu (Sub-products) */}
                                        {isMobileSubProductOpen && (
                                            <ul className="pl-4 pb-2 space-y-1 border-l-2 border-slate-200 ml-4">
                                                {[
                                                    { name: "Rbiz Business Card", path: "/revayah-business-card" },
                                                    { name: "Rpro Profile Builder", path: "/revayah-profile-builder" },
                                                    { name: "Rcatalog", path: "/revayah-catalog" },
                                                    { name: "Rresume Builder", path: "/revayah-resume-builder" }
                                                ].map((sub) => (
                                                    <li key={sub.name}>
                                                        <Link 
                                                            to={sub.path}
                                                            className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-rose-500"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                    <li>
                                        <Link to="/smart-campus" className="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300" onClick={() => setIsMobileMenuOpen(false)}>
                                            NFC Smart Campus
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/saas-platforms" className="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300" onClick={() => setIsMobileMenuOpen(false)}>
                                            SaaS Platforms
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Other Links */}
                        {["Use Cases", "Contact"].map((item) => (
                            <li key={item}>
                                <a 
                                    href={`/#${item.toLowerCase().replace(" ", "-")}`}
                                    className="block px-4 py-3 text-base font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 rounded-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                        
                        <li className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                            <Link 
                                to="/signin"
                                className="block w-full text-center py-2.5 text-base font-medium text-white bg-rosey-600 rounded-md hover:bg-rose-500"
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