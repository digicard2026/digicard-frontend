
// import { Sparkles, ArrowRight, Check, Lock, User, Building, Gem } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface SubscriptionBannerProps {
//   subscriptionData: {
//     hasSubscription: boolean;
//     status: "active" | "expired" | "inactive" | "pending" | "error";
//     daysLeft: number;
//     startDate: string | null;
//     endDate: string | null;
//     planType?: "free" | "Personal" | "Business" | "Business Premium";
//     planName?: string;
//     price?: string;
//     maxCards?: number;
//   } | null;
//   remainingDays: number;
//   cardsUsed: number;
//   maxCards?: number;
//   userCards?: any[];
//   onUpgrade: () => void;
// }

// interface PlanDetail {
//   name: string;
//   description: string;
//   features: string[];
//   icon: any;
//   color: string;
//   price?: string;
//   maxCards: number;
// }

// type PlanDetails = {
//   free: PlanDetail & { maxCards: number };
//   Personal: PlanDetail & { price: string; maxCards: number };
//   Business: PlanDetail & { price: string; maxCards: number };
//   "Business Premium": PlanDetail & { price: string; maxCards: number };
// }

// const planDetails: PlanDetails = {
//   free: {
//     name: "Free Trial",
//     description: "You're on a free trial. Upgrade to continue after trial ends.",
//     features: ["Up to 5 cards", "Basic analytics", "Standard templates"],
//     icon: Sparkles,
//     color: "#f97316",
//     maxCards: 5,
//   },
//   Personal: {
//     name: "Personal Plan",
//     price: "$5/month",
//     description: "Perfect for individuals with their digital presence.",
//     features: ["10 Digital Cards", "Basic analytics", "Standard templates", "Email support"],
//     icon: User,
//     color: "#3b82f6",
//     maxCards: 10,
//   },
//   Business: {
//     name: "Business Plan",
//     price: "$15/month",
//     description: "Ideal for professionals and small teams.",
//     features: ["50 Digital Cards", "Advanced analytics", "Premium templates", "Priority support"],
//     icon: Building,
//     color: "#8b5cf6",
//     maxCards: 50,
//   },
//   "Business Premium": {
//     name: "Premium Plan",
//     price: "$29/month",
//     description: "Unlimited power for growing businesses.",
//     features: ["Unlimited Cards", "Real-time analytics", "All templates", "24/7 support"],
//     icon: Gem,
//     color: "#f59e0b",
//     maxCards: 999, // Unlimited
//   },
// };

// export function SubscriptionBanner({ 
//   subscriptionData, 
//   remainingDays, 
//   cardsUsed, 
//   maxCards: propMaxCards, 
//   userCards, 
//   onUpgrade 
// }: SubscriptionBannerProps) {
//   const navigate = useNavigate();
  
//   // Determine current plan based on subscription data with priority
//   const getCurrentPlan = () => {
//     // If subscriptionData is null, show free trial
//     if (!subscriptionData) return "free" as const;
    
//     // Use planType if available from API - match your card types exactly
//     if (subscriptionData.planType) {
//       const plan = subscriptionData.planType;
//       if (plan === "Business Premium") return "Business Premium" as const;
//       if (plan === "Business") return "Business" as const;
//       if (plan === "Personal") return "Personal" as const;
//       if (plan === "free") return "free" as const;
//     }
    
//     // Check user's cards to detect highest card type
//     if (userCards && userCards.length > 0) {
//       const cardTypes = userCards.map(card => card.cardType);
      
//       if (cardTypes.some(type => type === "Business Premium")) {
//         return "Business Premium" as const;
//       }
      
//       if (cardTypes.some(type => type === "Business")) {
//         return "Business" as const;
//       }
      
//       if (cardTypes.some(type => type === "Personal")) {
//         return "Personal" as const;
//       }
//     }
    
//     // Determine based on hasSubscription and status
//     if (subscriptionData.hasSubscription) {
//       if (subscriptionData.status === "active") {
//         // Default to Personal if has subscription but no specific type
//         return "Personal" as const;
//       }
//     }
    
//     // If expired or inactive, show free (needs upgrade)
//     if (subscriptionData.status === "expired" || subscriptionData.status === "inactive") {
//       return "free" as const;
//     }
    
//     // Default to free trial
//     return "free" as const;
//   };
  
