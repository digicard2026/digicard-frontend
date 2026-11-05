import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  PlayCircle,
  FileText,
  Share2,
  Users,
  Rocket,
  CreditCard,
  LayoutGrid,
  QrCode,
  Target,
  CalendarDays,
  Building2,
  GraduationCap,
  ArrowRight,
  Search,
  ChevronDown,
  Clock,
  CheckCircle2,
  X,
  BookOpen,
  Video,
  Award,
  Sparkles,
  ExternalLink
} from "lucide-react";

import NavBar from "./NavBar";
import Footer from "./Footer";
import PageTitle from "../../components/PageTitle";

// Extracted pixel-perfect assets from master mockup
import heroShowcaseImg from "../../assets/images/revayah_home/academy_hero_showcase.png";
import bottomLaptopImg from "../../assets/images/revayah_home/academy_bottom_laptop.png";
import course1Img from "../../assets/images/revayah_home/acad_course_1.png";
import course2Img from "../../assets/images/revayah_home/acad_course_2.png";
import course3Img from "../../assets/images/revayah_home/acad_course_3.png";
import course4Img from "../../assets/images/revayah_home/acad_course_4.png";

// Why Learn Items
const WHY_LEARN_ITEMS = [
  {
    id: "video-tutorials",
    title: "Video Tutorials",
    description: "Watch demonstrations explaining how to create and use each product.",
    icon: Play
  },
  {
    id: "step-guides",
    title: "Step-by-Step Guides",
    description: "Follow clear instructions to complete common tasks and set up your digital presence.",
    icon: FileText
  },
  {
    id: "learning-paths",
    title: "Learning Paths",
    description: "Explore tutorials organised by product, user category and industry.",
    icon: Share2
  },
  {
    id: "partner-centre",
    title: "Partner Learning Centre",
    description: "Access product training and onboarding resources for Reva-Yah One partners.",
    icon: Users
  }
];

// 8 Learning Categories
const LEARNING_CATEGORIES = [
  {
    id: "getting-started",
    title: "Getting Started with Reva-Yah One",
    description: "An introduction to our platform, features and ecosystem.",
    icon: Rocket,
    courseCount: 6
  },
  {
    id: "digital-identity",
    title: "Create Your Digital Identity",
    description: "Build your digital profile, card, resume and more.",
    icon: CreditCard,
    courseCount: 8
  },
  {
    id: "digital-builders",
    title: "Learn the Digital Builders",
    description: "Create websites, catalogues, forms and business tools.",
    icon: LayoutGrid,
    courseCount: 12
  },
  {
    id: "qr-nfc",
    title: "QR Code and NFC Usage",
    description: "Connect, share and engage with a single tap.",
    icon: QrCode,
    courseCount: 5
  },
  {
    id: "manage-leads",
    title: "Generate and Manage Leads",
    description: "Capture, track and convert opportunities.",
    icon: Target,
    courseCount: 7
  },
  {
    id: "booking-whatsapp",
    title: "Appointment Booking and WhatsApp Integration",
    description: "Manage bookings and automate communication.",
    icon: CalendarDays,
    courseCount: 6
  },
  {
    id: "industry-tutorials",
    title: "Industry-Specific Tutorials",
    description: "Tailored guides for different sectors and use cases.",
    icon: Building2,
    courseCount: 14
  },
  {
    id: "partner-resources",
    title: "Partner Training and Resources",
    description: "Product training, onboarding and marketing support.",
    icon: Users,
    courseCount: 9
  }
];

