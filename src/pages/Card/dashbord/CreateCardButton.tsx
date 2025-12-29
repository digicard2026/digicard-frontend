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
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative aspect-[1.6/1] rounded-2xl border-2 border-dashed transition-all duration-300",
        "flex flex-col items-center justify-center gap-4",
        "bg-muted/30 hover:bg-muted/50 hover:scale-[1.02]",
        disabled 
          ? "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed hover:scale-100" 
          : "border-muted-foreground/30 hover:border-primary/50",
        "p-4 sm:p-6",
        className
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300",
        disabled ? "bg-gray-200" : "bg-primary/10 group-hover:bg-primary/20"
      )}>
        <Plus className={cn(
          "w-6 h-6 transition-colors duration-300",
          disabled ? "text-gray-400" : "text-primary"
        )} />
      </div>
      <div className="text-center max-w-[180px]">
        <p className={cn(
          "font-semibold text-sm sm:text-base transition-colors duration-300 line-clamp-1",
          disabled ? "text-gray-500" : "text-foreground"
        )}>
          {label}
        </p>
        <p className={cn(
          "text-xs sm:text-sm mt-1 transition-colors duration-300 line-clamp-2",
          disabled ? "text-gray-400" : "text-muted-foreground"
        )}>
          {description}
        </p>
      </div>
      
      {!disabled && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
          <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/20 ring-inset" />
        </div>
      )}
    </button>
  );
}
// import { Plus } from "lucide-react";
// import { cn } from "../dashbord/lib/utils";

// interface CreateCardButtonProps {
//   className?: string;
//   onClick?: () => void; // Add this prop
// }

// export function CreateCardButton({ className, onClick }: CreateCardButtonProps) {
//   return (
//     <button
//       onClick={onClick} // Use the onClick prop instead of inline navigate
//       className={cn(
//         "group relative aspect-[1.6/1] rounded-2xl border-2 border-dashed border-muted-foreground/30",
//         "bg-muted/30 hover:bg-muted/50 hover:border-primary/50 transition-all duration-300",
//         "flex flex-col items-center justify-center gap-3",
//         className
//       )}
//     >
//       <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors duration-300">
//         <Plus className="w-7 h-7 text-primary" />
//       </div>
//       <div className="text-center">
//         <p className="font-semibold text-foreground">Create New Card</p>
//         <p className="text-sm text-muted-foreground">Design your digital business card</p>
//       </div>
//     </button>
//   );
// }