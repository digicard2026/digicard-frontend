// import { Eye, Edit2, Share2, MoreVertical, QrCode, Crown, Sparkles, Star } from "lucide-react";
// import { cn } from "../dashbord/lib/utils";
// import { Badge } from "../dashbord/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../dashbord/ui/dropdown-menu";

// export type CardPlan = "personal" | "business" | "premium";

// export interface Card {
//   id: string;
//   name: string;
//   title: string;
//   company: string;
//   email: string;
//   phone: string;
//   views: number;
//   shares: number;
//   gradient: "teal" | "coral" | "purple" | "blue" | "dark";
//   plan: CardPlan;
//   trialDaysLeft: number;
//   subscriptionStartDate: Date;
//   urlSlug?: string;
//   cardData?: any;
// }

// interface DigitalCardPreviewProps {
//   card: Card;
//   onView?: () => void;
//   onEdit?: () => void;
//   onShare?: () => void;
// }

// const planConfig: Record<CardPlan, { label: string; icon: typeof Crown; color: string; price: string }> = {
//   personal: { label: "Personal", icon: Star, color: "bg-blue-500/90", price: "$5/mo" },
//   business: { label: "Business", icon: Sparkles, color: "bg-violet-500/90", price: "$15/mo" },
//   premium: { label: "Premium", icon: Crown, color: "bg-amber-500/90", price: "$29/mo" },
// };

// export function DigitalCardPreview({ card, onView, onEdit, onShare }: DigitalCardPreviewProps) {
//   const plan = planConfig[card.plan];
//   const PlanIcon = plan.icon;
//   const isOnTrial = card.trialDaysLeft > 0;

//   const gradientClass = cn(
//     "bg-gradient-to-br",
//     card.gradient === "teal" && "from-emerald-500 to-teal-600",
//     card.gradient === "coral" && "from-orange-500 to-pink-500",
//     card.gradient === "purple" && "from-violet-500 to-purple-600",
//     card.gradient === "blue" && "from-blue-500 to-cyan-500",
//     card.gradient === "dark" && "from-slate-800 to-slate-900"
//   );

//   // Handle View Card
//   const handleView = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (onView) {
//       onView();
//     }
//   };

//   // Handle Edit Card
//   const handleEdit = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (onEdit) {
//       onEdit();
//     }
//   };

//   // Handle Share Card
//   const handleShare = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (onShare) {
//       onShare();
//     }
//   };

//   // Handle Download QR
//   const handleDownloadQR = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (card.urlSlug) {
//       // Generate QR code URL or implement QR download logic
//       const qrUrl = `${window.location.origin}/preview/${card.urlSlug}/qr`;
//       alert(`QR Code URL: ${qrUrl}\n\nQR download functionality to be implemented.`);
//     } else {
//       alert('This card does not have a shareable URL yet. Please edit and save the card first.');
//     }
//   };

//   return (
//     <div className="group relative animate-fade-in">
//       {/* Plan Badge */}
//       <div className="absolute -top-2 -right-2 z-10 flex flex-col items-end gap-1">
//         <Badge className={cn("flex items-center gap-1 text-white border-0 shadow-md", plan.color)}>
//           <PlanIcon className="w-3 h-3" />
//           {plan.label}
//         </Badge>
//         {isOnTrial && (
//           <Badge variant="outline" className="bg-card/95 backdrop-blur-sm text-xs font-medium">
//             {card.trialDaysLeft} days trial left
//           </Badge>
//         )}
//       </div>

//       {/* Card Preview */}
//       <div
//         className={cn(
//           "relative aspect-[1.6/1] rounded-2xl overflow-hidden card-shadow transition-all duration-300 group-hover:card-shadow-hover group-hover:-translate-y-1",
//           gradientClass
//         )}
//       >
//         {/* Card Content */}
//         <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="text-xl font-bold">{card.name}</h3>
//               <p className="text-sm opacity-90">{card.title}</p>
//               <p className="text-xs opacity-75 mt-1">{card.company}</p>
//             </div>
//             <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
//               <QrCode className="w-5 h-5" />
//             </div>
//           </div>

//           <div className="space-y-1">
//             <p className="text-xs opacity-80">{card.email}</p>
//             <p className="text-xs opacity-80">{card.phone}</p>
//           </div>
//         </div>

//         {/* Hover Overlay */}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
//           <button 
//             onClick={handleView}
//             className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
//             title="View Card"
//           >
//             <Eye className="w-4 h-4 text-gray-800" />
//           </button>
//           <button 
//             onClick={handleEdit}
//             className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
//             title="Edit Card"
//           >
//             <Edit2 className="w-4 h-4 text-gray-800" />
//           </button>
//           <button 
//             onClick={handleShare}
//             className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
//             title="Share Card"
//           >
//             <Share2 className="w-4 h-4 text-gray-800" />
//           </button>
//         </div>
//       </div>

//       {/* Card Meta */}
//       <div className="mt-4 flex items-center justify-between">
//         <div>
//           <h4 className="font-semibold text-foreground">{card.name}</h4>
//           <p className="text-sm text-muted-foreground">{card.company}</p>
//         </div>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <button className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
//               <MoreVertical className="w-4 h-4 text-muted-foreground" />
//             </button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={handleView}>
//               <Eye className="w-4 h-4 mr-2" /> View Card
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={handleEdit}>
//               <Edit2 className="w-4 h-4 mr-2" /> Edit Card
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={handleShare}>
//               <Share2 className="w-4 h-4 mr-2" /> Share Card
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={handleDownloadQR}>
//               <QrCode className="w-4 h-4 mr-2" /> Download QR
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       {/* Stats */}
//       <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
//         <div className="flex items-center gap-4">
//           <span className="flex items-center gap-1">
//             <Eye className="w-3.5 h-3.5" /> {card.views} views
//           </span>
//           <span className="flex items-center gap-1">
//             <Share2 className="w-3.5 h-3.5" /> {card.shares} shares
//           </span>
//         </div>
//         <span className="text-xs font-medium">
//           {isOnTrial ? "Trial" : plan.price}
//         </span>
//       </div>
//     </div>
//   );
// }
// DigitalCardPreview.tsx
import { Eye, Edit2, Share2, MoreVertical, QrCode, User, Building, Gem } from "lucide-react";
import { cn } from "../dashbord/lib/utils";
import { Badge } from "../dashbord/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dashbord/ui/dropdown-menu";