//   const plan = getCurrentPlan();
//   const details = planDetails[plan as keyof typeof planDetails];
//   const PlanIcon = details.icon;
  
//   // Get card limits based on plan - use prop if provided, otherwise use plan defaults
//   const cardsLimit = propMaxCards || details.maxCards;
//   const usagePercentage = (cardsUsed / cardsLimit) * 100;
//   const isNearLimit = usagePercentage >= 80;
//   const isAtLimit = cardsUsed >= cardsLimit;
//   const cardsRemaining = cardsLimit - cardsUsed;
  
//   // Handle null subscriptionData properly
//   const isSubscriptionExpired = subscriptionData ? 
//     (subscriptionData.status === "expired" || subscriptionData.daysLeft <= 0) : 
//     false;
    
//   const isActiveSubscription = subscriptionData ? 
//     (subscriptionData.status === "active" && subscriptionData.hasSubscription) : 
//     false;

//   // Get the price with proper type checking
//   const getPriceDisplay = () => {
//     // For paid plans, show actual price or default
//     if (plan !== "free" && details.price) {
//       return subscriptionData?.price || details.price;
//     }
    
//     // For free plan or if no price, return appropriate text
//     if (isSubscriptionExpired) {
//       return "Subscription Expired";
//     }
    
//     if (remainingDays > 0) {
//       return "Free Trial";
//     }
    
//     return "Choose Plan";
//   };

//   // If user has an active paid subscription
//   if (isActiveSubscription && plan !== "free") {
//     const priceDisplay = getPriceDisplay();
//     return (
//       <div
//         style={{
//           backgroundColor: "#fff",
//           borderRadius: "1rem",
//           padding: "1.5rem",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//           border: "1px solid rgba(59, 130, 246, 0.2)",
//           color: "#1f2937",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: "0.75rem",
//             marginBottom: "1rem",
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
//             <div
//               style={{
//                 width: 40,
//                 height: 40,
//                 borderRadius: "0.75rem",
//                 background: `linear-gradient(135deg, ${details.color} 0%, ${details.color}99 100%)`,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <PlanIcon style={{ width: 20, height: 20, color: "#ffffff" }} />
//             </div>
//             <div>
//               <h3 style={{ fontWeight: 600, color: "#111827", margin: 0 }}>{details.name}</h3>
//               <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: 4 }}>
//                 {priceDisplay} • Active subscription
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={onUpgrade}
//             style={{
//               border: "1px solid #3b82f6",
//               backgroundColor: "transparent",
//               color: "#3b82f6",
//               padding: "0.25rem 0.75rem",
//               borderRadius: "0.5rem",
//               fontWeight: 600,
//               cursor: "pointer",
//               fontSize: "0.875rem",
//               transition: "background-color 0.2s ease",
//             }}
//             onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3b82f6", e.currentTarget.style.color = "#fff")}
//             onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent", e.currentTarget.style.color = "#3b82f6")}
//           >
//             Manage Plan
//           </button>
//         </div>

//         {/* Card Usage Bar for active subscriptions */}
//         <div style={{ marginBottom: "1rem" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
//             <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Cards Used</span>
//             <span style={{ 
//               fontSize: "0.875rem", 
//               fontWeight: isNearLimit ? "600" : "400",
//               color: isNearLimit ? "#f59e0b" : "#111827"
//             }}>
//               {cardsUsed} / {cardsLimit === 999 ? "Unlimited" : cardsLimit}
//               {cardsLimit !== 999 && !isAtLimit && ` (${cardsRemaining} left)`}
//             </span>
//           </div>
//           <div
//             style={{
//               height: 8,
//               backgroundColor: "#e5e7eb",
//               borderRadius: 9999,
//               overflow: "hidden",
//             }}
//           >
//             <div
//               style={{
//                 height: "100%",
//                 width: `${Math.min(usagePercentage, 100)}%`,
//                 backgroundColor: isAtLimit ? "#ef4444" : 
//                                 isNearLimit ? "#f59e0b" : "rgba(59, 130, 246, 0.8)",
//                 borderRadius: 9999,
//                 transition: "width 0.5s ease",
//               }}
//             />
//           </div>
//           {isAtLimit && cardsLimit !== 999 && (
//             <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.5rem" }}>
//               You've reached your plan limit. Upgrade to create more cards.
//             </p>
//           )}
//           {isNearLimit && !isAtLimit && cardsLimit !== 999 && (
//             <p style={{ fontSize: "0.75rem", color: "#f59e0b", marginTop: "0.5rem" }}>
//               You're running low on cards. Consider upgrading.
//             </p>
//           )}
//         </div>

