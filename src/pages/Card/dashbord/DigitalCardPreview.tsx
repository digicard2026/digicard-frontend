import { 
  Eye, 
  Edit2, 
  Share2, 
  MoreVertical, 
  QrCode, 
  User, 
  Building, 
  Gem, 
  Briefcase, 
  Award, 
  Rocket, 
  Layers, 
  ShieldCheck, 
  Users, 
  Globe,
  Maximize2,
  Trash2
} from "lucide-react";
import { cn } from "../dashbord/lib/utils";
import { Badge } from "../dashbord/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dashbord/ui/dropdown-menu";

// Complete 10-tier CardType mapping matching DigiCard Plan Architecture
export type CardType = 
  | "Personal" 
  | "Business" 
  | "BusinessPremium" 
  | "Professionals" 
  | "ProfessionalPro" 
  | "Entrepreneurials" 
  | "EntrepreneurialsMulti" 
  | "CorporateBusiness" 
  | "Team" 
  | "MiniWebsite"
  | string;

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
  onDownloadQR?: () => void;
  onInspect?: () => void;
  onDelete?: () => void;
}

const cardTypeConfig: Record<string, {
  label: string;
  icon: typeof User;
  color: string;
  price: string;
}> = {
  "Personal": {
    label: "DI - Individuals",
    icon: User,
    color: "bg-blue-500/90",
    price: "₹500/mo"
  },
  "Business": {
    label: "DI - Working Pro",
    icon: Building,
    color: "bg-indigo-500/90",
    price: "₹800/mo"
  },
  "BusinessPremium": {
    label: "DI - Service Provider",
    icon: Gem,
    color: "bg-amber-500/90",
    price: "₹1,200/mo"
  },
  "Professionals": {
    label: "DI - Professional",
    icon: Briefcase,
    color: "bg-purple-600/90",
    price: "₹1,500/mo"
  },
  "ProfessionalPro": {
    label: "DI - Specialist",
    icon: Award,
    color: "bg-fuchsia-600/90",
    price: "₹1,800/mo"
  },
  "Entrepreneurials": {
    label: "DI - Entrepreneur",
    icon: Rocket,
    color: "bg-emerald-600/90",
    price: "₹1,800/mo"
  },
  "EntrepreneurialsMulti": {
    label: "DI - Multi-Activities",
    icon: Layers,
    color: "bg-teal-600/90",
    price: "₹2,200/mo"
  },
  "CorporateBusiness": {
    label: "DI - Corporate",
    icon: ShieldCheck,
    color: "bg-blue-700/90",
    price: "₹2,500/mo"
  },
  "Team": {
    label: "DI - Team",
    icon: Users,
    color: "bg-violet-700/90",
    price: "₹2,800/mo"
  },
  "MiniWebsite": {
    label: "DP - Mini Website",
    icon: Globe,
    color: "bg-rose-600/90",
    price: "₹3,000/mo"
  }
};

// Canonical resolver for plan key with case & whitespace tolerance
const resolveCardConfig = (rawType: string = "Personal") => {
  if (!rawType) return cardTypeConfig["Personal"];
  if (cardTypeConfig[rawType]) return cardTypeConfig[rawType];
  
  const cleaned = rawType.replace(/[\s\-_]/g, '').toLowerCase();
  for (const key of Object.keys(cardTypeConfig)) {
    if (key.toLowerCase() === cleaned) return cardTypeConfig[key];
  }
  
  if (cleaned.includes("miniwebsite") || cleaned.includes("website")) return cardTypeConfig["MiniWebsite"];
  if (cleaned.includes("team")) return cardTypeConfig["Team"];
  if (cleaned.includes("corporate")) return cardTypeConfig["CorporateBusiness"];
  if (cleaned.includes("multiactivit") || cleaned.includes("multi")) return cardTypeConfig["EntrepreneurialsMulti"];
  if (cleaned.includes("entrepreneur")) return cardTypeConfig["Entrepreneurials"];
  if (cleaned.includes("professionalpro")) return cardTypeConfig["ProfessionalPro"];
  if (cleaned.includes("professional")) return cardTypeConfig["Professionals"];
  if (cleaned.includes("serviceprovider") || cleaned.includes("businesspremium")) return cardTypeConfig["BusinessPremium"];
  if (cleaned.includes("business")) return cardTypeConfig["Business"];
  
  return cardTypeConfig["Personal"];
};

