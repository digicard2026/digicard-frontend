import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Play,
  ArrowRight,
  Check,
  CheckCircle2,
  Sliders,
  Move,
  Smartphone,
  Share2,
  Sparkles,
  PenTool,
  Users,
  BarChart3,
  FileText,
  CreditCard,
  Radio,
  QrCode,
  MessageCircle,
  Target,
  ClipboardList,
  Calendar,
  HeartHandshake,
  FolderArchive,
  GraduationCap,
  Award,
  Quote,
  User,
  Briefcase,
  Image as ImageIcon,
  LayoutGrid,
  Globe,
  BookOpen,
  Book,
  Layers,
  Package,
  Wrench,
  Clock,
  Compass,
  X,
  ExternalLink
} from "lucide-react";

import NavBar from "./NavBar";
import Footer from "./Footer";
import PageTitle from "../../components/PageTitle";

// Project assets
import heroShowcaseImg from "../../assets/images/revayah_home/digital_tools_hero_showcase.png";
import featuredDevicesImg from "../../assets/images/revayah_home/digital_tools_featured_devices.png";
import solutionWomanImg from "../../assets/images/revayah_home/digital_tools_solution_woman.png";
import mountainPanoramaImg from "../../assets/images/revayah_home/digital_tools_mountain_panorama.png";

// Category definitions
const CATEGORIES = [
  { id: "all", label: "All Tools", icon: LayoutGrid },
  { id: "create-present", label: "Create & Present", icon: PenTool },
  { id: "connect-share", label: "Connect & Share", icon: Share2 },
  { id: "generate-business", label: "Generate Business", icon: Users },
  { id: "manage-measure", label: "Manage & Measure", icon: BarChart3 },
  { id: "create-documents", label: "Create Documents", icon: FileText },
];

// 5 Highlight category cards
const CATEGORY_CARDS = [
  {
    id: "create-present",
    title: "Create & Present",
    description: "Build profiles, portfolios, catalogues, brochures, projects and more.",
    icon: PenTool,
  },
  {
    id: "connect-share",
    title: "Connect & Share",
    description: "Digital cards, QR, NFC and WhatsApp integration.",
    icon: Share2,
  },
  {
    id: "generate-business",
    title: "Generate Business",
    description: "Leads, engagement and appointment booking.",
    icon: Users,
  },
  {
    id: "manage-measure",
    title: "Manage & Measure",
    description: "Track performance, manage leads and documents.",
    icon: BarChart3,
  },
  {
    id: "create-documents",
    title: "Create Documents",
    description: "Generate professional documents with ease.",
    icon: FileText,
  },
];

