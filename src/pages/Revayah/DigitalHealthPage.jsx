import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  ShieldCheck,
  Users,
  TrendingUp,
  Stethoscope,
  Calendar,
  BarChart3,
  FileText,
  Check,
  ArrowRight,
  Play,
  Settings,
  Share2,
  X,
  CheckCircle2,
  Activity,
  UserCheck
} from "lucide-react";

import NavBar from "./NavBar";
import Footer from "./Footer";
import PageTitle from "../../components/PageTitle";

// Extracted assets
import heroShowcaseImg from "../../assets/images/revayah_home/digital_health_hero_showcase.png";
import cardHospicareImg from "../../assets/images/revayah_home/health_card_hospicare.png";
import cardHappydocxImg from "../../assets/images/revayah_home/health_card_happydocx.png";
import cardGrowthImg from "../../assets/images/revayah_home/health_card_growth.png";
import cardRecordsImg from "../../assets/images/revayah_home/health_card_records.png";
import doctorsShowcaseImg from "../../assets/images/revayah_home/digital_health_doctors_showcase.png";
import stethoscopeImg from "../../assets/images/revayah_home/digital_health_stethoscope.png";

const HEALTH_SOLUTIONS = [
  {
    id: "hospicare",
    title: "Hospicare",
    description: "Digital growth partner for clinics, helping doctors build their online presence and connect with patients.",
    image: cardHospicareImg,
    icon: Stethoscope,
    badgeText: null,
    linkText: "Explore Hospicare",
    tagline: "Clinic Digital Presence & Online Patient Gateway",
    features: [
      "Custom clinic & doctor website builder",
      "Direct patient WhatsApp chat & inquiries",
      "QR code check-ins & digital prescription access",
      "Verified medical practice branding"
    ]
  },
  {
    id: "happydocx",
    title: "HappyDocx",
    description: "Doctor discovery, profiles and appointment booking for patients.",
    image: cardHappydocxImg,
    icon: Calendar,
    badgeText: null,
    linkText: "Explore HappyDocx",
    tagline: "Instant Doctor Appointments & Booking Portal",
    features: [
      "Interactive appointment booking calendar",
      "Doctor ratings, specialities & consultation hours",
      "Automated SMS & WhatsApp appointment confirmations",
      "Patient appointment rescheduling & reminders"
    ]
  },
  {
    id: "practice-growth",
    title: "Practice Growth System",
    description: "A complete system for clinic presence, patient engagement, follow-ups and appointment workflows.",
    image: cardGrowthImg,
    icon: BarChart3,
    badgeText: "Coming Soon",
    linkText: "Learn More",
    tagline: "Comprehensive Clinic Analytics & Workflow Automation",
    features: [
      "Patient retention & recall automations",
      "Practice revenue & appointment analytics",
      "Staff & room schedule coordination",
      "Digital feedback & review collection"
    ]
  },
  {
    id: "health-records",
    title: "Digital Health Records",
    description: "Organise your health information and access relevant healthcare services.",
    image: cardRecordsImg,
    icon: FileText,
    badgeText: "Coming Soon",
    linkText: "Learn More",
    tagline: "Secure Patient Records & Medical Document Vault",
    features: [
      "Cloud storage for lab reports & prescriptions",
      "One-click sharing with verified doctors",
      "Emergency medical ID card & vitals history",
      "End-to-end encrypted medical privacy"
    ]
  }
];

const VALUE_PILLARS = [
  {
    title: "Industry-Focused",
    description: "Built for the unique needs of healthcare professionals and clinics.",
    icon: UserCheck
  },
  {
    title: "Easy to Use",
    description: "Get started quickly, with simple and intuitive tools.",
    icon: Settings
  },
  {
    title: "Connected Care",
    description: "Better communication between doctors, clinics and patients.",
    icon: Share2
  },
  {
    title: "Scalable Growth",
    description: "Add more tools as your practice and needs grow.",
    icon: ShieldCheck
  }
];

