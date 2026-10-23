import { LucideIcon } from "lucide-react";
import { cn } from "../dashbord/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  iconBg?: string;
  iconColor?: string;
  progress?: number;
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
  badge,
  badgeColor,
  iconBg = "bg-blue-50 dark:bg-blue-950/40",
  iconColor = "text-blue-600 dark:text-blue-400",
  progress,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-300 bg-white dark:bg-boxdark border border-slate-200 dark:border-strokedark flex flex-col justify-between",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-3">
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {title}
            </p>
            {badge && (
              <span
                className={cn(
                  "text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0",
                  badgeColor || "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                )}
              >
                {badge}
              </span>
            )}
          </div>

          <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            {value}
          </p>

          {subtitle && (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {subtitle}
            </p>
          )}

          {trend && (
            <p
              className={cn(
                "text-xs mt-1.5 font-medium flex items-center gap-1",
                trend.isPositive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              )}
            >
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>
                {trend.isPositive ? "+" : ""}
                {trend.value}% from last month
              </span>
            </p>
          )}

          {progress !== undefined && (
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
              />
            </div>
          )}
        </div>

        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs", iconBg)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
      </div>
    </div>
  );
}
