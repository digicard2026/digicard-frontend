import { Sparkles, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SubscriptionBannerProps {
  plan: "free" | "personal" | "business" | "premium";
  cardsUsed: number;
  cardsLimit: number;
  trialDaysLeft?: number;
}

const planDetails = {
  free: {
    name: "Free Trial",
    description: "You're on a 30-day free trial. Upgrade to continue after trial ends.",
    features: ["Limited cards", "Basic analytics", "Standard templates"],
  },
  personal: {
    name: "Personal Plan",
    price: "$5/mo",
    description: "Perfect for individuals with their digital presence.",
    features: ["1 Digital Card", "Basic analytics", "Standard templates", "Email support"],
  },
  business: {
    name: "Business Plan",
    price: "$15/mo",
    description: "Ideal for professionals and small teams.",
    features: ["5 Digital Cards", "Advanced analytics", "Premium templates", "Priority support"],
  },
  premium: {
    name: "Premium Plan",
    price: "$29/mo",
    description: "Unlimited power for growing businesses.",
    features: ["Unlimited Cards", "Real-time analytics", "All templates", "24/7 support"],
  },
};

export function SubscriptionBanner({ plan, cardsUsed, cardsLimit, trialDaysLeft }: SubscriptionBannerProps) {
  const navigate = useNavigate();
  const details = planDetails[plan];
  const usagePercentage = (cardsUsed / cardsLimit) * 100;
  const isNearLimit = usagePercentage >= 80;

  if (plan !== "free") {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "1rem",
          padding: "1.5rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "1px solid rgba(59, 130, 246, 0.2)", // primary/20 from screenshot (blueish)
          color: "#1f2937", // text color (gray-800)
          fontFamily: "system-ui, sans-serif",
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
                background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)", // bright blue gradient
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles style={{ width: 20, height: 20, color: "#ffffff" }} />
            </div>
            <div>
              <h3 style={{ fontWeight: 600, color: "#111827", margin: 0 }}>{details.name}</h3>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: 4 }}>
                {(details as any).price} • Active subscription
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/pricing")}
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {details.features.map((feature) => (
            <span
              key={feature}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "0.25rem 0.75rem",
                backgroundColor: "rgba(59, 130, 246, 0.1)", // primary/10
                color: "#3b82f6", // primary color
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

  // Free plan (trial) UI
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(90deg, rgba(251,253,255,0.7) 0%, rgba(238,246,255,0.7) 100%)",
        borderRadius: "1rem",
        padding: "1.5rem",
        border: "1px solid rgba(59, 130, 246, 0.2)", // primary/20 border
        fontFamily: "system-ui, sans-serif",
        color: "#1f2937",
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
          backgroundColor: "rgba(59, 130, 246, 0.03)", // primary/5
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
              <Sparkles style={{ width: 20, height: 20, color: "#f97316" }} /> {/* accent color orange */}
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f97316" }}>
                {trialDaysLeft !== undefined ? `${trialDaysLeft} days left in trial` : "30-Day Free Trial"}
              </span>
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: 8 }}>
              Choose Your Plan
            </h3>
            <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: 16 }}>
              {details.description}
            </p>

            {/* Usage Bar */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: 8 }}>
                <span style={{ color: "#6b7280" }}>Cards used</span>
                <span style={{ color: isNearLimit ? "#f59e0b" : "#111827", fontWeight: isNearLimit ? "600" : "400" }}>
                  {cardsUsed} / {cardsLimit}
                </span>
              </div>
              <div
                style={{
                  height: 8,
                  backgroundColor: "#e5e7eb", // muted bg gray-200
                  borderRadius: 9999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(usagePercentage, 100)}%`,
                    backgroundColor: isNearLimit ? "#f59e0b" : "rgba(59, 130, 246, 0.6)", // warning orange or primary gradient fallback
                    borderRadius: 9999,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>

            {/* Plan Options */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              <span
                style={{
                  padding: "0.375rem 0.75rem",
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db", // border-gray-300
                  borderRadius: 12,
                  fontSize: "0.75rem",
                  color: "#111827",
                  fontWeight: 600,
                }}
              >
                Personal <span style={{ color: "#6b7280" }}>$5/mo</span>
              </span>
              <span
                style={{
                  padding: "0.375rem 0.75rem",
                  backgroundColor: "rgba(147,197,253,0.2)", // blue-300/20
                  border: "1px solid rgba(59,130,246,0.3)", // primary/30
                  borderRadius: 12,
                  fontSize: "0.75rem",
                  color: "#2563eb", // blue-600 text-primary
                  fontWeight: 600,
                }}
              >
                Business <span style={{ color: "rgba(37,99,235,0.7)" }}>$15/mo</span>
              </span>
              <span
                style={{
                  padding: "0.375rem 0.75rem",
                  backgroundColor: "#ffffff",
                  border: "1px solid #d1d5db", // border-gray-300
                  borderRadius: 12,
                  fontSize: "0.75rem",
                  color: "#111827",
                  fontWeight: 600,
                }}
              >
                Premium <span style={{ color: "#6b7280" }}>$29/mo</span>
              </span>
            </div>

            <button
              onClick={() => navigate("/pricing")}
              style={{
                background: "linear-gradient(90deg, #f97316 0%, #ea580c 100%)", // gradient-accent from screenshot (orange)
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
              View Plans
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
