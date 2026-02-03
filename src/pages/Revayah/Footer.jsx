// import React from "react";
// import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin } from "lucide-react";
// import revayahone from "../../assets/images/revayah-logo.png";

// const Footer = () => {
//     return (
//         <footer className="relative pt-20 pb-10 bg-slate-900 dark:bg-black border-t border-slate-800">
//             <div className="container max-w-7xl px-4 mx-auto">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12 text-slate-300">

//                     {/* Company Info */}
//                     <div className="lg:col-span-4">
//                         <div className="mb-4">
//                                         <a href="https://revayahone.com" className="inline-flex items-center gap-2">
//                                           <img src={revayahone} alt="" className="hidden h-8 dark:block" />
//                                           <img src={revayahone} alt="" className="block h-8 dark:hidden" />
//                                         </a>
//                                       </div>
//                         <p className="mb-6 text-slate-400 font-sans">Smart Identity Simplified</p>
//                         <p className="text-sm leading-6 mb-4 max-w-sm text-slate-400 font-sans">
//                             A unified digital identity, NFC smart campus, and SaaS platform helping institutions move to a secure, contactless future.
//                         </p>
//                     </div>

//                     {/* Contact Details */}
//                     <div id="contact" className="lg:col-span-4">
//                         <h5 className="text-lg font-semibold text-white mb-5">Contact Us</h5>
//                         <ul className="space-y-4 text-sm text-slate-400">
//                             <li className="flex items-start gap-3">
//                                 <MapPin className="size-5 text-blue-500  font-sans shrink-0" />
//                                 <span>
//                                     Stan Initiatives Pvt Ltd<br />
//                                     # 204, Suite-159 1st Floor, Sapphire Chambers<br />
//                                     Baner Road, Pune - 411045, Maharashtra
//                                 </span>
//                             </li>
//                             <li className="flex items-center gap-3">
//                                 <Phone className="size-5 text-blue-500 shrink-0 font-sans" />
//                                 <span>020 – 6732 0467 / +91 9449 88 5951</span>
//                             </li>
//                             <li className="flex items-center gap-3">
//                                 <Mail className="size-5 text-blue-500 shrink-0 font-sans" />
//                                 <span>info@revayahone.com</span>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Socials */}
//                     <div className="lg:col-span-4">
//                         <h5 className="text-lg font-semibold text-white mb-5 font-sans">Follow Us</h5>
//                         <div className="flex gap-4">
//                             {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
//                                 <a key={i} href="#!" className="flex items-center justify-center size-10 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-all">
//                                     <Icon size={18} />
//                                 </a>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="pt-8 border-t border-slate-800 text-center text-sm font-sans text-slate-500">
//                     <p>© {new Date().getFullYear()} Revayah One | Digital Identity • NFC Smart Campus • SaaS Solutions</p>
//                 </div>
//             </div>
//         </footer>
//     );
// };

//  export default Footer;

// import React from "react";
// import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin } from "lucide-react";

// const Footer = () => {
//     return (
//         <footer className="relative pt-20 pb-10 bg-slate-900 dark:bg-black border-t border-slate-800 font-sans">
//             <div className="container max-w-7xl px-4 mx-auto">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12 text-slate-300">

//                     {/* Company Info */}
//                     <div className="lg:col-span-4">
//                         <h5 className="text-2xl font-bold text-white mb-3 font-sans">Revayah One</h5>
//                         <p className="mb-6 text-slate-400 font-sans">Smart Identity Simplified</p>
//                         <p className="text-sm leading-6 mb-4 max-w-sm text-slate-400 font-satoshi">
//                             A unified digital identity, NFC smart campus, and SaaS platform helping institutions move to a secure, contactless future.
//                         </p>
//                     </div>

