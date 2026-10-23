import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Lock, 
  User, 
  Building, 
  Gem, 
  Briefcase, 
  Award, 
  Rocket, 
  Layers, 
  ShieldCheck, 
  Users, 
  Globe 
} from "lucide-react";
import { useEffect, useState } from "react";
import { CHECK_URL } from "../../../utility/constants";

interface SubscriptionBannerProps {
  subscriptionData: {
    hasSubscription: boolean;
    status: "active" | "expired" | "inactive" | "pending" | "error";
    daysLeft: number;
    startDate: string | null;
    endDate: string | null;
    planType?: string;
    planName?: string;
    price?: string;
    purchasedAddons?: string[];
  } | null;
  remainingDays: number;
  cardsUsed: number;
  userCards?: any[];
  onUpgrade: () => void;
}

interface PlanDetail {
  name: string;
  description: string;
  features: string[];
  icon: any;
  color: string;
  price?: string;
}

export type PlanDetails = {
  free: PlanDetail;
  Personal: PlanDetail & { price: string };
  Business: PlanDetail & { price: string };
  BusinessPremium: PlanDetail & { price: string };
  Professionals: PlanDetail & { price: string };
  ProfessionalPro: PlanDetail & { price: string };
  Entrepreneurials: PlanDetail & { price: string };
  EntrepreneurialsMulti: PlanDetail & { price: string };
  CorporateBusiness: PlanDetail & { price: string };
  Team: PlanDetail & { price: string };
  MiniWebsite: PlanDetail & { price: string };
};

// Default plan details for all 10 plans
const defaultPlanDetails: PlanDetails = {
  free: {
    name: "Free Trial",
    description: "You're on a free trial. Upgrade to continue after trial ends.",
    features: ["Digital Card Preview", "Instant Contact Share"],
    icon: Sparkles,
    color: "from-orange-500 to-amber-500",
  },
  Personal: {
    name: "DI - Individuals",
    price: "₹500/mo",
    description: "Essential digital identity for individuals, freelancers & consultants.",
    features: ["Dynamic QR Code", "Social Links Hub", "Location & Maps"],
    icon: User,
    color: "from-blue-500 to-cyan-500",
  },
  Business: {
    name: "DI - Working Professionals",
    price: "₹800/mo",
    description: "Professional role presence with company employment details & showcase.",
    features: ["Company Employment Details", "Portfolio & Gallery", "Business Hours"],
    icon: Building,
    color: "from-indigo-500 to-blue-600",
  },
  BusinessPremium: {
    name: "DI - Service Providers",
    price: "₹1,200/mo",
    description: "Dedicated profile for service providers with service areas & customer inquiries.",
    features: ["Service Areas & Hours", "Customer Inquiries Funnel", "Direct Action CTA"],
    icon: Gem,
    color: "from-amber-500 to-yellow-600",
  },
  Professionals: {
    name: "DI - Professionals",
    price: "₹1,500/mo",
    description: "Comprehensive executive profile with credentials & rich add-on suite.",
    features: ["Executive Certifications", "Advanced Portfolio Link", "Full Add-on Suite"],
    icon: Briefcase,
    color: "from-purple-600 to-indigo-600",
  },
  ProfessionalPro: {
    name: "DI - Professional Pro",
    price: "₹1,800/mo",
    description: "Industry specific customized profiles for certified specialists & consultants.",
    features: ["Specialized Licenses", "Case Studies", "Consultation Booking"],
    icon: Award,
    color: "from-fuchsia-600 to-pink-600",
  },
  Entrepreneurials: {
    name: "DI - Entrepreneurials",
    price: "₹1,800/mo",
    description: "Entrepreneurs showcasing business details, products, services & direct contact.",
    features: ["Role & Business Showcase", "Services Hub", "Social Media Central"],
    icon: Rocket,
    color: "from-emerald-600 to-teal-600",
  },
  EntrepreneurialsMulti: {
    name: "DI - Multi-Activities",
    price: "₹2,200/mo",
    description: "Multi-venture founders showcasing multiple companies, expertise & booking.",
    features: ["Multi-Brand Ventures Hub", "Dynamic Projects Portfolio", "Direct WhatsApp & Booking"],
    icon: Layers,
    color: "from-teal-600 to-cyan-700",
  },
  CorporateBusiness: {
    name: "DI - Business",
    price: "₹2,500/mo",
    description: "Corporate business presence with multi-location branches & team directory.",
    features: ["Corporate Identity & Branches", "Multiple Contact Persons", "Direct Inquiry Funnel"],
    icon: ShieldCheck,
    color: "from-blue-700 to-indigo-800",
  },
  Team: {
    name: "DI - Team",
    price: "₹2,800/mo",
    description: "Centralized team organization with sub-cards, brand control & team management.",
    features: ["Team Directory Hierarchy", "Shared Corporate Branding", "Central Admin Dashboard"],
    icon: Users,
    color: "from-violet-700 to-purple-800",
  },
  MiniWebsite: {
    name: "DP - Mini Website",
    price: "₹3,000/mo",
    description: "Full-featured digital mini website with interactive catalogs, maps & lead capture.",
    features: ["Mini Website Landing Page", "Interactive Catalogs & Videos", "Custom Domain Support"],
    icon: Globe,
    color: "from-rose-600 to-red-600",
  },
};