const DigitalHealthPage = () => {
  const [selectedSolution, setSelectedSolution] = useState(null);

  const scrollToSolutions = () => {
    document.getElementById("health-solutions")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDoctors = () => {
    document.getElementById("doctors-clinics")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans antialiased text-slate-800 bg-white dark:text-slate-100 dark:bg-slate-950 min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
      <PageTitle title="Digital Health | Reva-Yah One" />

      {/* Global Navigation Bar */}
      <NavBar />

      <main className="flex-grow w-full">
        {/* =========================================================================
            SECTION 1: HERO (Better Digital Experiences for Healthcare)
           ========================================================================= */}
        <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-8 sm:pt-12 pb-10 sm:pb-14 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Heading, Subtitle, CTA Buttons & 4 Feature Badges */}
              <div className="lg:col-span-5 text-left">
                <span className="text-[11px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block mb-2">
                  DIGITAL HEALTH
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.12] mb-3">
                  <span className="text-[#0B132B] dark:text-white">Better Digital Experiences </span>
                  <span className="text-blue-600 dark:text-blue-500">for Healthcare</span>
                </h1>

                <p className="text-xs sm:text-[13.5px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mb-6">
                  Connecting doctors, clinics and patients through practical digital healthcare solutions.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <button
                    onClick={scrollToSolutions}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-all active:scale-95"
                  >
                    <span>Explore Solutions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={scrollToDoctors}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-blue-600 dark:text-blue-400" />
                    <span>For Doctors & Clinics</span>
                  </button>
                </div>

                {/* 4 Feature Badges in a single row */}
                <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md pt-2">
                  {[
                    { label: "Better Patient Access", icon: HeartPulse },
                    { label: "Efficient Clinic Operations", icon: ShieldCheck },
                    { label: "Stronger Patient Engagement", icon: Users },
                    { label: "Sustainable Practice Growth", icon: TrendingUp },
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

              {/* Right Column: Female Doctor with Stethoscope & Floating Card Showcase */}
              <div className="lg:col-span-7 flex justify-center lg:justify-end">
                <div className="w-full max-w-[620px] relative">
                  <img
                    src={heroShowcaseImg}
                    alt="Better Digital Experiences for Healthcare - Reva-Yah One"
                    className="w-full h-auto object-contain block select-none pointer-events-none drop-shadow-xs"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: OUR DIGITAL HEALTH SOLUTIONS (4 Cards Grid)
           ========================================================================= */}
        <section id="health-solutions" className="py-10 sm:py-14 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
            
            {/* Header */}
            <div className="mb-8 max-w-2xl">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block mb-1">
                OUR DIGITAL HEALTH SOLUTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] dark:text-white tracking-tight mb-2">
                Solutions for a Healthier Tomorrow
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Choose the right solution for your practice, clinic or healthcare journey.
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {HEALTH_SOLUTIONS.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedSolution(card)}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 overflow-hidden flex flex-col justify-between group cursor-pointer"
                >
                  {/* Photo at top */}
                  <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 block"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between relative">
                    {/* Floating circular icon badge */}
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center -mt-8 mb-2 shadow-sm shrink-0 border-2 border-white dark:border-slate-800">
                      <card.icon className="w-4 h-4" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#0B132B] dark:text-white leading-snug mb-1.5 group-hover:text-blue-600 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                        {card.description}
                      </p>

                      {card.badgeText && (
                        <div className="mb-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 inline-block">
                            {card.badgeText}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Link */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 mt-auto">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                        <span>{card.linkText}</span>
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
            SECTION 3: FOR DOCTORS & CLINICS (Build Your Digital Clinic Presence)
           ========================================================================= */}
        <section id="doctors-clinics" className="py-10 sm:py-14 bg-[#F4F8FD] dark:bg-slate-900/60 border-b border-blue-100/60 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Subtitle, 4 Checkmarks & Hospicare CTA */}
              <div className="lg:col-span-5 text-left">
                <span className="text-[10px] sm:text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block mb-1.5">
                  FOR DOCTORS & CLINICS
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] dark:text-white tracking-tight mb-2.5 leading-snug">
                  Build Your Digital Clinic Presence
                </h2>

                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6 max-w-md">
                  Make it easier for patients to discover your practice and request appointments.
                </p>

                {/* 4 Checkmark Features */}
                <div className="space-y-3 mb-8">
                  {[
                    "Digital doctor and clinic profiles",
                    "Appointment booking and enquiry flows",
                    "Patient engagement and follow-up tools",
                    "Digital profile links and QR code access"
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-[13px] font-semibold text-slate-700 dark:text-slate-200">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-all active:scale-95"
                >
                  <span>Get Started with Hospicare</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Right Column: Phone with Dr. Sneha Deshpande Card + Laptop Profile + Doctor */}
              <div className="lg:col-span-7 flex justify-center lg:justify-end">
                <div className="w-full max-w-[660px]">
                  <img
                    src={doctorsShowcaseImg}
                    alt="Build Your Digital Clinic Presence - Dr. Sneha Deshpande"
                    className="w-full h-auto object-contain block select-none pointer-events-none drop-shadow-xs"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: WHY CHOOSE REVA-YAH ONE FOR DIGITAL HEALTH? (4 Pillars)
           ========================================================================= */}
        <section className="py-12 sm:py-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Header */}
            <div className="mb-10 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] dark:text-white tracking-tight mb-2">
                Why Choose Reva-Yah One for Digital Health?
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Integrated solutions designed to support healthcare professionals and patients.
              </p>
            </div>

            {/* 4 Pillars with vertical dividers on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-slate-200/80 dark:divide-slate-800 text-left">
              {VALUE_PILLARS.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-3.5 lg:px-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-2xs">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B132B] dark:text-white mb-1 leading-snug">
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
        </section>

        {/* =========================================================================
            SECTION 5: READY TO TRANSFORM HEALTHCARE? (Bottom Medical CTA Banner)
           ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#0B3564] via-[#0E4982] to-[#082750] text-white py-6 sm:py-8 lg:py-9">
          
          {/* Luminous ECG Heartbeat pulse line across background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <svg viewBox="0 0 1200 120" className="w-full h-24 stroke-cyan-300 fill-none" preserveAspectRatio="none">
              <path
                d="M0,60 L200,60 L240,60 L250,40 L260,80 L275,10 L290,110 L305,60 L320,60 L500,60 C530,30 570,30 600,60 C630,30 670,30 700,60 L730,60 L745,40 L755,80 L770,10 L785,110 L800,60 L1200,60"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Absolute Medical Stethoscope graphic on the right edge */}
          <div className="absolute right-0 bottom-0 top-0 h-full w-auto max-w-[340px] sm:max-w-[400px] lg:max-w-[460px] pointer-events-none z-10 flex justify-end">
            <img
              src={stethoscopeImg}
              alt="Medical Stethoscope"
              className="h-full w-auto object-cover object-bottom-right"
            />
          </div>

          <div className="relative z-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left pr-0 md:pr-48 lg:pr-56">
              
              {/* Text on left */}
              <div className="max-w-xl">
                <span className="text-[10px] sm:text-[11px] font-bold text-blue-200 tracking-wider uppercase block mb-1">
                  READY TO TRANSFORM HEALTHCARE?
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1">
                  Let's Build Better Digital Healthcare Experiences
                </h2>
                <p className="text-xs sm:text-[13px] text-blue-100/90">
                  Explore our solutions and take the next step in your digital journey.
                </p>
              </div>

              {/* Action Button: Positioned cleanly, guaranteed not to overlap stethoscope */}
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
          INTERACTIVE DETAIL MODAL
         ========================================================================= */}
      {selectedSolution && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 text-left relative shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setSelectedSolution(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <selectedSolution.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  {selectedSolution.title}
                </h3>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  {selectedSolution.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {selectedSolution.description}
            </p>

            {/* Key Features */}
            <div className="mb-5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Included Healthcare Capabilities:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedSolution.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedSolution(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              <Link
                to="/create"
                onClick={() => setSelectedSolution(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalHealthPage;