// Complete list of 24 Digital Tools matching the screenshot exactly
const DIGITAL_TOOLS = [
  // Row 1
  {
    id: "profile-builder",
    name: "Profile Builder",
    category: "create-present",
    icon: User,
    color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-100",
    link: "/create",
  },
  {
    id: "portfolio-builder",
    name: "Portfolio Builder",
    category: "create-present",
    icon: Briefcase,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border-purple-100",
    link: "/create",
  },
  {
    id: "photo-gallery",
    name: "Photo Gallery",
    category: "create-present",
    icon: ImageIcon,
    color: "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-950/60 dark:text-fuchsia-400 border-fuchsia-100",
    link: "/create",
  },
  {
    id: "gallery-builder",
    name: "Gallery Builder",
    category: "create-present",
    icon: LayoutGrid,
    color: "bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400 border-violet-100",
    link: "/create",
  },
  {
    id: "mini-website-builder",
    name: "Mini Website Builder",
    category: "create-present",
    icon: Globe,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border-blue-100",
    isFeatured: true,
    link: "/create",
  },
  {
    id: "catalog-builder",
    name: "Catalog Builder",
    category: "create-present",
    icon: BookOpen,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border-purple-100",
    link: "/create",
  },

  // Row 2
  {
    id: "brochure-builder",
    name: "Brochure Builder",
    category: "create-present",
    icon: Book,
    color: "bg-pink-50 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400 border-pink-100",
    link: "/create",
  },
  {
    id: "project-builder",
    name: "Project Builder",
    category: "create-present",
    icon: Layers,
    color: "bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400 border-teal-100",
    link: "/create",
  },
  {
    id: "product-builder",
    name: "Product Builder",
    category: "create-present",
    icon: Package,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border-purple-100",
    link: "/create",
  },
  {
    id: "service-builder",
    name: "Service Builder",
    category: "create-present",
    icon: Wrench,
    color: "bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400 border-violet-100",
    link: "/create",
  },
  {
    id: "digital-cards",
    name: "Digital Cards",
    category: "connect-share",
    icon: CreditCard,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border-blue-100",
    link: "/revayah-digital-cards",
  },
  {
    id: "nfc-card",
    name: "NFC Card",
    category: "connect-share",
    icon: Radio,
    color: "bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 border-sky-100",
    link: "/revayah-digital-cards",
  },

  // Row 3
  {
    id: "qr-code",
    name: "QR Code",
    category: "connect-share",
    icon: QrCode,
    color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-100",
    link: "/create",
  },
  {
    id: "whatsapp-integration",
    name: "WhatsApp Integration",
    category: "connect-share",
    icon: MessageCircle,
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-100",
    link: "/create",
  },
  {
    id: "lead-generation",
    name: "Lead Generation",
    category: "generate-business",
    icon: Target,
    color: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400 border-cyan-100",
    link: "/signin",
  },
  {
    id: "lead-management",
    name: "Lead Management",
    category: "generate-business",
    icon: ClipboardList,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border-purple-100",
    link: "/signin",
  },
  {
    id: "appointment-booking",
    name: "Appointment Booking",
    category: "generate-business",
    icon: Calendar,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border-purple-100",
    link: "/create",
  },
  {
    id: "customer-engagement",
    name: "Customer Engagement",
    category: "generate-business",
    icon: HeartHandshake,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border-blue-100",
    link: "/signin",
  },

  // Row 4
  {
    id: "docs-builder",
    name: "Docs Builder",
    category: "create-documents",
    icon: FileText,
    color: "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border-rose-100",
    link: "/create",
  },
  {
    id: "docs-manager",
    name: "Docs Manager",
    category: "create-documents",
    icon: FolderArchive,
    color: "bg-pink-50 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400 border-pink-100",
    link: "/signin",
  },
  {
    id: "analytics",
    name: "Analytics",
    category: "manage-measure",
    icon: BarChart3,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border-blue-100",
    link: "/signin",
  },
  {
    id: "education-qualification-builder",
    name: "Education & Qualification Builder",
    category: "create-present",
    icon: GraduationCap,
    color: "bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 border-sky-100",
    link: "/create",
  },
  {
    id: "experience-builder",
    name: "Experience Builder",
    category: "create-present",
    icon: Award,
    color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-100",
    link: "/create",
  },
  {
    id: "testimony-builder",
    name: "Testimony Builder",
    category: "create-present",
    icon: Quote,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border-blue-100",
    link: "/create",
  },
];

const DigitalToolsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [solutionModalOpen, setSolutionModalOpen] = useState(false);

  // Filter tools based on category tab/dropdown and search input
  const filteredTools = useMemo(() => {
    return DIGITAL_TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory;
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const scrollToAllTools = () => {
    const el = document.getElementById("all-tools-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    scrollToAllTools();
  };

  return (
    <div className="font-sans antialiased text-slate-800 bg-white dark:text-slate-100 dark:bg-slate-950 min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
      <PageTitle title="Digital Tools | Reva-Yah One" />

      {/* 1. Header / Navigation */}
      <NavBar />

      <main className="flex-grow w-full">
        {/* =========================================================================
            SECTION 1: HERO SECTION
           ========================================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f3f8fd] via-[#f7fafc] to-white dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-950 pt-8 pb-0 sm:pt-10 sm:pb-0 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-end">

              {/* Left Column: Heading & CTAs (5 cols) */}
              <div className="lg:col-span-5 text-left pb-6 sm:pb-8">
                {/* Category Pill / Tag */}
                <span className="inline-block text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-2">
                  DIGITAL TOOLS
                </span>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B132B] dark:text-white tracking-tight leading-[1.12] mb-3">
                  The Tools to Build, <br />
                  <span className="text-blue-600 dark:text-blue-500">Present and Grow</span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Create a digital presence that works for your needs.
                </p>

                {/* Paragraph */}
                <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-lg">
                  Explore a collection of digital builders, sharing tools, engagement features and management capabilities. Select the tools that suit your goals and expand your digital setup as your needs evolve.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={scrollToAllTools}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all active:scale-95"
                  >
                    <span>Explore All Tools</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-2xs"
                  >
                    <div className="w-4 h-4 rounded-full border border-blue-600 text-blue-600 flex items-center justify-center">
                      <Play className="w-2 h-2 fill-current ml-0.5" />
                    </div>
                    <span>Watch Demo</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Device Mockup Showcase (Exact visual from design) (7 cols) */}
              <div className="lg:col-span-7 relative flex items-end justify-center lg:justify-end pt-4 lg:pt-0">
                <div className="relative w-full max-w-[700px] lg:max-w-[780px] xl:max-w-[820px]">
                  <img
                    src={heroShowcaseImg}
                    alt="GreenLife Organics Website and Mobile Showcase"
                    className="w-full h-auto object-contain select-none block"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: FEATURED DIGITAL TOOL (Mini Website Builder)
           ========================================================================= */}
        <section className="py-8 sm:py-12 bg-white dark:bg-slate-950">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#edf5fe] via-[#f1f7fe] to-[#edf5fe] dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800/80 rounded-2xl sm:rounded-3xl py-6 px-6 sm:px-8 lg:px-9 border border-blue-100/70 dark:border-slate-800 shadow-xs">

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* Left Column: Info & 4 Chips in 1 Row & Action Buttons (5 cols) */}
                <div className="lg:col-span-5 text-left">
                  {/* Pill Badge */}
                  <span className="inline-block text-[10px] sm:text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-900/50 px-3 py-1 rounded-full uppercase tracking-wider mb-2.5">
                    FEATURED DIGITAL TOOL
                  </span>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] dark:text-white tracking-tight mb-1">
                    Mini Website Builder
                  </h2>

                  {/* Tagline */}
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Your Mini Website. Your Brand. Your Story.
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    Create a professional online destination to showcase who you are, what you offer and how customers can reach you. No coding needed.
                  </p>

                  {/* 4 Feature Chips in ONE Single Horizontal Line */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap xl:flex-nowrap mb-6 text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                      <Sliders className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="whitespace-nowrap">Customisation</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                      <Move className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="whitespace-nowrap">Drag & Drop</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                      <Smartphone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="whitespace-nowrap">Mobile-Responsive</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                      <Share2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="whitespace-nowrap">Share via Link & QR</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to="/create"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all active:scale-95"
                    >
                      <span>Create Your Mini Website</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => setVideoModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors py-2 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800"
                    >
                      <div className="w-4 h-4 rounded-full border border-blue-600 text-blue-600 flex items-center justify-center">
                        <Play className="w-2 h-2 fill-current ml-0.5" />
                      </div>
                      <span>Watch Tutorial</span>
                    </button>
                  </div>
                </div>

                {/* Middle Column: Business Solutions Device Stage (Exact image) (4 cols) */}
                <div className="lg:col-span-4 relative flex items-center justify-center lg:justify-end py-1">
                  <div className="relative w-full max-w-[440px] lg:max-w-[480px] flex items-center justify-center lg:justify-end">
                    <img
                      src={featuredDevicesImg}
                      alt="Business Solutions Mini Website and Mobile Preview"
                      className="w-full h-auto object-contain select-none drop-shadow-sm"
                    />
                  </div>
                </div>

                {/* Right Column: "Perfect for" Box (3 cols) */}
                <div className="lg:col-span-3 text-left bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/80 dark:border-slate-800 shadow-sm shadow-blue-500/5">
                  <h4 className="text-[15px] sm:text-base font-extrabold text-[#0B132B] dark:text-white mb-3.5 tracking-tight">
                    Perfect for
                  </h4>

                  <ul className="space-y-3 sm:space-y-3.5">
                    {[
                      "Professionals & Freelancers",
                      "Businesses & Enterprises",
                      "Product & Service Showcases",
                      "Portfolio & Projects",
                      "Contact & Enquiries",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-[13px] text-slate-700 dark:text-slate-200 font-semibold">
                        <div className="w-[18px] h-[18px] sm:w-5 sm:h-5 rounded-full bg-[#0d9488] text-white flex items-center justify-center shrink-0 shadow-2xs ring-[3px] ring-[#ccfbf1] dark:ring-teal-900/50">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: EXPLORE BY CATEGORY (Tabs & 5 Cards)
           ========================================================================= */}
        <section className="py-10 sm:py-14 bg-slate-50/60 dark:bg-slate-900/40 border-t border-b border-slate-200/80 dark:border-slate-800">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header Row: Left Text + Right Filter Tabs */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
              <div className="text-left max-w-xl">
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block mb-1">
                  EXPLORE BY CATEGORY
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] dark:text-white tracking-tight mb-1.5">
                  Choose the Right Tool for Your Goal
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  From creating your identity to managing your customers, our digital tools are grouped into simple categories to help you find what you need.
                </p>
              </div>

              {/* Horizontal Filter Tabs (Aligned to the Right) */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const IconComponent = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${isSelected
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:text-blue-600"
                        }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5 Highlight Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {CATEGORY_CARDS.map((card) => {
                const IconComponent = card.icon;
                const isCurrentActive = selectedCategory === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => handleCategorySelect(card.id)}
                    className={`bg-white dark:bg-slate-800/90 rounded-2xl p-5 border text-left transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between ${isCurrentActive
                        ? "border-blue-500 ring-2 ring-blue-500/20"
                        : "border-slate-200/90 dark:border-slate-700"
                      }`}
                  >
                    <div>
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-extrabold text-[#0B132B] dark:text-white tracking-tight mb-2">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                        {card.description}
                      </p>
                    </div>

                    {/* Link */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700">
                        <span>View Tools</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4: ALL TOOLS AT A GLANCE (Search + Dropdown + 24 Tool Cards)
           ========================================================================= */}
        <section id="all-tools-section" className="py-12 sm:py-16 bg-white dark:bg-slate-950">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header: Title + Search & Category Dropdown */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 text-left">
              <div>
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block mb-1">
                  ALL TOOLS AT A GLANCE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] dark:text-white tracking-tight mb-1.5">
                  Our Digital Tools
                </h2>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                  Explore the complete range of digital tools and find the right solution for your needs. Choose a single tool or build a complete digital presence.
                </p>
              </div>

              {/* Search & Category Filter Controls */}
              <div className="flex items-center gap-2.5 shrink-0">
                {/* Search Input */}
                <div className="relative w-full sm:w-60">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tools..."
                    className="w-full pl-8 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Dropdown */}
                <div className="relative w-38 sm:w-44">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none px-3 py-2 pr-7 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="create-present">Create & Present</option>
                    <option value="connect-share">Connect & Share</option>
                    <option value="generate-business">Generate Business</option>
                    <option value="manage-measure">Manage & Measure</option>
                    <option value="create-documents">Create Documents</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 24 Tools Grid (6 columns on lg screen) */}
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-left">
                {filteredTools.map((tool) => {
                  const IconComp = tool.icon;
                  return (
                    <Link
                      key={tool.id}
                      to={tool.link || "/create"}
                      className="group relative flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 hover:shadow-2xs transition-all min-h-[58px]"
                    >
                      {/* Featured Pill if marked */}
                      {tool.isFeatured && (
                        <span className="absolute -top-2 right-2 text-[8px] font-bold text-blue-700 bg-blue-100 dark:bg-blue-900/60 dark:text-blue-300 px-1.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                          Featured
                        </span>
                      )}

                      <div className="flex items-center gap-2 min-w-0 pr-1">
                        {/* Tool Icon in rounded square */}
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${tool.color}`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                        </div>

                        {/* Tool Name */}
                        <span className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-blue-600 transition-colors">
                          {tool.name}
                        </span>
                      </div>

                      {/* Right Arrow */}
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="p-10 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500 mb-3">No tools found matching your search.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        </section>

        {/* =========================================================================
            SECTION 5: FIND THE RIGHT SOLUTION (Recommendation Box)
           ========================================================================= */}
        <section className="py-6 sm:py-8 bg-white dark:bg-slate-950">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#F0F7FD] dark:bg-slate-900/90 rounded-2xl sm:rounded-3xl border border-blue-100/80 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col lg:flex-row items-center">

              {/* Left Photo: Exact professional woman with laptop photo flush with card edge */}
              <div className="w-full lg:w-[280px] xl:w-[320px] self-stretch shrink-0 overflow-hidden">
                <img
                  src={solutionWomanImg}
                  alt="Professional working on digital presence"
                  className="w-full h-44 sm:h-52 lg:h-full object-cover object-left block"
                />
              </div>

              {/* Middle & Right Content Wrapper */}
              <div className="flex-1 w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-5 sm:p-6 lg:py-5 lg:px-8">

                {/* Middle Text: Heading & Find My Solution Button */}
                <div className="max-w-xl text-left">
                  <span className="text-[10px] sm:text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block mb-1">
                    FIND THE RIGHT SOLUTION
                  </span>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0B132B] dark:text-white tracking-tight mb-1.5 leading-snug">
                    Not sure which tool is right for you?
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3.5 max-w-md">
                    Use our solution finder to get personalised recommendations based on your goals and category.
                  </p>

                  <button
                    onClick={() => setSolutionModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-all active:scale-95"
                  >
                    <span>Find My Solution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtle Vertical Divider (desktop) */}
                <div className="hidden lg:block w-px h-16 bg-slate-200/80 dark:bg-slate-700 shrink-0 mx-2" />

                {/* Right 2x2 Benefits Grid (Clean icons + text, matching master mockup) */}
                <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-3.5 text-left shrink-0">
                  {[
                    { label: "Quick & Easy", icon: Target },
                    { label: "Personalised Results", icon: User },
                    { label: "Save Time", icon: Clock },
                    { label: "Start Your Journey", icon: Compass },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-100/70 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                        <item.icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: READY TO GET STARTED? (Bottom Mountain CTA)
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
                  READY TO GET STARTED?
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1 drop-shadow-sm">
                  Your Digital Journey Starts Here.
                </h2>
                <p className="text-xs sm:text-[13px] text-blue-100/90">
                  Explore our tools, watch tutorials and create your digital presence today.
                </p>
              </div>

              {/* Action Button: Positioned in center-right sitting cleanly over mountain ridge */}
              <div className="shrink-0">
                <button
                  onClick={scrollToAllTools}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-blue-700 bg-white hover:bg-blue-50 shadow-md transition-all active:scale-95 whitespace-nowrap"
                >
                  <span>Explore All Tools</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* 7. Global Footer */}
      <Footer />

      {/* =========================================================================
          INTERACTIVE MODALS: Video Demo & Solution Finder
         ========================================================================= */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 text-left relative shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 mb-3">
              <Play className="w-5 h-5 fill-current" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Digital Tools Platform Walkthrough
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Watch how our Mini Website Builder, Digital Cards, and Lead Generation tools connect into one powerful digital ecosystem.
            </p>

            <div className="aspect-video bg-slate-950 rounded-xl flex items-center justify-center text-slate-400 mb-4 border border-slate-800">
              <div className="text-center p-4">
                <Play className="w-10 h-10 text-blue-500 mx-auto mb-2 opacity-80" />
                <span className="text-xs text-slate-300 font-semibold block">Interactive Demo Video</span>
                <span className="text-[10px] text-slate-500">Reva-Yah One Digital Builder Suite</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setVideoModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              <Link
                to="/create"
                onClick={() => setVideoModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700"
              >
                Start Building Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {solutionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 text-left relative shadow-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setSolutionModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 mb-3">
              <Target className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Find Your Ideal Digital Setup
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Select your goal to find the best digital tools for your business or personal brand:
            </p>

            <div className="space-y-2 mb-5">
              {[
                { title: "Personal Branding & Profile", cat: "create-present", desc: "Profile Builder, Digital Card, Portfolio" },
                { title: "Business & Client Acquisition", cat: "generate-business", desc: "Mini Website, Lead Generation, WhatsApp Integration" },
                { title: "Product & Service Showcases", cat: "create-present", desc: "Catalog Builder, Product Builder, Brochure" },
                { title: "Operations & Tracking", cat: "manage-measure", desc: "Analytics, Docs Manager, Appointment Booking" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(item.cat);
                    setSolutionModalOpen(false);
                    scrollToAllTools();
                  }}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-all flex items-center justify-between group"
                >
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white block group-hover:text-blue-600">
                      {item.title}
                    </span>
                    <span className="text-[10.5px] text-slate-500 block">
                      {item.desc}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSolutionModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalToolsPage;
