import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FaBuilding, 
  FaGem, 
  FaCrown, 
  FaCheck, 
  FaUserTie, 
  FaBriefcase, 
  FaStore, 
  FaGlobe,
  FaBolt,
  FaShieldAlt,
  FaArrowRight
} from "react-icons/fa";

// Base Personal Allowed Fields (Tier 1)
const personalAllowed = [
  'profilePhoto', 'firstName', 'lastName', 'prefix', 'suffix',
  'jobTitle', 'tagline', 'aboutText', 'bio', 'phones',
  'email', 'emails', 'websites', 'addresses', 'enableOneTapCall',
  'enableWhatsApp', 'enableEmail', 'socialLinks', 'dynamicQRCode',
  'shareableUrl', 'shareableLink'
];

// Business Allowed Fields (Tier 2: Personal + Business)
const businessAllowed = [
  ...personalAllowed,
  'companyName', 'companyLogo', 'logoSize', 'department', 'organization',
  'businessHours', 'virtualNumber', 'profileVideo', 'services', 'servicesProducts',
  'gallery', 'catalog', 'catalogPDF', 'productVideo', 'testimonials',
  'nfcSettings', 'downloads', 'videos'
];

// BusinessPremium Allowed Fields (Tier 3: Business + Inquiries & Displays)
const businessPremiumAllowed = [
  ...businessAllowed,
  'interactiveElements', 'individualProductDisplay', 'clientList',
  'businessCardInstagram', 'textbooks', 'chatAssistant', 'liveChat',
  'foundedName', 'brandLabel', 'productRangeDisplay'
];

// Professionals Allowed Fields (Tier 4)
const professionalsAllowed = [...businessPremiumAllowed];

// ProfessionalPro Allowed Fields (Tier 5)
const professionalProAllowed = [...professionalsAllowed];

// Entrepreneurials Allowed Fields (Tier 6)
const entrepreneurialsAllowed = [...professionalProAllowed];

// EntrepreneurialsMulti Allowed Fields (Tier 7)
const entrepreneurialsMultiAllowed = [...entrepreneurialsAllowed];

// CorporateBusiness Allowed Fields (Tier 8)
const corporateBusinessAllowed = [...entrepreneurialsMultiAllowed];

// Team Allowed Fields (Tier 9)
const teamAllowed = [...corporateBusinessAllowed];

// MiniWebsite Allowed Fields (Tier 10)
const miniWebsiteAllowed = [...teamAllowed];

