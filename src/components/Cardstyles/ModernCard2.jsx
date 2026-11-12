import React, { useState } from 'react';
import { 
  FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, 
  FaMapMarkerAlt, FaGlobe, 
  FaPhoneAlt, FaWhatsapp, 
  FaBuilding, FaVideo, FaGem, FaStar, 
  FaDownload, FaQrcode, FaShieldAlt, 
  FaBriefcase, FaCalendarAlt, FaHeadset,
  FaFilePdf, FaRegClock, 
  FaUsers, FaCogs, FaCheckCircle, 
  FaPaperPlane, FaExternalLinkAlt, 
  FaShareAlt, FaCopy, FaCheck, FaTimes,
  FaHome
} from 'react-icons/fa';
import { FaXTwitter, FaGithub, FaYoutube, FaFacebookF } from "react-icons/fa6";
import { generateVCard } from '../../utility/vcard';
import { CARD_URL } from '../../utility/constants';
import defaultCityBanner from '../../assets/images/city_skyline_banner.png';

// High clarity images
const HD_AVATAR = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800";
const HD_ARCH_BANNER = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200";

// --- CONFIG: Plan Features Matrix ---
const personalAllowed = [
  'profilePhoto', 'firstName', 'lastName', 'prefix', 'suffix', 'jobTitle',
  'tagline', 'aboutText', 'bio', 'phones', 'email', 'emails', 'websites',
  'addresses', 'enableOneTapCall', 'enableWhatsApp', 'enableEmail', 'socialLinks',
  'dynamicQRCode', 'shareableUrl', 'shareableLink'
];

const businessAllowed = [
  ...personalAllowed,
  'companyName', 'companyLogo', 'logoSize', 'department', 'organization',
  'businessHours', 'virtualNumber', 'profileVideo', 'services', 'servicesProducts',
  'gallery', 'catalog', 'catalogPDF', 'productVideo', 'nfcSettings', 'downloads'
];

const businessPremiumAllowed = [
  ...businessAllowed,
  'serviceArea', 'serviceAvailability', 'customerInquiry', 'interactiveElements',
  'individualProductDisplay', 'clientList', 'businessCardInstagram', 'textbooks',
  'chatAssistant', 'liveChat', 'foundedName', 'brandLabel', 'productRangeDisplay'
];

const professionalsAllowed = [
  ...businessPremiumAllowed,
  'testimonials', 'videos'
];

const cardFieldsConfig = {
  Personal: personalAllowed,
  Business: businessAllowed,
  BusinessPremium: businessPremiumAllowed,
  Professionals: professionalsAllowed,
  ProfessionalPro: professionalsAllowed,
  Entrepreneurials: professionalsAllowed,
  EntrepreneurialsMulti: professionalsAllowed,
  CorporateBusiness: professionalsAllowed,
  Team: professionalsAllowed,
  MiniWebsite: professionalsAllowed
};

// --- HELPER: Golden Wheat / Flame Emblem ---
const GoldenWheatEmblem = ({ className = "w-6 h-6", color = "#c8973b" }) => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M6 24 C8 14 16 7 29 5 C25 12 19 18 10 22 C8 22.8 6.8 23.5 6 24 Z"
      fill={color}
    />
    <path
      d="M10 29 C13 22 19 18 27 16 C23 21 18 25 11 29 C10.6 29 10.3 29 10 29 Z"
      fill={color}
      opacity="0.9"
    />
  </svg>
);

// --- HELPER: Video Player Component ---
const VideoPlayer = ({ src, poster, title, className = "" }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const videoUrl = typeof src === 'object' && src !== null && src.url ? src.url : src;
  if (!videoUrl || typeof videoUrl !== 'string') return null;

  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    let videoId = '';
    if (videoUrl.includes('youtu.be/')) {
      videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
    } else if (videoUrl.includes('watch?v=')) {
      videoId = videoUrl.split('watch?v=')[1]?.split('&')[0];
    } else if (videoUrl.includes('embed/')) {
      videoId = videoUrl.split('embed/')[1]?.split('?')[0];
    }
    return (
      <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-[#e2cca4] my-3 ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
          title={title || "YouTube video"}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-[#f5ecdc] rounded-2xl p-6 text-slate-500 border border-[#e2cca4] my-3 ${className}`}>
        <FaVideo className="w-8 h-8 text-[#c8973b] mb-2" />
        <p className="text-xs font-medium">Video currently unavailable</p>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-[#e2cca4] my-3 ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#c8973b] border-t-transparent" />
        </div>
      )}
      <video
        src={videoUrl}
        className="w-full h-full object-contain"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        onError={() => setError(true)}
        onLoadedData={() => setLoading(false)}
      />
    </div>
  );
};

// --- HELPER: Live Business Status ---
const getBusinessStatus = (businessHours = []) => {
  if (!businessHours || businessHours.length === 0) return null;

  const now = new Date();
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDayName = days[now.getDay()];

  const todaySchedule = businessHours.find(h => h.day?.toLowerCase() === currentDayName);
  if (!todaySchedule || todaySchedule.isClosed) {
    return { isOpen: false, text: 'Closed Today' };
  }

  if (!todaySchedule.openingTime || !todaySchedule.closingTime) {
    return { isOpen: true, text: 'Open Today' };
  }

  const [openH, openM] = todaySchedule.openingTime.split(':').map(Number);
  const [closeH, closeM] = todaySchedule.closingTime.split(':').map(Number);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
    return { isOpen: true, text: `Open until ${todaySchedule.closingTime}` };
  }
  return { isOpen: false, text: `Closed • Opens ${todaySchedule.openingTime}` };
};

const ModernCard2 = ({ cardData = {}, data = {}, plan = '', isPreview = false, isSnapshot = false, onShare }) => {
  const safeData = Object.keys(cardData).length > 0 ? cardData : data;

  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
  const [inquiryData, setInquiryData] = useState({
    service: '',
    date: '',
    time: '',
    contact: '',
    submitted: false
  });

  // Normalization
  const normalizePlan = (raw) => {
    if (!raw) return 'Personal';
    if (cardFieldsConfig[raw]) return raw;
    const cleaned = String(raw).replace(/[\s\-_]/g, '').toLowerCase();
    for (const key of Object.keys(cardFieldsConfig)) {
      if (key.toLowerCase() === cleaned) return key;
    }
    return 'BusinessPremium';
  };

  const currentPlan = normalizePlan(safeData?.cardType || plan);

  const isFieldAllowed = (fieldName) => {
    if (safeData?.addons) {
      const lk = fieldName.toLowerCase();
      if (lk === 'gallery' && (safeData.addons.gallery || safeData.addons.photogallery)) return true;
      if ((lk === 'catalog' || lk === 'catalogpdf' || lk === 'downloads') &&
          (safeData.addons.docsbuilder || safeData.addons.catalogbuilder || safeData.addons.brochurebuilder || safeData.addons.docsmanager)) return true;
      if ((lk === 'nfcsettings' || lk === 'nfccard') && (safeData.addons.nfccard || safeData.addons.nfc)) return true;
      if ((lk === 'profilevideo' || lk === 'productvideo') && (safeData.addons.profilebuilder || safeData.addons.portfoliobuilder)) return true;
      if (lk === 'testimonials' && safeData.addons.portfoliobuilder) return true;
    }
    const allowed = cardFieldsConfig[currentPlan] || personalAllowed;
    return allowed.includes(fieldName);
  };

  // Profile Data with Suresh Nair (Creative Card / Architectural theme defaults)
  const defaultProfile = {
    name: "Suresh Nair",
    jobTitle: "Senior Architect",
    companyName: "Reva-Yah One",
    tagline: "Designing Better Spaces",
    aboutText: "Architect with a passion for sustainable and innovative design.",
    brandLabel: "Reva-Yah One",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "suresh.nair@revayah.one",
    location: "Bengaluru, India",
    linkedin: "https://linkedin.com/in/suresh-nair",
    profilePhoto: HD_AVATAR,
    services: [
      { title: "Architectural Planning", description: "Modern, sustainable residential and commercial architectural master plans.", icon: "architecture" },
      { title: "Interior Design", description: "Bespoke spatial design emphasizing natural lighting and timeless materials.", icon: "interior" },
      { title: "Sustainable Design", description: "Energy-efficient and bioclimatic structures built for long-term endurance.", icon: "sustainable" },
      { title: "Project Supervision", description: "On-site quality management from structural inception to final finish.", icon: "supervision" }
    ],
    expertise: ["Architecture", "Interior", "Sustainable", "Planning"]
  };

  const rawName = `${safeData?.prefix || ''} ${safeData?.firstName || ''} ${safeData?.lastName || ''}`.trim();
  const profile = {
    name: rawName || safeData?.name || defaultProfile.name,
    jobTitle: safeData?.jobTitle || defaultProfile.jobTitle,
    companyName: safeData?.companyName || defaultProfile.companyName,
    companyLogo: safeData?.companyLogo || null,
    tagline: safeData?.tagline || defaultProfile.tagline,
    aboutText: safeData?.aboutText || safeData?.bio || defaultProfile.aboutText,
    brandLabel: safeData?.brandLabel || defaultProfile.brandLabel,
    profilePhoto: safeData?.profilePhoto || HD_AVATAR,
    phones: safeData?.phones || (safeData?.phone ? [{ number: safeData.phone, label: 'Work', isPrimary: true }] : [{ number: defaultProfile.phone, label: 'Work', isPrimary: true }]),
    emails: safeData?.emails || (safeData?.email ? [{ address: safeData.email, label: 'Work', isPrimary: true }] : [{ address: defaultProfile.email, label: 'Work', isPrimary: true }]),
    websites: safeData?.websites || (safeData?.website ? [{ url: safeData.website, label: 'Website' }] : []),
    addresses: safeData?.addresses || (safeData?.address ? [{ street: safeData.address, city: defaultProfile.location }] : [{ street: defaultProfile.location }]),
    socialLinks: safeData?.socialLinks || [],
    businessHours: safeData?.businessHours || [],
    services: Array.isArray(safeData?.services) && safeData.services.length > 0 ? safeData.services : defaultProfile.services,
    products: safeData?.products || [],
    downloads: safeData?.downloads || [],
    profileVideo: safeData?.profileVideo || null,
    customerInquiry: safeData?.customerInquiry || { isEnabled: true, title: 'Request Architecture Consultation' },
    bannerPhoto: safeData?.bannerPhoto || HD_ARCH_BANNER
  };

  const primaryPhone = profile.phones.find(p => p.isPrimary)?.number || profile.phones[0]?.number || defaultProfile.phone;
  const primaryEmail = profile.emails.find(e => e.isPrimary)?.address || profile.emails[0]?.address || defaultProfile.email;
  const primaryAddress = profile.addresses[0]?.street || profile.addresses[0]?.city || defaultProfile.location;
  const linkedinLink = profile.socialLinks.find(s => s.platform?.toLowerCase().includes('linkedin'))?.url || defaultProfile.linkedin;
  const businessStatus = getBusinessStatus(profile.businessHours);
  const expertiseList = profile.services.length > 0
    ? profile.services.slice(0, 4).map(s => s.title ? s.title.split(' ')[0] : 'Expertise')
    : defaultProfile.expertise;

  // Actions
  const handleCall = (num) => {
    if (!num) return;
    window.location.href = `tel:${num.replace(/[^\d+]/g, '')}`;
  };

  const handleWhatsApp = (num) => {
    if (!num) return;
    const clean = num.replace(/\D/g, '');
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(`Hi ${profile.name}, I am contacting you via your Reva-Yah One Creative card.`)}`, '_blank');
  };

  const handleEmail = (mail) => {
    if (!mail) return;
    window.location.href = `mailto:${mail}?subject=${encodeURIComponent(`Architecture Inquiry: ${profile.name}`)}`;
  };

  const handleLocation = (addr) => {
    if (!addr) return;
    window.open(`https://maps.google.com/?q=${encodeURIComponent(addr)}`, '_blank');
  };

  const handleCopy = (text, type) => {
    if (!text) return;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItem(type);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  const handleSaveContact = () => {
    generateVCard(safeData);
  };

  const handleNativeShare = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (onShare) {
      onShare();
      return;
    }

    const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    const origin = isLocal ? "https://www.revayah.one" : (typeof window !== "undefined" ? window.location.origin : "https://www.revayah.one");
    const slug = safeData?.urlSlug || safeData?.shareableUrl || "";
    const shareUrl = slug ? `${origin}/preview/${slug}` : (typeof window !== "undefined" ? window.location.href : "https://www.revayah.one");
    const shareTitle = `${profile.name} | Creative Digital Identity`;
    const shareText = `Hi! Here's my digital identity card. Click to view my profile:\n${shareUrl}`;

    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl
      }).catch((err) => {
        if (err.name !== "AbortError") {
          handleCopy(shareText, 'shareUrl');
        }
      });
    } else {
      handleCopy(shareText, 'shareUrl');
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
    }
  };

  const handleSendInquiry = () => {
    if (!inquiryData.service || !inquiryData.contact) {
      alert("Please provide the service required and your contact number.");
      return;
    }
    const cleanPhone = primaryPhone.replace(/\D/g, '');
    const message = `Hello ${profile.name}!\n\nI would like to request an architectural consultation via your Reva-Yah One card:\n- Service: ${inquiryData.service}\n- Preferred Date: ${inquiryData.date || 'Flexible'}\n- Preferred Time: ${inquiryData.time || 'Flexible'}\n- Customer Contact: ${inquiryData.contact}`;

    setInquiryData(prev => ({ ...prev, submitted: true }));

    if (cleanPhone) {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
    } else if (primaryEmail) {
      window.location.href = `mailto:${primaryEmail}?subject=${encodeURIComponent(`Consultation Request: ${inquiryData.service}`)}&body=${encodeURIComponent(message)}`;
    }
  };

  const getSocialIcon = (platform) => {
    const p = platform?.toLowerCase() || '';
    if (p.includes('linkedin')) return <FaLinkedin className="w-4 h-4" />;
    if (p.includes('twitter') || p.includes('x')) return <FaXTwitter className="w-4 h-4" />;
    if (p.includes('github')) return <FaGithub className="w-4 h-4" />;
    if (p.includes('facebook')) return <FaFacebookF className="w-4 h-4" />;
    if (p.includes('youtube')) return <FaYoutube className="w-4 h-4" />;
    if (p.includes('whatsapp')) return <FaWhatsapp className="w-4 h-4" />;
    return <FaGlobe className="w-4 h-4" />;
  };

  // Dedicated Snapshot View for WhatsApp / OG Previews
  if (isSnapshot) {
    const rawPhoto = profile.profilePhoto;
    const photoSrc = (rawPhoto && rawPhoto.startsWith('http') && !rawPhoto.includes('unsplash.com'))
      ? `${CARD_URL}/proxy-image?url=${encodeURIComponent(rawPhoto)}`
      : rawPhoto;

    return (
      <div className="w-[380px] max-w-full bg-[#fbf8f2] text-[#2c2013] flex flex-col items-center justify-start p-0 font-sans antialiased overflow-hidden rounded-[28px] border border-[#e2cca4] shadow-xl relative">
        {/* Top Right Botanical Contour Graphic */}
        <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none opacity-50">
          <svg viewBox="0 0 140 140" fill="none" className="w-full h-full">
            <path d="M140 0 C100 20 80 60 70 120 C110 90 130 50 140 0 Z" fill="#e8cca4" />
            <path d="M140 40 C110 60 95 90 90 140 C120 120 135 90 140 40 Z" fill="#ecdab8" opacity="0.8" />
          </svg>
        </div>

        <div className="relative z-10 w-full pt-5 pb-3 px-5 text-left">
          {/* Top Bar: Golden Wheat Emblem + Brand Title + Share Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GoldenWheatEmblem className="w-6 h-6 shrink-0" color="#c8973b" />
              <span className="text-base font-bold text-[#0c2340] tracking-tight">
                Reva-Yah One
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-[#d8be92] bg-[#f5e9d3] flex items-center justify-center text-[#2c2013] shadow-xs">
              <FaShareAlt className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Hero Identity: Avatar on Left, Details on Right */}
          <div className="flex items-center gap-3.5 mb-3">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full p-1 bg-white border-2 border-[#d8be92] shadow-sm overflow-hidden">
                <img
                  src={photoSrc}
                  alt={profile.name}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = HD_AVATAR;
                  }}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-[#0c2340] leading-tight">{profile.name}</h1>
              <p className="text-xs font-bold text-[#0c2340] mt-0.5">{profile.jobTitle}</p>
              <div className="w-full h-[1.5px] bg-[#e4cca3] my-1.5" />
              <p className="text-[11px] text-[#0c2340] italic font-medium leading-snug">
                {profile.tagline}
              </p>
            </div>
          </div>

          {/* 4 Action Buttons */}
          <div className="grid grid-cols-4 gap-2 text-center my-3">
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-sm">
                <FaPhoneAlt className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5">Call</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-sm">
                <FaWhatsapp className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-sm">
                <FaEnvelope className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5">Email</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-sm">
                <FaMapMarkerAlt className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5">Location</span>
            </div>
          </div>

          {/* About Me Section with Architecture Preview */}
          <div className="my-2.5 p-3 rounded-2xl bg-white border border-[#e2cca4] relative overflow-hidden">
            <div className="flex items-center gap-1.5 mb-1">
              <FaBuilding className="w-3.5 h-3.5 text-[#0c2340]" />
              <span className="text-xs font-bold text-[#0c2340] uppercase tracking-wider">About Me</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed pr-16">
              {profile.aboutText}
            </p>
            <div className="mt-2 text-xs font-bold text-[#0c2340] flex items-center gap-1">
              <span>Read More</span>
              <span>→</span>
            </div>
            {/* Embedded architectural thumbnail in lower right */}
            <div className="absolute -bottom-1 -right-1 w-20 h-20 rounded-tl-2xl overflow-hidden border-t border-l border-[#e4cca3]">
              <img src={HD_ARCH_BANNER} alt="Arch Preview" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Footer Bar */}
          <div className="mt-3 -mx-5 -mb-3 bg-gradient-to-r from-[#e8cc96] via-[#dfbe7e] to-[#cfa761] py-2 px-4 flex items-center justify-center gap-1.5 text-xs text-[#2c2013]">
            <GoldenWheatEmblem className="w-3.5 h-3.5 shrink-0" color="#3d2711" />
            <span>Powered by <strong className="font-bold text-[#2c2013]">Reva-Yah One</strong></span>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // EXACT MAIN CARD LAYOUT (MATCHING CREATIVE CARD ARCHITECTURAL REFERENCE)
  // ========================================================
  return (
    <div className="w-full min-h-screen bg-[#f4ebe1] text-[#2c2013] flex flex-col items-center justify-start p-0 font-sans antialiased selection:bg-[#c8973b] selection:text-white relative overflow-x-hidden">
      
      {/* Edge-to-Edge Container (Exact proportion and styling) */}
      <div className="w-full max-w-md bg-[#fbf8f2] flex flex-col relative overflow-hidden min-h-screen shadow-xl border-x border-[#e2cca4]/60">

        {/* Top Right Botanical Contour Graphic (Exact match from screenshot) */}
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-60">
          <svg viewBox="0 0 160 160" fill="none" className="w-full h-full">
            <path d="M160 0 C110 30 90 80 80 160 C130 120 150 70 160 0 Z" fill="#e8cca4" />
            <path d="M160 50 C125 75 110 115 105 160 C140 135 155 100 160 50 Z" fill="#ecdab8" opacity="0.85" />
            <path d="M160 100 C140 115 130 140 125 160 C150 145 158 125 160 100 Z" fill="#dfbe7e" opacity="0.6" />
          </svg>
        </div>

        {/* ========================================================
            TOP BAR: GOLDEN WHEAT EMBLEM + BRAND TITLE + SHARE BUTTON
            ======================================================== */}
        <div className="relative z-10 w-full px-5 pt-4 pb-2">
          <div className="flex items-center justify-between">
            
            {/* Golden Wheat Emblem + Brand Title */}
            <div className="flex items-center gap-2">
              <GoldenWheatEmblem className="w-6 h-6 shrink-0" color="#c8973b" />
              <span className="text-base sm:text-lg font-bold text-[#0c2340] tracking-tight">
                {profile.brandLabel || 'Reva-Yah One'}
              </span>
            </div>

            {/* Share Button (Direct Share & Copy Link) */}
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-8 h-8 rounded-full border border-[#d8be92] bg-[#f5e9d3] hover:bg-[#ebd8b7] text-[#2c2013] shadow-xs flex items-center justify-center transition-all active:scale-95 cursor-pointer shrink-0"
              title="Share Card"
            >
              {copiedItem === 'shareUrl' ? (
                <FaCheck className="w-3.5 h-3.5 text-emerald-700" />
              ) : (
                <FaShareAlt className="w-3.5 h-3.5 text-[#2c2013]" />
              )}
            </button>
          </div>
        </div>

        {/* ========================================================
            HERO IDENTITY: AVATAR ON LEFT, NAME & DETAILS ON RIGHT
            ======================================================== */}
        <div className="relative z-10 w-full px-5 py-3">
          <div className="flex items-center gap-4 text-left">
            
            {/* Left: Avatar with Warm Gold/Sand Border Ring */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white border-2 border-[#d8be92] shadow-md overflow-hidden">
                <img
                  src={profile.profilePhoto}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = HD_AVATAR;
                  }}
                />
              </div>

              {/* Company Logo Badge if available */}
              {isFieldAllowed('companyLogo') && profile.companyLogo && (
                <div 
                  className="absolute -top-1 -right-1 w-7 h-7 rounded-lg bg-white border border-[#d8be92] p-0.5 shadow-md flex items-center justify-center"
                  title={profile.companyName || "Company"}
                >
                  <img 
                    src={profile.companyLogo} 
                    alt="Company Logo" 
                    className="w-full h-full object-contain" 
                  />
                </div>
              )}
            </div>

            {/* Right: Profile Details */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0c2340] leading-tight">
                {profile.name}
              </h1>
              
              <p className="text-sm sm:text-base font-bold text-[#0c2340] mt-0.5">
                {profile.jobTitle}
              </p>

              {/* Thin Warm Gold Divider Line */}
              <div className="w-full h-[1.5px] bg-[#e4cca3] my-2" />

              {/* Slogan / Tagline */}
              <p className="text-xs sm:text-sm italic font-medium text-[#0c2340] leading-snug">
                {profile.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            ACTION BUTTONS: 4 WARM SAND / GOLD PILL BUTTONS
            ======================================================== */}
        <div className="relative z-10 w-full px-5 py-3">
          <div className="grid grid-cols-4 gap-2 text-center">
            
            {/* 1. Call */}
            <button
              type="button"
              onClick={() => handleCall(primaryPhone)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none"
              title="Call"
            >
              <div className="w-12 h-12 rounded-full bg-[#f3e1c3] hover:bg-[#ebd2a8] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                <FaPhoneAlt className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">Call</span>
            </button>

            {/* 2. WhatsApp */}
            <button
              type="button"
              onClick={() => handleWhatsApp(primaryPhone)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none"
              title="WhatsApp"
            >
              <div className="w-12 h-12 rounded-full bg-[#f3e1c3] hover:bg-[#ebd2a8] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                <FaWhatsapp className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">WhatsApp</span>
            </button>

            {/* 3. Email */}
            <button
              type="button"
              onClick={() => handleEmail(primaryEmail)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none"
              title="Email"
            >
              <div className="w-12 h-12 rounded-full bg-[#f3e1c3] hover:bg-[#ebd2a8] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">Email</span>
            </button>

            {/* 4. Location */}
            <button
              type="button"
              onClick={() => handleLocation(primaryAddress)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none"
              title="Location"
            >
              <div className="w-12 h-12 rounded-full bg-[#f3e1c3] hover:bg-[#ebd2a8] border border-[#d8be92] text-[#2c2013] flex items-center justify-center shadow-md group-hover:scale-105 active:scale-95 transition-all">
                <FaMapMarkerAlt className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">Location</span>
            </button>

          </div>
        </div>

        {/* ========================================================
            ABOUT ME: WITH ARCHITECTURAL SHOWCASE PHOTO
            ======================================================== */}
        <div className="relative z-10 w-full px-5 py-3">
          <div className="bg-white rounded-2xl p-4 border border-[#e2cca4] shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <FaBuilding className="w-4 h-4 text-[#0c2340]" />
              <h3 className="text-sm font-bold text-[#0c2340] tracking-tight">
                About Me
              </h3>
            </div>
            <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700 pr-20 sm:pr-24">
              {profile.aboutText}
            </p>
            <button
              type="button"
              onClick={handleSaveContact}
              className="mt-3 text-xs font-bold text-[#0c2340] hover:text-[#c8973b] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Read More</span>
              <span>→</span>
            </button>

            {/* Integrated Architectural Building Image in Lower Right (Exact Screenshot Feature!) */}
            <div className="absolute -bottom-1 -right-1 w-24 h-24 sm:w-28 sm:h-28 rounded-tl-3xl overflow-hidden border-t-2 border-l-2 border-[#e4cca3] shadow-md">
              <img 
                src={HD_ARCH_BANNER} 
                alt="Modern Architecture" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>

        {/* ========================================================
            MY EXPERTISE: DIAMOND ICON + 4 WARM SAND PILL TAGS
            ======================================================== */}
        <div className="relative z-10 w-full px-5 py-3">
          <div className="flex items-center gap-2 mb-2.5">
            <FaGem className="w-4 h-4 text-[#c8973b]" />
            <h2 className="text-base font-bold text-[#0c2340] tracking-tight">
              My Expertise
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {expertiseList.map((skill, idx) => (
              <div 
                key={idx}
                className="py-1.5 px-2 rounded-full bg-[#f3e1c3] text-[#0c2340] text-xs font-semibold text-center truncate border border-[#d8be92] shadow-xs"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            FEATURED ARCHITECTURAL / PROJECT BANNER
            ======================================================== */}
        <div className="relative z-10 w-full px-5 py-2">
          <div className="w-full aspect-[2.4/1] rounded-2xl overflow-hidden shadow-sm border border-[#e2cca4] relative">
            <img 
              src={profile.bannerPhoto} 
              alt="Architectural Project" 
              className="w-full h-full object-cover" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultCityBanner;
              }}
            />
          </div>
        </div>

        {/* ========================================================
            SAVE CONTACT TO PHONE (vCard CTA)
            ======================================================== */}
        <div className="relative z-10 w-full px-5 pt-3 pb-2">
          <button
            type="button"
            onClick={handleSaveContact}
            className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#e8cc96] via-[#dfbe7e] to-[#cfa761] hover:opacity-95 text-[#2c2013] font-bold text-sm tracking-wide shadow-md transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaDownload className="w-4 h-4 text-[#2c2013]" />
            <span>Save Contact to Phone</span>
          </button>
        </div>

        {/* ========================================================
            SERVICES SHOWCASE (IF AVAILABLE)
            ======================================================== */}
        {isFieldAllowed('services') && profile.services && profile.services.length > 0 && (
          <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4] mt-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
                <FaCogs className="w-4 h-4 text-[#c8973b]" />
                <span>Featured Services</span>
              </h2>
              <span className="text-[11px] text-[#c8973b] font-semibold">
                {profile.services.length} available
              </span>
            </div>

            <div className="space-y-2.5">
              {profile.services.map((service, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-[#e2cca4] hover:bg-[#faf4e8] transition-all shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#c8973b]" />
                        <h4 className="text-xs font-bold text-[#0c2340]">{service.title}</h4>
                      </div>
                      {service.description && (
                        <p className="text-[11px] text-slate-700 mt-1 leading-relaxed pl-4">
                          {service.description}
                        </p>
                      )}
                    </div>
                    {service.price && (
                      <span className="text-xs font-bold text-[#c8973b] shrink-0">
                        {service.price}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            DIRECT CONSULTATION / INQUIRY BOOKING FUNNEL
            ======================================================== */}
        {isFieldAllowed('customerInquiry') && profile.customerInquiry?.isEnabled !== false && (
          <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
            <div className="p-4 rounded-2xl bg-white border border-[#d8be92] shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <FaCalendarAlt className="w-4 h-4 text-[#c8973b]" />
                <h3 className="text-sm font-bold text-[#0c2340]">
                  {profile.customerInquiry?.title || 'Book an Architecture Consultation'}
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Select your service requirement and schedule directly with {profile.name}.
              </p>

              <div className="space-y-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 mb-1 block">
                    Service Required *
                  </label>
                  <select
                    value={inquiryData.service}
                    onChange={(e) => setInquiryData({ ...inquiryData, service: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#fbf8f2] border border-[#d8be92] text-[#0c2340] focus:outline-none focus:border-[#c8973b] cursor-pointer"
                  >
                    <option value="" className="bg-white text-slate-700">Select an architectural service...</option>
                    {profile.services.map((s, idx) => (
                      <option key={idx} value={s.title} className="bg-white text-[#0c2340]">
                        {s.title}
                      </option>
                    ))}
                    <option value="General Architecture Consultation" className="bg-white text-[#0c2340]">General Architecture Consultation</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 mb-1 block">Preferred Date</label>
                    <input
                      type="date"
                      value={inquiryData.date}
                      onChange={(e) => setInquiryData({ ...inquiryData, date: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl bg-[#fbf8f2] border border-[#d8be92] text-[#0c2340] focus:outline-none focus:border-[#c8973b]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 mb-1 block">Preferred Time</label>
                    <input
                      type="time"
                      value={inquiryData.time}
                      onChange={(e) => setInquiryData({ ...inquiryData, time: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl bg-[#fbf8f2] border border-[#d8be92] text-[#0c2340] focus:outline-none focus:border-[#c8973b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 mb-1 block">
                    Your Contact (Phone or Email) *
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210 or name@example.com"
                    value={inquiryData.contact}
                    onChange={(e) => setInquiryData({ ...inquiryData, contact: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#fbf8f2] border border-[#d8be92] text-[#0c2340] placeholder-slate-400 focus:outline-none focus:border-[#c8973b]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendInquiry}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#e8cc96] to-[#dfbe7e] hover:opacity-95 text-[#2c2013] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer mt-1"
                >
                  <FaPaperPlane className="w-3.5 h-3.5" />
                  <span>Send Consultation Request</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PROFILE VIDEO PLAYER (IF CONFIGURED)
            ======================================================== */}
        {isFieldAllowed('profileVideo') && profile.profileVideo && (
          <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2 mb-2">
              <FaVideo className="w-4 h-4 text-[#c8973b]" />
              <span>Project Video Tour</span>
            </h2>
            <VideoPlayer src={profile.profileVideo} title={`${profile.name} Projects`} />
          </div>
        )}

        {/* ========================================================
            BUSINESS HOURS (IF CONFIGURED)
            ======================================================== */}
        {isFieldAllowed('businessHours') && profile.businessHours && profile.businessHours.length > 0 && (
          <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
                <FaRegClock className="w-4 h-4 text-[#c8973b]" />
                <span>Studio Hours</span>
              </h2>
              {businessStatus && (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  businessStatus.isOpen 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}>
                  {businessStatus.text}
                </span>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#e2cca4] space-y-1.5">
              {profile.businessHours.map((slot, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                  <span className="font-semibold text-slate-700 capitalize">{slot.day}</span>
                  <span className="text-slate-500">
                    {slot.isClosed ? (
                      <span className="text-rose-600 font-semibold">Closed</span>
                    ) : (
                      `${slot.openingTime || '09:00'} - ${slot.closingTime || '18:00'}`
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            CONTACT DIRECTORY: ADDRESSES, PHONES, EMAILS, SOCIAL
            ======================================================== */}
        <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4] space-y-3">
          <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
            <FaHeadset className="w-4 h-4 text-[#c8973b]" />
            <span>Studio Directory</span>
          </h2>

          <div className="space-y-2">
            {/* Phones */}
            {profile.phones.map((p, idx) => (
              <div 
                key={idx}
                onClick={() => handleCall(p.number)}
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#e2cca4] hover:bg-[#faf4e8] cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center">
                    <FaPhoneAlt className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0c2340]">{p.number}</p>
                    <p className="text-[10px] text-slate-500 capitalize">{p.label || 'Direct Phone'}</p>
                  </div>
                </div>
                <FaExternalLinkAlt className="w-3 h-3 text-slate-400" />
              </div>
            ))}

            {/* Emails */}
            {profile.emails.map((e, idx) => (
              <div 
                key={idx}
                onClick={() => handleEmail(e.address)}
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#e2cca4] hover:bg-[#faf4e8] cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center">
                    <FaEnvelope className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#0c2340] truncate">{e.address}</p>
                    <p className="text-[10px] text-slate-500 capitalize">{e.label || 'Email Address'}</p>
                  </div>
                </div>
                <FaExternalLinkAlt className="w-3 h-3 text-slate-400 shrink-0" />
              </div>
            ))}

            {/* Addresses */}
            {profile.addresses && profile.addresses.map((addr, idx) => (
              <div 
                key={idx}
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(`${addr.street || ''} ${addr.city || ''} ${addr.state || ''}`)}`, '_blank')}
                className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#e2cca4] hover:bg-[#faf4e8] cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center">
                    <FaMapMarkerAlt className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0c2340]">
                      {[addr.street, addr.city, addr.state, addr.country].filter(Boolean).join(', ') || 'Studio Location'}
                    </p>
                    <p className="text-[10px] text-slate-500 capitalize">{addr.label || 'Address'}</p>
                  </div>
                </div>
                <FaExternalLinkAlt className="w-3 h-3 text-slate-400" />
              </div>
            ))}
          </div>

          {/* Social Links Icons */}
          {profile.socialLinks && profile.socialLinks.length > 0 && (
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-600 mb-2">Connect Across Networks</p>
              <div className="flex flex-wrap gap-2">
                {profile.socialLinks.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white border border-[#d8be92] flex items-center justify-center text-[#0c2340] hover:bg-[#f3e1c3] transition-all shadow-xs"
                    title={s.platform}
                  >
                    {getSocialIcon(s.platform)}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            DOWNLOADS & BROCHURES (IF AVAILABLE)
            ======================================================== */}
        {isFieldAllowed('downloads') && profile.downloads && profile.downloads.length > 0 && (
          <div className="relative z-10 w-full px-5 py-4 border-t border-[#e2cca4]">
            <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2 mb-3">
              <FaFilePdf className="w-4 h-4 text-rose-500" />
              <span>Portfolios & Drawings</span>
            </h2>

            <div className="space-y-2">
              {profile.downloads.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.url || doc.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#e2cca4] hover:bg-[#faf4e8] transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <FaFilePdf className="w-4 h-4 text-rose-500" />
                    <span className="text-xs text-[#0c2340] font-semibold">{doc.title || doc.name || `Document #${idx + 1}`}</span>
                  </div>
                  <FaDownload className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            BOTTOM FOOTER: WARM GOLD BAR (EXACT SCREENSHOT FEATURE!)
            ======================================================== */}
        <div className="relative z-10 w-full py-5 px-5 bg-gradient-to-r from-[#e8cc96] via-[#dfbe7e] to-[#cfa761] border-t border-[#d8be92] text-center mt-auto text-[#2c2013]">
          <div className="flex items-center justify-center gap-1.5 text-xs">
            <GoldenWheatEmblem className="w-4 h-4 shrink-0" color="#3d2711" />
            <span>
              Powered by <strong className="font-bold text-[#2c2013]">Reva-Yah One</strong>
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mt-2 text-xs font-bold text-[#2c2013]">
            <button
              type="button"
              onClick={handleNativeShare}
              className="hover:underline flex items-center gap-1 cursor-pointer"
            >
              <FaShareAlt className="w-3 h-3" />
              <span>Share</span>
            </button>
            <span className="opacity-40">•</span>
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="hover:underline flex items-center gap-1 cursor-pointer"
            >
              <FaQrcode className="w-3 h-3" />
              <span>QR Code</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================
          QR CODE MODAL (WARM CHAMPAGNE THEME)
          ======================================================== */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fbf8f2] border border-[#d8be92] rounded-3xl p-6 max-w-xs w-full shadow-2xl text-center relative text-[#2c2013]">
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-[#0c2340] cursor-pointer"
            >
              <FaTimes className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#f3e1c3] border border-[#d8be92] text-[#2c2013] flex items-center justify-center mx-auto mb-3">
              <FaQrcode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0c2340] mb-1">Scan & Connect</h3>
            <p className="text-xs text-slate-600 mb-4">
              Point your camera to instantly view and save {profile.name}'s creative digital card.
            </p>
            <div className="bg-white p-3 rounded-2xl inline-block mb-4 shadow-sm border border-[#e2cca4]">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "https://www.revayah.one")}`}
                alt="QR Code"
                className="w-44 h-44 object-contain rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => handleCopy(window.location.href, 'qrModal')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#e8cc96] to-[#dfbe7e] hover:opacity-95 text-[#2c2013] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {copiedItem === 'qrModal' ? (
                <>
                  <FaCheck className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <FaCopy className="w-3.5 h-3.5" />
                  <span>Copy Card URL</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ModernCard2;
