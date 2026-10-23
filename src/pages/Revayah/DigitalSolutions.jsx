import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import individualsImg from "../../assets/images/revayah_home/individuals_pro.jpg";
import businessImg from "../../assets/images/revayah_home/business_industry.jpg";
import schoolsImg from "../../assets/images/revayah_home/schools_institutions.jpg";
import doctorImg from "../../assets/images/revayah_home/doctor_healthcare.jpg";

const solutions = [
  {
    title: "Individuals & Professionals",
    description:
      "Create a professional identity, showcase your experience and connect with your audience.",
    image: individualsImg,
    linkText: "Explore Digital Identity",
    linkHref: "/revayah-digital-cards",
  },
  {
    title: "Businesses & Industries",
    description:
      "Present your organisation, products, services and capabilities through a digital presence.",
    image: businessImg,
    linkText: "Explore Business Solutions",
    linkHref: "#industry-solutions",
  },
  {
    title: "Schools & Institutions",
    description:
      "Organise information, galleries, documents and enquiry pathways through digital tools.",
    image: schoolsImg,
    linkText: "Explore Institutional Solutions",
    linkHref: "#industry-solutions",
  },
  {
    title: "Healthcare Professionals",
    description:
      "Digital presence, appointment booking and practice-growth solutions for doctors and clinics.",
    image: doctorImg,
    linkText: "Explore Digital Health",
    linkHref: "#digital-health",
  },
];

const DigitalSolutions = () => {
  return (
    <section id="digital-solutions" className="py-8 sm:py-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Unified Row: Left Header Column (2 cols) + 4 Audience Cards (1 col each) matching original screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 xl:gap-5 items-stretch">
          
          {/* 1. Left Header Column */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col justify-start pr-2 lg:pr-4 py-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1.5">
              CHOOSE YOUR DIGITAL JOURNEY
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#172554] dark:text-white tracking-tight leading-[1.16] mb-2.5 max-w-sm">
              Digital Solutions Designed Around You
            </h2>
            <p className="text-xs sm:text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Every individual, profession, business and industry has different digital needs. Reva-Yah One helps you discover the right digital identity, tools and solutions for your goals.
            </p>
          </div>

          {/* 2. Four Cards Beside Header */}
          {solutions.map((item, idx) => (
            <div
              key={idx}
              className="group sm:col-span-1 lg:col-span-1 bg-white dark:bg-slate-850 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-750 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className="h-32 sm:h-36 w-full overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Content */}
              <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-[10.5px] text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                {/* Card Link */}
                {item.linkHref.startsWith("/") ? (
                  <Link
                    to={item.linkHref}
                    className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors pt-0.5"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <a
                    href={item.linkHref}
                    className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors pt-0.5"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default DigitalSolutions;
