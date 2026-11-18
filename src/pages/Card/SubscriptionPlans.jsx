import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CHECK_URL, PLAN_URL, PAYMENT_URL } from "../../utility/constants";
import {
  Check,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Download,
  FileText,
  Calendar,
  CreditCard,
  RefreshCw,
  Clock,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Layers,
  Zap,
  Building,
  User,
  Star,
  CheckCircle2,
  Receipt,
  RotateCcw
} from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

// Master Add-on definitions with monthly and yearly pricing
const ADDON_CATALOG = {
  gallery: { key: 'gallery', name: 'Photo Gallery', monthlyPrice: 200, yearlyPrice: 1800, isOneTime: false },
  docsbuilder: { key: 'docsbuilder', name: 'Docs Builder', monthlyPrice: 150, yearlyPrice: 1350, isOneTime: false },
  profilebuilder: { key: 'profilebuilder', name: 'Profile Builder', monthlyPrice: 150, yearlyPrice: 1350, isOneTime: false },
  portfoliobuilder: { key: 'portfoliobuilder', name: 'Portfolio Builder', monthlyPrice: 200, yearlyPrice: 1800, isOneTime: false },
  catalogbuilder: { key: 'catalogbuilder', name: 'Catalog Builder', monthlyPrice: 200, yearlyPrice: 1800, isOneTime: false },
  brochurebuilder: { key: 'brochurebuilder', name: 'Brochure Builder', monthlyPrice: 150, yearlyPrice: 1350, isOneTime: false },
  nfccard: { key: 'nfccard', name: 'NFC Smart Card', monthlyPrice: 499, yearlyPrice: 499, isOneTime: true },
  leadgen: { key: 'leadgen', name: 'Lead Generation', monthlyPrice: 250, yearlyPrice: 2250, isOneTime: false },
  leadmanagement: { key: 'leadmanagement', name: 'Lead Management', monthlyPrice: 200, yearlyPrice: 1800, isOneTime: false },
  appointmentbooking: { key: 'appointmentbooking', name: 'Appointment Booking', monthlyPrice: 200, yearlyPrice: 1800, isOneTime: false },
  whatsappintegration: { key: 'whatsappintegration', name: 'WhatsApp Integration', monthlyPrice: 150, yearlyPrice: 1350, isOneTime: false },
  analytics: { key: 'analytics', name: 'Analytics', monthlyPrice: 150, yearlyPrice: 1350, isOneTime: false },
  docsmanager: { key: 'docsmanager', name: 'Docs Manager', monthlyPrice: 150, yearlyPrice: 1350, isOneTime: false }
};

// Helper to safely resolve addon object from either code ('gallery') or display name ('Photo Gallery')
const getAddonInfo = (rawKey) => {
  if (!rawKey) return null;
  if (ADDON_CATALOG[rawKey]) return ADDON_CATALOG[rawKey];
  const cleaned = String(rawKey).toLowerCase().replace(/[\s\-_/]/g, '');
  if (ADDON_CATALOG[cleaned]) return ADDON_CATALOG[cleaned];
  if (cleaned.includes('gallery') || cleaned.includes('photo')) return ADDON_CATALOG.gallery;
  if (cleaned.includes('nfc')) return ADDON_CATALOG.nfccard;
  if (cleaned.includes('docsbuilder') || cleaned.includes('docsbuild')) return ADDON_CATALOG.docsbuilder;
  if (cleaned.includes('profile') && cleaned.includes('portfolio')) return ADDON_CATALOG.portfoliobuilder;
  if (cleaned.includes('profilebuilder') || cleaned.includes('profile')) return ADDON_CATALOG.profilebuilder;
  if (cleaned.includes('portfoliobuilder') || cleaned.includes('portfolio')) return ADDON_CATALOG.portfoliobuilder;
  if (cleaned.includes('catalogbuilder') || cleaned.includes('catalog')) return ADDON_CATALOG.catalogbuilder;
  if (cleaned.includes('brochurebuilder') || cleaned.includes('brochure')) return ADDON_CATALOG.brochurebuilder;
  if (cleaned.includes('leadmanagement')) return ADDON_CATALOG.leadmanagement;
  if (cleaned.includes('leadgen') || cleaned.includes('lead')) return ADDON_CATALOG.leadgen;
  if (cleaned.includes('appointment')) return ADDON_CATALOG.appointmentbooking;
  if (cleaned.includes('whatsapp')) return ADDON_CATALOG.whatsappintegration;
  if (cleaned.includes('analytics')) return ADDON_CATALOG.analytics;
  if (cleaned.includes('docsmanager')) return ADDON_CATALOG.docsmanager;
  return null;
};

// Complete catalog of 10 plans matching the table image with cumulative feature inheritance
const ALL_IMAGE_PLANS = [
  {
    name: 'Personal',
    displayName: 'DI - Individuals',
    category: 'personal',
    categoryGroup: 'individual',
    badge: null,
    description: 'Essential digital identity for individuals, freelancers & consultants',
    monthlyPrice: 500,
    yearlyPrice: 3500,
    features: [
      'Profile photo, Name, Designation / Title',
      'Tag line, Short intro & Location map',
      'Mobile 1, Mobile 2 & WhatsApp direct connect',
      'Email, Website, Address & Location map',
      'Social Links (LinkedIn, Facebook, Instagram, X/Twitter)',
      'Dynamic QR Code & Instant Contact Share'
    ],
    supportedAddonKeys: []
  },
  {
    name: 'Business',
    displayName: 'DI - Working Professionals',
    category: 'business',
    categoryGroup: 'individual',
    badge: 'Most Popular',
    description: 'Professional role presence with company employment details & showcase',
    monthlyPrice: 800,
    yearlyPrice: 6800,
    features: [
      'Everything in Personal plan, plus:',
      'Employment Details (Company Name, Designation, Role)',
      'Company Logo, Department & Office Address',
      'Products / Services Showcase & Portfolio Gallery',
      'Business Hours & Virtual Number Integration',
      'Profile Video, Product Video & Testimonials',
      'Downloadable Catalog [PDF] & Documents'
    ],
    supportedAddonKeys: ['gallery', 'docsbuilder', 'profilebuilder', 'nfccard']
  },
  {
    name: 'BusinessPremium',
    displayName: 'DI - Service Providers',
    category: 'business premium',
    categoryGroup: 'individual',
    badge: 'Best for Services',
    description: 'Dedicated profile for service providers with service areas & customer inquiries',
    monthlyPrice: 1200,
    yearlyPrice: 8200,
    features: [
      'Everything in Working Professionals plan, plus:',
      'Dedicated Service Provider Profile & Service Areas',
      'Google Maps Location & Operating Hours',
      'Customer Inquiries (Service, Preferred Date, Preferred Time, Contact)',
      'Services Catalog & Availability Schedule (Days & Hours)',
      'Direct Action CTA & Digital Payments'
    ],
    supportedAddonKeys: ['gallery', 'docsbuilder', 'nfccard']
  },
  {
    name: 'Professionals',
    displayName: 'DI - Professionals',
    category: 'professionals',
    categoryGroup: 'individual',
    badge: 'Executive',
    description: 'Executive profile with credentials, executive summary & rich add-on suite',
    monthlyPrice: 1500,
    yearlyPrice: 12000,
    features: [
      'Everything in Service Providers plan, plus:',
      'Executive Profile with Certifications & Memberships',
      'Professional Summary (About, Expertise, Services)',
      'Advanced Portfolio Link, Client Testimonials & Videos',
      'Document Uploads & Direct Action CTA',
      'Expanded Add-on Suite (Catalog, Brochure & Portfolio Builders)'
    ],
    supportedAddonKeys: [
      'gallery', 'catalogbuilder', 'brochurebuilder', 'profilebuilder',
      'portfoliobuilder', 'docsbuilder', 'nfccard', 'leadgen',
      'leadmanagement', 'appointmentbooking', 'whatsappintegration',
      'analytics', 'docsmanager'
    ]
  },
  {
    name: 'ProfessionalPro',
    displayName: 'DI - Professional Pro',
    category: 'professionalpro',
    categoryGroup: 'individual',
    badge: 'Specialized',
    description: 'Industry specific customized profiles for certified specialists & consultants',
    monthlyPrice: 1800,
    yearlyPrice: 14400,
    features: [
      'Everything in Professionals plan, plus:',
      'Industry Specific Custom Layouts & Styling',
      'Specialized Credentials, Certifications & Licenses Display',
      'Advanced Professional Portfolio & Case Studies',
      'Executive Summary & Consultation Booking',
      'Direct WhatsApp, One-Tap Call & Email Action'
    ],
    supportedAddonKeys: ['gallery', 'docsbuilder', 'nfccard', 'appointmentbooking']
  },
  {
    name: 'Entrepreneurials',
    displayName: 'DI - Entrepreneurials',
    category: 'entrepreneurials',
    categoryGroup: 'business',
    badge: null,
    description: 'Entrepreneurs showcasing business details, products, services & direct contact',
    monthlyPrice: 1800,
    yearlyPrice: 15000,
    features: [
      'Everything in Professional Pro plan, plus:',
      'Comprehensive Business & Role Showcase',
      'Business Details (Company, Designation, Role, Services)',
      'Location, Address, Contact No, Email ID, Website Hub',
      'Dedicated Social Media Hub & Direct Action CTA'
    ],
    supportedAddonKeys: ['gallery', 'docsbuilder', 'profilebuilder', 'nfccard']
  },
  {
    name: 'EntrepreneurialsMulti',
    displayName: 'DI - Multi-Activities',
    category: 'entrepreneurialsmulti',
    categoryGroup: 'business',
    badge: 'Multi-Venture',
    description: 'Multi-venture founders showcasing multiple companies, expertise & booking',
    monthlyPrice: 2200,
    yearlyPrice: 18000,
    features: [
      'Everything in Entrepreneurials plan, plus:',
      'Multi-Venture & Multi-Brand Showcase (My Ventures +)',
      'Competencies & Expertise Hub (My Expertise +)',
      'Projects & Dynamic Portfolio (My Projects +)',
      'My Services + & My Products + Central Hub',
      'Direct "WhatsApp Me" & "Book Me Direct" Action Triggers'
    ],
    supportedAddonKeys: ['gallery', 'docsbuilder', 'nfccard']
  },
  {
    name: 'CorporateBusiness',
    displayName: 'DI - Business',
    category: 'corporatebusiness',
    categoryGroup: 'business',
    badge: 'Enterprise',
    description: 'Corporate business presence with multi-location branches & team directory',
    monthlyPrice: 2500,
    yearlyPrice: 22000,
    features: [
      'Everything in Multi-Activities plan, plus:',
      'Corporate Identity (Logo, Brand Name, Tag line & Intro)',
      'About Business (Overview, Products, Services, Docs Upload)',
      'Multiple Branch Locations & Google Maps Directory',
      'Multiple Contact Persons, Roles & Designations',
      'Corporate Social Media Hub & Direct Inquiry Funnel'
    ],
    supportedAddonKeys: ['gallery', 'docsbuilder', 'nfccard']
  },
  {
    name: 'Team',
    displayName: 'DI - Team',
    category: 'team',
    categoryGroup: 'business',
    badge: 'Multi-User',
    description: 'Centralized team organization with sub-cards, brand control & team management',
    monthlyPrice: 2800,
    yearlyPrice: 24000,
    features: [
      'Everything in Corporate Business plan, plus:',
      'Multi-Member Team Directory & Organization Hierarchy',
      'Unified Corporate Branding & Theme Control',
      'Individual Team Member Cards with Dedicated URLs',
      'Central Admin Dashboard & Permission Controls',
      'Centralized Lead Capture & Shared Analytics',
      'Bulk Contact Sharing & Corporate QR Codes'
    ],
    supportedAddonKeys: ['gallery', 'docsbuilder', 'nfccard', 'analytics', 'leadmanagement']
  },
  {
    name: 'MiniWebsite',
    displayName: 'DP - Mini Website',
    category: 'miniwebsite',
    categoryGroup: 'business',
    badge: 'Complete Suite',
    description: 'Full-featured digital mini website with interactive catalogs, maps & lead capture',
    monthlyPrice: 3000,
    yearlyPrice: 27000,
    features: [
      'Everything in Team plan, plus:',
      'Full-Featured Digital Mini Website & Landing Presence',
      'Interactive Products & Services Catalog Showcase',
      'Built-in Photo Gallery & Video Streams',
      'Digital Brochures & Document PDF Downloads',
      'Client Testimonials, Google Ratings & Operating Hours',
      'Lead Generation & Interactive Inquiry Webform',
      'Custom Domain/URL & Performance Analytics'
    ],
    supportedAddonKeys: ['gallery', 'docsbuilder', 'nfccard', 'appointmentbooking']
  }
];

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState('yearly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('manage'); // 'manage' | 'plans'
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Selected add-ons per plan: { [planName]: { [addonKey]: boolean } }
  // Not selected by default!
  const [selectedAddonsMap, setSelectedAddonsMap] = useState({});

  // Toggle an add-on
  const toggleAddon = (planName, addonKey) => {
    setSelectedAddonsMap((prev) => {
      const planAddons = prev[planName] || {};
      return {
        ...prev,
        [planName]: {
          ...planAddons,
          [addonKey]: !planAddons[addonKey]
        }
      };
    });
  };

  // Calculate add-on total price for a given plan
  const getPlanAddonTotal = (plan) => {
    const activeForPlan = selectedAddonsMap[plan.name] || {};
    let total = 0;
    Object.keys(activeForPlan).forEach((key) => {
      if (activeForPlan[key]) {
        const addon = getAddonInfo(key) || ADDON_CATALOG[key];
        if (addon) {
          total += billingCycle === 'yearly' ? addon.yearlyPrice : addon.monthlyPrice;
        }
      }
    });
    return total;
  };

  // Get active add-on keys array
  const getActiveAddonKeys = (planName) => {
    const activeForPlan = selectedAddonsMap[planName] || {};
    return Object.keys(activeForPlan).filter((k) => activeForPlan[k]);
  };

  // Load Razorpay script
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Fetch plans on billing cycle change
  useEffect(() => {
    loadInitialData();
  }, [billingCycle]);

  // Filter plans when category or plans change
  useEffect(() => {
    filterPlans();
  }, [selectedCategory, plans]);

  const loadInitialData = async () => {
    try {
      setLoading(true);

      let apiPlans = [];
      try {
        const plansRes = await fetch(`${PLAN_URL}/?duration=${billingCycle}`, {
          credentials: 'include'
        });
        if (plansRes.ok) {
          apiPlans = await plansRes.json();
        }
      } catch (e) {
        console.warn('API error, using built-in master plans catalog');
      }

      // Merge master 10 plans with any MongoDB records (always renders all 10 plans!)
      const mergedPlans = ALL_IMAGE_PLANS.map((staticPlan, idx) => {
        const matchedApi = Array.isArray(apiPlans)
          ? apiPlans.find((ap) => (ap.name || '').toLowerCase() === staticPlan.name.toLowerCase())
          : null;

        const basePrice = billingCycle === 'yearly' ? staticPlan.yearlyPrice : staticPlan.monthlyPrice;

        // Resolve add-ons: preserve all static plan addons, plus any custom ones from API
        const apiAddonKeys = (matchedApi?.availableAddons && matchedApi.availableAddons.length > 0)
          ? matchedApi.availableAddons.map(a => getAddonInfo(a)?.key || a)
          : [];

        const combinedAddons = Array.from(new Set([
          ...(staticPlan.supportedAddonKeys || []),
          ...apiAddonKeys
        ]));

        return {
          _id: matchedApi?._id || `plan_${staticPlan.name}_${billingCycle}_${idx}`,
          name: staticPlan.name,
          displayName: matchedApi?.displayName || staticPlan.displayName,
          category: matchedApi?.category || staticPlan.category,
          categoryGroup: matchedApi?.categoryGroup || staticPlan.categoryGroup,
          badge: staticPlan.badge,
          duration: billingCycle,
          durationDays: billingCycle === 'yearly' ? 365 : 30,
          price: matchedApi?.price || basePrice,
          monthlyPrice: staticPlan.monthlyPrice,
          yearlyPrice: staticPlan.yearlyPrice,
          features: (matchedApi?.features && matchedApi.features.length > 0) ? matchedApi.features : staticPlan.features,
          supportedAddonKeys: combinedAddons
        };
      });

      // Include any additional dynamic plans from API that aren't in the static 10
      if (Array.isArray(apiPlans)) {
        apiPlans.forEach((ap, idx) => {
          const alreadyIncluded = mergedPlans.some(p => p.name.toLowerCase() === (ap.name || '').toLowerCase());
          if (!alreadyIncluded && ap.name) {
            const dynamicAddons = (ap.availableAddons || []).map(a => getAddonInfo(a)?.key || a);
            mergedPlans.push({
              _id: ap._id || `plan_api_${idx}`,
              name: ap.name,
              displayName: ap.displayName || ap.name,
              category: ap.category || 'individual',
              categoryGroup: ap.categoryGroup || 'individual',
              badge: ap.badge || null,
              duration: ap.duration || billingCycle,
              durationDays: ap.durationDays || (billingCycle === 'yearly' ? 365 : 30),
              price: ap.price || ap.monthlyPrice || 1000,
              monthlyPrice: ap.monthlyPrice || ap.price || 1000,
              yearlyPrice: ap.yearlyPrice || (ap.price ? ap.price * 9 : 9000),
              features: ap.features || [],
              supportedAddonKeys: dynamicAddons
            });
          }
        });
      }

      setPlans(mergedPlans);
      setFilteredPlans(mergedPlans);
      await checkUserSubscription();
    } catch (err) {
      console.error('Error loading plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterPlans = () => {
    if (selectedCategory === 'all') {
      setFilteredPlans(plans);
    } else {
      const filtered = plans.filter((plan) => {
        const cat = (plan.category || '').toLowerCase();
        const catGroup = (plan.categoryGroup || '').toLowerCase();
        const filterVal = selectedCategory.toLowerCase();
        return cat === filterVal || catGroup === filterVal || cat.includes(filterVal);
      });
      setFilteredPlans(filtered);
    }
  };

  // Pre-populate active add-ons from localStorage if available
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem('selected_plan') || 'Business';
      const storedAddons = localStorage.getItem('selected_addons');
      if (storedAddons) {
        const parsed = JSON.parse(storedAddons);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSelectedAddonsMap((prev) => {
            const current = { ...(prev[storedPlan] || {}) };
            parsed.forEach((raw) => {
              const info = getAddonInfo(raw);
              const canonical = info ? info.key : String(raw).toLowerCase().trim();
              current[canonical] = true;
            });
            return {
              ...prev,
              [storedPlan]: current
            };
          });
        }
      }
    } catch (e) {
      console.warn("Could not parse initial addons from localStorage", e);
    }
  }, []);

  const checkUserSubscription = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${CHECK_URL}/status`, {
        headers,
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.hasSubscription) {
          const sub = data.data;
          setActiveSubscription(sub);

          const planKey = sub.planType || sub.planName || 'Business';
          const purchased = Array.isArray(sub.purchasedAddons) ? sub.purchasedAddons : [];

          if (purchased.length > 0) {
            setSelectedAddonsMap((prev) => {
              const current = { ...(prev[planKey] || {}) };
              purchased.forEach((raw) => {
                const info = getAddonInfo(raw);
                const canonical = info ? info.key : String(raw).toLowerCase().trim();
                current[canonical] = true;
              });
              return {
                ...prev,
                [planKey]: current
              };
            });
          }
        } else {
          setActiveSubscription(null);
        }
      }
    } catch (err) {
      console.error('Subscription check error:', err);
    }
  };

  const fetchSubscriptionHistory = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const userId = localStorage.getItem('user_id') || '';
      const email = localStorage.getItem('user_email') || '';
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${CHECK_URL}/history?userId=${encodeURIComponent(userId)}&email=${encodeURIComponent(email)}`, {
        headers,
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.subscriptions)) {
          setSubscriptionHistory(data.subscriptions);
        }
      }
    } catch (err) {
      console.warn('Subscription history error:', err);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([checkUserSubscription(), fetchSubscriptionHistory()]);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  useEffect(() => {
    fetchSubscriptionHistory();
  }, []);

  const PLAN_TIER_ORDER = [
    'personal',
    'business',
    'businesspremium',
    'professionals',
    'professionalpro',
    'entrepreneurials',
    'entrepreneurialsmulti',
    'corporatebusiness',
    'team',
    'miniwebsite'
  ];

  const normalizePlanKey = (raw = '') => {
    if (!raw) return 'personal';
    const cleaned = String(raw).replace(/[\s\-_]/g, '').toLowerCase();
    if (cleaned.includes('miniwebsite') || cleaned.includes('website')) return 'miniwebsite';
    if (cleaned.includes('team')) return 'team';
    if (cleaned.includes('corporate')) return 'corporatebusiness';
    if (cleaned.includes('multi')) return 'entrepreneurialsmulti';
    if (cleaned.includes('entrepreneur')) return 'entrepreneurials';
    if (cleaned.includes('professionalpro')) return 'professionalpro';
    if (cleaned.includes('working')) return 'business';
    if (cleaned.includes('professional')) return 'professionals';
    if (cleaned.includes('service') || cleaned.includes('premium')) return 'businesspremium';
    if (cleaned.includes('business')) return 'business';
    if (cleaned.includes('personal') || cleaned.includes('individual')) return 'personal';
    return 'personal';
  };

  const getPlanTierComparison = (plan) => {
    if (!activeSubscription) return 'subscribe';
    const currentKey = normalizePlanKey(activeSubscription.planName || activeSubscription.planDisplayName || activeSubscription.planType);
    const cardKey = normalizePlanKey(plan.name || plan.displayName);
    if (currentKey === cardKey) return 'current';
    const currentIdx = PLAN_TIER_ORDER.indexOf(currentKey);
    const cardIdx = PLAN_TIER_ORDER.indexOf(cardKey);
    if (cardIdx > currentIdx) return 'upgrade';
    return 'downgrade';
  };

  const isSubExpired = Boolean(
    activeSubscription && (
      activeSubscription.status === 'expired' ||
      activeSubscription.isExpired ||
      (activeSubscription.daysLeft !== undefined && activeSubscription.daysLeft <= 0)
    )
  );

  const isSubTrial = Boolean(
    activeSubscription &&
    (activeSubscription.isTrial || activeSubscription.paymentStatus === 'free_trial') &&
    activeSubscription.paymentStatus !== 'success' &&
    activeSubscription.paymentStatus !== 'paid'
  );

  const isTrialExpired = isSubTrial && isSubExpired;
  const isPaidExpired = !isSubTrial && isSubExpired && activeSubscription;
  const isPaidActive = Boolean(activeSubscription && !isSubTrial && !isSubExpired && activeSubscription.status === 'active');
  const isTrialActive = Boolean(activeSubscription && isSubTrial && !isSubExpired);

  const generatePDFInvoice = (sub, invoiceRef = null) => {
    try {
      const doc = new jsPDF();
      const userEmail = localStorage.getItem('user_email') || sub?.email || 'customer@digicard.com';
      const userName = localStorage.getItem('user_name') || userEmail.split('@')[0];
      const invNum = invoiceRef || sub?.razorpayOrderId || sub?.paymentId || `INV-${Date.now().toString().slice(-8)}`;
      const invDate = sub?.startDate ? new Date(sub.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString('en-IN');
      const planName = sub?.planDisplayName || sub?.planName || sub?.planType || 'Digital Identity Plan';
      const durationCycle = (sub?.duration || sub?.billingCycle || 'monthly').toUpperCase();
      const amountPaid = sub?.amountPaid !== undefined ? sub.amountPaid : (sub?.price || (sub?.isTrial ? 0 : 500));

      // Brand Blue Banner Header
      doc.setFillColor(37, 99, 235);
      doc.rect(0, 0, 210, 18, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text("DIGICARD SERVICES • OFFICIAL TAX INVOICE & RECEIPT", 14, 12);

      // Main Title
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(22);
      doc.text("Payment Receipt", 14, 34);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated on ${new Date().toLocaleString('en-IN')}`, 14, 40);

      // Invoice metadata card
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, 46, 182, 32, 3, 3, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text("INVOICE NUMBER", 20, 56);
      doc.text("BILLING DATE", 75, 56);
      doc.text("PAYMENT STATUS", 130, 56);

      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(String(invNum), 20, 64);
      doc.text(invDate, 75, 64);

      if (sub?.isTrial && sub?.paymentStatus !== 'success') {
        doc.setTextColor(217, 119, 6);
        doc.text("TRIAL LICENSE", 130, 64);
      } else {
        doc.setTextColor(16, 185, 129);
        doc.text("PAID & VERIFIED", 130, 64);
      }

      // Customer info
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("Billed To:", 14, 90);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      doc.text(`Customer: ${userName}`, 14, 97);
      doc.text(`Email: ${userEmail}`, 14, 103);
      if (sub?.paymentId) {
        doc.text(`Transaction Reference: ${sub.paymentId}`, 14, 109);
      }

      // Items Table
      const tableRows = [
        [
          `Subscription: ${planName} (${durationCycle})`,
          "1",
          `INR ${Number(amountPaid).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          `INR ${Number(amountPaid).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
        ]
      ];

      if (Array.isArray(sub?.purchasedAddons) && sub.purchasedAddons.length > 0) {
        sub.purchasedAddons.forEach((addonKey) => {
          const info = getAddonInfo(addonKey);
          tableRows.push([
            `Add-on Feature: ${info?.name || addonKey}`,
            "1",
            "Included",
            "Included"
          ]);
        });
      }

      doc.autoTable({
        startY: 118,
        head: [['Description', 'Qty', 'Unit Price', 'Total']],
        body: tableRows,
        theme: 'striped',
        headStyles: {
          fillColor: [37, 99, 235],
          textColor: 255,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 9,
          cellPadding: 4
        },
        columnStyles: {
          0: { cellWidth: 100 },
          1: { cellWidth: 20, halign: 'center' },
          2: { cellWidth: 32, halign: 'right' },
          3: { cellWidth: 30, halign: 'right' }
        }
      });

      const finalY = doc.lastAutoTable.finalY + 10;

      // Summary Box
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("Total Paid:", 135, finalY);
      doc.setTextColor(37, 99, 235);
      doc.text(`INR ${Number(amountPaid).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 165, finalY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text("Includes applicable GST and platform service charges.", 14, finalY + 12);
      doc.text("This is an electronically generated receipt and does not require a physical signature.", 14, finalY + 18);

      doc.save(`DigiCard_Invoice_${invNum}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Could not generate invoice. Please try again.");
    }
  };

  // Unified Subscription Handler: calculates total (base + addons), processes payment, and enables unlocked features
  const handleSubscribeNow = async (plan) => {
    const selectedAddons = getActiveAddonKeys(plan.name);
    const addonTotal = getPlanAddonTotal(plan);
    const finalPrice = plan.price + addonTotal;

    const userEmail = localStorage.getItem('user_email') || '';
    const token = localStorage.getItem('token') || '';

    // Persist active plan and add-on selections in localStorage
    localStorage.setItem('selected_plan', plan.name);
    localStorage.setItem('selected_addons', JSON.stringify(selectedAddons));
    localStorage.setItem('selected_plan_price', finalPrice);
    localStorage.setItem('billing_cycle', billingCycle);

    // Sync selected plan with backend immediately so dashboard reflects it
    try {
      const storedUserId = localStorage.getItem('user_id');
      await fetch(`${CHECK_URL}/update-user-plan`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          userId: storedUserId,
          email: userEmail,
          planName: plan.name,
          planCategory: plan.category || plan.categoryGroup,
          billingCycle,
          price: finalPrice,
          selectedAddons
        })
      });
    } catch (e) {
      console.warn("Plan sync notice:", e);
    }

    // If Razorpay gateway is present and configured, initiate payment
    if (window.Razorpay && RAZORPAY_KEY_ID) {
      setIsProcessing(true);
      try {
        let orderResponse = await fetch(`${PAYMENT_URL}/create-subscription-order`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            planId: plan._id,
            planName: plan.name,
            billingCycle,
            amount: finalPrice,
            selectedAddons
          })
        });

        // Fallback for unauthenticated users or endpoint errors
        if (!orderResponse.ok) {
          orderResponse = await fetch(`${PAYMENT_URL}/create-order`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: finalPrice,
              planId: plan._id,
              planName: plan.name,
              selectedAddons,
              billingCycle
            })
          });
        }

        if (orderResponse.ok) {
          const orderData = await orderResponse.json();
          const orderInfo = orderData.data || orderData.order;

          if (orderData.success && orderInfo) {
            const options = {
              key: RAZORPAY_KEY_ID,
              amount: orderInfo.amount,
              currency: orderInfo.currency || 'INR',
              name: 'DigiCard Services',
              description: `${plan.displayName} (${billingCycle}) + ${selectedAddons.length} Add-on(s)`,
              order_id: orderInfo.orderId || orderInfo.id,
              prefill: { email: userEmail },
              handler: async function (response) {
                try {
                  const verifyRes = await fetch(`${PAYMENT_URL}/verify-and-activate`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify({
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                      planId: plan._id,
                      planName: plan.name,
                      duration: plan.duration || billingCycle,
                      amountPaid: finalPrice,
                      selectedAddons
                    })
                  });

                  const verifyData = await verifyRes.json();
                  if (verifyData.success) {
                    alert('🎉 Subscription activated successfully! Customize your card with all unlocked features.');
                  }
                } catch (e) {
                  console.warn("Verification notice:", e);
                } finally {
                  setIsProcessing(false);
                  navigate('/card-dashbord', {
                    state: {
                      selectedPlan: plan.name,
                      selectedAddons,
                      addonsObject: selectedAddonsMap[plan.name] || {},
                      billingCycle,
                      totalPrice: finalPrice,
                      userEmail
                    }
                  });
                }
              },
              theme: { color: '#2563EB' },
              modal: {
                ondismiss: function () {
                  setIsProcessing(false);
                }
              }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
            return;
          }
        }
      } catch (err) {
        console.error('Subscription error:', err);
      } finally {
        setIsProcessing(false);
      }
    }

    // Direct transition to dashboard with plan & active add-ons enabled
    navigate('/card-dashbord', {
      state: {
        selectedPlan: plan.name,
        selectedAddons,
        addonsObject: selectedAddonsMap[plan.name] || {},
        totalPrice: finalPrice,
        billingCycle,
        userEmail
      }
    });
  };

  const getCategoryTheme = (plan) => {
    const key = (plan.name || '').toLowerCase();

    if (key.includes('personal') || key.includes('individual')) {
      return {
        headerBg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
        border: 'border-blue-200',
        checkColor: 'text-blue-600',
        btnBg: 'bg-blue-600 hover:bg-blue-700'
      };
    }
    if (key.includes('businesspremium') || key.includes('service')) {
      return {
        headerBg: 'bg-gradient-to-r from-amber-500 to-orange-600',
        border: 'border-amber-200',
        checkColor: 'text-amber-600',
        btnBg: 'bg-amber-600 hover:bg-amber-700'
      };
    }
    if (key.includes('professionalpro')) {
      return {
        headerBg: 'bg-gradient-to-r from-cyan-600 to-blue-700',
        border: 'border-cyan-200',
        checkColor: 'text-cyan-600',
        btnBg: 'bg-cyan-600 hover:bg-cyan-700'
      };
    }
    if (key.includes('professional')) {
      return {
        headerBg: 'bg-gradient-to-r from-emerald-600 to-teal-700',
        border: 'border-emerald-200',
        checkColor: 'text-emerald-600',
        btnBg: 'bg-emerald-600 hover:bg-emerald-700'
      };
    }
    if (key.includes('multi')) {
      return {
        headerBg: 'bg-gradient-to-r from-fuchsia-600 to-pink-700',
        border: 'border-fuchsia-200',
        checkColor: 'text-fuchsia-600',
        btnBg: 'bg-fuchsia-600 hover:bg-fuchsia-700'
      };
    }
    if (key.includes('entrepreneurial')) {
      return {
        headerBg: 'bg-gradient-to-r from-violet-600 to-purple-700',
        border: 'border-violet-200',
        checkColor: 'text-violet-600',
        btnBg: 'bg-violet-600 hover:bg-violet-700'
      };
    }
    if (key.includes('team')) {
      return {
        headerBg: 'bg-gradient-to-r from-sky-600 to-blue-700',
        border: 'border-sky-200',
        checkColor: 'text-sky-600',
        btnBg: 'bg-sky-600 hover:bg-sky-700'
      };
    }
    if (key.includes('miniwebsite')) {
      return {
        headerBg: 'bg-gradient-to-r from-rose-600 to-red-700',
        border: 'border-rose-200',
        checkColor: 'text-rose-600',
        btnBg: 'bg-rose-600 hover:bg-rose-700'
      };
    }
    if (key.includes('corporate') || key.includes('business')) {
      return {
        headerBg: 'bg-gradient-to-r from-slate-700 to-indigo-900',
        border: 'border-indigo-200',
        checkColor: 'text-indigo-600',
        btnBg: 'bg-indigo-600 hover:bg-indigo-700'
      };
    }

    return {
      headerBg: 'bg-gradient-to-r from-gray-700 to-gray-900',
      border: 'border-gray-200',
      checkColor: 'text-blue-600',
      btnBg: 'bg-blue-600 hover:bg-blue-700'
    };
  };

  const categories = [
    { id: 'all', label: 'All 10 Plans' },
    { id: 'individual', label: 'Individuals & Pros' },
    { id: 'business', label: 'Business & Ventures' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-base font-medium text-gray-600">Loading plan options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10">
      {/* Sleek card scrollbar CSS */}
      <style>{`
        .custom-card-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-card-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 4px;
        }
        .custom-card-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-card-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Navigation */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => navigate('/card-dashbord')}
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>

          {/* Tab Controller: Manage Subscription vs Compare All Plans */}
          {activeSubscription && (
            <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/60 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('manage')}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === 'manage'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>My Subscription & Billing</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('plans')}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === 'plans'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Explore All Plans</span>
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* ACTIVE SUBSCRIPTION & BILLING AREA (Professional SaaS Portal)             */}
        {/* ========================================================================= */}
        {activeSubscription && activeTab === 'manage' && (
          <div className="mb-12 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in">
            {/* Top Bar with Status & Quick Actions */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 sm:px-8 py-6 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
                  <ShieldCheck className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      {activeSubscription.planDisplayName || activeSubscription.planName || 'Active Digital Identity Plan'}
                    </h2>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold ${
                      isSubExpired
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : isSubTrial
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        isSubExpired
                          ? 'bg-rose-400 animate-ping'
                          : isSubTrial
                            ? 'bg-amber-400'
                            : 'bg-emerald-400 animate-pulse'
                      }`} />
                      {isTrialExpired ? 'Free Trial Expired' : isPaidExpired ? 'Subscription Expired' : isSubTrial ? `Free Trial (${activeSubscription.daysLeft || 0}d left)` : 'Active Paid Plan'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-slate-200 border border-white/15">
                      {activeSubscription.duration === 'yearly' ? 'Billed Annually' : 'Billed Monthly'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                    Official enterprise digital identity license with dynamic QR code generators, instant contact sharing, and active security compliance.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-wrap lg:justify-end">
                {isSubExpired ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab('plans')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Renew Plan Now</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => generatePDFInvoice(activeSubscription)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Tax Invoice (PDF)</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveTab('plans')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-all cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>{isSubExpired ? 'Explore All Plans' : 'Upgrade / Change Plan'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium border border-white/15 transition-all cursor-pointer"
                  title="Refresh subscription status"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Expired Plan Notification Alert Banner */}
            {isSubExpired && (
              <div className="bg-rose-50 border-b border-rose-200 px-6 sm:px-8 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-rose-900 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>
                    {isTrialExpired
                      ? 'Your 7-day free trial has expired. Renew your plan below to restore all digital card features, dynamic QR codes, and public profile sharing.'
                      : 'Your subscription has expired. Please renew your plan below to continue managing and sharing your digital cards.'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('plans')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Renew Plan Below</span>
                </button>
              </div>
            )}

            {/* 4-Column Metric Grid */}
            <div className="p-6 sm:p-8 bg-slate-50/50 border-b border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Metric 1: Cycle & Expiry */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-medium">Billing Cycle</span>
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-base font-bold text-slate-900">
                  {isSubExpired ? (
                    <span className="text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Expired (0 Days Left)
                    </span>
                  ) : (
                    activeSubscription.daysLeft !== undefined ? `${activeSubscription.daysLeft} Days Remaining` : 'Active'
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {isSubExpired ? (
                    <span className="text-rose-500 font-medium">
                      Ended: {activeSubscription.endDate ? new Date(activeSubscription.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recently'}
                    </span>
                  ) : (
                    `Renews: ${activeSubscription.endDate ? new Date(activeSubscription.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Ongoing'}`
                  )}
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full rounded-full ${isSubExpired ? 'bg-rose-500' : 'bg-blue-600'}`}
                    style={{
                      width: isSubExpired ? '100%' : `${Math.min(Math.max(((activeSubscription.daysLeft || 30) / (activeSubscription.duration === 'yearly' ? 365 : 30)) * 100, 5), 100)}%`
                    }}
                  />
                </div>
              </div>

              {/* Metric 2: Amount & Invoicing */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-medium">Subscription Rate</span>
                  <Receipt className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-base font-bold text-slate-900">
                  ₹{Number(activeSubscription.amountPaid || activeSubscription.price || 500).toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-slate-500 ml-1">
                    /{activeSubscription.duration === 'yearly' ? 'year' : 'mo'}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {activeSubscription.isTrial && activeSubscription.paymentStatus !== 'success' ? '7-Day Free Trial' : 'Payment Verified (Success)'}
                </div>
                <div className="text-[10px] text-slate-400 mt-2">
                  Official GST Invoice Ready
                </div>
              </div>

              {/* Metric 3: Digital Cards Quota */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-medium">Digital Card Slots</span>
                  <CreditCard className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-base font-bold text-slate-900">
                  10 Cards Included
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Multi-profile digital identity
                </div>
                <div className="text-[10px] text-purple-700 font-medium mt-2">
                  ✓ Unlimited Scans & Shares
                </div>
              </div>

              {/* Metric 4: Transaction & Reference */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-medium">Payment Reference</span>
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-xs font-mono font-bold text-slate-800 truncate" title={activeSubscription.paymentId || activeSubscription.razorpayOrderId || 'TRIAL-LICENSE'}>
                  {activeSubscription.paymentId || activeSubscription.razorpayOrderId || 'TRIAL-LICENSE'}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Gateway: Razorpay Encrypted
                </div>
                <div className="text-[10px] text-emerald-600 font-medium mt-2 flex items-center gap-1">
                  ✓ 256-bit SSL Protected
                </div>
              </div>
            </div>

            {/* Active Add-ons Strip */}
            {Array.isArray(activeSubscription.purchasedAddons) && activeSubscription.purchasedAddons.length > 0 && (
              <div className="px-6 sm:px-8 py-3.5 bg-purple-50/60 border-b border-purple-100 flex items-center gap-2 flex-wrap text-xs text-purple-900 font-medium">
                <span className="font-bold flex items-center gap-1 text-purple-700">
                  <Sparkles className="w-3.5 h-3.5" />
                  Active Add-ons:
                </span>
                {activeSubscription.purchasedAddons.map((addon) => {
                  const info = getAddonInfo(addon);
                  return (
                    <span key={addon} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white text-purple-800 border border-purple-200 shadow-xs">
                      {info?.name || addon}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Billing & Invoice History Table */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Billing & Tax Invoices
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Download official tax receipts and track previous transactions.
                  </p>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="px-4 py-3">Invoice / Ref</th>
                      <th className="px-4 py-3">Billing Date</th>
                      <th className="px-4 py-3">Plan Description</th>
                      <th className="px-4 py-3">Interval</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {subscriptionHistory.length > 0 ? (
                      subscriptionHistory.map((item, idx) => {
                        const invRef = item.paymentId || item.razorpayOrderId || `INV-${String(item._id).slice(-6)}`;
                        const dateStr = item.startDate ? new Date(item.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent';
                        const amount = item.amountPaid || item.price || 0;
                        const isSuccess = item.paymentStatus === 'success' || item.status === 'active';

                        return (
                          <tr key={item._id || idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-4 py-3 font-mono font-semibold text-slate-800">
                              {invRef}
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {dateStr}
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-900">
                              {item.planName || item.planType || 'Digital Card Plan'}
                              {Array.isArray(item.purchasedAddons) && item.purchasedAddons.length > 0 && (
                                <span className="ml-1 text-[11px] text-purple-600">
                                  (+{item.purchasedAddons.length} Add-on{item.purchasedAddons.length > 1 ? 's' : ''})
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-slate-600 capitalize">
                              {item.duration || 'Monthly'}
                            </td>
                            <td className="px-4 py-3 font-bold text-slate-900">
                              ₹{Number(amount).toLocaleString('en-IN')}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                isSuccess
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {isSuccess ? 'Paid' : 'Trial'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                type="button"
                                onClick={() => generatePDFInvoice(item, invRef)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>PDF</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3 font-mono font-semibold text-slate-800">
                          {activeSubscription.paymentId || activeSubscription.razorpayOrderId || `INV-${Date.now().toString().slice(-6)}`}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {activeSubscription.startDate ? new Date(activeSubscription.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Current Cycle'}
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {activeSubscription.planDisplayName || activeSubscription.planName || 'Digital Card Plan'}
                        </td>
                        <td className="px-4 py-3 text-slate-600 capitalize">
                          {activeSubscription.duration || 'Monthly'}
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900">
                          ₹{Number(activeSubscription.amountPaid || activeSubscription.price || (activeSubscription.isTrial ? 0 : 500)).toLocaleString('en-IN')}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            activeSubscription.isTrial && activeSubscription.paymentStatus !== 'success'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {activeSubscription.isTrial && activeSubscription.paymentStatus !== 'success' ? 'Trial' : 'Paid'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => generatePDFInvoice(activeSubscription)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF</span>
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {activeSubscription && activeTab === 'manage' ? 'Compare Available Tiers' : 'Choose Your Perfect Plan'}
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mt-2 font-normal">
            Select from all 10 specialized digital card tiers. Select any optional add-ons as needed.
          </p>

          {/* Billing Cycle Switch (Monthly / Yearly) */}
          <div className="mt-6 flex items-center justify-center">
            <div className="relative flex items-center bg-gray-200/80 p-1 rounded-xl shadow-inner border border-gray-300/60">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`py-2 px-5 text-xs font-semibold rounded-lg transition-all duration-200 ${billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`py-2 px-5 text-xs font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${billingCycle === 'yearly'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <span>Yearly Billing</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${billingCycle === 'yearly' ? 'bg-white text-blue-700' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                  Save ~25%
                </span>
              </button>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Processing Spinner Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-3 border-blue-600 border-t-transparent mx-auto mb-4"></div>
              <h3 className="text-base font-semibold text-gray-900">Processing Request</h3>
              <p className="text-xs text-gray-500 mt-1">Please wait a moment...</p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PLANS GRID - Fixed Card Height (540px) with Scrollable Content Body */}
        {/* The model size never changes, and inside it is scrollable & selectable! */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredPlans.map((plan) => {
            const theme = getCategoryTheme(plan);
            const addonTotal = getPlanAddonTotal(plan);
            const activeAddonKeys = getActiveAddonKeys(plan.name);
            const totalPrice = plan.price + addonTotal;
            const tierComp = getPlanTierComparison(plan);
            const isCurrent = tierComp === 'current';

            // Distinct border styling based on subscription health
            const cardBorderClass = isCurrent
              ? isTrialExpired || isPaidExpired
                ? 'border-2 border-rose-500 ring-4 ring-rose-500/20 shadow-lg'
                : isTrialActive
                  ? 'border-2 border-amber-500 ring-4 ring-amber-500/20 shadow-md'
                  : 'border-2 border-emerald-500 ring-4 ring-emerald-500/20 shadow-md'
              : `${theme.border} hover:shadow-xl`;

            return (
              <div
                key={plan._id || plan.name}
                className={`relative rounded-xl shadow-md transition-all duration-300 overflow-hidden border ${cardBorderClass} bg-white flex flex-col h-[540px]`}
              >
                {/* Current Plan Status Badge */}
                {isCurrent && (
                  <div className="absolute top-3 left-3 z-10">
                    {isTrialExpired ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 text-white px-2.5 py-0.5 text-[11px] font-bold shadow-md animate-pulse">
                        <AlertCircle className="w-3 h-3" />
                        Trial Expired
                      </span>
                    ) : isPaidExpired ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 text-white px-2.5 py-0.5 text-[11px] font-bold shadow-md">
                        <AlertCircle className="w-3 h-3" />
                        Plan Expired
                      </span>
                    ) : isTrialActive ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 text-white px-2.5 py-0.5 text-[11px] font-bold shadow-md">
                        <Sparkles className="w-3 h-3" />
                        Free Trial ({activeSubscription.daysLeft || 0}d left)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 text-white px-2.5 py-0.5 text-[11px] font-bold shadow-md">
                        <CheckCircle2 className="w-3 h-3" />
                        Active Plan
                      </span>
                    )}
                  </div>
                )}

                {/* Header Badge */}
                {plan.badge && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-bold text-gray-800 shadow-sm">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Card Header (Fixed Top) */}
                <div className={`${theme.headerBg} px-6 py-4 text-white flex-shrink-0`}>
                  <div className="pr-12">
                    <h3 className="text-lg font-bold tracking-tight">
                      {plan.displayName}
                    </h3>
                    <p className="text-xs text-white/85 mt-0.5 font-normal truncate">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mt-3 flex items-baseline">
                    <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
                      ₹{totalPrice?.toLocaleString()}
                    </span>
                    <span className="text-xs font-medium text-white/80 ml-2">
                      {billingCycle === 'yearly' ? '/ year' : '/ month'}
                    </span>
                  </div>

                  {/* Addon / Monthly Breakdown tag */}
                  {addonTotal > 0 ? (
                    <div className="mt-1 text-[11px] text-emerald-200 font-medium">
                      Base: ₹{plan.price} + Add-ons: ₹{addonTotal}
                    </div>
                  ) : (
                    billingCycle === 'yearly' && (
                      <div className="mt-1 text-[11px] text-emerald-200 font-medium">
                        ≈ ₹{Math.round(plan.price / 12)}/mo billed annually
                      </div>
                    )
                  )}
                </div>

                {/* Card Body - SCROLLABLE CONTENT (Features + Selectable Addons) */}
                <div className="px-6 py-4 flex-1 overflow-y-auto custom-card-scrollbar">

                  {/* Features List */}
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                    Features Included:
                  </h4>

                  <ul className="space-y-1.5 mb-4">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs text-gray-700">
                        <svg
                          className={`h-3.5 w-3.5 flex-shrink-0 mr-2 mt-0.5 ${theme.checkColor}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Optional Selectable Add-ons Section */}
                  {plan.supportedAddonKeys && plan.supportedAddonKeys.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-xs font-bold text-gray-800">
                          Select Add-ons (Optional):
                        </h5>
                        {activeAddonKeys.length > 0 && (
                          <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-1.5 py-0.5 rounded">
                            {activeAddonKeys.length} selected
                          </span>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        {plan.supportedAddonKeys.map((rawKey) => {
                          const addon = getAddonInfo(rawKey) || ADDON_CATALOG[rawKey];
                          if (!addon) return null;
                          const addonKey = addon.key;
                          const isChecked = !!(selectedAddonsMap[plan.name]?.[addonKey]);
                          const costLabel = addon.isOneTime
                            ? `+₹${addon.monthlyPrice} one-time`
                            : billingCycle === 'yearly'
                              ? `+₹${addon.yearlyPrice}/yr`
                              : `+₹${addon.monthlyPrice}/mo`;

                          return (
                            <label
                              key={addonKey}
                              className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-all ${isChecked
                                  ? 'bg-blue-50/80 border-blue-300 text-blue-900 font-medium'
                                  : 'bg-gray-50/60 border-gray-200 text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleAddon(plan.name, addonKey)}
                                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 cursor-pointer"
                                />
                                <span>{addon.name}</span>
                              </div>
                              <span className={`text-[11px] font-semibold ${isChecked ? 'text-blue-700' : 'text-gray-500'}`}>
                                {costLabel}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>

                {/* Card Footer (Fixed Bottom) */}
                <div className="px-6 py-3 flex-shrink-0 border-t border-gray-100 bg-white space-y-1.5">
                  {isCurrent ? (
                    isTrialExpired ? (
                      <button
                        type="button"
                        onClick={() => handleSubscribeNow(plan)}
                        disabled={isProcessing}
                        className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white transition-all shadow-md bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>
                          Renew Plan • ₹{totalPrice?.toLocaleString()}
                          {activeAddonKeys.length > 0 ? ` (+${activeAddonKeys.length})` : ''}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : isPaidExpired ? (
                      <button
                        type="button"
                        onClick={() => handleSubscribeNow(plan)}
                        disabled={isProcessing}
                        className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white transition-all shadow-md bg-rose-600 hover:bg-rose-500 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>
                          Renew Subscription • ₹{totalPrice?.toLocaleString()}
                          {activeAddonKeys.length > 0 ? ` (+${activeAddonKeys.length})` : ''}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : isTrialActive ? (
                      <button
                        type="button"
                        onClick={() => handleSubscribeNow(plan)}
                        disabled={isProcessing}
                        className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white transition-all shadow-sm ${theme.btnBg} hover:shadow-md disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>
                          Activate Full Plan • ₹{totalPrice?.toLocaleString()}
                          {activeAddonKeys.length > 0 ? ` (+${activeAddonKeys.length})` : ''}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="w-full py-2.5 px-4 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center gap-1.5 cursor-default shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Current Active Plan</span>
                      </button>
                    )
                  ) : tierComp === 'upgrade' ? (
                    <button
                      type="button"
                      onClick={() => handleSubscribeNow(plan)}
                      disabled={isProcessing}
                      className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white transition-all shadow-sm ${theme.btnBg} hover:shadow-md disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer`}
                    >
                      <span>
                        Upgrade to {plan.displayName} • ₹{totalPrice?.toLocaleString()}
                        {activeAddonKeys.length > 0 ? ` (+${activeAddonKeys.length})` : ''}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : tierComp === 'downgrade' ? (
                    <button
                      type="button"
                      onClick={() => handleSubscribeNow(plan)}
                      disabled={isProcessing}
                      className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white transition-all shadow-sm ${theme.btnBg} hover:shadow-md disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer opacity-90`}
                    >
                      <span>
                        Switch to {plan.displayName} • ₹{totalPrice?.toLocaleString()}
                        {activeAddonKeys.length > 0 ? ` (+${activeAddonKeys.length})` : ''}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSubscribeNow(plan)}
                      disabled={isProcessing}
                      className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white transition-all shadow-sm ${theme.btnBg} hover:shadow-md disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer`}
                    >
                      <span>
                        Subscribe Now • ₹{totalPrice?.toLocaleString()}
                        {activeAddonKeys.length > 0 ? ` (+${activeAddonKeys.length} Add-on${activeAddonKeys.length > 1 ? 's' : ''})` : ''}
                      </span>
                      <span>→</span>
                    </button>
                  )}

                  <p className="text-center text-[10px]">
                    {isCurrent && isTrialExpired ? (
                      <span className="text-rose-600 font-semibold">Free trial ended • Renew now to reactivate cards</span>
                    ) : isCurrent && isPaidExpired ? (
                      <span className="text-rose-600 font-semibold">Subscription expired • Click to renew</span>
                    ) : isCurrent && isTrialActive ? (
                      <span className="text-amber-600 font-medium">In free trial • Upgrade to full access anytime</span>
                    ) : isCurrent && isPaidActive ? (
                      <span className="text-emerald-700 font-medium">{billingCycle === 'yearly' ? '365 days access • Renews annually' : '30 days access • Renews monthly'}</span>
                    ) : (
                      <span className="text-gray-400">{billingCycle === 'yearly' ? '365 days access • Renews annually' : '30 days access • Renews monthly'}</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPlans.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-800">No plans found</h3>
            <p className="text-xs text-gray-500 mt-1">Please try choosing another category filter</p>
          </div>
        )}

        {/* Trust Badges Footer */}
        <div className="mt-14 pt-8 border-t border-gray-200 max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
            <div>
              <p className="font-bold text-gray-800">✓ Instant Activation</p>
              <p className="text-[11px] text-gray-500">Live within seconds</p>
            </div>
            <div>
              <p className="font-bold text-gray-800">🔄 Flexible Customization</p>
              <p className="text-[11px] text-gray-500">Add or remove add-ons anytime</p>
            </div>
            <div>
              <p className="font-bold text-gray-800">🔒 Secure Payments</p>
              <p className="text-[11px] text-gray-500">Encrypted Razorpay gateway</p>
            </div>
            <div>
              <p className="font-bold text-gray-800">❌ Cancel Anytime</p>
              <p className="text-[11px] text-gray-500">No long-term contracts</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionPlans;