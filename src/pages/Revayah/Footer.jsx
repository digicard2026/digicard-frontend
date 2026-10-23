import React from "react";
import { Link } from "react-router-dom";
import { 
  Youtube, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Twitter 
} from "lucide-react";

const Footer = () => {
  return (
    <footer id="footer-contact" className="bg-[#0B132B] text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 mb-10 text-left">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 pr-2">
            <Link to="/" className="flex items-center gap-2.5 mb-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-400 flex items-center justify-center text-white font-black text-base shrink-0 shadow-xs">
                R
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                REVA-YAH ONE
              </span>
            </Link>
            <p className="text-[10px] text-slate-400 leading-tight mb-4">
              One Link. One Identity. Infinite Possibilities.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#youtube" className="hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#facebook" className="hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#instagram" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#x" className="hover:text-white transition-colors" aria-label="X">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#digital-identity" className="hover:text-white transition-colors">
                  Digital Identity
                </a>
              </li>
              <li>
                <a href="#digital-tools" className="hover:text-white transition-colors">
                  Digital Tools
                </a>
              </li>
              <li>
                <a href="#industry-solutions" className="hover:text-white transition-colors">
                  Industry Solutions
                </a>
              </li>
              <li>
                <a href="#digital-health" className="hover:text-white transition-colors">
                  Digital Health
                </a>
              </li>
              <li>
                <a href="#academy" className="hover:text-white transition-colors">
                  Reva-Yah One Academy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#about-revayah" className="hover:text-white transition-colors">
                  About Reva-Yah One
                </a>
              </li>
              <li>
                <a href="#about-revayah" className="hover:text-white transition-colors">
                  The House of Reva-Yah
                </a>
              </li>
              <li>
                <a href="#about-revayah" className="hover:text-white transition-colors">
                  Our Divisions
                </a>
              </li>
              <li>
                <Link to="/partner-opportunities" className="hover:text-white transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <a href="#footer-contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/support" className="hover:text-white transition-colors">
                  Help Centre
                </Link>
              </li>
              <li>
                <a href="#academy" className="hover:text-white transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <Link to="/support" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-white transition-colors">
                  Cookie Preferences
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Follow Us */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Follow Us
            </h4>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#youtube" className="hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#facebook" className="hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#instagram" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#x" className="hover:text-white transition-colors" aria-label="X">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Division statement */}
        <div className="pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2025 Reva-Yah One. All rights reserved.</p>
          <p>Reva-Yah One is a division of The House of Reva-Yah.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;