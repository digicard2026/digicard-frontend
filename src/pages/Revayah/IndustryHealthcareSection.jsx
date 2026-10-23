import React from "react";
import {
  Heart,
  Factory,
  UserCheck,
  GraduationCap,
  ShoppingCart,
  ShieldCheck,
  Stethoscope,
  Building,
  ArrowRight
} from "lucide-react";

import doctorImg from "../../assets/images/revayah_home/female_doctor_tablet.jpg";

const IndustryHealthcareSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/90 dark:divide-slate-800 text-left">
      
      {/* LEFT COLUMN: Industry Solutions */}
      <div id="industry-solutions" className="p-5 sm:p-6 lg:p-6 xl:p-8 flex flex-col justify-between">
        <div>
          <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            INDUSTRY SOLUTIONS
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#172554] dark:text-white tracking-tight mb-2">
            Digital Solutions for the Way Your Industry Works
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 max-w-md">
            Different industries need different ways to connect with customers and manage opportunities. Explore solutions designed for your sector.
          </p>

          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors mb-5">
            <span>Find Your Industry Solution</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Industry Category Tiles Grid (Single clean row on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          {[
            { title: "Healthcare", icon: Heart },
            { title: "Manufacturing & Industry", icon: Factory },
            { title: "Consultants & Service Professionals", icon: UserCheck },
            { title: "Education & Institutions", icon: GraduationCap },
            { title: "Trading, Distribution & Retail", icon: ShoppingCart },
          ].map((ind, i) => (
            <div
              key={i}
              className={`p-2 sm:p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/90 shadow-2xs hover:border-blue-400 hover:bg-slate-50 transition-all text-center flex flex-col items-center justify-center min-h-[86px] ${
                i === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1 shrink-0">
                <ind.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9.5px] sm:text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                {ind.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Digital Health */}
      <div id="digital-health" className="p-5 sm:p-6 lg:p-6 xl:p-8 flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center w-full">
          
          {/* Left Block (7 cols): Text + 3 Products in a Row */}
          <div className="sm:col-span-7 flex flex-col justify-between h-full text-left">
            <div>
              <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                DIGITAL HEALTH
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172554] dark:text-white tracking-tight mb-2">
                Digital Solutions for Better Healthcare Connections
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Specialised digital healthcare products to support doctors, clinics and patients through connected digital experiences.
              </p>

              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors mb-5">
                <span>Explore Digital Health</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3 Product Cards in a row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  title: "Hospicare",
                  desc: "Clinic growth & patient engagement",
                  icon: ShieldCheck,
                },
                {
                  title: "HappyDocx",
                  desc: "Doctor discovery & booking access",
                  icon: Stethoscope,
                },
                {
                  title: "Practice Growth System",
                  desc: "Integrated clinic management",
                  icon: Building,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/90 shadow-2xs hover:border-blue-400 hover:bg-slate-50 transition-all text-center flex flex-col items-center justify-start min-h-[86px]"
                >
                  <div className="text-blue-600 dark:text-blue-400 mb-1">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-900 dark:text-white leading-tight mb-0.5">
                    {item.title}
                  </span>
                  <p className="text-[8px] text-slate-500 dark:text-slate-400 leading-tight">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block (5 cols): Doctor Photo with Tablet */}
          <div className="sm:col-span-5 h-48 sm:h-52 lg:h-[210px] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-700 shadow-xs relative">
            <img
              src={doctorImg}
              alt="Doctor with tablet"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>
      </div>

    </div>
  );
};

export default IndustryHealthcareSection;

