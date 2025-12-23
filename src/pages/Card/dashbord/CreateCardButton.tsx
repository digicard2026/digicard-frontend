// import { Plus } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { cn } from "../dashbord/lib/utils";

// interface CreateCardButtonProps {
//   className?: string;
// }

// export function CreateCardButton({ className }: CreateCardButtonProps) {
//   const navigate = useNavigate();

//   return (
//     <button
//       onClick={() => navigate("/create")}
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
import { Plus } from "lucide-react";
import { cn } from "../dashbord/lib/utils";

interface CreateCardButtonProps {
  className?: string;
  onClick?: () => void; // Add this prop
}

export function CreateCardButton({ className, onClick }: CreateCardButtonProps) {
  return (
    <button
      onClick={onClick} // Use the onClick prop instead of inline navigate
      className={cn(
        "group relative aspect-[1.6/1] rounded-2xl border-2 border-dashed border-muted-foreground/30",
        "bg-muted/30 hover:bg-muted/50 hover:border-primary/50 transition-all duration-300",
        "flex flex-col items-center justify-center gap-3",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors duration-300">
        <Plus className="w-7 h-7 text-primary" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-foreground">Create New Card</p>
        <p className="text-sm text-muted-foreground">Design your digital business card</p>
      </div>
    </button>
  );
}