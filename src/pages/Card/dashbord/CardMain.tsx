import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  CreditCard, 
  Eye, 
  Share2, 
  Lock, 
  Plus, 
  Search, 
  Filter, 
  RefreshCw, 
  X, 
  ExternalLink, 
  QrCode, 
  Trash2, 
  Edit2, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  Copy, 
  Maximize2, 
  LayoutGrid, 
  List, 
  ShieldCheck, 
  Download, 
  Smartphone,
  Check,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";
import { StatsCard } from "./StatsCard";
import { DigitalCardPreview, Card, CardType } from "./DigitalCardPreview";
import { SubscriptionBanner } from "./SubscriptionBanner";
import { CreateCardButton } from "./CreateCardButton";
import { CARD_URL, CHECK_URL } from "../../../utility/constants";

const CardMain = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userName, setUserName] = useState<string>("User");
  const [userEmail, setUserEmail] = useState<string>("");
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [rawCardsArray, setRawCardsArray] = useState<any[]>([]);
  
  // Search & Filter & View Mode
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlanFilter, setSelectedPlanFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Drawers & Modals
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [qrModalCard, setQrModalCard] = useState<Card | null>(null);
  const [deleteConfirmCard, setDeleteConfirmCard] = useState<Card | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Modern Toast system
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.message === message ? null : curr));
    }, 3500);
  };

  const [stats, setStats] = useState({
    totalCards: 0,
    totalViews: 0,
    totalShares: 0,
    newContacts: 0,
  });

  // Get User Info
  const getUserInfo = () => {
    const storedEmail = localStorage.getItem("user_email") || "";
    const storedName = localStorage.getItem("user_name");
    const storedUserId = localStorage.getItem("user_id");

    const userInfo = {
      email: storedEmail || null,
      name: storedName || storedEmail?.split("@")[0] || "User",
      userId: storedUserId || storedEmail,
      identifier: storedUserId || storedEmail || "unknown",
    };

    setUserName(userInfo.name);
    setUserEmail(storedEmail);
    return userInfo;
  };

  // Canonical plan normalizer
  const normalizePlanKey = (raw: string = "") => {
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

  const getMaxCardsForPlan = (planType: string) => {
    const key = normalizePlanKey(planType);
    switch (key) {
      case "Personal": return 10;
      case "Business": return 50;
      case "BusinessPremium": return 100;
      case "Professionals": return 150;
      case "ProfessionalPro": return 200;
      case "Entrepreneurials": return 250;
      case "EntrepreneurialsMulti": return 300;
      case "CorporateBusiness": return 500;
      case "Team": return 999;
      case "MiniWebsite": return 999;
      default: return 5;
    }
  };

  const getDefaultPriceForPlan = (planType: string) => {
    const key = normalizePlanKey(planType);
    switch (key) {
      case "Personal": return "₹500/mo";
      case "Business": return "₹800/mo";
      case "BusinessPremium": return "₹1,200/mo";
      case "Professionals": return "₹1,500/mo";
      case "ProfessionalPro": return "₹1,800/mo";
      case "Entrepreneurials": return "₹1,800/mo";
      case "EntrepreneurialsMulti": return "₹2,200/mo";
      case "CorporateBusiness": return "₹2,500/mo";
      case "Team": return "₹2,800/mo";
      case "MiniWebsite": return "₹3,000/mo";
      default: return "Free";
    }
  };

  const extractPlanType = (data: any): string => {
    if (location.state?.selectedPlan) {
      return normalizePlanKey(location.state.selectedPlan);
    }
    if (!data) {
      const stored = localStorage.getItem("selected_plan");
      return stored ? normalizePlanKey(stored) : "Personal";
    }
    if (data.status === "expired") return "free";
    if (data.planType && data.planType !== "free") return normalizePlanKey(data.planType);
    if (data.planName && data.planName !== "free") return normalizePlanKey(data.planName);
    if (data.planCategory && data.planCategory !== "free") return normalizePlanKey(data.planCategory);

    const stored = localStorage.getItem("selected_plan");
    if (stored && stored !== "free") return normalizePlanKey(stored);

    return data.hasSubscription ? "Personal" : "free";
  };

  // Fetch Subscription Status
  const fetchSubscriptionStatus = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch(`${CHECK_URL}/status`, {
        method: "GET",
        headers,
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Subscription check failed");

      const resolvedPlan = extractPlanType(data.data);
      const enhancedData = {
        ...data.data,
        planType: resolvedPlan,
        price: data.data?.price || getDefaultPriceForPlan(resolvedPlan),
        maxCards: getMaxCardsForPlan(resolvedPlan),
      };

      setSubscriptionData(enhancedData);

      if (resolvedPlan && resolvedPlan !== "free") {
        localStorage.setItem("selected_plan", resolvedPlan);
      }
      if (Array.isArray(data.data?.purchasedAddons) && data.data.purchasedAddons.length > 0) {
        localStorage.setItem("selected_addons", JSON.stringify(data.data.purchasedAddons));
      }

      if (enhancedData.status === "expired" || enhancedData.daysLeft <= 0) {
        setShowSubscriptionModal(true);
      }

      return enhancedData;
    } catch (error) {
      const storedPlan = localStorage.getItem("selected_plan");
      const storedPrice = localStorage.getItem("selected_plan_price");
      const resolvedPlan = storedPlan ? normalizePlanKey(storedPlan) : "Personal";

      const fallback = {
        hasSubscription: Boolean(storedPlan),
        status: "active",
        daysLeft: 7,
        planType: resolvedPlan,
        planName: storedPlan || "Personal",
        price: storedPrice ? `₹${storedPrice}/mo` : getDefaultPriceForPlan(resolvedPlan),
        maxCards: getMaxCardsForPlan(resolvedPlan),
      };
      setSubscriptionData(fallback);
      return fallback;
    }
  };

  const getGradientFromCardType = (cardType: CardType): Card["gradient"] => {
    const key = normalizePlanKey(String(cardType || ""));
    switch (key) {
      case "MiniWebsite": return "purple";
      case "Team": return "purple";
      case "CorporateBusiness": return "dark";
      case "EntrepreneurialsMulti": return "coral";
      case "Entrepreneurials": return "teal";
      case "ProfessionalPro": return "coral";
      case "Professionals": return "purple";
      case "BusinessPremium": return "coral";
      case "Business": return "teal";
      case "Personal": return "blue";
      default: return "blue";
    }
  };

  // Fetch Cards Data
  const fetchUserData = async (isManualRefresh = false) => {
    const userInfo = getUserInfo();
    if (!userInfo.email) {
      setLoading(false);
      return;
    }

    try {
      if (isManualRefresh) setIsRefreshing(true);
      else setLoading(true);

      const subscription = await fetchSubscriptionStatus();

      const response = await fetch(
        `${CARD_URL}/email/${encodeURIComponent(userInfo.email)}`,
        { method: "GET", credentials: "include" }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setCards([]);
          setStats({ totalCards: 0, totalViews: 0, totalShares: 0, newContacts: 0 });
        }
        throw new Error("Failed to fetch cards");
      }

      const data = await response.json();
      const cardsArray = Array.isArray(data.cards) ? data.cards : data.data || [];
      const userCards = cardsArray.filter((c: any) => (c.email || c.userEmail) === userInfo.email);
      setRawCardsArray(userCards);

      const limitedCards = userCards.slice(0, subscription?.maxCards || 10);

      const transformedCards: Card[] = limitedCards.map((card: any, index: number) => {
        const firstName = card.firstName || card.name?.split(" ")[0] || "";
        const lastName = card.lastName || card.name?.split(" ").slice(1).join(" ") || "";
        const fullName = `${firstName} ${lastName}`.trim() || "Unnamed Card";
        const urlSlug = card.urlSlug || card.slug || card.customUrl || card.publicUrl || card._id || "";
        const cardType: CardType = card.cardType
          ? normalizePlanKey(card.cardType)
          : (subscription?.planType || "Personal");

        return {
          id: card._id || card.id || `card-${index}`,
          name: fullName,
          title: card.jobTitle || card.title || card.position || "",
          company: card.companyName || card.company || card.organization || "",
          email: card.email || card.primaryEmail || userInfo.email,
          phone: card.phones?.[0]?.number || card.phone || card.mobile || "",
          views: card.views || card.viewCount || 0,
          shares: card.shares || card.shareCount || 0,
          gradient: getGradientFromCardType(cardType),
          cardType,
          trialDaysLeft: subscription?.daysLeft || 0,
          subscriptionStartDate: subscription?.startDate ? new Date(subscription.startDate) : new Date(),
          urlSlug,
          cardData: card,
        };
      });

      setCards(transformedCards);

      setStats({
        totalCards: transformedCards.length,
        totalViews: transformedCards.reduce((sum, c) => sum + (c.views || 0), 0),
        totalShares: transformedCards.reduce((sum, c) => sum + (c.shares || 0), 0),
        newContacts: Math.floor(transformedCards.reduce((sum, c) => sum + (c.views || 0), 0) * 0.05),
      });

      if (isManualRefresh) {
        showToast("Dashboard data refreshed successfully!");
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
      if (!isManualRefresh) setCards([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const isSubscriptionExpired = subscriptionData?.status === "expired" || subscriptionData?.daysLeft <= 0;
  const maxCards = subscriptionData?.maxCards || 10;
  const canCreateMoreCards = () => !isSubscriptionExpired && cards.length < maxCards;
  const isCardLocked = (cardIndex: number) => cardIndex >= maxCards;

  const getRemainingDays = () => {
    if (!subscriptionData?.endDate) return subscriptionData?.daysLeft || 0;
    const endDate = new Date(subscriptionData.endDate);
    const now = new Date();
    const diffDays = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Card Handlers
  const handleViewCard = (card: Card) => {
    if (isSubscriptionExpired) {
      setShowSubscriptionModal(true);
      return;
    }
    if (card.urlSlug) {
      window.open(`/preview/${card.urlSlug}`, "_blank");
    } else {
      showToast("This card does not have a shareable link yet.", "error");
    }
  };

  const handleEditCard = (card: Card, index: number) => {
    if (isSubscriptionExpired || isCardLocked(index)) {
      setShowSubscriptionModal(true);
      return;
    }
    const userEmail = localStorage.getItem("user_email");
    const selectedPlan = card.cardData?.cardType || subscriptionData?.planType || localStorage.getItem("selected_plan") || "Personal";
    const selectedAddons = subscriptionData?.purchasedAddons || (localStorage.getItem("selected_addons") ? JSON.parse(localStorage.getItem("selected_addons")!) : []);
    navigate("/create", { state: { userEmail, selectedPlan, selectedAddons, card: card.cardData } });
  };

  const handleShareCard = (card: Card) => {
    if (isSubscriptionExpired) {
      setShowSubscriptionModal(true);
      return;
    }
    if (card.urlSlug) {
      const shareUrl = `${window.location.origin}/preview/${card.urlSlug}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast("✓ Shareable link copied to clipboard!");
      });
    } else {
      showToast("This card does not have a shareable URL yet.", "error");
    }
  };

  const handleCreateNew = () => {
    if (!canCreateMoreCards()) {
      setShowSubscriptionModal(true);
      return;
    }
    const userEmail = localStorage.getItem("user_email");
    const selectedPlan = subscriptionData?.planType || localStorage.getItem("selected_plan") || "Personal";
    const selectedAddons = subscriptionData?.purchasedAddons || (localStorage.getItem("selected_addons") ? JSON.parse(localStorage.getItem("selected_addons")!) : []);
    navigate("/create", { state: { userEmail, selectedPlan, selectedAddons } });
  };

  const handleUpgradeSubscription = () => {
    setShowSubscriptionModal(false);
    navigate("/pricing", {
      state: {
        userEmail: localStorage.getItem("user_email"),
        currentPlan: subscriptionData?.planType || "free",
        currentCards: cards.length,
      },
    });
  };

  // QR Code Modal & Download
  const handleOpenQRModal = (card: Card) => {
    setQrModalCard(card);
  };

  const handleDownloadQRCode = async (card: Card) => {
    if (!card.urlSlug) {
      showToast("Cannot generate QR code: card has no URL slug.", "error");
      return;
    }
    const targetUrl = `${window.location.origin}/preview/${card.urlSlug}`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(targetUrl)}&format=png&margin=15`;
    
    try {
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${card.urlSlug}-qrcode.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      showToast("✓ QR Code downloaded successfully!");
    } catch (err) {
      window.open(qrImageUrl, "_blank");
      showToast("Opening QR image in new tab...");
    }
  };

  // Card Deletion
  const handleConfirmDelete = (card: Card) => {
    setDeleteConfirmCard(card);
  };

  const executeDeleteCard = async () => {
    if (!deleteConfirmCard) return;

    try {
      setIsDeleting(true);
      const cardId = deleteConfirmCard.id;
      const response = await fetch(`${CARD_URL}/delete-card/${cardId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete card");
      }

      setCards((prev) => prev.filter((c) => c.id !== cardId));
      setRawCardsArray((prev) => prev.filter((c) => (c._id || c.id) !== cardId));
      setStats((prev) => ({
        ...prev,
        totalCards: Math.max(0, prev.totalCards - 1),
      }));

      showToast("✓ Card deleted successfully!");
      if (selectedCard?.id === cardId) setSelectedCard(null);
      setDeleteConfirmCard(null);
    } catch (error) {
      console.error("Error deleting card:", error);
      showToast("Failed to delete card. Please try again.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered Cards
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      // Plan filter
      if (selectedPlanFilter !== "all") {
        const matchesPlan = normalizePlanKey(String(card.cardType)).toLowerCase() === selectedPlanFilter.toLowerCase();
        if (!matchesPlan) return false;
      }
      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        card.name?.toLowerCase().includes(q) ||
        card.title?.toLowerCase().includes(q) ||
        card.company?.toLowerCase().includes(q) ||
        card.email?.toLowerCase().includes(q) ||
        card.urlSlug?.toLowerCase().includes(q)
      );
    });
  }, [cards, searchQuery, selectedPlanFilter]);

  // Auth Guard
  if (!loading && !localStorage.getItem("user_email")) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center bg-white dark:bg-boxdark p-8 rounded-2xl shadow-xl max-w-md border border-slate-200 dark:border-strokedark">
          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/60 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-rose-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Authentication Required</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
            Please log in with your credentials to manage your digital cards and view analytics.
          </p>
          <button
            onClick={() => navigate("/signin")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8">
        <div className="w-14 h-14 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin mb-4" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Loading your Digital Cards...</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Retrieving workspace for {userName}</p>
      </div>
    );
  }

  return (
    <div className="w-full pb-16 transition-colors">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[100000] flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
          toast.type === "error"
            ? "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800"
            : toast.type === "info"
              ? "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800"
              : "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800"
        }`}>
          {toast.type === "error" ? (
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          ) : toast.type === "info" ? (
            <Sparkles className="w-5 h-5 text-blue-500 shrink-0" />
          ) : (
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header & Greeting Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
              Personal Workspace
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{userEmail}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {userName}!
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your digital cards, share live profiles, and track card interactions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => fetchUserData(true)}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-strokedark bg-white dark:bg-boxdark text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Refresh dashboard data"
          >
            <RefreshCw className={`w-4 h-4 text-slate-500 ${isRefreshing ? "animate-spin text-blue-500" : ""}`} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/pricing")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>View Plans</span>
          </button>

          <button
            type="button"
            onClick={handleCreateNew}
            disabled={isSubscriptionExpired || !canCreateMoreCards()}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs md:text-sm text-white shadow-md transition-all duration-200 cursor-pointer ${
              isSubscriptionExpired || !canCreateMoreCards()
                ? "bg-slate-400 cursor-not-allowed opacity-75"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Create New Card</span>
          </button>
        </div>
      </div>

      {/* 4 Balanced KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Active Cards"
          value={`${cards.length} / ${maxCards}`}
          subtitle={`${Math.max(0, maxCards - cards.length)} slots available`}
          icon={CreditCard}
          iconBg="bg-blue-50 dark:bg-blue-950/60"
          iconColor="text-blue-600 dark:text-blue-400"
          progress={maxCards > 0 ? (cards.length / maxCards) * 100 : 0}
          badge={cards.length >= maxCards ? "Limit Reached" : "Healthy"}
          badgeColor={cards.length >= maxCards ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" : undefined}
        />

        <StatsCard
          title="Card Views"
          value={stats.totalViews.toLocaleString()}
          subtitle="Total visitor impressions"
          icon={Eye}
          iconBg="bg-indigo-50 dark:bg-indigo-950/60"
          iconColor="text-indigo-600 dark:text-indigo-400"
          badge="Live Analytics"
        />

        <StatsCard
          title="Card Shares"
          value={stats.totalShares.toLocaleString()}
          subtitle="Direct link & QR shares"
          icon={Share2}
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
          badge="Engagement"
        />

        <StatsCard
          title="Active Plan"
          value={subscriptionData?.planType || "Personal"}
          subtitle={`${getRemainingDays()} days left in cycle`}
          icon={Sparkles}
          iconBg="bg-purple-50 dark:bg-purple-950/60"
          iconColor="text-purple-600 dark:text-purple-400"
          badge={isSubscriptionExpired ? "Expired" : "Active"}
          badgeColor={isSubscriptionExpired ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"}
        />
      </div>

      {/* Subscription Banner */}
      <SubscriptionBanner
        subscriptionData={subscriptionData}
        remainingDays={getRemainingDays()}
        cardsUsed={stats.totalCards}
        userCards={rawCardsArray}
        onUpgrade={handleUpgradeSubscription}
      />

      {/* Cards Management Section */}
      <section className="bg-white dark:bg-boxdark rounded-2xl border border-slate-200 dark:border-strokedark p-6 shadow-xs">
        
        {/* Section Header & Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100 dark:border-strokedark">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Digital Identity Cards
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Showing {filteredCards.length} of {cards.length} card{cards.length === 1 ? "" : "s"}
            </p>
          </div>

          {/* Search, Filter, & View Mode Switcher */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cards..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-200 dark:border-strokedark bg-slate-50/50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Plan Filter */}
            <select
              value={selectedPlanFilter}
              onChange={(e) => setSelectedPlanFilter(e.target.value)}
              className="py-2 px-3 text-xs rounded-xl border border-slate-200 dark:border-strokedark bg-slate-50/50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              <option value="all">All Plan Tiers</option>
              <option value="Personal">DI - Individuals</option>
              <option value="Business">DI - Working Professionals</option>
              <option value="BusinessPremium">DI - Service Providers</option>
              <option value="Professionals">DI - Professionals</option>
              <option value="ProfessionalPro">DI - Professional Pro</option>
              <option value="Entrepreneurials">DI - Entrepreneurials</option>
              <option value="EntrepreneurialsMulti">DI - Multi-Activities</option>
              <option value="CorporateBusiness">DI - Corporate</option>
              <option value="Team">DI - Team</option>
              <option value="MiniWebsite">DP - Mini Website</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-strokedark">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-boxdark text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white dark:bg-boxdark text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
                title="List/Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content: Cards Grid or Table */}
        {cards.length === 0 ? (
          /* Empty Workspace Onboarding State */
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <Smartphone className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No digital cards created yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-6">
              Create your first digital identity card to start sharing interactive links, contact details, social profiles, and QR codes with your clients.
            </p>
            <button
              type="button"
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Card</span>
            </button>
          </div>
        ) : filteredCards.length === 0 ? (
          /* Empty Search Filter State */
          <div className="text-center py-12">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-base font-semibold text-slate-800 dark:text-white">No cards matched your filter</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
              Try adjusting your search terms or selecting "All Plan Tiers".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedPlanFilter("all");
              }}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CreateCardButton
              onClick={handleCreateNew}
              disabled={isSubscriptionExpired || !canCreateMoreCards()}
              label={
                isSubscriptionExpired
                  ? "Upgrade to Create Card"
                  : !canCreateMoreCards()
                    ? "Plan Limit Reached"
                    : "Create New Card"
              }
              description={
                canCreateMoreCards()
                  ? `${maxCards - cards.length} slots remaining on plan`
                  : "Upgrade plan for more cards"
              }
            />

            {filteredCards.map((card, index) => (
              <div key={card.id}>
                {isCardLocked(index) ? (
                  <div className="relative opacity-50">
                    <div className="absolute inset-0 bg-white/80 dark:bg-boxdark/80 backdrop-blur-xs rounded-xl z-10 flex flex-col items-center justify-center p-4">
                      <Lock className="w-6 h-6 text-rose-500 mb-2" />
                      <p className="text-sm font-semibold text-slate-800 dark:text-white text-center">Upgrade to Unlock</p>
                    </div>
                    <DigitalCardPreview card={card} />
                  </div>
                ) : (
                  <DigitalCardPreview
                    card={card}
                    onView={() => handleViewCard(card)}
                    onEdit={() => handleEditCard(card, index)}
                    onShare={() => handleShareCard(card)}
                    onDownloadQR={() => handleOpenQRModal(card)}
                    onInspect={() => setSelectedCard(card)}
                    onDelete={() => handleConfirmDelete(card)}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Table / List View */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-strokedark uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Cardholder</th>
                  <th className="py-3 px-4">Designation & Company</th>
                  <th className="py-3 px-4">Plan Tier</th>
                  <th className="py-3 px-4 text-center">Views</th>
                  <th className="py-3 px-4 text-center">Shares</th>
                  <th className="py-3 px-4">Shareable URL</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-strokedark">
                {filteredCards.map((card, index) => (
                  <tr 
                    key={card.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedCard(card)}
                  >
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
                          {card.name ? card.name.charAt(0).toUpperCase() : "C"}
                        </div>
                        <div className="truncate max-w-[160px]">
                          <p className="truncate font-semibold">{card.name || "Untitled Card"}</p>
                          <p className="text-[11px] text-slate-400 truncate">{card.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                      <div className="truncate max-w-[180px]">
                        <p className="font-medium truncate">{card.title || "—"}</p>
                        <p className="text-[11px] text-slate-400 truncate">{card.company || "—"}</p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-[11px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {card.cardType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center font-semibold text-slate-800 dark:text-slate-200">
                      {card.views || 0}
                    </td>

                    <td className="py-3.5 px-4 text-center font-semibold text-slate-800 dark:text-slate-200">
                      {card.shares || 0}
                    </td>

                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      {card.urlSlug ? (
                        <div className="flex items-center gap-1.5">
                          <code className="text-[11px] font-mono bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-slate-700 dark:text-slate-300 truncate max-w-[140px]">
                            /{card.urlSlug}
                          </code>
                          <button
                            type="button"
                            onClick={() => handleShareCard(card)}
                            className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                            title="Copy Link"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleViewCard(card)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                          title="View Live Card"
                        >
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditCard(card, index)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                          title="Edit Card"
                        >
                          <Edit2 className="w-4 h-4 text-indigo-500" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenQRModal(card)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                          title="QR Code & Download"
                        >
                          <QrCode className="w-4 h-4 text-purple-500" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedCard(card)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                          title="Full Details"
                        >
                          <Maximize2 className="w-4 h-4 text-slate-500" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleConfirmDelete(card)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-rose-500 transition-colors"
                          title="Delete Card"
                        >
                          <Trash2 className="w-4 h-4 text-rose-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Slide-over Card Inspection Drawer */}
      {selectedCard && (
        <div className="fixed inset-0 z-[99999] overflow-hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedCard(null)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-lg bg-white dark:bg-boxdark shadow-2xl flex flex-col border-l border-slate-200 dark:border-strokedark">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 dark:border-strokedark flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Card Inspection
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {selectedCard.cardType}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    {selectedCard.name || "Digital Card"}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCard(null)}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Direct Share Link Box */}
                {selectedCard.urlSlug && (
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-strokedark">
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Live Shareable Link
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={`${window.location.origin}/preview/${selectedCard.urlSlug}`}
                        className="flex-1 text-xs font-mono bg-white dark:bg-boxdark border border-slate-200 dark:border-strokedark rounded-lg px-3 py-2 text-slate-800 dark:text-slate-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleShareCard(selectedCard)}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Analytics Metrics Strip */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-xl p-3 text-center">
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Total Views</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{selectedCard.views || 0}</p>
                  </div>
                  <div className="bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-xl p-3 text-center">
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Total Shares</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{selectedCard.shares || 0}</p>
                  </div>
                  <div className="bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 rounded-xl p-3 text-center">
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Status</p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Active</p>
                  </div>
                </div>

                {/* Card Identity Overview */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Cardholder Profile
                  </h4>

                  <div className="bg-slate-50/50 dark:bg-slate-900/40 rounded-xl p-4 border border-slate-100 dark:border-strokedark space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Full Name</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{selectedCard.name || "—"}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Designation / Title</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{selectedCard.title || "—"}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Company / Organization</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{selectedCard.company || "—"}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Primary Email</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{selectedCard.email || "—"}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Contact Number</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{selectedCard.phone || "—"}</span>
                    </div>

                    {selectedCard.cardData?.tagline && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Tagline</span>
                        <span className="font-semibold text-slate-900 dark:text-white italic">"{selectedCard.cardData.tagline}"</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Short Intro / Bio */}
                {(selectedCard.cardData?.aboutText || selectedCard.cardData?.bio) && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Short Intro
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-strokedark leading-relaxed">
                      {selectedCard.cardData.aboutText || selectedCard.cardData.bio}
                    </p>
                  </div>
                )}

                {/* Interactive Preview Mockup */}
                {selectedCard.urlSlug && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Interactive Live Preview
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleViewCard(selectedCard)}
                        className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <span>Open fullscreen</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-strokedark shadow-inner bg-slate-100 dark:bg-slate-900">
                      <iframe
                        src={`/preview/${selectedCard.urlSlug}`}
                        title="Card Preview"
                        className="w-full h-full border-0"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-slate-100 dark:border-strokedark flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleViewCard(selectedCard)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Live Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const idx = cards.findIndex(c => c.id === selectedCard.id);
                    handleEditCard(selectedCard, idx >= 0 ? idx : 0);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-strokedark bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Edit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenQRModal(selectedCard)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-strokedark bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="QR Code"
                >
                  <QrCode className="w-4 h-4 text-purple-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {qrModalCard && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-boxdark rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200 dark:border-strokedark text-center relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => setQrModalCard(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950/60 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-600 dark:text-purple-400">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {qrModalCard.name || "Digital Card"} QR
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-4">
              Scan to instantly open digital card on any smartphone
            </p>

            {/* QR Code Image Preview */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-inner inline-block mx-auto mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                  `${window.location.origin}/preview/${qrModalCard.urlSlug}`
                )}&format=png&margin=10`}
                alt="QR Code"
                className="w-48 h-48 mx-auto"
              />
            </div>

            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate mb-4">
              /{qrModalCard.urlSlug}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleDownloadQRCode(qrModalCard)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleShareCard(qrModalCard);
                }}
                className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-strokedark bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Card Confirmation Modal */}
      {deleteConfirmCard && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-boxdark rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200 dark:border-strokedark text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-950/60 rounded-full flex items-center justify-center mx-auto mb-3 text-rose-600">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Delete Card?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
              Are you sure you want to permanently delete <strong>{deleteConfirmCard.name || "this card"}</strong>? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmCard(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 border border-slate-200 dark:border-strokedark text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={executeDeleteCard}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Limit / Expired Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[100000] p-4">
          <div className="bg-white dark:bg-boxdark rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 dark:border-strokedark text-center animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 bg-rose-100 dark:bg-rose-950/60 rounded-full flex items-center justify-center mx-auto mb-3 text-rose-600">
              <Lock className="w-7 h-7" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
              {isSubscriptionExpired ? "Access Restricted" : "Card Limit Reached"}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
              {isSubscriptionExpired
                ? "Your subscription cycle or trial has ended. Please renew to continue creating and managing cards."
                : `You have reached the maximum quota of ${maxCards} card${maxCards === 1 ? "" : "s"} on your ${subscriptionData?.planType || "current"} plan. Upgrade your plan to add more cards.`}
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowSubscriptionModal(false)}
                className="flex-1 border border-slate-200 dark:border-strokedark text-slate-700 dark:text-slate-300 py-2.5 px-4 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Dismiss
              </button>

              <button
                type="button"
                onClick={handleUpgradeSubscription}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 px-4 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                {isSubscriptionExpired ? "Renew Subscription" : "Upgrade Plan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardMain;