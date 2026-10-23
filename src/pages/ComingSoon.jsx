import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Clock, ArrowLeft } from "lucide-react";

const ComingSoon = ({ feature = "Coming Soon", description }) => {
  const navigate = useNavigate();

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

  const defaultDescription =
    description ||
    "This feature is currently under active development and will be available in an upcoming release.";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50/70 dark:bg-slate-950 p-6 lg:p-10 flex items-center justify-center transition-colors">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-8 sm:p-10 text-center relative overflow-hidden">
        
        {/* Subtle Decorative Gradient Backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Feature Status Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 mb-6">
          <Clock className="w-3.5 h-3.5 text-blue-500" />
          <span>Under Active Development</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
          {feature}
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
          {defaultDescription}
        </p>

        {/* Action Controls */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => navigate(getDashboardUrl())}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs hover:shadow-sm transition-all duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ComingSoon;

