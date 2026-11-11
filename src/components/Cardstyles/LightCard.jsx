import React, { useState } from 'react';
import { 
  FaLinkedin, FaEnvelope, 
  FaMapMarkerAlt, FaGlobe, 
  FaPhoneAlt, FaWhatsapp, 
  FaGem, FaDownload, FaQrcode, FaShieldAlt, 
  FaBriefcase, FaCalendarAlt, FaHeadset,
  FaFilePdf, FaRegClock, FaVideo,
  FaPaperPlane, FaExternalLinkAlt,
  FaShareAlt, FaCopy, FaCheck, FaTimes,
  FaCheckCircle, FaCogs, FaBuilding
} from 'react-icons/fa';
import { FaXTwitter, FaGithub, FaYoutube, FaFacebookF } from "react-icons/fa6";
import { generateVCard } from '../../utility/vcard';
import { CARD_URL } from '../../utility/constants';

// --- CONFIG: Plan Features Matrix (Synchronized with Backend Tiers) ---
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

// --- GOLDEN WHEAT / LEAF EMBLEM (Reva-Yah One Signature Brand Mark) ---
const GoldenWheatEmblem = ({ className = "w-6 h-6", color = "#c8973b" }) => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Upper Leaf / Blade */}
    <path
      d="M6 24 C8 14 16 7 29 5 C25 12 19 18 10 22 C8 22.8 6.8 23.5 6 24 Z"
      fill={color}
    />
    {/* Lower Leaf / Blade */}
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
      <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-slate-200/80 my-3 ${className}`}>
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
      <div className={`flex flex-col items-center justify-center bg-slate-900/10 rounded-2xl p-6 text-slate-500 border border-slate-200 my-3 ${className}`}>
        <FaVideo className="w-8 h-8 text-slate-400 mb-2" />
        <p className="text-xs font-medium">Video currently unavailable</p>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-slate-200/80 my-3 ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0c2340] border-t-transparent" />
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

const LightCard = ({ cardData = {}, plan = 'BusinessPremium', isPreview = false, isSnapshot = false, onShare }) => {
  if (!cardData || typeof cardData !== 'object') return null;

  // Normalize plan
  const normalizePlan = (raw) => {
    if (!raw) return 'Personal';
    if (cardFieldsConfig[raw]) return raw;
    const cleaned = String(raw).replace(/[\s\-_]/g, '').toLowerCase();
    for (const key of Object.keys(cardFieldsConfig)) {
      if (key.toLowerCase() === cleaned) return key;
    }
    return 'BusinessPremium';
  };

  const currentPlan = normalizePlan(cardData?.cardType || plan);

  const isFieldAllowed = (field) => {
    if (!field) return true;
    if (cardData?.addons) {
      const lk = field.toLowerCase();
      if (lk === 'gallery' && (cardData.addons.gallery || cardData.addons.photogallery)) return true;
      if ((lk === 'catalog' || lk === 'catalogpdf' || lk === 'downloads') &&
          (cardData.addons.docsbuilder || cardData.addons.catalogbuilder || cardData.addons.brochurebuilder || cardData.addons.docsmanager)) return true;
      if ((lk === 'nfcsettings' || lk === 'nfccard') && (cardData.addons.nfccard || cardData.addons.nfc)) return true;
      if ((lk === 'profilevideo' || lk === 'productvideo') && (cardData.addons.profilebuilder || cardData.addons.portfoliobuilder)) return true;
      if (lk === 'testimonials' && cardData.addons.portfoliobuilder) return true;
    }
    const allowed = cardFieldsConfig[currentPlan] || cardFieldsConfig.Personal;
    return allowed.includes(field);
  };

  // State management
  const [copiedItem, setCopiedItem] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    service: '',
    date: '',
    time: '',
    contact: '',
    submitted: false
  });

  // --- RESILIENT DATA MAPPING (Defaults to Rahul Mehta design from screenshot) ---
  const profile = {
    prefix: cardData.prefix || '',
    firstName: cardData.firstName || '',
    lastName: cardData.lastName || '',
    name: `${cardData.prefix ? cardData.prefix + ' ' : ''}${cardData.firstName || ''} ${cardData.lastName || ''}`.trim() || 'Rahul Mehta',
    jobTitle: cardData.jobTitle || 'Business Consultant',
    department: cardData.department || '',
    companyName: cardData.companyName || cardData.organization || 'Reva-Yah One',
    companyLogo: cardData.companyLogo,
    profilePhoto: cardData.profilePhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    tagline: cardData.tagline || 'Turning Ideas into Success',
    bio: cardData.bio || '',
    aboutText: cardData.aboutText || cardData.bio || 'Experienced Business Consultant focused on strategic advisory, business acceleration, and digital transformation.',
    foundedName: cardData.foundedName || '',
    organization: cardData.organization || '',
    serviceArea: cardData.serviceArea || '',
    serviceAvailability: cardData.serviceAvailability || '',

    phones: Array.isArray(cardData.phones) && cardData.phones.length > 0 
      ? cardData.phones 
      : cardData.phone ? [{ label: 'Direct', number: cardData.phone }] : [{ label: 'Direct', number: '+91 98765 43210' }],
    emails: Array.isArray(cardData.emails) && cardData.emails.length > 0 
      ? cardData.emails 
      : cardData.email ? [{ label: 'Work', address: cardData.email }] : [{ label: 'Work', address: 'rahul.mehta@revayah.one' }],
    websites: Array.isArray(cardData.websites) && cardData.websites.length > 0 
      ? cardData.websites 
      : cardData.website ? [{ label: 'Portal', url: cardData.website }] : [],
    addresses: cardData.addresses || [],
    socialLinks: cardData.socialLinks || [
      { platform: 'linkedin', url: 'https://linkedin.com' }
    ],

    services: cardData.services || [],
    products: cardData.products || [],
    businessHours: cardData.businessHours || [],
    downloads: cardData.downloads || [],
    profileVideo: cardData.profileVideo,
    productVideo: cardData.productVideo,
    videos: cardData.videos || [],

    nfcSettings: cardData.nfcSettings || { isEnabled: false },
    testimonials: cardData.testimonials || [],
    clientList: cardData.clientList || [],
    gallery: cardData.gallery || [],

    brandLabel: cardData.brandLabel || 'Reva-Yah One',
    enableOneTapCall: cardData.enableOneTapCall !== undefined ? cardData.enableOneTapCall : true,
    enableWhatsApp: cardData.enableWhatsApp !== undefined ? cardData.enableWhatsApp : true,
    enableEmail: cardData.enableEmail !== undefined ? cardData.enableEmail : true
  };

  const primaryPhone = profile.phones.find(p => p.isPrimary)?.number || profile.phones[0]?.number || '+91 98765 43210';
  const primaryEmail = profile.emails.find(e => e.isPrimary)?.address || profile.emails[0]?.address || cardData.email || 'rahul.mehta@revayah.one';
  const primaryWebsite = profile.websites[0]?.url || '';
  const linkedinLink = profile.socialLinks.find(s => s.platform?.toLowerCase().includes('linkedin'))?.url || 'https://linkedin.com';
  const businessStatus = getBusinessStatus(profile.businessHours);

  // Default 4 expertise pills matching screenshot
  const defaultExpertise = ['Strategy', 'Consulting', 'Growth', 'Innovation'];
  const expertiseList = profile.services && profile.services.length >= 4
    ? profile.services.slice(0, 4).map(s => s.name)
    : defaultExpertise;

  // Cityscape skyline banner photo
  const bannerPhoto = profile.gallery && profile.gallery.length > 0 && profile.gallery[0]?.url
    ? profile.gallery[0].url
    : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800";

  // Copy helper
  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedItem(key);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  // Direct contact actions
  const handleCall = (num) => {
    const target = num || primaryPhone;
    if (!target) return;
    window.location.href = `tel:${target.replace(/\s+/g, '')}`;
  };

  const handleWhatsApp = (num) => {
    const cleanNum = (num || primaryPhone).replace(/\D/g, '');
    if (!cleanNum) return;
    const greeting = encodeURIComponent(`Hello ${profile.name}, I connected with you via your Reva-Yah One digital card.`);
    window.open(`https://wa.me/${cleanNum}?text=${greeting}`, '_blank');
  };

  const handleEmail = (email) => {
    const target = email || primaryEmail;
    if (!target) return;
    window.location.href = `mailto:${target}?subject=${encodeURIComponent(`Inquiry via Reva-Yah One: ${profile.name}`)}`;
  };

  const handleWebsite = (url) => {
    if (!url) return;
    const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(cleanUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSaveContact = () => {
    generateVCard(cardData);
  };

  const handleNativeShare = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (onShare) {
      onShare();
      return;
    }

    const isLocal = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
    const origin = isLocal ? "https://www.revayah.one" : (typeof window !== "undefined" ? window.location.origin : "https://www.revayah.one");
    const slug = cardData?.urlSlug || cardData?.shareableUrl || "";
    const shareUrl = slug ? `${origin}/preview/${slug}` : (typeof window !== "undefined" ? window.location.href : "https://www.revayah.one");
    const shareTitle = `${profile.name} | Digital Identity Card`;
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
    const message = `Hello ${profile.name}!\n\nI would like to request a consultation via your Reva-Yah One card:\n- Service: ${inquiryData.service}\n- Preferred Date: ${inquiryData.date || 'Flexible'}\n- Preferred Time: ${inquiryData.time || 'Flexible'}\n- Customer Contact: ${inquiryData.contact}`;

    setInquiryData(prev => ({ ...prev, submitted: true }));

    if (cleanPhone) {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
    } else if (primaryEmail) {
      window.location.href = `mailto:${primaryEmail}?subject=${encodeURIComponent(`Service Request: ${inquiryData.service}`)}&body=${encodeURIComponent(message)}`;
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

  // Snapshot view for WhatsApp share image / preview thumbnail
  if (isSnapshot) {
    const rawPhoto = profile.profilePhoto;
    const photoSrc = (rawPhoto && rawPhoto.startsWith('http') && !rawPhoto.includes('unsplash.com'))
      ? `${CARD_URL}/proxy-image?url=${encodeURIComponent(rawPhoto)}`
      : rawPhoto;

    return (
      <div className="w-[380px] max-w-full bg-white text-slate-800 flex flex-col items-center justify-start p-0 font-sans antialiased overflow-hidden rounded-[28px] border border-slate-200 shadow-xl relative">
        <div className="relative w-full bg-white pt-5 pb-3 px-5 text-left">
          {/* Top Bar: Golden Wheat Emblem + Reva-Yah One (Left) + Share Button (Right) */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GoldenWheatEmblem className="w-6 h-6 shrink-0" color="#c8973b" />
              <span className="text-base font-bold text-[#0c2340] tracking-tight">
                Reva-Yah One
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-[#0c2340] shadow-xs">
              <FaShareAlt className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Hero Identity: Avatar on Left, Text on Right */}
          <div className="flex items-center gap-3.5 mb-3">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full p-[2px] bg-white border-2 border-slate-200 shadow-md overflow-hidden">
                <img
                  src={photoSrc}
                  alt={profile.name}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600";
                  }}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-[#0c2340] leading-tight">{profile.name}</h1>
              <p className="text-xs font-bold text-[#0c2340] mt-0.5">{profile.jobTitle}</p>
              <div className="w-full h-[1px] bg-slate-200 my-1.5" />
              <p className="text-[11px] text-[#0c2340] italic font-medium leading-snug">
                {profile.tagline}
              </p>
            </div>
          </div>

          {/* 4 Circular Action Buttons */}
          <div className="grid grid-cols-4 gap-2 text-center my-3">
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#0c2340] text-white flex items-center justify-center shadow-md">
                <FaPhoneAlt className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-semibold text-[#0c2340] mt-1">Call</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#0c2340] text-white flex items-center justify-center shadow-md">
                <FaWhatsapp className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-[#0c2340] mt-1">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#0c2340] text-white flex items-center justify-center shadow-md">
                <FaEnvelope className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-semibold text-[#0c2340] mt-1">Email</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#0c2340] text-white flex items-center justify-center shadow-md">
                <FaLinkedin className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-semibold text-[#0c2340] mt-1">Linkedin</span>
            </div>
          </div>

          {/* My Expertise */}
          <div className="my-2">
            <div className="flex items-center gap-1.5 mb-2">
              <FaGem className="w-3.5 h-3.5 text-[#0c2340]" />
              <span className="text-xs font-bold text-[#0c2340]">My Expertise</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {expertiseList.map((tag, idx) => (
                <div key={idx} className="py-1 px-1 rounded-full bg-[#eef5fa] text-[#0c2340] text-[10px] font-semibold text-center truncate border border-slate-100">
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Cityscape Skyline Banner */}
          <div className="w-full aspect-[2.4/1] rounded-xl overflow-hidden shadow-sm border border-slate-100 my-2">
            <img src={bannerPhoto} alt="City Skyline" className="w-full h-full object-cover" />
          </div>

          {/* Footer */}
          <div className="pt-2 pb-1 flex items-center justify-center gap-1.5 text-[11px] text-slate-700">
            <GoldenWheatEmblem className="w-3.5 h-3.5 shrink-0" color="#c8973b" />
            <span>Powered by <strong className="font-bold text-[#0c2340]">Reva-Yah One</strong></span>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // EXACT MAIN CARD LAYOUT (MATCHING IMAGE SCREENSHOT)
  // ========================================================
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-start p-0 font-sans antialiased selection:bg-[#0c2340] selection:text-white relative overflow-x-hidden">
      
      {/* Edge-to-Edge Container (Aligned with Standard Card Shell) */}
      <div className="w-full max-w-md bg-white flex flex-col relative overflow-hidden min-h-screen shadow-xl">

        {/* ========================================================
            HERO HEADER: REVA-YAH ONE BRAND + HAMBURGER MENU / SHARE
            ======================================================== */}
        <div className="w-full bg-white px-5 pt-4 pb-2">
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
              className="w-8 h-8 rounded-full border border-slate-300 bg-white/95 shadow-xs flex items-center justify-center text-[#0c2340] hover:bg-slate-100 transition-all active:scale-95 cursor-pointer shrink-0"
              title="Share Card"
            >
              {copiedItem === 'shareUrl' ? (
                <FaCheck className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <FaShareAlt className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* ========================================================
            HERO IDENTITY: AVATAR ON LEFT, NAME & DETAILS ON RIGHT
            ======================================================== */}
        <div className="w-full bg-white px-5 py-3">
          <div className="flex items-center gap-4 text-left">
            
            {/* Left: Avatar with Crisp Clean Border Ring */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-white border-2 border-slate-200 shadow-md overflow-hidden">
                <img
                  src={profile.profilePhoto}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600";
                  }}
                />
              </div>

              {/* Company Logo Badge if available */}
              {isFieldAllowed('companyLogo') && profile.companyLogo && (
                <div 
                  className="absolute -top-1 -right-1 w-7 h-7 rounded-lg bg-white border border-slate-200 p-0.5 shadow-md flex items-center justify-center"
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
              
              <p className="text-sm font-bold text-[#0c2340] mt-0.5">
                {profile.jobTitle}
              </p>

              {/* Crisp Horizontal Line Divider */}
              <div className="w-full h-[1.5px] bg-slate-200 my-2" />

              {/* Slogan / Tagline */}
              <p className="text-xs sm:text-sm italic font-medium text-[#0c2340] leading-snug">
                {profile.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            ACTION BUTTONS: 4 ROUND NAVY CIRCLES WITH NAVY LABELS
            ======================================================== */}
        <div className="w-full px-5 py-3">
          <div className="grid grid-cols-4 gap-2 text-center">
            
            {/* 1. Call */}
            <button
              type="button"
              onClick={() => handleCall(primaryPhone)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none"
              title="Call"
            >
              <div className="w-12 h-12 rounded-full bg-[#0c2340] hover:bg-[#15345c] text-white flex items-center justify-center shadow-md active:scale-95 transition-all">
                <FaPhoneAlt className="w-4 h-4 text-white" />
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
              <div className="w-12 h-12 rounded-full bg-[#0c2340] hover:bg-[#15345c] text-white flex items-center justify-center shadow-md active:scale-95 transition-all">
                <FaWhatsapp className="w-5 h-5 text-white" />
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
              <div className="w-12 h-12 rounded-full bg-[#0c2340] hover:bg-[#15345c] text-white flex items-center justify-center shadow-md active:scale-95 transition-all">
                <FaEnvelope className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">Email</span>
            </button>

            {/* 4. Linkedin */}
            <button
              type="button"
              onClick={() => handleWebsite(linkedinLink)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none"
              title="LinkedIn"
            >
              <div className="w-12 h-12 rounded-full bg-[#0c2340] hover:bg-[#15345c] text-white flex items-center justify-center shadow-md active:scale-95 transition-all">
                <FaLinkedin className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-[#0c2340] mt-1.5 tracking-tight">Linkedin</span>
            </button>

          </div>
        </div>

        {/* ========================================================
            MY EXPERTISE: DIAMOND ICON + 4 PILLS IN A ROW
            ======================================================== */}
        <div className="w-full px-5 py-3">
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-2.5">
            <FaGem className="w-4 h-4 text-[#0c2340]" />
            <h2 className="text-base font-bold text-[#0c2340] tracking-tight">
              My Expertise
            </h2>
          </div>

          {/* 4 Pill Tags in a single row */}
          <div className="grid grid-cols-4 gap-2">
            {expertiseList.map((skill, idx) => (
              <div 
                key={idx}
                className="py-1.5 px-2 rounded-full bg-[#eef5fa] text-[#0c2340] text-xs font-medium text-center truncate border border-slate-100 shadow-xs"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            CITYSCAPE SKYLINE BANNER
            ======================================================== */}
        <div className="w-full px-5 py-2">
          <div className="w-full aspect-[2.4/1] rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <img 
              src={bannerPhoto} 
              alt="City Skyline" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* ========================================================
            SAVE CONTACT TO PHONE (vCard CTA)
            ======================================================== */}
        <div className="w-full px-5 pt-3 pb-2">
          <button
            type="button"
            onClick={handleSaveContact}
            className="w-full py-3 px-6 rounded-2xl bg-[#0c2340] hover:bg-[#15345c] text-white font-semibold text-sm tracking-wide shadow-md transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaDownload className="w-4 h-4 text-white" />
            <span>Save Contact to Phone</span>
          </button>
        </div>

        {/* ========================================================
            ABOUT ME / EXECUTIVE SUMMARY (OPTIONAL DETAIL ACCORDION)
            ======================================================== */}
        {profile.aboutText && (
          <div className="w-full px-5 py-3">
            <div className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-200/80 shadow-xs">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <FaBriefcase className="w-3 h-3 text-[#0c2340]" />
                <span>About Me</span>
              </h3>
              <p className="text-xs leading-relaxed text-slate-700">
                {profile.aboutText}
              </p>
            </div>
          </div>
        )}

        {/* ========================================================
            FEATURED SERVICES & CAPABILITIES (IF EXPANDED)
            ======================================================== */}
        {isFieldAllowed('services') && profile.services && profile.services.length > 4 && (
          <div className="w-full px-5 py-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
                <FaCogs className="w-4 h-4 text-[#0c2340]" />
                <span>Additional Services</span>
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eef5fa] text-[#0c2340]">
                {profile.services.length} Total
              </span>
            </div>

            <div className="space-y-2.5">
              {profile.services.slice(4).map((srv, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-xs flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs">
                      {srv.name}
                    </h4>
                    {srv.description && (
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {srv.description}
                      </p>
                    )}
                  </div>
                  {srv.price && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#eef5fa] text-[#0c2340] border border-slate-100 whitespace-nowrap">
                      {srv.currency || '₹'} {srv.price}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            DIRECT LEAD CAPTURE FUNNEL: CONSULTATION & INQUIRY
            ======================================================== */}
        {isFieldAllowed('customerInquiry') && (
          <div id="light-inquiry-funnel" className="w-full px-5 py-3 border-t border-slate-100">
            <div className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 mb-1">
                <FaCalendarAlt className="w-4 h-4 text-[#0c2340]" />
                <h3 className="text-sm font-bold text-[#0c2340]">Request a Consultation</h3>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Schedule a direct discussion with {profile.name}.
              </p>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Required Topic / Service
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Strategic Planning, Growth Consulting"
                    value={inquiryData.service}
                    onChange={(e) => setInquiryData(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={inquiryData.date}
                      onChange={(e) => setInquiryData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      value={inquiryData.time}
                      onChange={(e) => setInquiryData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Your Contact Number
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={inquiryData.contact}
                    onChange={(e) => setInquiryData(prev => ({ ...prev, contact: e.target.value }))}
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendInquiry}
                  className="w-full py-2.5 rounded-xl bg-[#0c2340] hover:bg-[#15345c] text-white font-semibold text-xs tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <FaPaperPlane className="w-3 h-3" />
                  <span>Submit Consultation Request</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PROFILE VIDEO & MEDIA (IF ANY)
            ======================================================== */}
        {isFieldAllowed('profileVideo') && profile.profileVideo && (
          <div className="w-full px-5 py-3 border-t border-slate-100">
            <h3 className="text-sm font-bold text-[#0c2340] mb-2 flex items-center gap-2">
              <FaVideo className="w-4 h-4 text-[#0c2340]" />
              <span>Introductory Video</span>
            </h3>
            <VideoPlayer src={profile.profileVideo} title={`${profile.name} - Introduction`} />
          </div>
        )}

        {/* ========================================================
            OPERATING HOURS / BUSINESS SCHEDULE (IF ANY)
            ======================================================== */}
        {isFieldAllowed('businessHours') && profile.businessHours && profile.businessHours.length > 0 && (
          <div className="w-full px-5 py-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-[#0c2340] flex items-center gap-2">
                <FaRegClock className="w-4 h-4 text-[#0c2340]" />
                <span>Operating Schedule</span>
              </h3>
              {businessStatus && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  businessStatus.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {businessStatus.isOpen ? 'Open Now' : 'Closed Today'}
                </span>
              )}
            </div>

            <div className="bg-[#f8fafc] rounded-2xl p-3 border border-slate-200 text-xs space-y-1.5">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                const sched = profile.businessHours.find(h => h.day?.toLowerCase() === day);
                const isToday = new Date().getDay() === ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'].indexOf(day);
                return (
                  <div 
                    key={day} 
                    className={`flex justify-between items-center py-1 px-2 rounded-lg ${
                      isToday ? 'bg-sky-50 font-semibold text-[#0c2340]' : 'text-slate-600'
                    }`}
                  >
                    <span className="capitalize">{day}</span>
                    <span>
                      {!sched || sched.isClosed ? (
                        <span className="text-slate-400">Closed</span>
                      ) : (
                        `${sched.openingTime || '09:00'} - ${sched.closingTime || '18:00'}`
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            CONTACT DIRECTORY
            ======================================================== */}
        <div className="w-full px-5 py-3 border-t border-slate-100">
          <h3 className="text-sm font-bold text-[#0c2340] mb-2.5 flex items-center gap-2">
            <FaHeadset className="w-4 h-4 text-[#0c2340]" />
            <span>Contact Details</span>
          </h3>

          <div className="space-y-2">
            {/* Phone */}
            {profile.phones.map((p, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100 border border-slate-200/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0c2340] text-white flex items-center justify-center shrink-0">
                    <FaPhoneAlt className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {p.label || 'Phone'}
                    </span>
                    <p className="text-xs font-semibold text-slate-800">{p.number}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleCopy(p.number, `phone-${idx}`)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    title="Copy Number"
                  >
                    {copiedItem === `phone-${idx}` ? <FaCheck className="w-3 h-3 text-emerald-500" /> : <FaCopy className="w-3 h-3" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCall(p.number)}
                    className="p-1.5 rounded-lg text-[#0c2340] hover:bg-sky-50 transition-colors cursor-pointer"
                    title="Call"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {/* Email */}
            {profile.emails.map((e, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100 border border-slate-200/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0c2340] text-white flex items-center justify-center shrink-0">
                    <FaEnvelope className="w-3 h-3 text-white" />
                  </div>
                  <div className="max-w-[200px] truncate">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {e.label || 'Email'}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 truncate">{e.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleCopy(e.address, `email-${idx}`)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedItem === `email-${idx}` ? <FaCheck className="w-3 h-3 text-emerald-500" /> : <FaCopy className="w-3 h-3" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEmail(e.address)}
                    className="p-1.5 rounded-lg text-[#0c2340] hover:bg-sky-50 transition-colors cursor-pointer"
                    title="Send Email"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {/* Address */}
            {profile.addresses.map((addr, idx) => {
              const fullText = addr.fullAddress || `${addr.street || ''}, ${addr.city || ''} ${addr.country || ''}`.trim();
              if (!fullText) return null;
              return (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100 border border-slate-200/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0c2340] text-white flex items-center justify-center shrink-0">
                      <FaMapMarkerAlt className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {addr.label || 'Office'}
                      </span>
                      <p className="text-xs font-semibold text-slate-800">{fullText}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(fullText)}`, '_blank')}
                    className="p-1.5 rounded-lg text-[#0c2340] hover:bg-sky-50 transition-colors cursor-pointer"
                    title="Open Maps"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            DOWNLOADS & CATALOGS (IF ANY)
            ======================================================== */}
        {isFieldAllowed('downloads') && profile.downloads && profile.downloads.length > 0 && (
          <div className="w-full px-5 py-3 border-t border-slate-100">
            <h3 className="text-sm font-bold text-[#0c2340] mb-2.5 flex items-center gap-2">
              <FaDownload className="w-4 h-4 text-[#0c2340]" />
              <span>Documents & Brochures</span>
            </h3>

            <div className="space-y-2">
              {profile.downloads.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.fileUrl || doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#f8fafc] hover:bg-slate-100 border border-slate-200 transition-colors text-xs font-medium text-slate-800"
                >
                  <div className="flex items-center gap-2.5">
                    <FaFilePdf className="w-4 h-4 text-red-500" />
                    <span>{doc.title || doc.name || `Document #${idx + 1}`}</span>
                  </div>
                  <FaDownload className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            BOTTOM FOOTER: "Powered by Reva-Yah One" (EXACT MATCH!)
            ======================================================== */}
        <div className="w-full py-5 px-5 bg-white border-t border-slate-100 text-center mt-auto">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-700">
            <GoldenWheatEmblem className="w-4 h-4 shrink-0" color="#c8973b" />
            <span>
              Powered by <strong className="font-bold text-[#0c2340]">Reva-Yah One</strong>
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mt-2">
            <button
              type="button"
              onClick={handleNativeShare}
              className="text-xs font-semibold text-[#0c2340] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <FaShareAlt className="w-3 h-3" />
              <span>Share</span>
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="text-xs font-semibold text-[#0c2340] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <FaQrcode className="w-3 h-3" />
              <span>QR Code</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================
          QR CODE MODAL
          ======================================================== */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full shadow-2xl text-center relative border border-slate-100">
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <FaTimes className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#eef5fa] text-[#0c2340] flex items-center justify-center mx-auto mb-3">
              <FaQrcode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Scan & Connect</h3>
            <p className="text-xs text-slate-500 mb-4">
              Point your camera to instantly view and save {profile.name}'s digital card.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 inline-block mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "https://www.revayah.one")}`}
                alt="QR Code"
                className="w-44 h-44 object-contain rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => handleCopy(window.location.href, 'qrModal')}
              className="w-full py-2.5 rounded-xl bg-[#0c2340] hover:bg-[#15345c] text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {copiedItem === 'qrModal' ? (
                <>
                  <FaCheck className="w-3.5 h-3.5 text-emerald-300" />
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

export default LightCard;