// Featured Courses
const FEATURED_COURSES = [
  {
    id: "course-1",
    title: "Getting Started with Reva-Yah One",
    description: "Learn how to access your dashboard, explore key features and set up your account.",
    category: "getting-started",
    categoryLabel: "Getting Started",
    level: "Beginner",
    levelColor: "bg-emerald-500",
    duration: "4:32",
    durationText: "4 min 32 sec",
    image: course1Img,
    chapters: [
      "Welcome & Dashboard Overview (0:45)",
      "Navigating the Ecosystem (1:15)",
      "Account Settings & Custom URL (1:20)",
      "Next Steps to Your Digital Launch (1:12)"
    ]
  },
  {
    id: "course-2",
    title: "Create Your Digital Card",
    description: "Step-by-step guide to design and share your digital business card.",
    category: "digital-identity",
    categoryLabel: "Digital Identity",
    level: "Beginner",
    levelColor: "bg-emerald-500",
    duration: "6:15",
    durationText: "6 min 15 sec",
    image: course2Img,
    chapters: [
      "Selecting the Card Theme & Color Palette (1:30)",
      "Uploading Profile Photo & Logo (1:15)",
      "Adding Contact Details & Social Links (1:45)",
      "Publishing & Sharing with 1-Click (1:45)"
    ]
  },
  {
    id: "course-3",
    title: "Build a Mini Website",
    description: "Create a simple website using Reva-Yah One digital tools.",
    category: "digital-builders",
    categoryLabel: "Digital Builders",
    level: "Intermediate",
    levelColor: "bg-teal-600",
    duration: "8:45",
    durationText: "8 min 45 sec",
    image: course3Img,
    chapters: [
      "Choosing a Responsive Layout (2:00)",
      "Adding Products, Services & Media (2:30)",
      "Setting Up Inquiry Form & WhatsApp (2:15)",
      "Connecting Custom Domain & SEO (2:00)"
    ]
  },
  {
    id: "course-4",
    title: "Using QR Code & NFC",
    description: "Learn how to create QR codes and use NFC for quick sharing.",
    category: "qr-nfc",
    categoryLabel: "QR & NFC Usage",
    level: "Beginner",
    levelColor: "bg-emerald-500",
    duration: "5:20",
    durationText: "5 min 20 sec",
    image: course4Img,
    chapters: [
      "Generating Dynamic QR Codes (1:20)",
      "Customizing Colors, Frames & Logos (1:30)",
      "Programming Physical NFC Cards (1:10)",
      "Tracking Scans & Analytics in Real Time (1:20)"
    ]
  }
];

const OneAcademyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  // Filter courses based on query and category
  const filteredCourses = useMemo(() => {
    return FEATURED_COURSES.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat =
        selectedCategory === "all" || course.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // Smooth scroll down to featured courses section
    const el = document.getElementById("featured-courses");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <PageTitle title="Reva-Yah One Academy | Learn. Create. Connect. Grow." />

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
                  REVA-YAH ONE ACADEMY
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.12]">
                  <span className="text-[#0B132B] dark:text-white block">
                    Learn. Create.
                  </span>
                  <span className="text-[#0066FF] dark:text-blue-400 block mt-1">
                    Connect. Grow.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                  Your Digital Tutor, Available When You Need It.
                </p>

                {/* Body Paragraphs */}
                <div className="space-y-3 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  <p>
                    Getting started with digital tools should be simple. Reva-Yah One Academy is your learning centre for understanding, creating and using digital identities, builders and business solutions. Explore video tutorials, practical demonstrations and step-by-step guides designed to help you make the most of your digital tools.
                  </p>
                  <p>
                    Whether you are creating your first digital card, building an industry profile, preparing a product catalogue or learning how to manage leads, the Academy helps you learn at your own pace.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#categories"
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/20 group"
                  >
                    <span>Explore Academy</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>

                  <button
                    onClick={() => setActiveCourseModal(FEATURED_COURSES[0])}
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700/80 hover:bg-blue-50/50 dark:hover:bg-slate-750 active:scale-95 transition-all shadow-xs"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Visual Showcase */}
              <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center">
                <div className="relative w-full max-w-[620px] rounded-2xl overflow-hidden drop-shadow-sm group">
                  <img
                    src={heroShowcaseImg}
                    alt="Reva-Yah One Academy Learning Showcase"
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: WHY LEARN WITH REVA-YAH ONE ACADEMY?                           */}
        {/* ========================================================================= */}
        <section className="py-10 sm:py-12 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Heading & Subtitle */}
              <div className="lg:col-span-4 space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] dark:text-white leading-tight">
                  Why Learn with<br />Reva-Yah One Academy?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Practical. Flexible. Focused on Your Success.
                </p>
              </div>

              {/* 4 Feature Columns */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {WHY_LEARN_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="space-y-2.5 group">
                      {/* Icon */}
                      <div className="w-9 h-9 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4 fill-white" />
                      </div>
                      {/* Title */}
                      <h3 className="text-xs sm:text-sm font-bold text-[#0B132B] dark:text-white">
                        {item.title}
                      </h3>
                      {/* Description */}
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: EXPLORE LEARNING CATEGORIES (8 Cards Grid)                     */}
        {/* ========================================================================= */}
        <section id="categories" className="py-12 sm:py-16 bg-[#FAFCFE] dark:bg-slate-850 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] dark:text-white">
                Explore Learning Categories
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Choose a topic and start learning. Each category includes relevant tutorials, videos and guides.
              </p>
            </div>

            {/* 8 Category Cards (4 cols x 2 rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {LEARNING_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`relative bg-white dark:bg-slate-800 rounded-xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between group min-h-[140px] shadow-2xs hover:shadow-md ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-500/20"
                        : "border-slate-200/90 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
                    }`}
                  >
                    <div>
                      {/* Icon */}
                      <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/80 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xs sm:text-sm font-bold text-[#0B132B] dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {cat.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    {/* Bottom Link Arrow */}
                    <div className="pt-3 flex items-center justify-end">
                      <span className="text-blue-600 dark:text-blue-400 text-xs font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: FEATURED COURSES                                               */}
        {/* ========================================================================= */}
        <section id="featured-courses" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header + Search/Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] dark:text-white">
                  Featured Courses
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Popular tutorials to get you started.
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tutorials, topics or products..."
                    className="w-64 sm:w-72 pl-9 pr-3.5 py-2 rounded-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-850 transition-all placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Category Dropdown */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none pl-3.5 pr-8 py-2 rounded-full text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {LEARNING_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Courses 4-Column Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => setActiveCourseModal(course)}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200/90 dark:border-slate-700 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  >
                    {/* Thumbnail Top Area */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-750">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      {/* Level Badge (top-left) */}
                      <div className="absolute top-2 left-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold text-white tracking-wide shadow-xs ${course.levelColor}`}>
                          {course.level}
                        </span>
                      </div>

                      {/* Duration Overlay (bottom-right) */}
                      <div className="absolute bottom-2 right-2">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono font-medium text-white shadow-xs">
                          {course.duration}
                        </span>
                      </div>

                      {/* Hover Play Button Overlay */}
                      <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <h3 className="text-xs sm:text-sm font-bold text-[#0B132B] dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      {/* Meta & Action */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                          <PlayCircle className="w-3.5 h-3.5 text-blue-600" />
                          <span>Video &middot; {course.durationText}</span>
                        </div>
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-[11px] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          View Details &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  No courses found
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting your search query or reset the category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="mt-4 px-4 py-1.5 text-xs font-semibold text-blue-600 bg-white dark:bg-slate-800 rounded-full border border-blue-200 hover:bg-blue-50"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: BOTTOM CTA BANNER ("Ready to Build Your Digital Skills?")      */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#061B3B] via-[#092B5C] to-[#0B3976] text-white py-6 sm:py-8 border-t border-blue-900/60">
          
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              {/* Left Side: Icon + Headline + Subtitle */}
              <div className="flex items-center gap-4 text-center sm:text-left">
                {/* Graduation Cap in Circle */}
                <div className="w-11 h-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>

                <div className="space-y-0.5">
                  <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight">
                    Ready to Build Your Digital Skills?
                  </h2>
                  <p className="text-xs sm:text-[13px] text-blue-200/90 font-normal">
                    Explore our complete learning library and start your journey today.
                  </p>
                </div>
              </div>

              {/* Center / Right: Buttons + Laptop Graphic */}
              <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6 w-full lg:w-auto justify-end">
                
                {/* 2 Buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="#categories"
                    className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold text-blue-800 bg-white hover:bg-blue-50 active:scale-95 transition-all shadow-xs"
                  >
                    <span>Explore Academy</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                  </a>

                  <button
                    onClick={() => setActiveCourseModal(FEATURED_COURSES[0])}
                    className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-xs"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>

                {/* Right Laptop Graphic */}
                <div className="hidden md:block w-36 lg:w-44 shrink-0">
                  <img
                    src={bottomLaptopImg}
                    alt="Learning Platform on Laptop"
                    className="w-full h-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
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
      {/* INTERACTIVE VIDEO TUTORIAL MODAL                                          */}
      {/* ========================================================================= */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${activeCourseModal.levelColor}`}>
                  {activeCourseModal.level}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {activeCourseModal.categoryLabel}
                </span>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Video Player Preview */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center group shadow-inner">
                <img
                  src={activeCourseModal.image}
                  alt={activeCourseModal.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                  <span className="text-white text-xs font-medium px-3 py-1 rounded-full bg-black/50 backdrop-blur-xs">
                    Watch Tutorial ({activeCourseModal.duration})
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-lg font-bold text-[#0B132B] dark:text-white">
                  {activeCourseModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {activeCourseModal.description}
                </p>
              </div>

              {/* Curriculum Chapters */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  What You'll Learn in this Lesson
                </h4>
                <div className="space-y-1.5">
                  {activeCourseModal.chapters.map((chap, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{chap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 transition-colors"
              >
                Close
              </button>
              <Link
                to="/signin"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-xs"
              >
                <span>Enroll in Full Course</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneAcademyPage;