//         <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
//           {details.features.map((feature) => (
//             <span
//               key={feature}
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 4,
//                 padding: "0.25rem 0.75rem",
//                 backgroundColor: "rgba(59, 130, 246, 0.1)",
//                 color: "#3b82f6",
//                 fontSize: "0.75rem",
//                 fontWeight: 600,
//                 borderRadius: "9999px",
//               }}
//             >
//               <Check style={{ width: 12, height: 12 }} /> {feature}
//             </span>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Free plan (trial) UI or expired subscription
//   return (
//     <div
//       style={{
//         position: "relative",
//         overflow: "hidden",
//         background: isSubscriptionExpired 
//           ? "linear-gradient(90deg, rgba(254, 242, 242, 0.7) 0%, rgba(255, 241, 242, 0.7) 100%)" 
//           : "linear-gradient(90deg, rgba(251,253,255,0.7) 0%, rgba(238,246,255,0.7) 100%)",
//         borderRadius: "1rem",
//         padding: "1.5rem",
//         border: isSubscriptionExpired 
//           ? "1px solid rgba(239, 68, 68, 0.2)" 
//           : "1px solid rgba(59, 130, 246, 0.2)",
//       }}
//     >
//       {/* Background decoration */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           right: 0,
//           width: 256,
//           height: 256,
//           backgroundColor: isSubscriptionExpired 
//             ? "rgba(239, 68, 68, 0.03)" 
//             : "rgba(59, 130, 246, 0.03)",
//           borderRadius: "50%",
//           filter: "blur(48px)",
//           transform: "translate(50%, -50%)",
//           pointerEvents: "none",
//         }}
//       />
      
//       <div style={{ position: "relative" }}>
//         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
//           <div style={{ flex: 1 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
//               {isSubscriptionExpired ? (
//                 <Lock style={{ width: 20, height: 20, color: "#ef4444" }} />
//               ) : (
//                 <PlanIcon style={{ width: 20, height: 20, color: "#f97316" }} />
//               )}
//               <span style={{ 
//                 fontSize: "0.875rem", 
//                 fontWeight: 600, 
//                 color: isSubscriptionExpired ? "#ef4444" : "#f97316" 
//               }}>
//                 {isSubscriptionExpired 
//                   ? "Subscription Expired" 
//                   : remainingDays > 0 
//                     ? `${remainingDays} days left in trial` 
//                     : "Free Trial"
//                 }
//               </span>
//             </div>
            
//             <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: 8 }}>
//               {isSubscriptionExpired ? "Upgrade Your Plan" : "Choose Your Plan"}
//             </h3>
            
//             <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: 16 }}>
//               {isSubscriptionExpired 
//                 ? "Your free trial has ended. Upgrade to continue using all features."
//                 : details.description
//               }
//             </p>

//             {/* Card Usage Bar - show for all states */}
//             <div style={{ marginBottom: 16 }}>
//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: 8 }}>
//                 <span style={{ color: "#6b7280" }}>Cards used</span>
//                 <span style={{ 
//                   color: isAtLimit ? "#ef4444" : isNearLimit ? "#f59e0b" : "#111827", 
//                   fontWeight: isAtLimit || isNearLimit ? "600" : "400" 
//                 }}>
//                   {cardsUsed} / {cardsLimit === 999 ? "Unlimited" : cardsLimit}
//                   {cardsLimit !== 999 && !isAtLimit && ` (${cardsRemaining} left)`}
//                 </span>
//               </div>
//               <div
//                 style={{
//                   height: 8,
//                   backgroundColor: "#e5e7eb",
//                   borderRadius: 9999,
//                   overflow: "hidden",
//                 }}
//               >
//                 <div
//                   style={{
//                     height: "100%",
//                     width: `${Math.min(usagePercentage, 100)}%`,
//                     backgroundColor: isAtLimit ? "#ef4444" : 
//                                     isNearLimit ? "#f59e0b" : 
//                                     "rgba(59, 130, 246, 0.6)",
//                     borderRadius: 9999,
//                     transition: "width 0.5s ease",
//                   }}
//                 />
//               </div>
//               {isAtLimit && cardsLimit !== 999 && (
//                 <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.5rem" }}>
//                   You've reached your plan limit. Upgrade to create more cards.
//                 </p>
//               )}
//             </div>

