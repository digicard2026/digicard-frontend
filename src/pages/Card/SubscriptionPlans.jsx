import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CHECK_URL, PLAN_URL, PAYMENT_URL } from "../../utility/constants";

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
      fetch(`${CHECK_URL}/update-user-plan`, {
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
      }).catch(e => console.warn("Plan sync notice:", e));
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
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/card-dashbord')}
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>

          {activeSubscription && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Active: {activeSubscription.planName || 'Current Plan'}
            </span>
          )}
        </div>

        {/* Section Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Choose Your Perfect Plan
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

            return (
              <div
                key={plan._id || plan.name}
                className={`relative rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border ${theme.border} bg-white flex flex-col h-[540px]`}
              >
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

                  <p className="text-center text-[10px] text-gray-400">
                    {billingCycle === 'yearly' ? '365 days access • Renews annually' : '30 days access • Renews monthly'}
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