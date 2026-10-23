import React from "react";
import {
  Play,
  Video,
  BookOpen,
  Compass,
  Users,
  CreditCard,
  Layers,
  Briefcase,
  GraduationCap,
  Share2,
  Handshake,
  ArrowRight
} from "lucide-react";

const AcademyEcosystemSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/90 dark:divide-slate-800 text-left">
      
      {/* LEFT COLUMN: Reva-Yah One Academy (Side-by-Side) */}
      <div id="academy" className="p-5 sm:p-6 lg:p-6 xl:p-8 flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center w-full">
          
          {/* Left Text Block (5 cols) */}
          <div className="sm:col-span-5 flex flex-col justify-center text-left">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#172554] dark:text-white tracking-tight mb-1">
              Reva-Yah One Academy
            </h2>
            <h3 className="text-xs sm:text-[13px] font-bold text-[#172554] dark:text-slate-200 mb-2">
              Learn. Create. Connect. Grow.
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Your digital tutor with video tutorials, guides and practical demos to help you use and create digital identities, builders and business solutions.
            </p>

            <div>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors">
                <span>Explore Academy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Visual Panel (7 cols): Laptop Video Mockup & 4 Resource Links */}
          <div className="sm:col-span-7 flex flex-col sm:flex-row items-center gap-3">
            
            {/* Laptop Screen with Video Play Button */}
            <div className="w-32 sm:w-36 bg-slate-900 rounded-xl p-1 shadow-md shrink-0 border border-slate-700 text-center">
              <div className="h-20 bg-gradient-to-tr from-blue-900 via-blue-800 to-indigo-950 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </div>
                <span className="absolute bottom-1 left-1.5 text-[7px] text-white/80 font-medium">
                  Demo Overview
                </span>
              </div>
              {/* Laptop Stand */}
              <div className="w-12 h-0.5 bg-slate-600 mx-auto rounded-b mt-0.5" />
            </div>

            {/* 4 Resource Links */}
            <div className="flex-1 w-full space-y-1.5">
              {[
                { label: "Video Tutorials", icon: Video },
                { label: "Step-by-Step Guides", icon: BookOpen },
                { label: "Learning Paths", icon: Compass },
                { label: "Partner Resources", icon: Users },
              ].map((res, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/90 shadow-2xs hover:border-blue-400 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <div className="text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <res.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10.5px] sm:text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                    {res.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT COLUMN: Why Reva-Yah One? (Side-by-Side) */}
      <div className="p-5 sm:p-6 lg:p-6 xl:p-8 flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center w-full">
          
          {/* Left Text Block (5 cols) */}
          <div className="sm:col-span-5 flex flex-col justify-center text-left">
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
              WHY REVA-YAH ONE?
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#172554] dark:text-white tracking-tight mb-2">
              One Ecosystem. Multiple Possibilities.
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Everything you need for a stronger digital presence and smarter business growth.
            </p>

            <div>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Visual Panel (7 cols): 6 Value Proposition Items */}
          <div className="sm:col-span-7 bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/90 rounded-2xl p-2.5 sm:p-3 shadow-2xs divide-y divide-slate-100 dark:divide-slate-700/60">
            {[
              { title: "Category-Based Identity", icon: CreditCard },
              { title: "Flexible Digital Tools", icon: Layers },
              { title: "Industry-Focused Solutions", icon: Briefcase },
              { title: "Learn as You Grow", icon: GraduationCap },
              { title: "Connected Experiences", icon: Share2 },
              { title: "Partner Opportunities", icon: Handshake },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 py-1.5 first:pt-0.5 last:pb-0.5 text-left hover:text-blue-600 transition-colors cursor-pointer group"
              >
                <div className="text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <item.icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10.5px] sm:text-[11px] font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};

export default AcademyEcosystemSection;