//                     {/* Contact Details */}
//                     <div className="lg:col-span-4">
//                         <h5 className="text-lg font-semibold text-white mb-5">Contact Us</h5>
//                         <ul className="space-y-4 text-sm text-slate-400">
//                             <li className="flex items-start gap-3">
//                                 <MapPin className="size-5 text-blue-500 font-satoshi shrink-0" />
//                                 <span>
//                                     Stan Initiatives Pvt Ltd<br />
//                                     # 204, Suite-159 1st Floor, Sapphire Chambers<br />
//                                     Baner Road, Pune - 411045, Maharashtra
//                                 </span>
//                             </li>
//                             <li className="flex items-center gap-3">
//                                 <Phone className="size-5 text-blue-500 shrink-0 font-satoshi" />
//                                 <span>020 – 6732 0467 / +91 9449 88 5951</span>
//                             </li>
//                             <li className="flex items-center gap-3">
//                                 <Mail className="size-5 text-blue-500 shrink-0 font-satoshi" />
//                                 <span>info@revayahone.com</span>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Socials */}
//                     <div className="lg:col-span-4">
//                         <h5 className="text-lg font-semibold text-white mb-5 font-satoshi">Follow Us</h5>
//                         <div className="flex gap-4">
//                             {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
//                                 <a key={i} href="#!" className="flex items-center justify-center size-10 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-all">
//                                     <Icon size={18} />
//                                 </a>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="pt-8 border-t border-slate-800 text-center text-sm font-satoshi text-slate-500">
//                     <p>© {new Date().getFullYear()} Revayah One | Digital Identity • NFC Smart Campus • SaaS Solutions</p>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;

import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin, Handshake } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for internal routing
import revayahone from "../../assets/images/revayah-logo.png";

const Footer = () => {
    return (
        <footer className="relative pt-20 pb-10 bg-slate-900 dark:bg-black border-t border-slate-800">
            <div className="container max-w-7xl px-4 mx-auto">
                {/* Changed to lg:grid-cols-4 for equal spacing of 4 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-slate-300">

                    {/* 1. Company Info */}
                    <div>
                        <div className="mb-4">
                            <Link to="/" className="inline-flex items-center gap-2">
                                <img src={revayahone} alt="Revayah One" className="h-8" />
                            </Link>
                        </div>
                        <p className="mb-6 text-slate-400 font-sans">Smart Identity Simplified</p>
                        <p className="text-sm leading-6 mb-4 text-slate-400 font-sans">
                            A unified digital identity, NFC smart campus, and SaaS platform helping institutions move to a secure, contactless future.
                        </p>
                    </div>

                    {/* 2. Partner Opportunities (NEW COLUMN) */}
                    <div>
                        <h5 className="text-lg font-semibold text-white mb-5">Partner With Us</h5>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <Link to="/partner-opportunities" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                                    <Handshake className="size-4 shrink-0" />
                                    <span>Franchise Program</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/partner-opportunities" className="hover:text-blue-500 transition-colors">
                                    Channel Partners
                                </Link>
                            </li>
                            <li>
                                <Link to="/partner-opportunities" className="hover:text-blue-500 transition-colors">
                                    Referral Program
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-blue-500 transition-colors">
                                    Become a Reseller
                                </Link>
                            </li>
                            <li>
                                <Link to="/signin/partner" className="hover:text-blue-500 transition-colors">
                                   Partners Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup/partner" className="hover:text-blue-500 transition-colors">
                                   Join as Partner
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Contact Details */}
                    <div id="contact">
                        <h5 className="text-lg font-semibold text-white mb-5">Contact Us</h5>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="size-5 text-blue-500 font-sans shrink-0" />
                                <span>
                                    Stan Initiatives Pvt Ltd<br />
                                    # 204, Suite-159 1st Floor, Sapphire Chambers<br />
                                    Baner Road, Pune - 411045, Maharashtra
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="size-5 text-blue-500 shrink-0 font-sans" />
                                <span>020 – 6732 0467 / +91 9449 88 5951</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="size-5 text-blue-500 shrink-0 font-sans" />
                                <span>info@revayahone.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Socials */}
                    <div>
                        <h5 className="text-lg font-semibold text-white mb-5 font-sans">Follow Us</h5>
                        <div className="flex gap-4">
                            {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                                <a key={i} href="#!" className="flex items-center justify-center size-10 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center text-sm font-sans text-slate-500">
                    <p>© {new Date().getFullYear()} Revayah One | Digital Identity • NFC Smart Campus • SaaS Solutions</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;