const cardFieldsConfig = {
  Personal: {
    name: 'Personal',
    subtitle: 'DI - Individuals',
    category: 'individual',
    badge: null,
    description: 'Essential digital identity for individuals, freelancers & consultants',
    allowed: personalAllowed,
    features: [
      'Profile photo, Name, Designation / Title',
      'Tag line, Short intro & Location map',
      'Mobile 1, Mobile 2 & WhatsApp direct connect',
      'Email, Website, Address & Location map',
      'Social Links (LinkedIn, FB, Insta, X/Twitter)',
      'Dynamic QR Code & Instant Contact Share'
    ]
  },

  Business: {
    name: 'Business',
    subtitle: 'DI - Working Professional',
    category: 'individual',
    badge: 'Most Popular',
    description: 'Corporate role presence with company identity & service showcase',
    allowed: businessAllowed,
    features: [
      'Everything in Personal plan, plus:',
      'Employment Details (Company, Designation, Role)',
      'Company Logo, Office Address & Virtual Number',
      'Products / Services Showcase & Portfolio Gallery',
      'Business Hours, Product Video & Testimonials',
      'Downloadable Catalog [PDF] & Documents'
    ]
  },

  BusinessPremium: {
    name: 'BusinessPremium',
    subtitle: 'DI - Service Providers',
    category: 'individual',
    badge: 'Best for Services',
    description: 'Service providers & freelancers with customer inquiries & booking slots',
    allowed: businessPremiumAllowed,
    features: [
      'Everything in Working Professional plan, plus:',
      'Dedicated Service Provider Profile & Service Areas',
      'Google Maps Service Location & Operating Hours',
      'Customer Inquiries (Service, Preferred Date, Time, Contact)',
      'Services Catalog & Availability Schedule (Days & Hours)',
      'Direct Action CTA & Digital Payments'
    ]
  },

  Professionals: {
    name: 'Professionals',
    subtitle: 'DI - Professionals',
    category: 'individual',
    badge: 'Executive',
    description: 'Comprehensive executive profile with credentials, portfolio & rich add-ons',
    allowed: professionalsAllowed,
    features: [
      'Everything in Service Providers plan, plus:',
      'Executive Profile with Certifications & Memberships',
      'Professional Summary (About, Expertise, Services)',
      'Portfolio Link, Client Testimonials & Videos',
      'Document Uploads & Direct Action CTA',
      'Expanded Add-on Suite (Catalog, Brochure & Portfolio Builders)'
    ]
  },

  ProfessionalPro: {
    name: 'ProfessionalPro',
    subtitle: 'DI - Professional Pro',
    category: 'individual',
    badge: 'Specialized',
    description: 'Industry specific customized profiles for certified specialists & consultants',
    allowed: professionalProAllowed,
    features: [
      'Everything in Professionals plan, plus:',
      'Industry Specific Custom Layouts & Styling',
      'Specialized Credentials, Certifications & Licenses Display',
      'Advanced Professional Portfolio & Case Studies',
      'Executive Summary & Priority Consultation Booking',
      'Direct WhatsApp, One-Tap Call & Email Action'
    ]
  },

  Entrepreneurials: {
    name: 'Entrepreneurials',
    subtitle: 'DI - Entrepreneurials',
    category: 'business',
    badge: null,
    description: 'Entrepreneurs & business operators with company role & product suite',
    allowed: entrepreneurialsAllowed,
    features: [
      'Everything in Professional Pro plan, plus:',
      'Comprehensive Business & Role Showcase',
      'Business Details (Company, Designation, Role, Services)',
      'Location, Address, Contact No, Email ID, Website Hub',
      'Dedicated Social Media Hub & Direct Action CTA'
    ]
  },

  EntrepreneurialsMulti: {
    name: 'EntrepreneurialsMulti',
    subtitle: 'DI - Multi-Activities',
    category: 'business',
    badge: 'Multi-Venture',
    description: 'Multi-venture founders showcasing ventures, expertise & direct booking',
    allowed: entrepreneurialsMultiAllowed,
    features: [
      'Everything in Entrepreneurials plan, plus:',
      'Multi-Venture & Multi-Brand Showcase (My Ventures +)',
      'Competencies & Expertise Hub (My Expertise +)',
      'Projects & Dynamic Portfolio (My Projects +)',
      'My Services + & My Products + Central Hub',
      'Direct "WhatsApp Me" & "Book Me Direct" Action'
    ]
  },

  CorporateBusiness: {
    name: 'CorporateBusiness',
    subtitle: 'DI - Business',
    category: 'business',
    badge: 'Enterprise',
    description: 'Corporate entities with multi-location branches & multi-person team directory',
    allowed: corporateBusinessAllowed,
    features: [
      'Everything in Multi-Activities plan, plus:',
      'Corporate Identity (Logo, Brand Name, Tag line & Intro)',
      'About Business (Overview, Products, Services, Docs Upload)',
      'Multiple Branch Locations & Google Maps Directory',
      'Multiple Contact Persons, Roles & Designations',
      'Corporate Social Media Hub & Direct Inquiry Funnel'
    ]
  },

  Team: {
    name: 'Team',
    subtitle: 'DI - Team',
    category: 'business',
    badge: 'Multi-User',
    description: 'Centralized team organization with sub-cards, brand control & team management',
    allowed: teamAllowed,
    features: [
      'Everything in Corporate Business plan, plus:',
      'Multi-Member Team Directory & Organization Hierarchy',
      'Unified Corporate Branding & Theme Control',
      'Individual Team Member Cards with Dedicated URLs',
      'Central Admin Dashboard & Permission Controls',
      'Centralized Lead Capture & Shared Analytics',
      'Bulk Contact Sharing & Corporate QR Codes'
    ]
  },

  MiniWebsite: {
    name: 'MiniWebsite',
    subtitle: 'DP - Mini Website',
    category: 'business',
    badge: 'Complete Suite',
    description: 'Full-featured interactive digital mini website with forms, map & analytics',
    allowed: miniWebsiteAllowed,
    features: [
      'Everything in Team plan, plus:',
      'Full-Featured Digital Mini Website & Landing Presence',
      'Interactive Products & Services Catalog Showcase',
      'Built-in Photo Gallery & Video Streams',
      'Digital Brochures & Document PDF Downloads',
      'Client Testimonials, Google Ratings & Operating Hours',
      'Lead Generation & Interactive Inquiry Webform',
      'Custom Domain/URL & Performance Analytics'
    ]
  }
};

