import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Building2,
  HeartPulse,
  GraduationCap,
  Factory,
  Sprout,
  Globe,
  CreditCard,
  BookOpen,
  Users,
  Calendar,
  MessageCircle,
  FileText,
  BarChart3,
  MoreHorizontal,
  Zap,
  Layers,
  Headphones,
  ArrowRight,
  X,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

import NavBar from "./NavBar";
import Footer from "./Footer";
import PageTitle from "../../components/PageTitle";

// Extracted assets
import heroShowcaseImg from "../../assets/images/revayah_home/industry_hero_showcase.png";
import needsShowcaseImg from "../../assets/images/revayah_home/industry_needs_showcase.png";
import cardIndividualImg from "../../assets/images/revayah_home/industry_card_individual.png";
import cardBusinessImg from "../../assets/images/revayah_home/industry_card_business.png";
import cardHealthcareImg from "../../assets/images/revayah_home/industry_card_healthcare.png";
import cardEducationImg from "../../assets/images/revayah_home/industry_card_education.png";
import cardIndustryImg from "../../assets/images/revayah_home/industry_card_industry.png";
import cardAgricultureImg from "../../assets/images/revayah_home/industry_card_agriculture.png";
import mountainPanoramaImg from "../../assets/images/revayah_home/industry_mountain_panorama.png";

const INDUSTRY_CARDS = [
  {
    id: "individuals",
    title: "Individuals & Solo Professionals",
    shortTitle: "Individuals",
    description: "Build your personal brand, showcase your skills and connect with opportunities.",
    image: cardIndividualImg,
    icon: User,
    badgeColor: "bg-blue-600",
    recommendedTools: ["Profile Builder", "Digital Card", "Portfolio Builder", "Appointment Booking"],
    tagline: "Empowering Freelancers, Consultants & Solo Creators"
  },
  {
    id: "businesses",
    title: "Businesses & Enterprises",
    shortTitle: "Business",
    description: "Showcase your products, services and build stronger customer relationships.",
    image: cardBusinessImg,
    icon: Building2,
    badgeColor: "bg-blue-600",
    recommendedTools: ["Mini Website Builder", "Lead Generation", "Product Catalogue", "WhatsApp Integration"],
    tagline: "Scale Operations & Convert Inquiries into Customers"
  },
  {
    id: "healthcare",
    title: "Healthcare & Clinics",
    shortTitle: "Healthcare",
    description: "Grow your practice, manage patients and improve engagement.",
    image: cardHealthcareImg,
    icon: HeartPulse,
    badgeColor: "bg-blue-600",
    recommendedTools: ["Appointment Booking", "Digital Patient Profile", "Prescription & Docs", "WhatsApp Reminders"],
    tagline: "Streamline Appointments & Enhance Patient Care"
  },
  {
    id: "education",
    title: "Schools & Institutions",
    shortTitle: "Education",
    description: "Connect with students, parents and build a stronger institutional presence.",
    image: cardEducationImg,
    icon: GraduationCap,
    badgeColor: "bg-blue-600",
    recommendedTools: ["Education Builder", "Notice & Doc Manager", "Admission Enquiries", "Photo Gallery"],
    tagline: "Modernise Admissions & Parent-Student Communication"
  },
  {
    id: "manufacturing",
    title: "Industries & Manufacturing",
    shortTitle: "Industry",
    description: "Showcase your capabilities, manage operations and reach new markets.",
    image: cardIndustryImg,
    icon: Factory,
    badgeColor: "bg-blue-600",
    recommendedTools: ["Brochure Builder", "Product Showcase", "B2B Lead Form", "Analytics & Reporting"],
    tagline: "Showcase Machinery, Specs & Industrial Capabilities"
  },
  {
    id: "agriculture",
    title: "Agriculture & Agro Business",
    shortTitle: "Agro Business",
    description: "Promote your products, connect with buyers and grow your network.",
    image: cardAgricultureImg,
    icon: Sprout,
    badgeColor: "bg-blue-600",
    recommendedTools: ["Agro Catalogue", "Direct Buyer Inquiries", "WhatsApp Commerce", "Regional Showcases"],
    tagline: "Direct Market Reach for Modern Agricultural Enterprises"
  }
];

const KEY_SOLUTIONS = [
  { name: "Mini Website Builder", icon: Globe, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/70" },
  { name: "Digital Cards", icon: CreditCard, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/70" },
  { name: "Product & Catalogue Builder", icon: BookOpen, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/70" },
  { name: "Lead Management", icon: Users, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/70" },
  { name: "Appointment Booking", icon: Calendar, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/70" },
  { name: "WhatsApp Integration", icon: MessageCircle, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70" },
  { name: "Document Builder", icon: FileText, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/70" },
  { name: "Analytics & Reporting", icon: BarChart3, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/70" },
  { name: "And More...", icon: MoreHorizontal, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/70" }
];

const VALUE_PILLARS = [
  {
    title: "Industry-Focused",
    description: "Solutions designed for your unique challenges.",
    icon: Zap
  },
  {
    title: "Flexible & Scalable",
    description: "Choose what you need, add more as you grow.",
    icon: Layers
  },
  {
    title: "Easy to Use",
    description: "No technical skills required. Get started in minutes.",
    icon: Globe
  },
  {
    title: "Dedicated Support",
    description: "Our team is here to help, every step of the way.",
    icon: Headphones
  }
];

const IndustrySolutionsPage = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  return (
    <div className="font-sans antialiased text-slate-800 bg-white dark:text-slate-100 dark:bg-slate-950 min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
      <PageTitle title="Industry Solutions | Reva-Yah One" />

      {/* Global Navigation Bar */}
      <NavBar />

      <main className="flex-grow w-full">
        {/* =========================================================================
            SECTION 1: HERO (Digital Solutions for Every Industry)
           ========================================================================= */}
        <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-8 sm:pt-12 pb-10 sm:pb-14 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

              {/* Left Column: Heading, Subtitle, Copy & 4 Feature Badges */}
              <div className="lg:col-span-5 text-left">
                <span className="text-[11px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block mb-2">
                  INDUSTRY SOLUTIONS
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.12] mb-3">
                  <span className="text-[#0B132B] dark:text-white">Digital Solutions for </span>
                  <span className="text-blue-600 dark:text-blue-500">Every Industry</span>
                </h1>

                <h2 className="text-sm sm:text-base font-bold text-[#0B132B] dark:text-slate-200 mb-2">
                  Tailored solutions for your unique needs.
                </h2>

                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mb-8">
                  From individuals to enterprises, healthcare to education — Reva-Yah One provides industry-specific digital tools to help you work smarter, connect better and grow faster.
                </p>

                {/* 4 Benefit Badges in a single row */}
                <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md pt-2">
                  {[
                    { label: "Streamline Operations", icon: LayoutGrid },
                    { label: "Enhance Engagement", icon: Sparkles },
                    { label: "Improve Efficiency", icon: Target },
                    { label: "Drive Growth", icon: TrendingUp },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center gap-1.5">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-2xs">
                        <item.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: 4 Vertical Profile Cards + Laptop/Phone Mockup Showcase */}
              <div className="lg:col-span-7 flex justify-center lg:justify-end">
                <div className="w-full max-w-[640px] relative">
                  <img
                    src={heroShowcaseImg}
                    alt="Digital Solutions for Every Industry - Business, Healthcare, Education, Industry"
                    className="w-full h-auto object-contain block select-none pointer-events-none drop-shadow-xs"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: CHOOSE YOUR INDUSTRY (6 Cards Grid)
           ========================================================================= */}
        <section id="choose-industry" className="py-10 sm:py-14 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-left">

            {/* Header */}
            <div className="mb-8 max-w-2xl">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block mb-1">
                EXPLORE BY INDUSTRY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] dark:text-white tracking-tight mb-2">
                Choose Your Industry
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Select your industry to discover tailored digital solutions, designed to meet your specific needs and help you achieve your goals.
              </p>
            </div>

            {/* 6 Industry Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-4.5">
              {INDUSTRY_CARDS.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedIndustry(card)}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 overflow-hidden flex flex-col justify-between group cursor-pointer"
                >
                  {/* Photo at top */}
                  <div className="relative w-full h-32 sm:h-36 overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 block"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between relative">
                    {/* Floating circular icon badge */}
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center -mt-8 mb-2 shadow-sm shrink-0 border-2 border-white dark:border-slate-800">
                      <card.icon className="w-4 h-4" />
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-[12.5px] font-bold text-[#0B132B] dark:text-white leading-snug mb-1.5 group-hover:text-blue-600 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                        {card.description}
                      </p>
                    </div>

                    {/* Explore Link */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 mt-auto">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 3: KEY DIGITAL SOLUTIONS (3x3 Grid Matrix)
           ========================================================================= */}
        <section className="py-10 sm:py-14 bg-[#F4F8FD] dark:bg-slate-900/60 border-b border-blue-100/60 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

              {/* Left Column: Heading, Subtitle & View All Solutions Button */}
              <div className="lg:col-span-5 text-left">
                <span className="text-[10px] sm:text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block mb-1.5">
                  INDUSTRY SPECIFIC SOLUTIONS
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] dark:text-white tracking-tight mb-2.5">
                  Key Digital Solutions
                </h2>

                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6 max-w-sm">
                  Powerful tools, built for your industry. From digital presence to customer engagement — we've got you covered.
                </p>

                <Link
                  to="/digital-tools"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-all active:scale-95"
                >
                  <span>View All Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Right Column: 3x3 Grid of 9 Solution Cards */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
                  {KEY_SOLUTIONS.map((item, idx) => (
                    <Link
                      key={idx}
                      to="/digital-tools"
                      className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:shadow-xs hover:border-blue-300 dark:hover:border-blue-500 transition-all text-left group"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#0B132B] dark:text-slate-200 group-hover:text-blue-600 transition-colors leading-tight">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: BUILT FOR REAL BUSINESS NEEDS (Why Choose Reva-Yah One)
           ========================================================================= */}
        <section className="py-10 sm:py-14 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Column: Laptop & Mobile Phone Showcase */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xs">
                  <img
                    src={needsShowcaseImg}
                    alt="Built for Real Business Needs - Grow Your Business dashboard"
                    className="w-full h-auto object-cover block select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Right Column: Heading, Subtitle & 2x2 Value Grid */}
              <div className="lg:col-span-7 text-left">
                <span className="text-[10px] sm:text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block mb-1">
                  WHY CHOOSE REVA-YAH ONE
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] dark:text-white tracking-tight mb-2.5">
                  Built for Real Business Needs
                </h2>

                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6 max-w-xl">
                  Our industry solutions are designed to be simple, flexible and scalable, helping you stay connected, increase efficiency and achieve sustainable growth.
                </p>

                {/* 2x2 Value Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-left">
                  {VALUE_PILLARS.map((pillar, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
                        <pillar.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0B132B] dark:text-white mb-0.5 leading-snug">
                          {pillar.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: READY TO TRANSFORM YOUR BUSINESS? (Bottom Mountain CTA)
           ========================================================================= */}
          <section
            className="relative overflow-hidden text-white py-7 sm:py-9 lg:py-10 bg-no-repeat bg-cover bg-right md:bg-center"
            style={{
              backgroundImage: `url(${mountainPanoramaImg})`,
              backgroundColor: '#072448',
            }}
          >
            {/* Subtle dark gradient overlay to ensure perfect text contrast and mountain panorama depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#031B38]/50 via-[#062850]/15 to-transparent pointer-events-none" />

                <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left pr-0 md:pr-36 lg:pr-48">

                    {/* Text on left */}
                    <div className="max-w-xl">
                      <span className="text-[10px] sm:text-[11px] font-bold text-blue-200 tracking-wider uppercase block mb-1">
                        READY TO TRANSFORM YOUR BUSINESS?
                      </span>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1 drop-shadow-sm">
                          Let's Build Your Digital Future
                        </h2>
                        <p className="text-xs sm:text-[13px] text-blue-100/90">
                          Explore industry-specific solutions and create your digital presence today.
                        </p>
                    </div>

                    {/* Action Button: Positioned in center-right sitting cleanly over mountain ridge */}
                    <div className="shrink-0">
                      <Link
                        to="/create"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-blue-700 bg-white hover:bg-blue-50 shadow-md transition-all active:scale-95 whitespace-nowrap"
                      >
                        <span>Get Started Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                </div>
              </section>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* =========================================================================
          INTERACTIVE INDUSTRY DETAIL MODAL
         ========================================================================= */}
            {selectedIndustry && (
              <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 text-left relative shadow-2xl border border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setSelectedIndustry(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Header info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <selectedIndustry.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {selectedIndustry.title}
                      </h3>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {selectedIndustry.tagline}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {selectedIndustry.description}
                  </p>

                  {/* Recommended Tools */}
                  <div className="mb-5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      Recommended Digital Tools:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedIndustry.recommendedTools.map((tool, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs font-semibold text-slate-800 dark:text-slate-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span>{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setSelectedIndustry(null)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Close
                    </button>
                    <Link
                      to="/digital-tools"
                      onClick={() => setSelectedIndustry(null)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Explore All Tools
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          );
};

          export default IndustrySolutionsPage;