const ADDON_NAMES: Record<string, string> = {
  gallery: "Photo Gallery",
  photogallery: "Photo Gallery",
  docsbuilder: "Docs Builder",
  profilebuilder: "Profile Builder",
  portfoliobuilder: "Portfolio Builder",
  catalogbuilder: "Catalog Builder",
  brochurebuilder: "Brochure Builder",
  nfccard: "NFC Smart Card",
  leadgen: "Lead Generation",
  leadmanagement: "Lead Management",
  appointmentbooking: "Appointment Booking",
  whatsappintegration: "WhatsApp Integration",
  analytics: "Analytics",
  docsmanager: "Docs Manager"
};

export function SubscriptionBanner({
  subscriptionData,
  remainingDays,
  cardsUsed,
  userCards,
  onUpgrade,
}: SubscriptionBannerProps) {
  const [planDetails, setPlanDetails] = useState<PlanDetails>(defaultPlanDetails);
  const [userPlanData, setUserPlanData] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Get userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id") ||
      localStorage.getItem("userId") ||
      localStorage.getItem("id") ||
      localStorage.getItem("_id") ||
      localStorage.getItem("user_email");

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fetch user plan data from API
  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!userId) return;

      try {
        const token = localStorage.getItem("token");
        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${CHECK_URL}/user-plan/${userId}`, {
          method: "GET",
          headers,
          credentials: "include",
        });

        if (!response.ok) return;

        const data = await response.json();

        if (data && data.success && data.plan) {
          setUserPlanData(data);
          const updatedPlanDetails = { ...defaultPlanDetails };
          const planKey = normalizePlanKey(data.plan.name || data.plan.displayName || data.plan.category);
          const price = data.plan.price;
          const duration = data.plan.duration || "mo";

          if (planKey && planKey !== "free" && updatedPlanDetails[planKey]) {
            if (price) {
              updatedPlanDetails[planKey].price = `₹${price}/${duration === "yearly" ? "yr" : "mo"}`;
            }
            if (Array.isArray(data.plan.features) && data.plan.features.length > 0) {
              updatedPlanDetails[planKey].features = data.plan.features;
            }
          }

          setPlanDetails(updatedPlanDetails);
        }
      } catch (err: any) {
        console.warn("Could not fetch user plan from API:", err);
      }
    };

    fetchUserPlan();
  }, [userId]);

  const normalizePlanKey = (raw: string = ""): keyof PlanDetails => {
    if (!raw) return "Personal";
    const cleaned = raw.replace(/[\s\-_]/g, '').toLowerCase();
    if (cleaned === "free") return "free";
    if (cleaned.includes("miniwebsite") || cleaned.includes("website")) return "MiniWebsite";
    if (cleaned.includes("team")) return "Team";
    if (cleaned.includes("corporate")) return "CorporateBusiness";
    if (cleaned.includes("multiactivit") || cleaned.includes("multi")) return "EntrepreneurialsMulti";
    if (cleaned.includes("entrepreneur")) return "Entrepreneurials";
    if (cleaned.includes("professionalpro")) return "ProfessionalPro";
    if (cleaned.includes("workingprofessional") || cleaned.includes("working")) return "Business";
    if (cleaned.includes("professional")) return "Professionals";
    if (cleaned.includes("serviceprovider") || cleaned.includes("businesspremium") || cleaned.includes("premium")) return "BusinessPremium";
    if (cleaned.includes("business")) return "Business";
    if (cleaned.includes("personal") || cleaned.includes("individual")) return "Personal";
    return "Personal";
  };

  const getCurrentPlan = (): keyof PlanDetails => {
    if (subscriptionData?.planType && subscriptionData.planType !== "free") {
      return normalizePlanKey(subscriptionData.planType);
    }
    if (subscriptionData?.planName && subscriptionData.planName !== "free") {
      return normalizePlanKey(subscriptionData.planName);
    }
    const storedSelectedPlan = localStorage.getItem("selected_plan");
    if (storedSelectedPlan && storedSelectedPlan !== "free") {
      return normalizePlanKey(storedSelectedPlan);
    }
    if (userCards && userCards.length > 0) {
      const cardTypes = userCards.map(card => card.cardType).filter(Boolean);
      for (const rank of ["MiniWebsite", "Team", "CorporateBusiness", "EntrepreneurialsMulti", "Entrepreneurials", "ProfessionalPro", "Professionals", "BusinessPremium", "Business", "Personal"]) {
        if (cardTypes.some(type => normalizePlanKey(type) === rank)) {
          return rank as keyof PlanDetails;
        }
      }
    }
    if (subscriptionData?.hasSubscription && subscriptionData?.status === "active") {
      return "Personal";
    }
    if (subscriptionData?.status === "expired") {
      return "free";
    }
    return "Personal";
  };

  const plan = getCurrentPlan();
  const details = planDetails[plan] || defaultPlanDetails[plan] || defaultPlanDetails.Personal;
  const PlanIcon = details?.icon || Sparkles;

  const isSubscriptionExpired = subscriptionData
    ? (subscriptionData.status === "expired" || subscriptionData.daysLeft <= 0)
    : false;

  const isActiveSubscription = subscriptionData
    ? (subscriptionData.status === "active" && subscriptionData.hasSubscription)
    : false;

  const isTrial = !subscriptionData?.endDate && remainingDays > 0;

  const daysProgress = (() => {
    if (subscriptionData?.endDate && subscriptionData?.startDate) {
      const end = new Date(subscriptionData.endDate).getTime();
      const start = new Date(subscriptionData.startDate).getTime();
      const now = Date.now();
      if (end > start) {
        return Math.min(Math.max(((now - start) / (end - start)) * 100, 0), 100);
      }
    }
    if (remainingDays > 0 && remainingDays <= 7) {
      return ((7 - remainingDays) / 7) * 100;
    }
    return 0;
  })();

  const daysDisplay = (() => {
    if (isSubscriptionExpired) return "Expired";
    if (subscriptionData?.daysLeft !== undefined && subscriptionData.daysLeft > 0) {
      return `${subscriptionData.daysLeft} days remaining`;
    }
    if (remainingDays > 0) {
      return `${remainingDays} days remaining`;
    }
    return "Active Subscription";
  })();

  // Extract active add-ons
  let activeAddons: string[] = [];
  if (Array.isArray(subscriptionData?.purchasedAddons) && subscriptionData.purchasedAddons.length > 0) {
    activeAddons = subscriptionData.purchasedAddons;
  } else {
    const stored = localStorage.getItem("selected_addons");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) activeAddons = parsed;
      } catch (e) {}
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 mb-8 border transition-all duration-300 shadow-sm ${
      isSubscriptionExpired
        ? "bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50"
        : "bg-white dark:bg-boxdark border-slate-200 dark:border-strokedark"
    }`}>
      {/* Background Glow */}
      <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-10 bg-gradient-to-br ${details.color}`} />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Plan Icon, Name, and Details */}
        <div className="flex items-start gap-4">
          <div className={`w-13 h-13 rounded-xl bg-gradient-to-br ${details.color} flex items-center justify-center text-white shadow-md shrink-0`}>
            {isSubscriptionExpired ? <Lock className="w-6 h-6" /> : <PlanIcon className="w-6 h-6" />}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {details.name}
              </h3>

              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                isSubscriptionExpired
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                  : isTrial
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
              }`}>
                {isSubscriptionExpired ? "Expired" : isTrial ? "Trial Active" : "Active Plan"}
              </span>

              {details.price && (
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {details.price}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              {details.description}
            </p>

            {/* Features list */}
            {details.features && details.features.length > 0 && (
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                {details.features.map((feat) => (
                  <span key={feat} className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    {feat}
                  </span>
                ))}
              </div>
            )}

            {/* Active Add-ons */}
            {activeAddons.length > 0 && (
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Unlocked Add-ons:
                </span>
                {activeAddons.map((addon) => {
                  const cleaned = String(addon).toLowerCase().replace(/[\s\-_]/g, '');
                  const label = ADDON_NAMES[cleaned] || addon;
                  return (
                    <span 
                      key={addon}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                    >
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      {label}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Progress & Action */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 shrink-0">
          <div className="w-full sm:w-48 text-left lg:text-right">
            <div className="flex items-center justify-between lg:justify-end gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
              <span>{isTrial ? "Trial Status" : "Renewal Cycle"}</span>
              <span className={`font-semibold ${isSubscriptionExpired ? "text-rose-600" : "text-slate-800 dark:text-white"}`}>
                {daysDisplay}
              </span>
            </div>
            
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isSubscriptionExpired ? "bg-rose-500" : "bg-blue-600 dark:bg-blue-500"
                }`}
                style={{ width: `${daysProgress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={onUpgrade}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs md:text-sm shadow-sm transition-all duration-200 cursor-pointer ${
              isSubscriptionExpired
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : "bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            }`}
          >
            <span>{isSubscriptionExpired ? "Renew Subscription" : "Manage & Upgrade Plan"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}