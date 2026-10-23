import React from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  User,
  Briefcase,
  GraduationCap,
  QrCode,
  PenTool,
  Share2,
  Target,
  BarChart3,
  Globe,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail
} from "lucide-react";

import anitaImg from "../../assets/images/revayah_home/individuals_pro.jpg";

const DigitalIdentityToolsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/90 dark:divide-slate-800 text-left">
      
      {/* LEFT COLUMN: Digital Identity (Side-by-Side: Text on Left + Phone & 5 Badges on Right) */}
      <div id="digital-identity" className="p-5 sm:p-6 lg:p-6 xl:p-8 flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center w-full">
          
          {/* Left Text Block (5 cols) */}
          <div className="sm:col-span-5 flex flex-col justify-center text-left">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#172554] dark:text-white tracking-tight mb-1">
              Digital Identity
            </h2>
            <h3 className="text-xs sm:text-[13px] font-bold text-[#172554] dark:text-slate-200 mb-2">
              Your Identity. Your Digital Presence.
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Make your identity accessible, professional and easy to share. Create a digital identity tailored to your category and bring your essential information, experience, portfolio and services together in one place.
            </p>
            
            <div>
              <Link
                to="/signin"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
              >
                <span>Create Your Digital Identity</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Visual Panel (7 cols): Phone Mockup + 5 Category Badges (No outer gray box) */}
          <div className="sm:col-span-7 flex items-center justify-center gap-3">
            
            {/* Smartphone Card Preview */}
            <div className="w-24 sm:w-26 bg-slate-900 rounded-[20px] p-1 shadow-md shrink-0 border border-slate-700">
              <div className="w-6 h-1 bg-slate-900 rounded-b-md mx-auto mb-0.5" />
              <div className="bg-white rounded-[15px] p-1.5 text-center text-[7.5px] text-slate-700">
                <div className="w-8 h-8 mx-auto rounded-full overflow-hidden mb-1 border border-blue-500 shadow-2xs">
                  <img
                    src={anitaImg}
                    alt="Anita Sharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-extrabold block text-slate-900 text-[8px] leading-tight">Anita Sharma</span>
                <span className="text-slate-400 block mb-1 text-[6.5px]">Marketing Manager</span>
                <div className="grid grid-cols-3 gap-0.5 mb-1">
                  <span className="py-0.5 rounded bg-blue-600 text-white font-semibold text-[5.5px] flex items-center justify-center gap-0.5">
                    <Phone className="w-1.5 h-1.5" /> Call
                  </span>
                  <span className="py-0.5 rounded bg-blue-600 text-white font-semibold text-[5.5px] flex items-center justify-center gap-0.5">
                    <Mail className="w-1.5 h-1.5" /> Email
                  </span>
                  <span className="py-0.5 rounded bg-blue-600 text-white font-semibold text-[5.5px] flex items-center justify-center gap-0.5">
                    <Share2 className="w-1.5 h-1.5" /> Share
                  </span>
                </div>
                <div className="w-7 h-7 mx-auto bg-slate-100 rounded flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-slate-800" />
                </div>
              </div>
            </div>

            {/* 5 Stacked Category Badges */}
            <div className="flex-1 space-y-1.5">
              {[
                { label: "Digital Cards", icon: CreditCard, href: "/revayah-digital-cards" },
                { label: "Profiles", icon: User },
                { label: "Portfolio & Projects", icon: Briefcase },
                { label: "Education & Qualification", icon: GraduationCap },
                { label: "QR Code & NFC", icon: QrCode },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/90 shadow-2xs hover:border-blue-400 hover:bg-slate-50 transition-colors"
                >
                  <div className="text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <item.icon className="w-3.5 h-3.5" />
                  </div>
                  {item.href ? (
                    <Link to={item.href} className="text-[10.5px] sm:text-[11px] font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 whitespace-nowrap">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-[10.5px] sm:text-[11px] font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT COLUMN: Digital Tools (Side-by-Side: Text on Left + 5 Tool Badges on Right) */}
      <div id="digital-tools" className="p-5 sm:p-6 lg:p-6 xl:p-8 flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center w-full">
          
          {/* Left Text Block (5 cols) */}
          <div className="sm:col-span-5 flex flex-col justify-center text-left">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#172554] dark:text-white tracking-tight mb-1">
              Digital Tools
            </h2>
            <h3 className="text-xs sm:text-[13px] font-bold text-[#172554] dark:text-slate-200 mb-2">
              The Tools to Build, Present and Grow.
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Explore a collection of digital builders, sharing tools, engagement features and management capabilities.
            </p>

            <div>
              <a
                href="#digital-tools"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors"
              >
                <span>Explore All Digital Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Visual Panel (7 cols): Tool Categories Stack + Highlighted Mini Website Builder Banner */}
          <div className="sm:col-span-7 space-y-1.5">
            {[
              { title: "Create & Showcase", count: "13+ Builders", icon: PenTool },
              { title: "Connect & Share", count: "4 Tools", icon: Share2 },
              { title: "Engage & Generate", count: "4 Tools", icon: Target },
              { title: "Manage & Measure", count: "3 Tools", icon: BarChart3 },
            ].map((tool, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/90 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <tool.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-800 dark:text-slate-100">
                    {tool.title}
                  </span>
                </div>
                <span className="text-[9.5px] sm:text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  ({tool.count})
                </span>
              </div>
            ))}

            {/* Highlighted Banner: Mini Website Builder */}
            <div className="p-2.5 sm:p-3 rounded-xl bg-blue-600 text-white flex items-center justify-between shadow-sm group cursor-pointer hover:bg-blue-700 transition-all">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-xs">
                  <Globe className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                    Mini Website Builder
                  </h4>
                  <p className="text-[9px] sm:text-[9.5px] text-blue-100 leading-tight">
                    Create your own professional mini-website in minutes.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default DigitalIdentityToolsSection;


