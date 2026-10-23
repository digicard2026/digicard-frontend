import React from "react";
import mountainsImg from "../../assets/images/revayah_home/house_of_revayah_mountains.jpg";

const ContactStrip = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-sky-800 text-white py-6 sm:py-8">
      
      {/* Background Mountain Silhouette & Overlay */}
      <img
        src={mountainsImg}
        alt="Mountains silhouette"
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
      />
      <div className="absolute inset-0 bg-blue-900/30 pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 text-center lg:text-left">
          
          {/* Left Text */}
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-1.5">
              Your Digital Journey Starts Here.
            </h2>
            <p className="text-xs sm:text-[13px] font-medium text-blue-100 leading-relaxed mb-0.5">
              Discover the tools. Build your identity. Find the solution that fits your needs.
            </p>
            <p className="text-[11px] sm:text-xs text-blue-200 leading-relaxed">
              Reva-Yah One helps you take the next step towards a more connected digital presence.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
            <a
              href="#digital-tools"
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-sm border border-blue-400 active:scale-95 transition-all"
            >
              Explore Products
            </a>

            <a
              href="#digital-solutions"
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/50 backdrop-blur-xs active:scale-95 transition-all"
            >
              Find Your Solution
            </a>

            <a
              href="#footer-contact"
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-slate-900/40 hover:bg-slate-900/60 border border-white/30 backdrop-blur-xs active:scale-95 transition-all"
            >
              Contact Us
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactStrip;