//             {/* Plan Options - Highlight current plan if any */}
//             <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
//               <div
//                 style={{
//                   padding: "0.375rem 0.75rem",
//                   backgroundColor: plan === "Personal" ? "rgba(147,197,253,0.2)" : "#ffffff",
//                   border: plan === "Personal" ? "1px solid rgba(59,130,246,0.3)" : "1px solid #d1d5db",
//                   borderRadius: 12,
//                   fontSize: "0.75rem",
//                   color: plan === "Personal" ? "#2563eb" : "#111827",
//                   fontWeight: 600,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   minWidth: 120,
//                 }}
//               >
//                 <div>Personal</div>
//                 <div style={{ 
//                   color: plan === "Personal" ? "rgba(37,99,235,0.7)" : "#6b7280",
//                   fontSize: "0.7rem",
//                   marginTop: 2
//                 }}>
//                   $5/mo • 10 cards
//                 </div>
//               </div>
//               <div
//                 style={{
//                   padding: "0.375rem 0.75rem",
//                   backgroundColor: plan === "Business" ? "rgba(147,197,253,0.2)" : "#ffffff",
//                   border: plan === "Business" ? "1px solid rgba(59,130,246,0.3)" : "1px solid #d1d5db",
//                   borderRadius: 12,
//                   fontSize: "0.75rem",
//                   color: plan === "Business" ? "#2563eb" : "#111827",
//                   fontWeight: 600,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   minWidth: 120,
//                 }}
//               >
//                 <div>Business</div>
//                 <div style={{ 
//                   color: plan === "Business" ? "rgba(37,99,235,0.7)" : "#6b7280",
//                   fontSize: "0.7rem",
//                   marginTop: 2
//                 }}>
//                   $15/mo • 50 cards
//                 </div>
//               </div>
//               <div
//                 style={{
//                   padding: "0.375rem 0.75rem",
//                   backgroundColor: plan === "Business Premium" ? "rgba(147,197,253,0.2)" : "#ffffff",
//                   border: plan === "Business Premium" ? "1px solid rgba(59,130,246,0.3)" : "1px solid #d1d5db",
//                   borderRadius: 12,
//                   fontSize: "0.75rem",
//                   color: plan === "Business Premium" ? "#2563eb" : "#111827",
//                   fontWeight: 600,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   minWidth: 120,
//                 }}
//               >
//                 <div>Premium</div>
//                 <div style={{ 
//                   color: plan === "Business Premium" ? "rgba(37,99,235,0.7)" : "#6b7280",
//                   fontSize: "0.7rem",
//                   marginTop: 2
//                 }}>
//                   $29/mo • Unlimited
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={onUpgrade}
//               style={{
//                 background: isSubscriptionExpired 
//                   ? "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)" 
//                   : "linear-gradient(90deg, #f97316 0%, #ea580c 100%)",
//                 border: "none",
//                 borderRadius: "0.5rem",
//                 color: "#fff",
//                 fontWeight: 700,
//                 padding: "0.5rem 1rem",
//                 cursor: "pointer",
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 8,
//                 fontSize: "0.875rem",
//                 transition: "opacity 0.2s ease",
//               }}
//               onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
//               onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
//             >
//               {isSubscriptionExpired ? "Renew Subscription" : 
//                isAtLimit ? "Upgrade to Create More" : "View Plans"}
//               <ArrowRight style={{ width: 16, height: 16 }} />
//             </button>
//           </div>
          
