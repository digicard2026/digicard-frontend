import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  User,
  Briefcase,
  Image as ImageIcon,
  LayoutGrid,
  GraduationCap,
  Sliders,
  Trophy,
  MessageSquareQuote,
  Wifi,
  QrCode,
  Globe,
  ArrowRight,
  Play,
  PlayCircle,
  ShieldCheck,
  Share2,
  TrendingUp,
  Cloud,
  Building2,
  Factory,
  CheckCircle2,
  X,
  Eye,
  FileEdit,
  MousePointerClick,
  Sparkles,
  Smartphone,
  Store,
  Layers,
  ChevronRight
} from "lucide-react";

import NavBar from "./NavBar";
import Footer from "./Footer";
import PageTitle from "../../components/PageTitle";

// Extracted pixel-perfect assets from master mockup
import heroShowcaseImg from "../../assets/images/revayah_home/digital_identity_hero_showcase.png";
import categoriesShowcaseImg from "../../assets/images/revayah_home/digital_identity_categories_showcase.png";
import mattersWomanImg from "../../assets/images/revayah_home/digital_identity_matters_woman.png";
import ctaScriptImg from "../../assets/images/revayah_home/digital_identity_cta_script.png";
import cardIndividualImg from "../../assets/images/revayah_home/identity_card_individual.png";
import cardProfessionalImg from "../../assets/images/revayah_home/identity_card_professional.png";
import cardBusinessImg from "../../assets/images/revayah_home/identity_card_business.png";
import cardInstitutionImg from "../../assets/images/revayah_home/identity_card_institution.png";

// 12 Digital Identity Solutions
const IDENTITY_SOLUTIONS = [
  {
    id: "digital-cards",
    title: "Digital Cards",
    description: "Share your details instantly with a QR code or NFC.",
    icon: CreditCard,
    badge: null,
    href: "/revayah-digital-cards"
  },
  {
    id: "profile-builder",
    title: "Profile Builder",
    description: "Create a professional profile with your key information.",
    icon: User,
    badge: null,
    href: "/revayah-resume-builder"
  },
  {
    id: "portfolio-builder",
    title: "Portfolio Builder",
    description: "Showcase your work, projects and achievements.",
    icon: Briefcase,
    badge: null,
    href: "/digital-tools"
  },
  {
    id: "photo-gallery",
    title: "Photo Gallery",
    description: "Display your photos and visual stories.",
    icon: ImageIcon,
    badge: null,
    href: "/digital-tools"
  },
  {
    id: "gallery-builder",
    title: "Gallery Builder",
    description: "Create interactive galleries for your website or profile.",
    icon: LayoutGrid,
    badge: null,
    href: "/digital-tools"
  },
  {
    id: "education-builder",
    title: "Education & Qualification Builder",
    description: "Add your education, certifications and skills.",
    icon: GraduationCap,
    badge: null,
    href: "/revayah-resume-builder"
  },
  {
    id: "experience-builder",
    title: "Experience Builder",
    description: "Highlight your professional journey and roles.",
    icon: Sliders,
    badge: null,
    href: "/revayah-resume-builder"
  },
  {
    id: "achievement-builder",
    title: "Achievement Builder",
    description: "Showcase awards, recognitions and milestones.",
    icon: Trophy,
    badge: null,
    href: "/digital-tools"
  },
  {
    id: "testimony-builder",
    title: "Testimony Builder",
    description: "Display recommendations from clients and colleagues.",
    icon: MessageSquareQuote,
    badge: null,
    href: "/digital-tools"
  },
  {
    id: "nfc-card",
    title: "NFC Card",
    description: "Share your profile with a simple tap.",
    icon: Wifi,
    badge: null,
    href: "/revayah-digital-cards"
  },
  {
    id: "qr-code",
    title: "QR Code",
    description: "Connect in seconds with a scan.",
    icon: QrCode,
    badge: null,
    href: "/revayah-digital-cards"
  },
  {
    id: "mini-website-builder",
    title: "Mini Website Builder",
    description: "Create your own professional mini website in minutes.",
    icon: Globe,
    badge: "Popular",
    href: "/digital-tools"
  }
];

// 4 Steps
const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Choose a Product",
    description: "Select the digital identity tool that fits your needs.",
    icon: MousePointerClick
  },
  {
    step: 2,
    title: "Add Your Information",
    description: "Enter your details, upload photos and customise your design.",
    icon: FileEdit
  },
  {
    step: 3,
    title: "Preview & Publish",
    description: "Check your profile and make it live.",
    icon: Eye
  },
  {
    step: 4,
    title: "Share & Grow",
    description: "Share your link or QR code and connect with your audience.",
    icon: Share2
  }
];

// 5 Categories
const CATEGORY_TABS = [
  { id: "individuals", label: "Individuals", icon: User },
  { id: "professionals", label: "Professionals", icon: Briefcase },
  { id: "businesses", label: "Businesses", icon: Store },
  { id: "industries", label: "Industries", icon: Factory },
  { id: "institutions", label: "Institutions", icon: GraduationCap }
];

