import { Sparkles, ArrowRight, Check, Lock, User, Building, Gem, Briefcase, Award, Rocket, Layers, ShieldCheck, Users, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
    color: "#f97316",
  },
  Personal: {
    name: "DI - Individuals",
    price: "₹500/mo",
    description: "Essential digital identity for individuals, freelancers & consultants.",
    features: ["Dynamic QR Code", "Social Links Hub", "Location & Maps"],
    icon: User,
    color: "#3b82f6",
  },
  Business: {
    name: "DI - Working Professionals",
    price: "₹800/mo",
    description: "Professional role presence with company employment details & showcase.",
    features: ["Company Employment Details", "Portfolio & Gallery", "Business Hours"],
    icon: Building,
    color: "#8b5cf6",
  },
  BusinessPremium: {
    name: "DI - Service Providers",
    price: "₹1,200/mo",
    description: "Dedicated profile for service providers with service areas & customer inquiries.",
    features: ["Service Areas & Hours", "Customer Inquiries Funnel", "Direct Action CTA"],
    icon: Gem,
    color: "#f59e0b",
  },
  Professionals: {
    name: "DI - Professionals",
    price: "₹1,500/mo",
    description: "Comprehensive executive profile with credentials & rich add-on suite.",
    features: ["Executive Certifications", "Advanced Portfolio Link", "Full Add-on Suite"],
    icon: Briefcase,
    color: "#7c3aed",
  },
  ProfessionalPro: {
    name: "DI - Professional Pro",
    price: "₹1,800/mo",
    description: "Industry specific customized profiles for certified specialists & consultants.",
    features: ["Specialized Licenses", "Case Studies", "Consultation Booking"],
    icon: Award,
    color: "#c026d3",
  },
  Entrepreneurials: {
    name: "DI - Entrepreneurials",
    price: "₹1,800/mo",
    description: "Entrepreneurs showcasing business details, products, services & direct contact.",
    features: ["Role & Business Showcase", "Services Hub", "Social Media Central"],
    icon: Rocket,
    color: "#059669",
  },
  EntrepreneurialsMulti: {
    name: "DI - Multi-Activities",
    price: "₹2,200/mo",
    description: "Multi-venture founders showcasing multiple companies, expertise & booking.",
    features: ["Multi-Brand Ventures Hub", "Dynamic Projects Portfolio", "Direct WhatsApp & Booking"],
    icon: Layers,
    color: "#0d9488",
  },
  CorporateBusiness: {
    name: "DI - Business",
    price: "₹2,500/mo",
    description: "Corporate business presence with multi-location branches & team directory.",
    features: ["Corporate Identity & Branches", "Multiple Contact Persons", "Direct Inquiry Funnel"],
    icon: ShieldCheck,
    color: "#1d4ed8",
  },
  Team: {
    name: "DI - Team",
    price: "₹2,800/mo",
    description: "Centralized team organization with sub-cards, brand control & team management.",
    features: ["Team Directory Hierarchy", "Shared Corporate Branding", "Central Admin Dashboard"],
    icon: Users,
    color: "#6d28d9",
  },
  MiniWebsite: {
    name: "DP - Mini Website",
    price: "₹3,000/mo",
    description: "Full-featured digital mini website with interactive catalogs, maps & lead capture.",
    features: ["Mini Website Landing Page", "Interactive Catalogs & Videos", "Custom Domain Support"],
    icon: Globe,
    color: "#e11d48",
  },
};

export function SubscriptionBanner({
  subscriptionData,
  remainingDays,
  cardsUsed,
  userCards,
  onUpgrade,
}: SubscriptionBannerProps) {
  const navigate = useNavigate();
  const [planDetails, setPlanDetails] = useState<PlanDetails>(defaultPlanDetails);
  const [userPlanData, setUserPlanData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [apiPlan, setApiPlan] = useState<any>(null);

  // Get userId from localStorage - looking for user_id key
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id") ||
      localStorage.getItem("userId") ||
      localStorage.getItem("id") ||
      localStorage.getItem("_id") ||
      localStorage.getItem("user_email");

    if (storedUserId) {
      setUserId(storedUserId);
    }
    setIsLoading(false);
  }, []);

  // Fetch user plan data from API
  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${CHECK_URL}/user-plan/${userId}`, {
          method: "GET",
          headers,
          credentials: "include",
        });

        if (!response.ok) {
          // If endpoint returns 404 or error, don't crash, gracefully use defaults/localStorage
          console.warn(`User plan endpoint returned status ${response.status}`);
          setIsLoading(false);
          return;
        }

        const data = await response.json();

        if (data && data.success && data.plan) {
          setUserPlanData(data);
          setApiPlan(data.plan);

          // Update plan details based on the API response dynamically for all plans
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
        console.warn("Could not fetch user plan from API, using local fallbacks:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPlan();
  }, [userId]);

  // Canonical resolver for plan key with case & whitespace tolerance
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

  // Determine current plan based on API, subscription data, and localStorage
  const getCurrentPlan = (): keyof PlanDetails => {
    // 1. Check API plan from /user-plan/:userId
    if (apiPlan?.name || apiPlan?.displayName || apiPlan?.category) {
      return normalizePlanKey(apiPlan.name || apiPlan.displayName || apiPlan.category);
    }

    // 2. Check subscriptionData from /status
    if (subscriptionData?.planType && subscriptionData.planType !== "free") {
      return normalizePlanKey(subscriptionData.planType);
    }
    if (subscriptionData?.planName && subscriptionData.planName !== "free") {
      return normalizePlanKey(subscriptionData.planName);
    }
    if (subscriptionData?.planCategory && subscriptionData.planCategory !== "free") {
      return normalizePlanKey(subscriptionData.planCategory);
    }

    // 3. Check localStorage 'selected_plan' (when user just managed or selected a plan)
    const storedSelectedPlan = localStorage.getItem("selected_plan");
    if (storedSelectedPlan && storedSelectedPlan !== "free") {
      return normalizePlanKey(storedSelectedPlan);
    }

    // 4. Check user's cards to detect highest card type
    if (userCards && userCards.length > 0) {
      const cardTypes = userCards.map(card => card.cardType).filter(Boolean);
      for (const rank of ["MiniWebsite", "Team", "CorporateBusiness", "EntrepreneurialsMulti", "Entrepreneurials", "ProfessionalPro", "Professionals", "BusinessPremium", "Business", "Personal"]) {
        if (cardTypes.some(type => normalizePlanKey(type) === rank)) {
          return rank as keyof PlanDetails;
        }
      }
    }

    // 5. Determine based on hasSubscription and status
    if (subscriptionData?.hasSubscription && subscriptionData?.status === "active") {
      return "Personal";
    }

    // 6. If explicitly expired without a known plan, show free trial upgrade UI
    if (subscriptionData?.status === "expired") {
      return "free";
    }

    // Default to free trial
    return "free";
  };

  const plan = getCurrentPlan();
  const details = planDetails[plan] || defaultPlanDetails[plan] || defaultPlanDetails.Personal;
  const PlanIcon = details?.icon || Sparkles;

  // Calculate days progress for free trial/active subscription
  const getDaysProgress = () => {
    if (!subscriptionData) return 0;

    if (subscriptionData.status === "active" && subscriptionData.hasSubscription) {
      // For paid subscriptions, show days left progress
      if (subscriptionData.endDate) {
        const endDate = new Date(subscriptionData.endDate);
        const now = new Date();
        const startDate = subscriptionData.startDate ? new Date(subscriptionData.startDate) : new Date();

        const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (totalDays > 0 && daysLeft > 0) {
          return ((totalDays - daysLeft) / totalDays) * 100;
        }
      }
    }

    // For free trial, show remaining days progress
    // Use default 7 days for free trial
    const trialDays = 7;
    if (remainingDays > 0 && remainingDays <= trialDays) {
      return ((trialDays - remainingDays) / trialDays) * 100;
    }

    return 0;
  };

  // Handle null subscriptionData properly
  const isSubscriptionExpired = subscriptionData ?
    (subscriptionData.status === "expired" || subscriptionData.daysLeft <= 0) :
    false;

  const isActiveSubscription = subscriptionData ?
    (subscriptionData.status === "active" && subscriptionData.hasSubscription) :
    false;

  // Get the price with proper type checking
  const getPriceDisplay = () => {
    // For paid plans, show actual price or default
    if (plan !== "free" && details.price) {
      return subscriptionData?.price || details.price;
    }

    // For free plan or if no price, return appropriate text
    if (isSubscriptionExpired) {
      return "Subscription Expired";
    }

    if (remainingDays > 0) {
      return "Free Trial";
    }

    return "Choose Plan";
  };

  // Get days display text
  const getDaysDisplay = () => {
    if (isSubscriptionExpired) {
      return "Expired";
    }

    if (isActiveSubscription && subscriptionData?.daysLeft !== undefined) {
      const daysLeft = subscriptionData.daysLeft;
      if (daysLeft > 0) {
        return `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`;
      }
      return "Expires today";
    }

    if (remainingDays > 0) {
      // Use default 7 days for free trial
      return `${remainingDays} day${remainingDays === 1 ? '' : 's'} left in 7-day trial`;
    }

    return "Trial ended";
  };

  // Show loading state
  if (isLoading) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "1rem",
          padding: "1.5rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          textAlign: "center",
          color: "#6b7280",
        }}
      >
        Loading plan details...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "1rem",
          padding: "1.5rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          color: "#ef4444",
        }}
      >
        Error loading plan details: {error}
      </div>
    );
  }

  // If user has a plan (active subscription, trial for that plan, or managed plan)
  if (plan !== "free") {
    const priceDisplay = getPriceDisplay();
    const daysDisplay = getDaysDisplay();
    const daysProgress = getDaysProgress();
    const isTrial = !subscriptionData?.amountPaid && (remainingDays > 0 || (subscriptionData?.daysLeft && subscriptionData.daysLeft > 0));

    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "1rem",
          padding: "1.5rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: isSubscriptionExpired
            ? "1px solid rgba(239, 68, 68, 0.3)"
            : `1px solid ${details.color}40`,
          color: "#1f2937",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            marginBottom: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "0.75rem",
                background: `linear-gradient(135deg, ${details.color} 0%, ${details.color}99 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 4px 10px ${details.color}33`,
              }}
            >
              <PlanIcon style={{ width: 22, height: 22, color: "#ffffff" }} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h3 style={{ fontWeight: 700, fontSize: "1.125rem", color: "#111827", margin: 0 }}>
                  {details.name}
                </h3>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    backgroundColor: isSubscriptionExpired
                      ? "#fee2e2"
                      : isTrial
                        ? "#fef3c7"
                        : "#dcfce7",
                    color: isSubscriptionExpired
                      ? "#dc2626"
                      : isTrial
                        ? "#d97706"
                        : "#16a34a",
                  }}
                >
                  {isSubscriptionExpired ? "Expired" : isTrial ? "Trial Active" : "Active Plan"}
                </span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: 4, margin: 0 }}>
                {priceDisplay} • {details.description}
              </p>
            </div>
          </div>
          <button
            onClick={onUpgrade}
            style={{
              border: `1.5px solid ${details.color}`,
              backgroundColor: "transparent",
              color: details.color,
              padding: "0.375rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.875rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = details.color;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = details.color;
            }}
          >
            Manage Plan
            <ArrowRight style={{ width: 14, height: 14 }} />
          </button>
        </div>

        {/* Active Add-ons Area */}
        {(() => {
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

          let activeAddons: string[] = [];
          if (Array.isArray((subscriptionData as any)?.purchasedAddons) && (subscriptionData as any).purchasedAddons.length > 0) {
            activeAddons = (subscriptionData as any).purchasedAddons;
          } else if (Array.isArray(userPlanData?.subscription?.purchasedAddons) && userPlanData.subscription.purchasedAddons.length > 0) {
            activeAddons = userPlanData.subscription.purchasedAddons;
          } else {
            const stored = localStorage.getItem("selected_addons");
            if (stored) {
              try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) activeAddons = parsed;
              } catch (e) {}
            }
          }

          if (!activeAddons || activeAddons.length === 0) return null;

          return (
            <div style={{ marginTop: "0.25rem", marginBottom: "0.85rem", padding: "0.6rem 0.85rem", backgroundColor: "#f8fafc", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#334155", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "5px" }}>
                <span>✨ Active Add-ons ({activeAddons.length}):</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {activeAddons.map((addonKey) => {
                  const cleaned = String(addonKey).toLowerCase().replace(/[\s\-_]/g, '');
                  const label = ADDON_NAMES[cleaned] || addonKey;
                  return (
                    <span
                      key={addonKey}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "3px 9px",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        backgroundColor: "#eff6ff",
                        color: "#1d4ed8",
                        border: "1px solid #bfdbfe",
                      }}
                    >
                      <Check style={{ width: 12, height: 12 }} />
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Days Progress Bar */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              {isTrial ? "Trial Period" : "Subscription Status"}
            </span>
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: isSubscriptionExpired ? "#ef4444" : "#111827",
              }}
            >
              {daysDisplay}
            </span>
          </div>
          <div
            style={{
              height: 8,
              backgroundColor: "#e5e7eb",
              borderRadius: 9999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min(daysProgress, 100)}%`,
                backgroundColor: isSubscriptionExpired
                  ? "#ef4444"
                  : details.color,
                borderRadius: 9999,
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Free plan (trial) UI or expired subscription
  const daysProgress = getDaysProgress();
  const daysDisplay = getDaysDisplay();

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: isSubscriptionExpired
          ? "linear-gradient(90deg, rgba(254, 242, 242, 0.7) 0%, rgba(255, 241, 242, 0.7) 100%)"
          : "linear-gradient(90deg, rgba(251,253,255,0.7) 0%, rgba(238,246,255,0.7) 100%)",
        borderRadius: "1rem",
        padding: "1.5rem",
        border: isSubscriptionExpired
          ? "1px solid rgba(239, 68, 68, 0.2)"
          : "1px solid rgba(59, 130, 246, 0.2)",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 256,
          height: 256,
          backgroundColor: isSubscriptionExpired
            ? "rgba(239, 68, 68, 0.03)"
            : "rgba(59, 130, 246, 0.03)",
          borderRadius: "50%",
          filter: "blur(48px)",
          transform: "translate(50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              {isSubscriptionExpired ? (
                <Lock style={{ width: 20, height: 20, color: "#ef4444" }} />
              ) : (
                <PlanIcon style={{ width: 20, height: 20, color: "#f97316" }} />
              )}
              <span style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: isSubscriptionExpired ? "#ef4444" : "#f97316"
              }}>
                {isSubscriptionExpired
                  ? "Subscription Expired"
                  : daysDisplay
                }
              </span>
            </div>

            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: 8 }}>
              {isSubscriptionExpired ? "Upgrade Your Plan" : "Choose Your Plan"}
            </h3>

            <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: 16 }}>
              {isSubscriptionExpired
                ? "Your free trial has ended. Upgrade to continue using all features."
                : "You're on a 7-day free trial. Upgrade to continue after trial ends."
              }
            </p>

            {/* Days Progress Bar */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: 8 }}>
                <span style={{ color: "#6b7280" }}>Trial Status</span>
                <span style={{
                  color: isSubscriptionExpired ? "#ef4444" :
                    remainingDays <= 7 ? "#f59e0b" : "#111827",
                  fontWeight: isSubscriptionExpired || remainingDays <= 7 ? "600" : "400"
                }}>
                  {daysDisplay}
                </span>
              </div>
              <div
                style={{
                  height: 8,
                  backgroundColor: "#e5e7eb",
                  borderRadius: 9999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(daysProgress, 100)}%`,
                    backgroundColor: isSubscriptionExpired ? "#ef4444" :
                      remainingDays <= 7 ? "#f59e0b" :
                        "rgba(59, 130, 246, 0.6)",
                    borderRadius: 9999,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
              {remainingDays > 0 && remainingDays <= 7 && (
                <p style={{ fontSize: "0.75rem", color: "#f59e0b", marginTop: "0.5rem" }}>
                  Your trial will expire soon. Upgrade to continue using all features.
                </p>
              )}
            </div>

            {/* Plan Options - Use API data for plan details if available */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              <div
                style={{
                  // padding: "0.375rem 0.75rem",
                  // backgroundColor: plan === "Personal" ? "rgba(147,197,253,0.2)" : "#ffffff",
                  // border: plan === "Personal" ? "1px solid rgba(59,130,246,0.3)" : "1px solid #d1d5db",
                  // borderRadius: 12,
                  // fontSize: "0.75rem",
                  // color: plan === "Personal" ? "#2563eb" : "#111827",
                  // fontWeight: 600,
                  // display: "flex",
                  // flexDirection: "column",
                  // alignItems: "flex-start",
                  // minWidth: 120,
                }}
              >
                <div>{planDetails.Personal.name}</div>
                <div style={{
                  color: plan === "Personal" ? "rgba(37,99,235,0.7)" : "#6b7280",
                  fontSize: "0.7rem",
                  marginTop: 2
                }}>
                  {planDetails.Personal.price}
                </div>
              </div>
              <div
                style={{
                  // padding: "0.375rem 0.75rem",
                  // backgroundColor: plan === "Business" ? "rgba(147,197,253,0.2)" : "#ffffff",
                  // border: plan === "Business" ? "1px solid rgba(59,130,246,0.3)" : "1px solid #d1d5db",
                  // borderRadius: 12,
                  // fontSize: "0.75rem",
                  // color: plan === "Business" ? "#2563eb" : "#111827",
                  // fontWeight: 600,
                  // display: "flex",
                  // flexDirection: "column",
                  // alignItems: "flex-start",
                  // minWidth: 120,
                }}
              >
                <div>{planDetails.Business.name}</div>
                <div style={{
                  color: plan === "Business" ? "rgba(37,99,235,0.7)" : "#6b7280",
                  fontSize: "0.7rem",
                  marginTop: 2
                }}>
                  {planDetails.Business.price}
                </div>
              </div>
              <div>
                <div>{planDetails.BusinessPremium.name}</div>
                <div style={{
                  color: plan === "BusinessPremium" ? "rgba(37,99,235,0.7)" : "#6b7280",
                  fontSize: "0.7rem",
                  marginTop: 2
                }}>
                  {planDetails.BusinessPremium.price}
                </div>
              </div>
            </div>

            <button
              onClick={onUpgrade}
              style={{
                background: isSubscriptionExpired
                  ? "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)"
                  : "linear-gradient(90deg, #f97316 0%, #ea580c 100%)",
                border: "none",
                borderRadius: "0.5rem",
                color: "#fff",
                fontWeight: 700,
                padding: "0.5rem 1rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: "0.875rem",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {isSubscriptionExpired ? "Renew Subscription" :
                remainingDays <= 0 ? "Upgrade Now" : "View Plans"}
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>

          {/* Status badge for expired subscriptions */}
          {isSubscriptionExpired && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div style={{
                backgroundColor: "#fee2e2",
                color: "#dc2626",
                padding: "0.375rem 0.75rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                marginBottom: "0.5rem"
              }}>
                Access Restricted
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Expired on</div>
                <div style={{ fontWeight: 600, color: "#111827" }}>
                  {subscriptionData?.endDate ? new Date(subscriptionData.endDate).toLocaleDateString() : "N/A"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}