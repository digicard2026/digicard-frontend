import React from "react";
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  Share2, 
  QrCode, 
  CheckCircle2,
  Package,
  Wrench,
  BarChart3,
  ChevronLeft
} from "lucide-react";

import heroBg from "../../assets/images/revayah_home/hero_bg_flipped.jpg";
import industryImg from "../../assets/images/revayah_home/business_industry.jpg";
import anitaImg from "../../assets/images/revayah_home/individuals_pro.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f4f9ff] dark:bg-slate-950 pt-5 pb-8 lg:pt-7 lg:pb-10 border-b border-slate-100 dark:border-slate-800">
      
      {/* Background Graphic matching original screenshot */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <img
          src={heroBg}
          alt="Hero background"
          className="w-full h-full object-cover object-top opacity-100 dark:opacity-20"
        />
        {/* Soft overlay gradient ensuring perfect text legibility on left and studio floor grounding */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/30 to-transparent dark:from-slate-950 dark:via-slate-950/60" />
        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-white/95 via-white/50 to-transparent dark:from-slate-950" />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Text Column (5 cols on lg) */}
          <div className="lg:col-span-5 text-left z-10">
            
            {/* Division Kicker */}
            <div className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1e3a8a] dark:text-blue-400 mb-2">
              THE DIGITAL DIVISION OF THE HOUSE OF REVA-YAH
            </div>

            {/* Main Headline (3 clean lines matching original screenshot) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[43px] font-black tracking-tight text-[#111827] dark:text-white leading-[1.08] mb-3">
              One Platform.<br />
              Every<br />
              <span className="text-[#2563eb] dark:text-blue-400">Digital Possibility.</span>
            </h1>

            {/* Subheading */}
            <h2 className="text-xs sm:text-[14px] font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug">
              Build Your Identity. Connect Your Business. Grow Without Limits.
            </h2>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-[12.5px] text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mb-5">
              Reva-Yah One brings together digital identity solutions, business tools and industry-specific digital products to help individuals, professionals, businesses and institutions build and grow their digital presence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#digital-tools"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#2563eb] hover:bg-blue-700 shadow-sm shadow-blue-500/25 active:scale-95 transition-all"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#digital-solutions"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-2xs active:scale-95 transition-all"
              >
                Find Your Solution
              </a>
            </div>

          </div>

          {/* Right Visual Mockup Column (7 cols on lg) */}
          <div className="lg:col-span-7 relative flex items-center justify-center mt-4 lg:mt-0">
            <div className="relative w-full max-w-[530px] py-1">

              {/* 1. CENTER: Laptop Mockup */}
              <div className="relative mx-auto w-[88%] sm:w-[90%] bg-slate-900 rounded-t-2xl p-1.5 sm:p-2 pb-0 shadow-xl border-t border-x border-slate-700">
                {/* Laptop Camera dot */}
                <div className="w-1.5 h-1.5 bg-slate-700 rounded-full mx-auto mb-1" />
                
                {/* Laptop Screen Content */}
                <div className="bg-white rounded-t-lg overflow-hidden border border-slate-200 text-left">
                  {/* Website Browser Header */}
                  <div className="bg-white px-3 sm:px-3.5 py-1.5 border-b border-slate-200/90 flex items-center justify-between text-[8.5px] sm:text-[9.5px]">
                    <span className="font-extrabold text-slate-900 tracking-tight">Your Business Name</span>
                    <div className="flex items-center gap-2.5 sm:gap-3 text-[7.5px] sm:text-[8.5px] text-slate-500 font-medium">
                      <span className="text-blue-600 font-semibold cursor-pointer">Home</span>
                      <span className="hover:text-slate-800 cursor-pointer">About</span>
                      <span className="hover:text-slate-800 cursor-pointer">Services</span>
                      <span className="hover:text-slate-800 cursor-pointer">Products</span>
                      <span className="hover:text-slate-800 cursor-pointer">Contact</span>
                    </div>
                  </div>

                  {/* Website Hero Banner (Ultra-sharp 4K industrial plant with crisp text overlay - compact height) */}
                  <div className="relative h-26 sm:h-32 overflow-hidden bg-slate-900">
                    <img
                      src={industryImg}
                      alt="Industrial facility"
                      className="absolute inset-0 w-full h-full object-cover object-right"
                    />
                    {/* Left gradient overlay for high contrast text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/65 to-transparent flex flex-col justify-center px-3.5 sm:px-5">
                      <h3 className="text-white font-extrabold text-[11px] sm:text-[13px] leading-tight drop-shadow-sm mb-1 max-w-[190px] sm:max-w-[230px]">
                        Innovative Solutions<br />
                        for a Better Tomorrow
                      </h3>
                      <p className="text-blue-100 text-[6.5px] sm:text-[7.5px] max-w-[150px] sm:max-w-[190px] leading-tight mb-1.5 opacity-95 drop-shadow-xs">
                        Quality products, reliable service, sustainable innovation.
                      </p>
                      <div>
                        <button className="bg-white hover:bg-slate-100 text-slate-900 text-[6.5px] sm:text-[7.5px] font-bold px-2 py-0.5 rounded-full shadow-xs transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 3 Action Cards below banner */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-slate-50/70 border-t border-slate-100">
                    <div className="bg-white p-1.5 rounded-lg border border-slate-200/80 text-center shadow-2xs flex flex-col items-center justify-center">
                      <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mb-0.5">
                        <Package className="w-3 h-3" />
                      </div>
                      <span className="text-[7.5px] sm:text-[8px] font-bold text-slate-800 block">Our Products</span>
                    </div>
                    <div className="bg-white p-1.5 rounded-lg border border-slate-200/80 text-center shadow-2xs flex flex-col items-center justify-center">
                      <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mb-0.5">
                        <Wrench className="w-3 h-3" />
                      </div>
                      <span className="text-[7.5px] sm:text-[8px] font-bold text-slate-800 block">Our Services</span>
                    </div>
                    <div className="bg-white p-1.5 rounded-lg border border-slate-200/80 text-center shadow-2xs flex flex-col items-center justify-center">
                      <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mb-0.5">
                        <BarChart3 className="w-3 h-3" />
                      </div>
                      <span className="text-[7.5px] sm:text-[8px] font-bold text-slate-800 block">Our Projects</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop Base */}
              <div className="w-[96%] sm:w-[98%] mx-auto h-2.5 sm:h-3 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 rounded-b-xl shadow-md relative">
                <div className="w-14 h-0.5 bg-slate-600 mx-auto rounded-b" />
              </div>
              <div className="w-[85%] mx-auto h-1.5 bg-slate-300/50 blur-sm rounded-full" />

              {/* 2. OVERLAPPING FRONT-LEFT: Sleek Smartphone Mockup */}
              <div className="absolute -left-1 sm:left-1 -bottom-2 sm:-bottom-1 w-32 sm:w-38 bg-slate-900 rounded-[24px] sm:rounded-[28px] p-1 sm:p-1.5 shadow-2xl border-[2.5px] border-slate-800 ring-1 ring-slate-900/50 z-20">
                {/* Mobile screen notch */}
                <div className="w-10 h-2 bg-slate-900 rounded-b-lg mx-auto mb-0.5 flex items-center justify-center">
                  <div className="w-3.5 h-0.5 bg-slate-700 rounded-full" />
                </div>
                
                {/* Mobile Screen Content (Digital Identity Card) */}
                <div className="bg-white rounded-[18px] sm:rounded-[22px] overflow-hidden text-center border border-slate-100 flex flex-col">
                  {/* Top mobile header bar */}
                  <div className="bg-[#2563eb] px-2 py-1 flex items-center justify-between text-white text-[7px] font-semibold">
                    <span className="flex items-center gap-0.5">
                      <ChevronLeft className="w-2 h-2" /> Back
                    </span>
                    <span>Preview</span>
                    <Share2 className="w-2 h-2" />
                  </div>

                  <div className="p-1.5 sm:p-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full overflow-hidden mb-1 border-2 border-white shadow-xs ring-2 ring-blue-500/30">
                      <img
                        src={anitaImg}
                        alt="Anita Sharma"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h5 className="text-[10px] sm:text-[11px] font-extrabold text-slate-900 leading-tight">
                      Anita Sharma
                    </h5>
                    <p className="text-[7px] sm:text-[7.5px] text-slate-500 font-medium mb-1.5">
                      Marketing Manager
                    </p>

                    {/* 3 Quick Action Pills */}
                    <div className="grid grid-cols-3 gap-0.5 mb-1.5">
                      <button className="py-0.5 rounded bg-[#2563eb] hover:bg-blue-700 text-white text-[6.5px] sm:text-[7px] font-bold flex items-center justify-center gap-0.5 shadow-2xs">
                        <Phone className="w-1.5 h-1.5" /> Call
                      </button>
                      <button className="py-0.5 rounded bg-[#2563eb] hover:bg-blue-700 text-white text-[6.5px] sm:text-[7px] font-bold flex items-center justify-center gap-0.5 shadow-2xs">
                        <Mail className="w-1.5 h-1.5" /> Email
                      </button>
                      <button className="py-0.5 rounded bg-[#2563eb] hover:bg-blue-700 text-white text-[6.5px] sm:text-[7px] font-bold flex items-center justify-center gap-0.5 shadow-2xs">
                        <Share2 className="w-1.5 h-1.5" /> Share
                      </button>
                    </div>

                    {/* Mini QR Code */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 mx-auto bg-white p-0.5 rounded-lg border border-slate-200/90 shadow-2xs flex items-center justify-center">
                      <QrCode className="w-full h-full text-slate-900" />
                    </div>

                    {/* Bottom home indicator bar */}
                    <div className="w-8 h-0.5 bg-slate-300 mx-auto mt-1 rounded-full" />
                  </div>
                </div>
              </div>

              {/* 3. OVERLAPPING RIGHT: Floating "Your Mini Website" Widget Card */}
              <div className="hidden sm:block absolute -right-2 sm:-right-3 top-1 sm:top-2 w-44 sm:w-50 bg-white dark:bg-slate-800 rounded-xl p-2.5 sm:p-3 shadow-lg border border-slate-200/80 dark:border-slate-700 z-20 text-left">
                <div className="mb-1.5">
                  <span className="text-[11px] sm:text-xs font-extrabold text-slate-900 dark:text-white block leading-tight">
                    Your Mini Website
                  </span>
                  <span className="text-[8px] sm:text-[8.5px] text-slate-500 dark:text-slate-400 block font-medium">
                    Your Brand. Your Story.
                  </span>
                </div>

                {/* Ultra-sharp Crisp Miniature Website Preview (Vector/CSS rendered, zero blur) */}
                <div className="rounded-lg border border-slate-200/90 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 overflow-hidden mb-2 shadow-2xs">
                  {/* Miniature browser top bar */}
                  <div className="h-3 bg-slate-200/80 dark:bg-slate-800 px-1.5 flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-red-400" />
                    <div className="w-1 h-1 rounded-full bg-amber-400" />
                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  </div>
                  {/* Miniature website hero banner */}
                  <div className="h-7 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 relative flex items-center px-1.5">
                    <span className="text-[6px] font-bold text-white tracking-wider uppercase opacity-80">Portfolio</span>
                  </div>
                  {/* Miniature profile strip */}
                  <div className="flex items-center gap-1.5 px-1.5 py-1 bg-white dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800 -mt-1.5 relative z-10 mx-1 rounded shadow-2xs">
                    <div className="w-5 h-5 rounded-full border border-white overflow-hidden shadow-2xs shrink-0">
                      <img
                        src={anitaImg}
                        alt="Preview Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="w-10 h-1 bg-slate-800 dark:bg-slate-200 rounded-full mb-0.5" />
                      <div className="w-7 h-0.5 bg-slate-400 dark:bg-slate-500 rounded-full" />
                    </div>
                  </div>
                  {/* Miniature action pill placeholders */}
                  <div className="grid grid-cols-2 gap-0.5 p-1 bg-slate-50 dark:bg-slate-900">
                    <div className="h-2 rounded bg-blue-100 dark:bg-blue-900/50 flex items-center px-1">
                      <div className="w-4 h-0.5 bg-blue-600 rounded-full" />
                    </div>
                    <div className="h-2 rounded bg-slate-200 dark:bg-slate-800 flex items-center px-1">
                      <div className="w-4 h-0.5 bg-slate-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Checklist bullets */}
                <ul className="space-y-1 mb-2 text-[8px] sm:text-[8.5px] text-slate-700 dark:text-slate-300 font-medium">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#2563eb] shrink-0" />
                    <span>Showcase your services</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#2563eb] shrink-0" />
                    <span>Add your products</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#2563eb] shrink-0" />
                    <span>Get enquiries</span>
                  </li>
                </ul>

                <button className="w-full py-1.5 rounded-lg bg-[#2563eb] hover:bg-blue-700 text-white text-[9px] sm:text-[9.5px] font-bold text-center transition-colors shadow-sm shadow-blue-500/25">
                  Create Your Mini Website
                </button>
              </div>

              {/* Hand-drawn style decorative callout doodle & curved arrow pointing to card */}
              <div className="hidden lg:flex flex-col items-end absolute -right-5 -top-7 z-30 pointer-events-none select-none">
                <div className="text-right pr-1">
                  <span className="font-serif italic text-[11px] font-bold text-[#1e3a8a] dark:text-blue-300 transform rotate-6 inline-block leading-tight tracking-tight">
                    Your<br />
                    Digital Presence<br />
                    in Minutes!
                  </span>
                </div>
                {/* Curved hand-drawn style arrow swooping down-left to the card corner */}
                <svg className="w-7 h-7 text-[#1e3a8a] dark:text-blue-400 -mt-0.5 mr-2" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 40 8 C 44 24, 28 36, 12 38" />
                  <path d="M 22 33 L 11 38 L 19 46" />
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;