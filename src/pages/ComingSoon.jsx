import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Sparkles,
  ArrowLeft,
  Clock,
  Bell,
  CheckCircle,
  CreditCard,
  Zap,
  User,
  Settings,
  HelpCircle,
  Layers,
  ShieldCheck,
  Check
} from "lucide-react";

const featureConfig = {
  "My Cards": {
    icon: CreditCard,
    category: "Digital Identity",
    color: "blue",
    highlights: ["Interactive Card Designer", "Dynamic QR Code Generator", "NFC Tag Writer", "Instant VCF Contacts Export"],
  },
  "Analytics & Performance": {
    icon: Zap,
    category: "Telemetry & Growth",
    color: "amber",
    highlights: ["Card View Tracking", "Contact Save Conversion Rate", "Geographic Audience Map", "Automated Weekly Digest"],
  },
  "Account Profile": {
    icon: User,
    category: "Identity & Security",
    color: "emerald",
    highlights: ["Single Sign-On (SSO)", "Multi-Factor Authentication", "Custom Branding Assets", "Activity Audit Logs"],
  },
  "Settings & Preferences": {
    icon: Settings,
    category: "System Configuration",
    color: "violet",
    highlights: ["Notification Thresholds", "Sub-Account Role Access", "Webhooks & API Keys", "Billing & Invoice Archive"],
  },
  "Help & Support": {
    icon: HelpCircle,
    category: "Assistance & Docs",
    color: "cyan",
    highlights: ["Interactive Knowledge Base", "Live Chat With Support Agent", "API & Webhook Documentation", "Video Walkthrough Guides"],
  },
};

const ComingSoon = ({ feature = "Coming Soon", description }) => {
  const navigate = useNavigate();
  const [notified, setNotified] = useState(false);

  const reduxRole = useSelector((state) => state.role?.role);
  const userRole = reduxRole || localStorage.getItem("role") || localStorage.getItem("user_role") || "";

  const getDashboardUrl = () => {
    switch (userRole) {
      case "franchise":
        return "/franchise/dashboard";
      case "partner":
        return "/partner/dashboard";
      case "admin":
        return "/admin-dashboard";
      default:
        return "/card-dashbord";
    }
  };

  const config = featureConfig[feature] || {
    icon: Sparkles,
    category: "New Feature",
    color: "blue",
    highlights: ["Enterprise Grade Architecture", "Mobile First Design", "Optimized Performance", "Secure Data Storage"],
  };

  const IconComponent = config.icon;

  const defaultDescription =
    description ||
    "We are actively building and polishing this section to bring you a seamless, enterprise-grade experience. This feature will be live in our upcoming release.";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/70 dark:bg-slate-950 p-6 lg:p-10 flex items-center justify-center transition-colors">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-8 sm:p-10 text-center relative overflow-hidden">
        
        {/* Subtle Decorative Gradient Backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Feature Category Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 mb-6">
          <Clock className="w-3.5 h-3.5 text-blue-500" />
          <span>Under Active Development • {config.category}</span>
        </div>

        {/* Feature Icon Badge */}
        <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900 flex items-center justify-center shadow-xs mb-5">
          <IconComponent className="w-7 h-7" />
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
          {feature}
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mb-8">
          {defaultDescription}
        </p>

        {/* Upcoming Capability Pills */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-5 border border-slate-200/70 dark:border-slate-800 mb-8 text-left">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>Planned Capabilities on Roadmap</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {config.highlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-200/70 dark:border-slate-700/60 shadow-2xs"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(getDashboardUrl())}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs hover:shadow-sm transition-all duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <button
            onClick={() => setNotified(true)}
            disabled={notified}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-150 ${
              notified
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800 cursor-default"
                : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {notified ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>You're on the early access list!</span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4 text-slate-400" />
                <span>Notify me when live</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ComingSoon;
