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
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-800 bg-white",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <p className="text-3xl font-bold text-gray-900 mt-2">
            {value}
          </p>

          {trend && (
            <p
              className={cn(
                "text-sm mt-2 font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}% from last month
            </p>
          )}
        </div>

        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
}