// Add-ons configurations
const businessAddonList = [
  { key: 'gallery', name: 'Photo Gallery', desc: 'Portfolio & product showcase', price: '+₹200/mo' },
  { key: 'docsBuilder', name: 'Docs Builder', desc: 'Upload brochures & PDF documents', price: '+₹150/mo' },
  { key: 'profileBuilder', name: 'Profile / Portfolio Builder', desc: 'Custom layout builder', price: '+₹200/mo' },
  { key: 'nfcCard', name: 'NFC Smart Card', desc: 'Custom printed contactless card', price: '+₹499 (one-time)' }
];

const professionalsAddonList = [
  { key: 'gallery', name: 'Photo Gallery', desc: 'High-res image gallery showcase', price: '+₹200/mo' },
  { key: 'catalogBuilder', name: 'Catalog Builder', desc: 'Digital product catalogs', price: '+₹200/mo' },
  { key: 'brochureBuilder', name: 'Brochure Builder', desc: 'Interactive digital brochures', price: '+₹150/mo' },
  { key: 'profileBuilder', name: 'Profile Builder', desc: 'Custom branding & badge layout', price: '+₹150/mo' },
  { key: 'portfolioBuilder', name: 'Portfolio Builder', desc: 'Featured projects & case studies', price: '+₹200/mo' },
  { key: 'docsBuilder', name: 'Docs Builder', desc: 'Upload PDF brochures & forms', price: '+₹150/mo' },
  { key: 'nfcCard', name: 'NFC Smart Card', desc: 'Physical contactless card', price: '+₹499 (one-time)' },
  { key: 'leadGen', name: 'Lead Generation', desc: 'Capture leads with smart forms', price: '+₹250/mo' },
  { key: 'leadManagement', name: 'Lead Management', desc: 'Lead tracking & CRM dashboard', price: '+₹200/mo' },
  { key: 'appointmentBooking', name: 'Appointment Booking', desc: 'Integrated calendar booking', price: '+₹200/mo' },
  { key: 'whatsappIntegration', name: 'WhatsApp Integration', desc: 'Instant WhatsApp chat trigger', price: '+₹150/mo' },
  { key: 'analytics', name: 'Analytics', desc: 'View counts & visitor insights', price: '+₹150/mo' },
  { key: 'docsManager', name: 'Docs Manager', desc: 'Cloud document vault & access', price: '+₹150/mo' }
];

const entrepreneurialsAddonList = [
  { key: 'gallery', name: 'Photo Gallery', desc: 'Portfolio & image showcase', price: '+₹200/mo' },
  { key: 'docsBuilder', name: 'Docs Builder', desc: 'Upload brochures & PDFs', price: '+₹150/mo' },
  { key: 'profileBuilder', name: 'Profile / Portfolio Builder', desc: 'Custom layout & portfolio', price: '+₹200/mo' },
  { key: 'nfcCard', name: 'NFC Smart Card', desc: 'Contactless physical card', price: '+₹499 (one-time)' }
];

const businessPremiumAddonList = [
  { key: 'gallery', name: 'Photo Gallery', desc: 'High-res image gallery showcase', price: '+₹200/mo' },
  { key: 'docsBuilder', name: 'Docs Builder', desc: 'Upload brochures & PDF documents', price: '+₹150/mo' },
  { key: 'nfcCard', name: 'NFC Smart Card', desc: 'Custom printed contactless card', price: '+₹499 (one-time)' }
];

const corporateBusinessAddonList = [
  { key: 'gallery', name: 'Photo Gallery', desc: 'Corporate portfolio & visual showcase', price: '+₹200/mo' },
  { key: 'docsBuilder', name: 'Docs Builder', desc: 'Upload corporate brochures & company decks', price: '+₹150/mo' },
  { key: 'nfcCard', name: 'NFC Smart Card', desc: 'Contactless executive smart card', price: '+₹499 (one-time)' }
];