// Match your model exactly
export type CardType = "Personal" | "Business" | "Business Premium";

export interface Card {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  views: number;
  shares: number;
  gradient: "teal" | "coral" | "purple" | "blue" | "dark";
  cardType: CardType;
  trialDaysLeft: number;
  subscriptionStartDate: Date;
  urlSlug?: string;
  cardData?: any;
}

interface DigitalCardPreviewProps {
  card: Card;
  onView?: () => void;
  onEdit?: () => void;
  onShare?: () => void;
}

const cardTypeConfig: Record<CardType, { 
  label: string; 
  icon: typeof User; 
  color: string; 
  price: string 
}> = {
  "Personal": { 
    label: "Personal", 
    icon: User, 
    color: "bg-blue-500/90", 
    price: "" 
  },
  "Business": { 
    label: "Business", 
    icon: Building, 
    color: "bg-violet-500/90", 
    price: "" 
  },
  "Business Premium": { 
    label: "Premium", 
    icon: Gem, 
    color: "bg-amber-500/90", 
    price: "" 
  },
};

export function DigitalCardPreview({ card, onView, onEdit, onShare }: DigitalCardPreviewProps) {
  const cardType = card.cardType;
  const config = cardTypeConfig[cardType];
  const CardIcon = config.icon;
  const isOnTrial = card.trialDaysLeft > 0;

  const gradientClass = cn(
    "bg-gradient-to-br",
    card.gradient === "teal" && "from-emerald-500 to-teal-600",
    card.gradient === "coral" && "from-orange-500 to-pink-500",
    card.gradient === "purple" && "from-violet-500 to-purple-600",
    card.gradient === "blue" && "from-blue-500 to-cyan-500",
    card.gradient === "dark" && "from-slate-800 to-slate-900"
  );

  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onView) onView();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit();
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) onShare();
  };

  const handleDownloadQR = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (card.urlSlug) {
      const qrUrl = `${window.location.origin}/preview/${card.urlSlug}/qr`;
      alert(`QR Code URL: ${qrUrl}\n\nQR download functionality to be implemented.`);
    } else {
      alert('This card does not have a shareable URL yet. Please edit and save the card first.');
    }
  };

  return (
    <div className="group relative animate-fade-in">
      {/* Card Type Badge */}
      <div className="absolute -top-2 -right-2 z-10 flex flex-col items-end gap-1">
        <Badge className={cn("flex items-center gap-1 text-white border-0 shadow-md", config.color)}>
          <CardIcon className="w-3 h-3" />
          {config.label}
        </Badge>
        {/* {isOnTrial && (
          <Badge variant="outline" className="bg-card/95 backdrop-blur-sm text-xs font-medium  text-white">
            {card.trialDaysLeft} days trial left
          </Badge>
        )} */}
      </div>

      {/* Card Preview */}
      <div
        className={cn(
          "relative aspect-[1.6/1] rounded-2xl overflow-hidden card-shadow transition-all duration-300 group-hover:card-shadow-hover group-hover:-translate-y-1",
          gradientClass
        )}
      >
        <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{card.name}</h3>
              <p className="text-sm opacity-90">{card.title}</p>
              <p className="text-xs opacity-75 mt-1">{card.company}</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <QrCode className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs opacity-80">{card.email}</p>
            <p className="text-xs opacity-80">{card.phone}</p>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button 
            onClick={handleView}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="View Card"
          >
            <Eye className="w-4 h-4 text-gray-800" />
          </button>
          <button 
            onClick={handleEdit}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="Edit Card"
          >
            <Edit2 className="w-4 h-4 text-gray-800" />
          </button>
          <button 
            onClick={handleShare}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="Share Card"
          >
            <Share2 className="w-4 h-4 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Card Meta */}
      <div className="mt-4 flex items-center justify-between ml-4">
        <div>
          <h4 className="font-semibold text-foreground">{card.name}</h4>
          <p className="text-sm text-muted-foreground">{card.company}</p>
        </div>
       <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
      <MoreVertical className="w-4 h-4 text-muted-foreground" />
    </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="text-white bg-gray-800 border-gray-700">
    <DropdownMenuItem onClick={handleView} className="text-white focus:text-white focus:bg-gray-700">
      <Eye className="w-4 h-4 mr-2" /> View Card
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleEdit} className="text-white focus:text-white focus:bg-gray-700">
      <Edit2 className="w-4 h-4 mr-2" /> Edit Card
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleShare} className="text-white focus:text-white focus:bg-gray-700">
      <Share2 className="w-4 h-4 mr-2" /> Share Card
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleDownloadQR} className="text-white focus:text-white focus:bg-gray-700">
      <QrCode className="w-4 h-4 mr-2" /> Download QR
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
      </div>

      {/* Stats */}
      <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> {card.views} views
          </span>
          <span className="flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5" /> {card.shares} shares
          </span>
        </div>
        <span className="text-xs font-medium">
          {config.price}
        </span>
      </div>
    </div>
  );
}