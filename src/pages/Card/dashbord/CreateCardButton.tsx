import { Plus } from "lucide-react";
import { cn } from "../dashbord/lib/utils";

interface CreateCardButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  description?: string;
}

export function CreateCardButton({ 
  className, 
  onClick, 
  disabled = false,
  label = "Create New Card",
  description = "Design your digital business card"
}: CreateCardButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative aspect-[1.6/1] rounded-2xl border-2 border-dashed transition-all duration-300",
        "flex flex-col items-center justify-center gap-3",
        "bg-slate-50/60 hover:bg-slate-100/80 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 hover:scale-[1.01]",
        disabled 
          ? "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20 text-slate-400 cursor-not-allowed hover:scale-100" 
          : "border-slate-300 dark:border-strokedark hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-sm cursor-pointer",
        "p-4 sm:p-6",
        className
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
        disabled ? "bg-slate-200 dark:bg-slate-800" : "bg-blue-50 dark:bg-blue-950/60 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/60 shadow-xs"
      )}>
        <Plus className={cn(
          "w-6 h-6 transition-colors duration-300",
          disabled ? "text-slate-400" : "text-blue-600 dark:text-blue-400"
        )} />
      </div>

      <div className="text-center max-w-[200px]">
        <p className={cn(
          "font-semibold text-sm transition-colors duration-300 line-clamp-1",
          disabled ? "text-slate-400 dark:text-slate-600" : "text-slate-900 dark:text-white"
        )}>
          {label}
        </p>
        <p className={cn(
          "text-xs mt-0.5 transition-colors duration-300 line-clamp-2",
          disabled ? "text-slate-400 dark:text-slate-600" : "text-slate-500 dark:text-slate-400"
        )}>
          {description}
        </p>
      </div>
      
      {!disabled && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl" />
          <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/20 ring-inset" />
        </div>
      )}
    </button>
  );
}