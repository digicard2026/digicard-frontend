import { Eye, Edit2, Share2, MoreVertical, QrCode, User, Building, Gem, Briefcase, Award, Rocket, Layers, ShieldCheck, Users, Globe } from "lucide-react";
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

export function DigitalCardPreview({ card, onView, onEdit, onShare }: DigitalCardPreviewProps) {
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
    if (onView) {
      onView();
    }
  };

  // Handle Edit Card
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  // Handle Share Card
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare();
    }
  };

  // Handle Download QR
  const handleDownloadQR = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (card.urlSlug) {
      const qrUrl = `${window.location.origin}/preview/${card.urlSlug}/qr`;
      alert(`QR Code URL: ${qrUrl}\n\nQR download functionality activated.`);
    } else {
      alert('This card does not have a shareable URL yet. Please edit and save the card first.');
    }
  };

  return (
    <div className="group relative animate-fade-in">
      {/* Plan Badge */}
      <div className="absolute -top-2 -right-2 z-10 flex flex-col items-end gap-1">
        <Badge className={cn("flex items-center gap-1 text-white border-0 shadow-md", config.color)}>
          <CardIcon className="w-3 h-3" />
          {config.label}
        </Badge>
        {isOnTrial && (
          <Badge variant="outline" className="bg-card/95 backdrop-blur-sm text-xs font-medium">
            {card.trialDaysLeft} days trial left
          </Badge>
        )}
      </div>

      {/* Card Preview */}
      <div
        className={cn(
          "relative aspect-[1.6/1] rounded-2xl overflow-hidden card-shadow transition-all duration-300 group-hover:card-shadow-hover group-hover:-translate-y-1",
          gradientClass
        )}
      >
        {/* Card Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{card.name || "Untitled Card"}</h3>
              <p className="text-sm opacity-90">{card.title || "No designation"}</p>
              <p className="text-xs opacity-75 mt-1">{card.company || ""}</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <QrCode className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs opacity-80">{card.email || ""}</p>
            <p className="text-xs opacity-80">{card.phone || ""}</p>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button 
            onClick={handleView}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
            title="View Card"
          >
            <Eye className="w-4 h-4 text-gray-800" />
          </button>
          <button 
            onClick={handleEdit}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
            title="Edit Card"
          >
            <Edit2 className="w-4 h-4 text-gray-800" />
          </button>
          <button 
            onClick={handleShare}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
            title="Share Card"
          >
            <Share2 className="w-4 h-4 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Card Meta */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-foreground">{card.name || "My Digital Card"}</h4>
          <p className="text-sm text-muted-foreground">{card.company || config.label}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors">
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleView}>
              <Eye className="w-4 h-4 mr-2" /> View Card
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleEdit}>
              <Edit2 className="w-4 h-4 mr-2" /> Edit Card
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" /> Share Card
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownloadQR}>
              <QrCode className="w-4 h-4 mr-2" /> Download QR
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats */}
      <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> {card.views || 0} views
          </span>
          <span className="flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5" /> {card.shares || 0} shares
          </span>
        </div>
        <span className="text-xs font-medium">
          {isOnTrial ? "Trial" : config.price}
        </span>
      </div>
    </div>
  );
}