const planAddonsMap = {
  Business: { list: businessAddonList, basePrice: 800, color: 'purple' },
  BusinessPremium: { list: businessPremiumAddonList, basePrice: 1200, color: 'gold' },
  Professionals: { list: professionalsAddonList, basePrice: 1500, color: 'emerald' },
  ProfessionalPro: { list: businessAddonList, basePrice: 1800, color: 'indigo' },
  Entrepreneurials: { list: entrepreneurialsAddonList, basePrice: 1800, color: 'amber' },
  EntrepreneurialsMulti: { list: businessPremiumAddonList, basePrice: 2200, color: 'indigo' },
  CorporateBusiness: { list: corporateBusinessAddonList, basePrice: 2500, color: 'teal' },
  Team: { list: corporateBusinessAddonList, basePrice: 2800, color: 'purple' },
  MiniWebsite: { list: businessPremiumAddonList, basePrice: 3000, color: 'cyan' }
};

const addonPrices = {
  gallery: 200,
  docsBuilder: 150,
  nfcCard: 499,
  catalogBuilder: 200,
  brochureBuilder: 150,
  profileBuilder: 150,
  portfolioBuilder: 200,
  leadGen: 250,
  leadManagement: 200,
  appointmentBooking: 200,
  whatsappIntegration: 150,
  analytics: 150,
  docsManager: 150
};

const planPrices = {
  'Personal': '₹500/month',
  'Business': '₹800/month',
  'BusinessPremium': '₹1200/month',
  'Professionals': '₹1500/month',
  'ProfessionalPro': '₹1800/month',
  'Entrepreneurials': '₹1800/month',
  'EntrepreneurialsMulti': '₹2200/month',
  'CorporateBusiness': '₹2500/month',
  'Team': '₹2800/month',
  'MiniWebsite': '₹3000/month'
};

const planColors = {
  'Personal': 'blue',
  'Business': 'purple',
  'BusinessPremium': 'gold',
  'Professionals': 'emerald',
  'ProfessionalPro': 'indigo',
  'Entrepreneurials': 'amber',
  'EntrepreneurialsMulti': 'indigo',
  'CorporateBusiness': 'teal',
  'Team': 'purple',
  'MiniWebsite': 'cyan'
};

const planIcons = {
  'Personal': <FaBuilding className="w-7 h-7" />,
  'Business': <FaBriefcase className="w-7 h-7" />,
  'BusinessPremium': <FaCrown className="w-7 h-7" />,
  'Professionals': <FaUserTie className="w-7 h-7" />,
  'ProfessionalPro': <FaGem className="w-7 h-7" />,
  'Entrepreneurials': <FaStore className="w-7 h-7" />,
  'EntrepreneurialsMulti': <FaStore className="w-7 h-7" />,
  'CorporateBusiness': <FaBuilding className="w-7 h-7" />,
  'Team': <FaBriefcase className="w-7 h-7" />,
  'MiniWebsite': <FaGlobe className="w-7 h-7" />
};