//           {/* Status badge for expired subscriptions */}
//           {isSubscriptionExpired && (
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
//               <div style={{
//                 backgroundColor: "#fee2e2",
//                 color: "#dc2626",
//                 padding: "0.375rem 0.75rem",
//                 borderRadius: "0.5rem",
//                 fontSize: "0.875rem",
//                 fontWeight: 500,
//                 marginBottom: "0.5rem"
//               }}>
//                 Access Restricted
//               </div>
//               <div style={{ textAlign: "right" }}>
//                 <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>Expired on</div>
//                 <div style={{ fontWeight: 600, color: "#111827" }}>
//                   {subscriptionData?.endDate ? new Date(subscriptionData.endDate).toLocaleDateString() : "N/A"}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { Sparkles, ArrowRight, Check, Lock, User, Building, Gem } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SubscriptionBannerProps {
  subscriptionData: {
    hasSubscription: boolean;
    status: "active" | "expired" | "inactive" | "pending" | "error";
    daysLeft: number;
    startDate: string | null;
    endDate: string | null;
    planType?: "free" | "Personal" | "Business" | "Business Premium";
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

type PlanDetails = {
  free: PlanDetail;
  Personal: PlanDetail & { price: string };
  Business: PlanDetail & { price: string };
  "Business Premium": PlanDetail & { price: string };
}

const planDetails: PlanDetails = {
  free: {
    name: "Free Trial",
    description: "You're on a free trial. Upgrade to continue after trial ends.",
    features: ["Up to 5 cards", "Basic analytics", "Standard templates"],
    icon: Sparkles,
    color: "#f97316",
  },
  Personal: {
    name: "",
    price: "",
    description: "Perfect for individuals with their digital presence.",
    features: [""],
    icon: User,
    color: "#3b82f6",
  },
  Business: {
    name: "Business Plan",
    price: "₹800/month",
    description: "Ideal for professionals and small teams.",
    features: [""],
    icon: Building,
    color: "#8b5cf6",
  },
  "Business Premium": {
    name: "Premium Plan",
    price: "₹1200/month",
    description: "Unlimited power for growing businesses.",
    features: [""],
    icon: Gem,
    color: "#f59e0b",
  },
};

export function SubscriptionBanner({ 
  subscriptionData, 
  remainingDays, 
  cardsUsed, 
  userCards, 
  onUpgrade 
}: SubscriptionBannerProps) {
  const navigate = useNavigate();
  
  // Determine current plan based on subscription data with priority
  const getCurrentPlan = () => {
    // If subscriptionData is null, show free trial
    if (!subscriptionData) return "free" as const;
    
    // Use planType if available from API - match your card types exactly
    if (subscriptionData.planType) {
      const plan = subscriptionData.planType;
      if (plan === "Business Premium") return "Business Premium" as const;
      if (plan === "Business") return "Business" as const;
      if (plan === "Personal") return "Personal" as const;
      if (plan === "free") return "free" as const;
    }
    
    // Check user's cards to detect highest card type
    if (userCards && userCards.length > 0) {
      const cardTypes = userCards.map(card => card.cardType);
      
      if (cardTypes.some(type => type === "Business Premium")) {
        return "Business Premium" as const;
      }
      
      if (cardTypes.some(type => type === "Business")) {
        return "Business" as const;
      }
      
      if (cardTypes.some(type => type === "Personal")) {
        return "Personal" as const;
      }
    }
    
    // Determine based on hasSubscription and status
    if (subscriptionData.hasSubscription) {
      if (subscriptionData.status === "active") {
        // Default to Personal if has subscription but no specific type
        return "Personal" as const;
      }
    }
    
    // If expired or inactive, show free (needs upgrade)
    if (subscriptionData.status === "expired" || subscriptionData.status === "inactive") {
      return "free" as const;
    }
    
    // Default to free trial
    return "free" as const;
  };
  
  const plan = getCurrentPlan();
  const details = planDetails[plan as keyof typeof planDetails];
  const PlanIcon = details.icon;
  
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
    if (remainingDays > 0 && remainingDays <= 30) {
      return ((30 - remainingDays) / 30) * 100;
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
      return `${remainingDays} day${remainingDays === 1 ? '' : 's'} left in trial`;
    }
    
    return "Trial ended";
  };

  // If user has an active paid subscription
  if (isActiveSubscription && plan !== "free") {
    const priceDisplay = getPriceDisplay();
    const daysDisplay = getDaysDisplay();
    const daysProgress = getDaysProgress();
    
    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "1rem",
          padding: "1.5rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
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
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "0.75rem",
                background: `linear-gradient(135deg, ${details.color} 0%, ${details.color}99 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PlanIcon style={{ width: 20, height: 20, color: "#ffffff" }} />
            </div>
            <div>
              <h3 style={{ fontWeight: 600, color: "#111827", margin: 0 }}>{details.name}</h3>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: 4 }}>
                {priceDisplay} • Active subscription
              </p>
            </div>
          </div>
          <button
            onClick={onUpgrade}
            style={{
              border: "1px solid #3b82f6",
              backgroundColor: "transparent",
              color: "#3b82f6",
              padding: "0.25rem 0.75rem",
              borderRadius: "0.5rem",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.875rem",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#3b82f6", e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent", e.currentTarget.style.color = "#3b82f6")}
          >
            Manage Plan
          </button>
        </div>

        {/* Days Progress Bar for active subscriptions */}
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Subscription Status</span>
            <span style={{ 
              fontSize: "0.875rem", 
              fontWeight: "600",
              color: subscriptionData?.daysLeft && subscriptionData.daysLeft <= 7 ? "#f59e0b" : "#111827"
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
                backgroundColor: subscriptionData?.daysLeft && subscriptionData.daysLeft <= 7 ? "#f59e0b" : "rgba(59, 130, 246, 0.8)",
                borderRadius: 9999,
                transition: "width 0.5s ease",
              }}
            />
          </div>
          {subscriptionData?.daysLeft && subscriptionData.daysLeft <= 7 && subscriptionData.daysLeft > 0 && (
            <p style={{ fontSize: "0.75rem", color: "#f59e0b", marginTop: "0.5rem" }}>
              Your subscription will expire soon. Renew to continue uninterrupted service.
            </p>
          )}
          {subscriptionData?.daysLeft === 0 && (
            <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: "0.5rem" }}>
              Your subscription has expired. Renew to restore all features.
            </p>
          )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {details.features.map((feature) => (
            <span
              key={feature}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "0.25rem 0.75rem",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                color: "#3b82f6",
                fontSize: "0.75rem",
                fontWeight: 600,
                borderRadius: "9999px",
              }}
            >
              <Check style={{ width: 12, height: 12 }} /> {feature}
            </span>
          ))}
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
                : details.description
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

            {/* Plan Options - Highlight current plan if any */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              <div
                style={{
                  padding: "0.375rem 0.75rem",
                  backgroundColor: plan === "Personal" ? "rgba(147,197,253,0.2)" : "#ffffff",
                  border: plan === "Personal" ? "1px solid rgba(59,130,246,0.3)" : "1px solid #d1d5db",
                  borderRadius: 12,
                  fontSize: "0.75rem",
                  color: plan === "Personal" ? "#2563eb" : "#111827",
                  fontWeight: 600,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  minWidth: 120,
                }}
              >
                <div>Personal</div>
                <div style={{ 
                  color: plan === "Personal" ? "rgba(37,99,235,0.7)" : "#6b7280",
                  fontSize: "0.7rem",
                  marginTop: 2
                }}>
                  ₹500/month 
                </div>
              </div>
              <div
                style={{
                  padding: "0.375rem 0.75rem",
                  backgroundColor: plan === "Business" ? "rgba(147,197,253,0.2)" : "#ffffff",
                  border: plan === "Business" ? "1px solid rgba(59,130,246,0.3)" : "1px solid #d1d5db",
                  borderRadius: 12,
                  fontSize: "0.75rem",
                  color: plan === "Business" ? "#2563eb" : "#111827",
                  fontWeight: 600,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  minWidth: 120,
                }}
              >
                <div>Business</div>
                <div style={{ 
                  color: plan === "Business" ? "rgba(37,99,235,0.7)" : "#6b7280",
                  fontSize: "0.7rem",
                  marginTop: 2
                }}>
                  ₹800/month 
                </div>
              </div>
              <div
                style={{
                  padding: "0.375rem 0.75rem",
                  backgroundColor: plan === "Business Premium" ? "rgba(147,197,253,0.2)" : "#ffffff",
                  border: plan === "Business Premium" ? "1px solid rgba(59,130,246,0.3)" : "1px solid #d1d5db",
                  borderRadius: 12,
                  fontSize: "0.75rem",
                  color: plan === "Business Premium" ? "#2563eb" : "#111827",
                  fontWeight: 600,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  minWidth: 120,
                }}
              >
                <div>Business Premium</div>
                <div style={{ 
                  color: plan === "Business Premium" ? "rgba(37,99,235,0.7)" : "#6b7280",
                  fontSize: "0.7rem",
                  marginTop: 2
                }}>
                  ₹1200/month 
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