export function DigitalCardPreview({ 
  card, 
  onView, 
  onEdit, 
  onShare, 
  onDownloadQR, 
  onInspect, 
  onDelete 
}: DigitalCardPreviewProps) {
  const config = resolveCardConfig(card.cardType);
  const CardIcon = config.icon || User;
  const isOnTrial = card.trialDaysLeft > 0;

  const gradientClass = cn(
    "bg-gradient-to-br",
    card.gradient === "teal" && "from-emerald-500 to-teal-600",
    card.gradient === "coral" && "from-orange-500 to-pink-500",
    card.gradient === "purple" && "from-violet-500 to-purple-600",
    card.gradient === "blue" && "from-blue-500 to-cyan-500",
    card.gradient === "dark" && "from-slate-800 to-slate-900",
    !card.gradient && "from-blue-500 to-cyan-500"
  );

  // Handle View Card
  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onView) onView();
  };

  // Handle Edit Card
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit();
  };

  // Handle Share Card
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) onShare();
  };

  // Handle Download QR
  const handleDownloadQR = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDownloadQR) onDownloadQR();
  };

  // Handle Inspect Card
  const handleInspect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInspect) onInspect();
    else if (onView) onView();
  };

  // Handle Delete Card
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  return (
    <div 
      className="group relative animate-fade-in cursor-pointer"
      onClick={handleInspect}
    >
      {/* Plan Badge */}
      <div className="absolute -top-2 -right-2 z-10 flex flex-col items-end gap-1">
        <Badge className={cn("flex items-center gap-1 text-white border-0 shadow-md", config.color)}>
          <CardIcon className="w-3 h-3" />
          {config.label}
        </Badge>
        {isOnTrial && (
          <Badge variant="outline" className="bg-white/95 dark:bg-boxdark/95 backdrop-blur-sm text-xs font-medium text-slate-700 dark:text-slate-300">
            {card.trialDaysLeft}d trial
          </Badge>
        )}
      </div>

      {/* Card Preview Graphic */}
      <div
        className={cn(
          "relative aspect-[1.6/1] rounded-2xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1",
          gradientClass
        )}
      >
        {/* Card Graphic Content */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
          <div className="flex justify-between items-start">
            <div className="pr-4">
              <h3 className="text-lg md:text-xl font-bold tracking-tight line-clamp-1">{card.name || "Untitled Card"}</h3>
              <p className="text-xs md:text-sm opacity-90 line-clamp-1">{card.title || "Designation"}</p>
              {card.company && (
                <p className="text-[11px] opacity-75 mt-0.5 line-clamp-1">{card.company}</p>
              )}
            </div>
            <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm shrink-0">
              <QrCode className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="space-y-0.5 pt-2 border-t border-white/20">
            {card.email && <p className="text-[11px] opacity-85 truncate">{card.email}</p>}
            {card.phone && <p className="text-[11px] opacity-85 truncate">{card.phone}</p>}
          </div>
        </div>

        {/* Hover Overlay with Quick Action Buttons */}
        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-2">
          <button 
            type="button"
            onClick={handleView}
            className="w-9 h-9 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="Open Live Card"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={handleEdit}
            className="w-9 h-9 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="Edit Card"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={handleShare}
            className="w-9 h-9 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="Copy Share Link"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={handleDownloadQR}
            className="w-9 h-9 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="QR Code & Download"
          >
            <QrCode className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={handleInspect}
            className="w-9 h-9 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="Inspect Details"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Meta Description */}
      <div className="mt-3 flex items-center justify-between">
        <div className="pr-2 truncate">
          <h4 className="font-semibold text-slate-800 dark:text-white text-sm md:text-base truncate">
            {card.name || "My Digital Card"}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {card.company || config.label}
          </p>
        </div>
        
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                type="button"
                className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"
                title="Card Options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-boxdark border border-slate-200 dark:border-strokedark shadow-lg rounded-xl p-1 z-50">
              <DropdownMenuItem onClick={handleView} className="cursor-pointer px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <Eye className="w-3.5 h-3.5 mr-2 text-blue-500" /> View Live Card
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEdit} className="cursor-pointer px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <Edit2 className="w-3.5 h-3.5 mr-2 text-indigo-500" /> Edit Card
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare} className="cursor-pointer px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <Share2 className="w-3.5 h-3.5 mr-2 text-emerald-500" /> Copy Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownloadQR} className="cursor-pointer px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <QrCode className="w-3.5 h-3.5 mr-2 text-purple-500" /> QR Code & Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleInspect} className="cursor-pointer px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <Maximize2 className="w-3.5 h-3.5 mr-2 text-slate-500" /> Full Details
              </DropdownMenuItem>
              {onDelete && (
                <DropdownMenuItem onClick={handleDelete} className="cursor-pointer px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg border-t border-slate-100 dark:border-slate-800 mt-1">
                  <Trash2 className="w-3.5 h-3.5 mr-2 text-rose-500" /> Delete Card
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Analytics Footer */}
      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-strokedark/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-medium" title="Total Views">
            <Eye className="w-3 h-3 text-blue-500" /> {card.views || 0}
          </span>
          <span className="flex items-center gap-1 font-medium" title="Total Shares">
            <Share2 className="w-3 h-3 text-emerald-500" /> {card.shares || 0}
          </span>
        </div>
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {isOnTrial ? "Trial" : config.price}
        </span>
      </div>
    </div>
  );
}