// Profile Cards
const PROFILE_CARDS = [
  {
    id: "rohit",
    name: "Rohit Mehta",
    role: "CEO & Founder",
    category: "professionals",
    image: cardIndividualImg
  },
  {
    id: "dr-priya",
    name: "Dr. Priya Desai",
    role: "Consultant Physician",
    category: "professionals",
    image: cardProfessionalImg
  },
  {
    id: "global-tech",
    name: "Global Tech Industries",
    role: "Manufacturing Excellence",
    category: "industries",
    image: cardBusinessImg
  },
  {
    id: "green-valley",
    name: "Green Valley School",
    role: "Education for a Better Tomorrow",
    category: "institutions",
    image: cardInstitutionImg
  }
];

// 4 Pillars of Digital Brand
const BRAND_PILLARS = [
  {
    id: "credibility",
    title: "Professional Credibility",
    icon: ShieldCheck
  },
  {
    id: "sharing",
    title: "Easy Sharing",
    icon: Share2
  },
  {
    id: "opportunities",
    title: "More Opportunities",
    icon: TrendingUp
  },
  {
    id: "accessible",
    title: "Always Accessible",
    icon: Cloud
  }
];

const DigitalIdentityPage = () => {
  const [activeCategory, setActiveCategory] = useState("individuals");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <PageTitle title="Digital Identity | Your Identity. Your Digital Presence." />

      {/* Global Navigation Bar */}
      <NavBar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION                                                   */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#F4FAFE] via-[#EEF7FC] to-[#E3F2FB] dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-b border-blue-100/60 dark:border-slate-800 pt-8 sm:pt-12 pb-12 sm:pb-16">
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
              
              {/* Left Column: Headlines & Copy */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                
                {/* Pill Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/90 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-600 dark:text-blue-400 text-[11px] font-bold tracking-wider uppercase shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  DIGITAL IDENTITY
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.12]">
                  <span className="text-[#0B132B] dark:text-white block">
                    Your Identity.
                  </span>
                  <span className="text-[#0066FF] dark:text-blue-400 block mt-1">
                    Your Digital Presence.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                  Make your identity accessible, professional and easy to share.
                </p>

                {/* Body Paragraphs */}
                <div className="space-y-3 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  <p>
                    Reva-Yah One helps you create digital identities tailored to your category, whether you are an individual, professional, entrepreneur, business, industrial enterprise or institution.
                  </p>
                  <p>
                    Bring your essential information, experience, portfolio, products and services together in a convenient digital destination.
                  </p>
                </div>

                {/* Script Tagline */}
                <p className="text-base sm:text-lg font-serif italic text-blue-700 dark:text-blue-400 tracking-wide font-medium">
                  Be seen. Be connected. Be you.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/signin"
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/20 group"
                  >
                    <span>Create Your Digital Identity</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700/80 hover:bg-blue-50/50 dark:hover:bg-slate-750 active:scale-95 transition-all shadow-xs"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Watch Video</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Visual Showcase */}
              <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center">
                <div className="relative w-full max-w-[620px] rounded-2xl overflow-hidden drop-shadow-sm group">
                  <img
                    src={heroShowcaseImg}
                    alt="Digital Identity Laptop and Mobile Showcase"
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: PRODUCT HIGHLIGHTS (12 Cards Grid)                             */}
        {/* ========================================================================= */}
        <section id="products" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="mb-8 sm:mb-10">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                PRODUCT HIGHLIGHTS
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] dark:text-white">
                Explore Digital Identity Solutions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Choose from a range of digital identity products designed to help you showcase who you are and what you do.
              </p>
            </div>

            {/* 12 Product Cards Grid (6 cols on lg, 3 on md, 2 on sm) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {IDENTITY_SOLUTIONS.map((product) => {
                const Icon = product.icon;
                return (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProductModal(product)}
                    className="relative bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group min-h-[145px]"
                  >
                    {/* Top Tag/Badge if any */}
                    {product.badge && (
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-blue-600 shadow-2xs">
                        {product.badge}
                      </span>
                    )}

                    <div>
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xs font-bold text-[#0B132B] dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {product.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Subtle bottom indicator */}
                    <div className="pt-2 flex items-center justify-end">
                      <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-semibold flex items-center gap-0.5">
                        <span>Explore</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: HOW IT WORKS (4 Simple Steps)                                 */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 bg-[#FAFCFE] dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Heading + Call to Action */}
              <div className="lg:col-span-4 space-y-4">
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                  HOW IT WORKS
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] dark:text-white leading-snug">
                  Create Your Digital Identity in 4 Simple Steps
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  No technical skills required. Just a few clicks and you're ready to go live.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
                  >
                    <span>Watch Tutorial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: 4 Step Cards */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {HOW_IT_WORKS_STEPS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.step}
                      className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-700 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        {/* Step Number Badge */}
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                          {step.step}
                        </div>

                        {/* Title */}
                        <h3 className="text-xs sm:text-sm font-bold text-[#0B132B] dark:text-white">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Step Visual Graphic Box */}
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-center h-12 text-blue-600/70 group-hover:text-blue-600 transition-colors">
                        <Icon className="w-7 h-7 stroke-[1.5]" />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: WHO IS IT FOR? (Designed for Every Category)                   */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Heading + 5 Category Buttons */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                  WHO IS IT FOR?
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] dark:text-white leading-tight">
                  Designed for Every Category
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Whether you are an individual, professional, business, industry or institution, there is a digital identity solution for you.
                </p>

                {/* 5 Category Selector Pills */}
                <div className="flex flex-wrap gap-2.5 pt-3">
                  {CATEGORY_TABS.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-2xs ${
                          isActive
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: 4 Identity Cards Showcase */}
              <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[620px] rounded-2xl overflow-hidden drop-shadow-sm group">
                  <img
                    src={categoriesShowcaseImg}
                    alt="Identity Profiles for Every Category"
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: WHY DIGITAL IDENTITY MATTERS (Dark Twilight Banner)           */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#051633] via-[#092B5C] to-[#0A336B] text-white py-6 sm:py-8 lg:py-9 border-t border-blue-900/60">
          
          {/* Absolute Woman graphic on the right edge, matching original layout */}
          <div className="absolute right-0 bottom-0 top-0 h-full w-auto max-w-[260px] sm:max-w-[320px] lg:max-w-[380px] pointer-events-none z-10 flex justify-end">
            <img
              src={mattersWomanImg}
              alt="Professional woman holding smartphone"
              className="h-full w-auto object-cover object-bottom-right"
            />
          </div>

          <div className="relative z-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left pr-0 lg:pr-56 xl:pr-64">
              
              {/* Left Side: Headlines */}
              <div className="max-w-xl space-y-2">
                <span className="text-[10px] sm:text-[11px] font-bold text-blue-400 uppercase tracking-widest block">
                  WHY DIGITAL IDENTITY MATTERS
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  More Than a Card. It's Your Digital Brand.
                </h2>
                <p className="text-xs sm:text-[13px] text-blue-200/90 leading-relaxed">
                  Build trust, create opportunities and make it easy for people to connect with you or your business.
                </p>
              </div>

              {/* Center: 4 Feature Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
                {BRAND_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.id} className="space-y-2 group">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-blue-400/30 bg-blue-500/10 flex items-center justify-center mx-auto text-blue-300 group-hover:text-white group-hover:border-blue-300 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-semibold text-blue-100 group-hover:text-white transition-colors leading-snug">
                        {pillar.title}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: READY TO CREATE YOUR DIGITAL IDENTITY? (Bottom CTA Banner)     */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#F4FAFE] via-[#EEF6FC] to-[#E3F2FB] dark:from-slate-850 dark:to-slate-900 py-6 sm:py-8 border-t border-blue-100/60 dark:border-slate-800">
          
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              
              {/* Left Side: Headline & Copy */}
              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] font-bold text-blue-600 uppercase tracking-widest block">
                  READY TO CREATE YOUR DIGITAL IDENTITY?
                </span>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0B132B] dark:text-white tracking-tight">
                  Your Digital Presence Starts Here.
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400">
                  Explore our digital identity tools and create a profile that works for you.
                </p>
              </div>

              {/* Right Side: Button + Script Graphic */}
              <div className="flex items-center gap-6 lg:gap-8 shrink-0">
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/20 whitespace-nowrap"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Script Image on Far Right: Crisp and scaled without any dark crop band */}
                <div className="hidden sm:block w-36 sm:w-44 lg:w-52 shrink-0">
                  <img
                    src={ctaScriptImg}
                    alt="Build your profile. Share your story."
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* ========================================================================= */}
      {/* VIDEO PREVIEW MODAL                                                       */}
      {/* ========================================================================= */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
                Reva-Yah One Digital Identity Walkthrough
              </h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  src={heroShowcaseImg}
                  alt="Walkthrough Video Preview"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Watch how to create, personalize, and share your digital identity across mobile, web, and physical NFC cards in under 3 minutes.
              </p>
            </div>
            <div className="flex justify-end gap-3 px-6 py-3.5 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setVideoModalOpen(false)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                Close
              </button>
              <Link
                to="/signin"
                className="px-5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Start Creating Free
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PRODUCT DETAILS MODAL                                                     */}
      {/* ========================================================================= */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                  {React.createElement(selectedProductModal.icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
                    {selectedProductModal.title}
                  </h3>
                  {selectedProductModal.badge && (
                    <span className="text-[10px] text-blue-600 font-bold">
                      {selectedProductModal.badge}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedProductModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedProductModal.description}
            </p>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProductModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <Link
                to={selectedProductModal.href}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
              >
                <span>Launch Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalIdentityPage;