const planColorStyles = {
  blue: {
    border: 'border-blue-500 ring-2 ring-blue-500/20',
    iconBg: 'bg-blue-100 text-blue-600',
    indicator: 'bg-blue-500',
    check: 'text-blue-500',
    btn: 'bg-blue-600 hover:bg-blue-700 text-white',
    badge: 'text-blue-700 bg-blue-100 border border-blue-200',
    boxBg: 'bg-blue-50/60 border-blue-200',
    boxTitle: 'text-blue-900',
    addonActive: 'bg-blue-100/70 border-blue-400',
    addonCheck: 'text-blue-600 focus:ring-blue-500',
    breakdownText: 'text-blue-600',
    accentText: 'text-blue-600'
  },
  purple: {
    border: 'border-purple-500 ring-2 ring-purple-500/20',
    iconBg: 'bg-purple-100 text-purple-600',
    indicator: 'bg-purple-500',
    check: 'text-purple-500',
    btn: 'bg-purple-600 hover:bg-purple-700 text-white',
    badge: 'text-purple-700 bg-purple-100 border border-purple-200',
    boxBg: 'bg-purple-50/60 border-purple-200',
    boxTitle: 'text-purple-900',
    addonActive: 'bg-purple-100/70 border-purple-400',
    addonCheck: 'text-purple-600 focus:ring-purple-500',
    breakdownText: 'text-purple-600',
    accentText: 'text-purple-600'
  },
  gold: {
    border: 'border-amber-500 ring-2 ring-amber-500/20',
    iconBg: 'bg-amber-100 text-amber-700',
    indicator: 'bg-amber-500',
    check: 'text-amber-500',
    btn: 'bg-amber-600 hover:bg-amber-700 text-white',
    badge: 'text-amber-800 bg-amber-100 border border-amber-200',
    boxBg: 'bg-amber-50/60 border-amber-200',
    boxTitle: 'text-amber-900',
    addonActive: 'bg-amber-100/70 border-amber-400',
    addonCheck: 'text-amber-600 focus:ring-amber-500',
    breakdownText: 'text-amber-600',
    accentText: 'text-amber-700'
  },
  emerald: {
    border: 'border-emerald-500 ring-2 ring-emerald-500/20',
    iconBg: 'bg-emerald-100 text-emerald-600',
    indicator: 'bg-emerald-500',
    check: 'text-emerald-500',
    btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    badge: 'text-emerald-700 bg-emerald-100 border border-emerald-200',
    boxBg: 'bg-emerald-50/60 border-emerald-200',
    boxTitle: 'text-emerald-900',
    addonActive: 'bg-emerald-100/70 border-emerald-400',
    addonCheck: 'text-emerald-600 focus:ring-emerald-500',
    breakdownText: 'text-emerald-600',
    accentText: 'text-emerald-600'
  },
  amber: {
    border: 'border-orange-500 ring-2 ring-orange-500/20',
    iconBg: 'bg-orange-100 text-orange-600',
    indicator: 'bg-orange-500',
    check: 'text-orange-500',
    btn: 'bg-orange-600 hover:bg-orange-700 text-white',
    badge: 'text-orange-700 bg-orange-100 border border-orange-200',
    boxBg: 'bg-orange-50/60 border-orange-200',
    boxTitle: 'text-orange-900',
    addonActive: 'bg-orange-100/70 border-orange-400',
    addonCheck: 'text-orange-600 focus:ring-orange-500',
    breakdownText: 'text-orange-600',
    accentText: 'text-orange-600'
  },
  indigo: {
    border: 'border-indigo-500 ring-2 ring-indigo-500/20',
    iconBg: 'bg-indigo-100 text-indigo-600',
    indicator: 'bg-indigo-500',
    check: 'text-indigo-500',
    btn: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    badge: 'text-indigo-700 bg-indigo-100 border border-indigo-200',
    boxBg: 'bg-indigo-50/60 border-indigo-200',
    boxTitle: 'text-indigo-900',
    addonActive: 'bg-indigo-100/70 border-indigo-400',
    addonCheck: 'text-indigo-600 focus:ring-indigo-500',
    breakdownText: 'text-indigo-600',
    accentText: 'text-indigo-600'
  },
  teal: {
    border: 'border-teal-500 ring-2 ring-teal-500/20',
    iconBg: 'bg-teal-100 text-teal-600',
    indicator: 'bg-teal-500',
    check: 'text-teal-500',
    btn: 'bg-teal-600 hover:bg-teal-700 text-white',
    badge: 'text-teal-700 bg-teal-100 border border-teal-200',
    boxBg: 'bg-teal-50/60 border-teal-200',
    boxTitle: 'text-teal-900',
    addonActive: 'bg-teal-100/70 border-teal-400',
    addonCheck: 'text-teal-600 focus:ring-teal-500',
    breakdownText: 'text-teal-600',
    accentText: 'text-teal-600'
  },
  cyan: {
    border: 'border-cyan-500 ring-2 ring-cyan-500/20',
    iconBg: 'bg-cyan-100 text-cyan-700',
    indicator: 'bg-cyan-500',
    check: 'text-cyan-600',
    btn: 'bg-cyan-600 hover:bg-cyan-700 text-white',
    badge: 'text-cyan-700 bg-cyan-100 border border-cyan-200',
    boxBg: 'bg-cyan-50/60 border-cyan-200',
    boxTitle: 'text-cyan-900',
    addonActive: 'bg-cyan-100/70 border-cyan-400',
    addonCheck: 'text-cyan-600 focus:ring-cyan-500',
    breakdownText: 'text-cyan-600',
    accentText: 'text-cyan-700'
  }
};

const PlanSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState(location.state?.selectedPlan || null);
  const [activeCategory, setActiveCategory] = useState('all');

  const [selectedAddons, setSelectedAddons] = useState({
    gallery: false,
    docsBuilder: false,
    nfcCard: false,
    catalogBuilder: false,
    brochureBuilder: false,
    profileBuilder: false,
    portfolioBuilder: false,
    leadGen: false,
    leadManagement: false,
    appointmentBooking: false,
    whatsappIntegration: false,
    analytics: false,
    docsManager: false
  });

  const getPlanAddonTotal = (planKey) => {
    const planInfo = planAddonsMap[planKey];
    if (!planInfo) return 0;
    let sum = 0;
    planInfo.list.forEach(item => {
      if (selectedAddons[item.key]) sum += addonPrices[item.key] || 0;
    });
    return sum;
  };

  const getPlanTotalPriceNumber = (key) => {
    const planInfo = planAddonsMap[key];
    if (planInfo) {
      return planInfo.basePrice + getPlanAddonTotal(key);
    }
    return parseInt((planPrices[key] || '1200').replace(/[^0-9]/g, '')) || 1200;
  };

  const getPlanPriceDisplay = (key) => {
    const total = getPlanTotalPriceNumber(key);
    return `₹${total}/month`;
  };

  const handleToggleAddon = (addonKey, e) => {
    if (e) e.stopPropagation();
    setSelectedAddons(prev => ({
      ...prev,
      [addonKey]: !prev[addonKey]
    }));
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    if (!selectedPlan) return;
    const hasAddons = !!planAddonsMap[selectedPlan];
    const relevantAddons = hasAddons ? planAddonsMap[selectedPlan].list.map(a => a.key) : [];
    const activeAddonsList = relevantAddons.filter(k => selectedAddons[k]);
    const addonTotal = getPlanAddonTotal(selectedPlan);
    const basePrice = planAddonsMap[selectedPlan] 
      ? planAddonsMap[selectedPlan].basePrice 
      : (parseInt((planPrices[selectedPlan] || '1200').replace(/[^0-9]/g, '')) || 1200);

    const totalPrice = basePrice + addonTotal;
    const userEmail = localStorage.getItem('user_email') || '';

    // Persist in localStorage
    localStorage.setItem('selected_plan', selectedPlan);
    localStorage.setItem('selected_addons', JSON.stringify(activeAddonsList));
    localStorage.setItem('selected_plan_price', totalPrice);

    // Navigate to Signup page like the previous flow
    navigate('/signup', {
      state: {
        selectedPlan,
        selectedAddons: activeAddonsList,
        addonsObject: selectedAddons,
        totalPrice: totalPrice,
        userEmail,
        createdBy: location.state?.createdBy,
        fromPartnerDashboard: location.state?.fromPartnerDashboard,
        billingCycle: 'monthly'
      }
    });
  };

  const hasFeature = (planKey, featureName) => {
    const plan = cardFieldsConfig[planKey];
    if (!plan) return false;
    return plan.features.some(f => f.toLowerCase().includes(featureName.toLowerCase()));
  };

  const visiblePlans = Object.entries(cardFieldsConfig).filter(([_, plan]) => {
    if (activeCategory === 'all') return true;
    return plan.category === activeCategory;
  });

  const selectedPlanInfo = selectedPlan ? (cardFieldsConfig[selectedPlan] || null) : null;
  const selectedPlanAddonsTotal = selectedPlan ? getPlanAddonTotal(selectedPlan) : 0;
  const selectedPlanTotalNumber = selectedPlan ? getPlanTotalPriceNumber(selectedPlan) : 0;

  return (
    <div className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8 font-sans" id="plan">
      {/* Scoped CSS for sleek scrollbars */}
      <style>{`
        .custom-card-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-card-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
        }
        .custom-card-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 8px;
        }
        .custom-card-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      <div className="max-w-7xl mx-auto pb-24">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <FaShieldAlt className="w-3.5 h-3.5 text-blue-600" />
            Transparent Pricing • Scale As You Grow
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600">Digital Identity Plan</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From essential individual contact cards to multi-activity portfolios and complete digital mini-websites.
            Select your plan with flexible add-ons tailored to your needs.
          </p>

          {/* Category Tabs Switcher */}
          <div className="inline-flex items-center p-1.5 mt-8 bg-white border border-slate-200/80 rounded-2xl shadow-sm">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              All Plans ({Object.keys(cardFieldsConfig).length})
            </button>
            <button
              onClick={() => setActiveCategory('individual')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === 'individual'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Individuals & Pros ({Object.values(cardFieldsConfig).filter(p => p.category === 'individual').length})
            </button>
            <button
              onClick={() => setActiveCategory('business')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeCategory === 'business'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Business & Ventures ({Object.values(cardFieldsConfig).filter(p => p.category === 'business').length})
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {visiblePlans.map(([key, plan]) => {
            const colorKey = planColors[key] || 'blue';
            const style = planColorStyles[colorKey] || planColorStyles.blue;
            const isSelected = selectedPlan === key;
            const hasAddons = !!planAddonsMap[key];
            const addonTotal = getPlanAddonTotal(key);

            return (
              <div
                key={key}
                onClick={() => handlePlanSelect(key)}
                className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between bg-white border ${
                  isSelected
                    ? `${style.border} shadow-2xl scale-[1.02] z-10 bg-white`
                    : 'border-slate-200/80 shadow-md hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* Popular / Feature Badge at Top Center */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow-md uppercase tracking-wide">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Selected Checkmark Badge at Top Right */}
                {isSelected && (
                  <div className="absolute -top-2.5 -right-2.5">
                    <div className={`${style.indicator} text-white rounded-full p-1.5 shadow-md ring-4 ring-white`}>
                      <FaCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}

                <div>
                  {/* Row 1: Subtitle Tag / Category (Fixed Height) */}
                  <div className="h-6 flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${style.badge}`}>
                      {plan.subtitle}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {plan.category === 'individual' ? 'Solo / Pro' : 'Business'}
                    </span>
                  </div>

                  {/* Row 2: Icon and Plan Name (Fixed Height) */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className={`w-13 h-13 p-3 rounded-2xl ${style.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
                      {planIcons[key]}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                        {plan.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium">Monthly Digital Card</p>
                    </div>
                  </div>

                  {/* Row 3: Description (Fixed Height to align all cards) */}
                  <div className="h-10 flex items-center text-xs text-slate-500 leading-snug line-clamp-2 mb-4">
                    {plan.description}
                  </div>

                  {/* Row 4: Price Block (Fixed Height with Dynamic Subline) */}
                  <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-100 flex flex-col justify-center mb-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-black text-slate-900 tracking-tight">
                        {getPlanPriceDisplay(key).replace('/month', '')}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">/ month</span>
                    </div>

                    <div className="h-4 mt-1 flex items-center">
                      {hasAddons && addonTotal > 0 ? (
                        <span className={`text-[11px] font-bold ${style.breakdownText}`}>
                          ₹{planAddonsMap[key].basePrice} base + ₹{addonTotal} add-ons
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-400">
                          {hasAddons ? 'Customizable add-ons below' : 'All standard features included'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 5: Features & Add-ons Box (Uniform Height & Sleek Custom Scrollbar) */}
                  <div className="h-[360px] overflow-y-auto custom-card-scrollbar pr-2 space-y-4 mb-4">
                    {/* Included Features Section */}
                    <div>
                      <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Included Features ({plan.features.length})
                        </span>
                        <FaCheck className={`w-3 h-3 ${style.check}`} />
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                            <FaCheck className={`w-3.5 h-3.5 ${style.check} shrink-0 mt-0.5`} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Add-On Features Section if available */}
                    {hasAddons ? (
                      <div className="pt-2 border-t border-slate-200/80">
                        <div className={`p-3 rounded-2xl border ${style.boxBg}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-extrabold uppercase tracking-wide flex items-center gap-1.5 ${style.boxTitle}`}>
                              <FaBolt className="w-3 h-3 text-amber-500" />
                              Add-On Features
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 text-slate-600 shadow-2xs">
                              {planAddonsMap[key].list.filter(a => selectedAddons[a.key]).length} of {planAddonsMap[key].list.length} added
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {planAddonsMap[key].list.map((addon) => {
                              const isChecked = !!selectedAddons[addon.key];
                              return (
                                <label
                                  key={addon.key}
                                  onClick={(e) => handleToggleAddon(addon.key, e)}
                                  className={`flex items-start justify-between p-2 rounded-xl border transition-all cursor-pointer ${
                                    isChecked
                                      ? `${style.addonActive} shadow-xs`
                                      : 'bg-white/80 border-slate-200/70 hover:bg-white hover:border-slate-300'
                                  }`}
                                >
                                  <div className="flex items-start gap-2 min-w-0 pr-1">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={(e) => handleToggleAddon(addon.key, e)}
                                      className={`mt-0.5 size-3.5 rounded cursor-pointer ${style.addonCheck}`}
                                    />
                                    <div className="truncate">
                                      <p className="text-[11px] font-bold text-slate-800 truncate">{addon.name}</p>
                                      <p className="text-[10px] text-slate-500 truncate">{addon.desc}</p>
                                    </div>
                                  </div>
                                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded shrink-0 ${style.badge}`}>
                                    {addon.price}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* No Add-ons Banner to balance height evenly */
                      <div className="pt-2 border-t border-slate-100">
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-center">
                          <p className="text-[11px] font-bold text-slate-700">
                            {key === 'BusinessPremium' || key === 'MiniWebsite'
                              ? '✨ Complete All-in-One Package'
                              : '✓ Ready Out of the Box'}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {key === 'BusinessPremium' || key === 'MiniWebsite'
                              ? 'Photo gallery, inquiry suite & interactive tools included without extra fees.'
                              : 'All essential identity features included with no hidden charges.'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-2 mt-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isSelected) {
                        handleContinue();
                      } else {
                        handlePlanSelect(key);
                      }
                    }}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer ${
                      isSelected
                        ? `${style.btn} ring-2 ring-offset-2 ring-slate-900`
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? 'Continue with Plan →' : 'Select This Plan'}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">
                    14-Day Trial • Cancel Anytime
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Feature Comparison Table */}
        <div className="mt-20 bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8 overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Detailed Plan Feature Comparison
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Cross-compare capabilities across all 8 tiers to select the perfect match for your digital identity.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="py-4 px-4 font-bold text-slate-700 min-w-[200px]">
                    Capabilities & Features
                  </th>
                  {Object.entries(cardFieldsConfig).map(([key, plan]) => (
                    <th key={key} className="text-center py-4 px-3 font-bold text-slate-800 min-w-[120px]">
                      <div className="text-xs font-black">{plan.name}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">{planPrices[key]}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Profile Identity Group */}
                <tr className="bg-slate-100/90 font-bold text-slate-900">
                  <td colSpan={Object.keys(cardFieldsConfig).length + 1} className="py-2.5 px-4 text-xs uppercase tracking-wider text-slate-600">
                    Identity & Contact Features
                  </td>
                </tr>
                {[
                  'Profile photo',
                  'Designation / Title',
                  'Location map',
                  'WhatsApp & Email',
                  'Social Links',
                  'Dynamic QR Code & Share'
                ].map((feat, idx) => (
                  <tr key={`id-${idx}`} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-medium text-slate-700">{feat}</td>
                    {Object.keys(cardFieldsConfig).map((planKey) => (
                      <td key={`${planKey}-${feat}`} className="text-center py-3 px-2">
                        {hasFeature(planKey, feat) ? (
                          <FaCheck className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Professional & Business Group */}
                <tr className="bg-slate-100/90 font-bold text-slate-900">
                  <td colSpan={Object.keys(cardFieldsConfig).length + 1} className="py-2.5 px-4 text-xs uppercase tracking-wider text-slate-600">
                    Business, Services & Media
                  </td>
                </tr>
                {[
                  'Company Details',
                  'Services',
                  'Customer Inquire',
                  'Photo Gallery',
                  'Portfolio',
                  'Ventures',
                  'Docs Upload'
                ].map((feat, idx) => (
                  <tr key={`biz-${idx}`} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-medium text-slate-700">{feat}</td>
                    {Object.keys(cardFieldsConfig).map((planKey) => (
                      <td key={`${planKey}-${feat}`} className="text-center py-3 px-2">
                        {hasFeature(planKey, feat) || (planAddonsMap[planKey]?.list.some(a => a.name.toLowerCase().includes(feat.toLowerCase())) ? (
                          <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Add-on</span>
                        ) : null) ? (
                          hasFeature(planKey, feat) ? (
                            <FaCheck className="w-4 h-4 text-emerald-500 mx-auto" />
                          ) : (
                            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Add-on</span>
                          )
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating Bottom Sticky Action Bar - only shown when any plan is selected */}
      {selectedPlan && selectedPlanInfo && (
        <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-2xl py-3.5 px-4 z-50 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                (planColorStyles[planColors[selectedPlan]] || planColorStyles.blue).iconBg
              }`}>
                {planIcons[selectedPlan]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900">
                    {selectedPlanInfo.name} Plan
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {selectedPlanInfo.subtitle}
                  </span>
                  {selectedPlanAddonsTotal > 0 && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      +₹{selectedPlanAddonsTotal} Add-ons
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Total: <strong className="text-slate-900 font-bold">₹{selectedPlanTotalNumber}/month</strong> • 14-day free trial included
                </p>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <span>Continue with {selectedPlanInfo.name} (₹{selectedPlanTotalNumber}/mo)</span>
              <FaArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSelection;