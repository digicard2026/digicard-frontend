import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import mountainsImg from "../../assets/images/revayah_home/house_of_revayah_mountains.jpg";
import handshakeImg from "../../assets/images/revayah_home/partner_handshake.jpg";

const ShowcaseBanners = () => {
  return (
    <section id="about-revayah" className="py-7 sm:py-9 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          
          {/* LEFT BANNER: The House of Reva-Yah */}
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-slate-850 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col sm:flex-row items-stretch text-left group h-full">
            
            {/* Left Image: Mountain Panorama with Logo Overlay */}
            <div className="sm:w-5/12 min-h-[160px] sm:min-h-full relative overflow-hidden bg-slate-900 flex items-center justify-center p-3 text-center shrink-0">
              <img
                src={mountainsImg}
                alt="The House of Reva-Yah"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-blue-950/20" />
              
              {/* Brand Logo Stamp */}
              <div className="relative z-10 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs border border-white/60 shadow-sm">
                <span className="text-[7.5px] uppercase tracking-widest text-slate-500 dark:text-slate-400 block font-bold">
                  THE HOUSE OF
                </span>
                <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white block font-serif">
                  REVA-YAH
                </span>
                <span className="text-[7px] italic text-slate-500 dark:text-slate-400 block mt-0.5">
                  Bringing Better to Life.
                </span>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="sm:w-7/12 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#172554] dark:text-white mb-1.5">
                  The House of Reva-Yah
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  A portfolio of products, services and business initiatives spanning digital solutions, food, lifestyle and more. Reva-Yah One is our digital division.
                </p>
              </div>

              <div>
                <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors">
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT BANNER: Partner With Us */}
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-slate-850 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col sm:flex-row items-stretch text-left group h-full">
            
            {/* Left Image: Handshake */}
            <div className="sm:w-5/12 min-h-[160px] sm:min-h-full relative overflow-hidden bg-slate-900 shrink-0">
              <img
                src={handshakeImg}
                alt="Business Partnership"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Right Text Content */}
            <div className="sm:w-7/12 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#172554] dark:text-white mb-0.5">
                  Partner With Us
                </h3>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                  Grow Your Business with Reva-Yah One
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  Join our partner network and bring digital solutions closer to your market. Build relationships, create opportunities and grow together.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/partner-opportunities"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
                >
                  <span>Become a Partner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/partner-opportunities"
                  className="inline-flex items-center px-3.5 py-2 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-900 hover:bg-blue-50 transition-colors"
                >
                  Partner Programme
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ShowcaseBanners;

