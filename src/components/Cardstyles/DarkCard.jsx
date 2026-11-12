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
  FaShareAlt, FaCopy, FaCheck, FaTimes 
} from 'react-icons/fa';
import { FaXTwitter, FaGithub, FaYoutube, FaFacebookF } from "react-icons/fa6";
import { generateVCard } from '../../utility/vcard';
import { CARD_URL } from '../../utility/constants';
import defaultCityBanner from '../../assets/images/city_skyline_banner.png';

// High clarity images
const HD_AVATAR = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";
const HD_CITY_BANNER = "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1200";

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
      <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-teal-500/20 my-3 ${className}`}>
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
      <div className={`flex flex-col items-center justify-center bg-[#001f35] rounded-2xl p-6 text-slate-400 border border-teal-500/20 my-3 ${className}`}>
        <FaVideo className="w-8 h-8 text-teal-400/60 mb-2" />
        <p className="text-xs font-medium">Video currently unavailable</p>
      </div>
    );
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-teal-500/20 my-3 ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#38c1c4] border-t-transparent" />
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

const DarkCard = ({ cardData = {}, plan = 'BusinessPremium', isPreview = false, isSnapshot = false, onShare }) => {
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

  const currentPlan = normalizePlan(cardData?.cardType || plan);

  const isFieldAllowed = (fieldName) => {
    if (cardData?.addons) {
      const lk = fieldName.toLowerCase();
      if (lk === 'gallery' && (cardData.addons.gallery || cardData.addons.photogallery)) return true;
      if ((lk === 'catalog' || lk === 'catalogpdf' || lk === 'downloads') &&
          (cardData.addons.docsbuilder || cardData.addons.catalogbuilder || cardData.addons.brochurebuilder || cardData.addons.docsmanager)) return true;
      if ((lk === 'nfcsettings' || lk === 'nfccard') && (cardData.addons.nfccard || cardData.addons.nfc)) return true;
      if ((lk === 'profilevideo' || lk === 'productvideo') && (cardData.addons.profilebuilder || cardData.addons.portfoliobuilder)) return true;
      if (lk === 'testimonials' && cardData.addons.portfoliobuilder) return true;
    }
    const allowed = cardFieldsConfig[currentPlan] || personalAllowed;
    return allowed.includes(fieldName);
  };

  // Profile Data with Dark Theme Anita Desai defaults matching reference image
  const defaultProfile = {
    name: "Anita Desai",
    jobTitle: "Project Director",
    companyName: "Reva-Yah One",
    tagline: "Innovate • Collaborate • Grow",
    aboutText: "Project Director with 12+ years of experience in delivering innovative solutions.",
    brandLabel: "Reva-Yah One",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "anita.desai@revayah.one",
    portfolio: "https://revayah.one",
    linkedin: "https://linkedin.com/in/anita-desai",
    profilePhoto: HD_AVATAR,
    services: [
      { title: "Strategic Planning", description: "Comprehensive strategic roadmaps for enterprise digital transformation.", icon: "strategy" },
      { title: "Team Leadership", description: "Cross-functional team coordination, agile development and delivery.", icon: "consulting" },
      { title: "Process Innovation", description: "Optimization of corporate workflows, increasing operational agility.", icon: "growth" },
      { title: "Solutions Architecture", description: "Scalable modern cloud, web and enterprise identity platforms.", icon: "innovation" }
    ],
    expertise: ["Strategy", "Management", "Agile", "Innovation"]
  };

  const rawName = `${cardData?.prefix || ''} ${cardData?.firstName || ''} ${cardData?.lastName || ''}`.trim();
  const profile = {
    name: rawName || cardData?.name || defaultProfile.name,
    jobTitle: cardData?.jobTitle || defaultProfile.jobTitle,
    companyName: cardData?.companyName || defaultProfile.companyName,
    companyLogo: cardData?.companyLogo || null,
    tagline: cardData?.tagline || defaultProfile.tagline,
    aboutText: cardData?.aboutText || cardData?.bio || defaultProfile.aboutText,
    brandLabel: cardData?.brandLabel || defaultProfile.brandLabel,
    profilePhoto: cardData?.profilePhoto || HD_AVATAR,
    phones: cardData?.phones || (cardData?.phone ? [{ number: cardData.phone, label: 'Work', isPrimary: true }] : [{ number: defaultProfile.phone, label: 'Work', isPrimary: true }]),
    emails: cardData?.emails || (cardData?.email ? [{ address: cardData.email, label: 'Work', isPrimary: true }] : [{ address: defaultProfile.email, label: 'Work', isPrimary: true }]),
    websites: cardData?.websites || (cardData?.website ? [{ url: cardData.website, label: 'Website' }] : [{ url: defaultProfile.portfolio, label: 'Portfolio' }]),
    addresses: cardData?.addresses || [],
    socialLinks: cardData?.socialLinks || [],
    businessHours: cardData?.businessHours || [],
    services: Array.isArray(cardData?.services) && cardData.services.length > 0 ? cardData.services : defaultProfile.services,
    products: cardData?.products || [],
    downloads: cardData?.downloads || [],
    profileVideo: cardData?.profileVideo || null,
    customerInquiry: cardData?.customerInquiry || { isEnabled: true, title: 'Request Consultation / Inquiry' },
    bannerPhoto: cardData?.bannerPhoto || HD_CITY_BANNER
  };

  const primaryPhone = profile.phones.find(p => p.isPrimary)?.number || profile.phones[0]?.number || defaultProfile.phone;
  const primaryEmail = profile.emails.find(e => e.isPrimary)?.address || profile.emails[0]?.address || defaultProfile.email;
  const portfolioLink = profile.websites[0]?.url || defaultProfile.portfolio;
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
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(`Hi ${profile.name}, I am contacting you via your Reva-Yah One card.`)}`, '_blank');
  };

  const handleEmail = (mail) => {
    if (!mail) return;
    window.location.href = `mailto:${mail}?subject=${encodeURIComponent(`Connecting from Reva-Yah One: ${profile.name}`)}`;
  };

  const handlePortfolio = (url) => {
    if (!url) return;
    window.open(url.startsWith('http') ? url : `https://${url}`, '_blank');
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
      <div className="dark-card-root w-[380px] max-w-full bg-[#001428] text-white flex flex-col items-center justify-start p-0 font-sans antialiased overflow-hidden rounded-[28px] border border-teal-500/20 shadow-2xl relative">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Playfair+Display:ital,wght@1,500;1,600;1,700&display=swap');
          .dark-card-root { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .dark-card-tagline { font-family: 'Playfair Display', Georgia, serif; font-style: italic; }
        `}</style>

        {/* Ambient Teal/Cyan and Emerald Curves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 380 700" fill="none" preserveAspectRatio="none">
            <path d="M 380 40 Q 240 120 180 260 T 380 500 Z" fill="#075b73" opacity="0.45" />
            <path d="M 380 260 Q 180 420 220 620 T 380 700 Z" fill="#008770" opacity="0.35" />
          </svg>
        </div>

        <div className="relative z-10 w-full pt-5 pb-4 px-5 text-left">
          {/* Top Bar: Golden Wheat Emblem + Reva-Yah One (Left) + Share Button (Right) */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <GoldenWheatEmblem className="w-6 h-6 shrink-0" color="#e5b858" />
              <span className="text-lg font-bold text-white tracking-tight">
                Reva-Yah One
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-teal-400/40 bg-[#002f4a]/80 flex items-center justify-center text-teal-200 shadow-sm">
              <FaShareAlt className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Hero Identity: Avatar on Left with Glowing Rim, Text on Right */}
          <div className="flex items-center gap-3.5 mb-4">
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#38c1c4] via-[#d6d7db] to-[#38b556] shadow-[0_0_18px_rgba(56,193,196,0.45)] overflow-hidden">
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
              <h1 className="text-xl font-bold text-white leading-tight tracking-tight">{profile.name}</h1>
              <p className="text-xs font-semibold text-slate-200 mt-0.5">{profile.jobTitle}</p>
              <div className="w-full h-[1px] bg-teal-500/25 my-1.5" />
              <p className="dark-card-tagline text-[12px] text-slate-300 font-medium leading-snug">
                {profile.tagline}
              </p>
            </div>
          </div>

          {/* 4 Neon Glowing Action Buttons */}
          <div className="grid grid-cols-4 gap-2 text-center my-3">
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#031d33] border-2 border-[#38b556] text-white flex items-center justify-center shadow-[0_0_14px_rgba(56,181,86,0.6)]">
                <FaPhoneAlt className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5">Call</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#031d33] border-2 border-[#32a852] text-white flex items-center justify-center shadow-[0_0_14px_rgba(50,168,82,0.6)]">
                <FaWhatsapp className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#031d33] border-2 border-[#38c1c4] text-white flex items-center justify-center shadow-[0_0_14px_rgba(56,193,196,0.6)]">
                <FaEnvelope className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5">Email</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-[#031d33] border-2 border-[#38b5ca] text-white flex items-center justify-center shadow-[0_0_14px_rgba(56,181,202,0.6)]">
                <FaBriefcase className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5">Portfolio</span>
            </div>
          </div>

          {/* About Me */}
          <div className="my-3 p-3.5 rounded-2xl bg-[#001e35]/80 border border-teal-500/25 backdrop-blur-md">
            <div className="flex items-center gap-1.5 mb-1.5">
              <FaBriefcase className="w-4 h-4 text-white" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">About Me</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {profile.aboutText}
            </p>
            <div className="mt-2.5 px-3 py-1 rounded-full border border-slate-500/60 bg-[#002236]/90 text-white text-[11px] font-medium inline-flex items-center gap-1.5">
              <span>Know More</span>
              <span className="text-teal-300">→</span>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 pb-1 flex items-center justify-center gap-1.5 text-xs text-slate-300">
            <GoldenWheatEmblem className="w-3.5 h-3.5 shrink-0" color="#e5b858" />
            <span>Powered by <strong className="font-bold text-white">Reva-Yah One</strong></span>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // EXACT MAIN CARD LAYOUT (MATCHING DARK THEME REFERENCE IMAGE)
  // ========================================================
  return (
    <div className="dark-card-root w-full min-h-screen bg-[#000d1a] text-white flex flex-col items-center justify-start p-0 antialiased selection:bg-[#38c1c4] selection:text-[#001428] relative overflow-x-hidden">
      
      {/* Dynamic Font Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Playfair+Display:ital,wght@1,500;1,600;1,700&display=swap');
        .dark-card-root {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .dark-card-tagline {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
        }
      `}</style>

      {/* Edge-to-Edge Container (Exact proportion and styling) */}
      <div className="w-full max-w-md bg-[#00162b] flex flex-col relative overflow-hidden min-h-screen shadow-2xl border-x border-teal-500/10">

        {/* Ambient Teal/Cyan and Emerald Curves (Matching exact sample colors) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Radial ambient highlights */}
          <div className="absolute top-1/4 right-0 w-80 h-96 bg-[#008770]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#053b5d]/35 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-12 right-0 w-80 h-80 bg-[#00b894]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Organic Wave Graphic (Flowing Teal/Emerald Ribbons) */}
          <svg className="w-full h-full" viewBox="0 0 400 900" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveDeepNavy" x1="1" y1="0" x2="0.2" y2="1">
                <stop offset="0%" stopColor="#075b73" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#024f63" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#001832" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="waveEmeraldGlow" x1="1" y1="0.3" x2="0.1" y2="1">
                <stop offset="0%" stopColor="#00b894" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#008770" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#001428" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="waveStrokeTop" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38c1c4" stopOpacity="0.7" />
                <stop offset="60%" stopColor="#38b556" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#001832" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Top right wave flowing down */}
            <path d="M 400 40 Q 250 120 190 270 T 400 520 Z" fill="url(#waveDeepNavy)" />
            <path d="M 400 40 Q 250 120 190 270 T 400 520" stroke="url(#waveStrokeTop)" strokeWidth="1.5" opacity="0.6" />

            {/* Bottom right wave flowing up */}
            <path d="M 400 280 Q 190 440 240 660 T 400 870 Z" fill="url(#waveEmeraldGlow)" />
            <path d="M 400 280 Q 190 440 240 660 T 400 870" stroke="#00e699" strokeWidth="1.2" opacity="0.4" />
          </svg>
        </div>

        {/* ========================================================
            TOP BAR: GOLDEN WHEAT EMBLEM + BRAND TITLE + SHARE BUTTON
            ======================================================== */}
        <div className="relative z-10 w-full px-5 pt-4 pb-2">
          <div className="flex items-center justify-between">
            
            {/* Golden Wheat Emblem + Brand Title */}
            <div className="flex items-center gap-2">
              <GoldenWheatEmblem className="w-6 h-6 shrink-0" color="#e5b858" />
              <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                {profile.brandLabel || 'Reva-Yah One'}
              </span>
            </div>

            {/* Share Button (Direct Share & Copy Link) */}
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-8 h-8 rounded-full border border-teal-400/40 bg-[#002f4a]/80 hover:bg-[#003d61] text-teal-200 shadow-[0_0_10px_rgba(56,193,196,0.25)] flex items-center justify-center transition-all active:scale-95 cursor-pointer shrink-0"
              title="Share Card"
            >
              {copiedItem === 'shareUrl' ? (
                <FaCheck className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <FaShareAlt className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* ========================================================
            HERO IDENTITY: AVATAR ON LEFT, NAME & DETAILS ON RIGHT
            ======================================================== */}
        <div className="relative z-10 w-full px-5 py-3">
          <div className="flex items-center gap-4 text-left">
            
            {/* Left: Avatar with Glowing Ring Border */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2.5px] bg-gradient-to-tr from-[#38c1c4] via-[#d6d7db] to-[#38b556] shadow-[0_0_20px_rgba(56,193,196,0.45)] overflow-hidden">
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
                  className="absolute -top-1 -right-1 w-7 h-7 rounded-lg bg-[#001f35] border border-teal-400/40 p-0.5 shadow-md flex items-center justify-center"
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
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                {profile.name}
              </h1>
              
              <p className="text-sm sm:text-base font-semibold text-slate-200 mt-0.5">
                {profile.jobTitle}
              </p>

              {/* Thin Divider Line */}
              <div className="w-full h-[1px] bg-teal-500/25 my-2" />

              {/* Slogan / Tagline in Elegant Italic Script */}
              <p className="dark-card-tagline text-xs sm:text-sm text-slate-300 font-medium leading-snug tracking-wide">
                {profile.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            ACTION BUTTONS: 4 ROUND BUTTONS WITH NEON GLOWING RINGS
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
              <div className="w-12 h-12 rounded-full bg-[#031d33] border-2 border-[#38b556] text-white flex items-center justify-center shadow-[0_0_15px_rgba(56,181,86,0.65)] group-hover:scale-105 active:scale-95 transition-all">
                <FaPhoneAlt className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5 tracking-tight">Call</span>
            </button>

            {/* 2. WhatsApp */}
            <button
              type="button"
              onClick={() => handleWhatsApp(primaryPhone)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none"
              title="WhatsApp"
            >
              <div className="w-12 h-12 rounded-full bg-[#031d33] border-2 border-[#32a852] text-white flex items-center justify-center shadow-[0_0_15px_rgba(50,168,82,0.65)] group-hover:scale-105 active:scale-95 transition-all">
                <FaWhatsapp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5 tracking-tight">WhatsApp</span>
            </button>

            {/* 3. Email */}
            <button
              type="button"
              onClick={() => handleEmail(primaryEmail)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none"
              title="Email"
            >
              <div className="w-12 h-12 rounded-full bg-[#031d33] border-2 border-[#38c1c4] text-white flex items-center justify-center shadow-[0_0_15px_rgba(56,193,196,0.65)] group-hover:scale-105 active:scale-95 transition-all">
                <FaEnvelope className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5 tracking-tight">Email</span>
            </button>

            {/* 4. Portfolio */}
            <button
              type="button"
              onClick={() => handlePortfolio(portfolioLink)}
              className="flex flex-col items-center justify-center group cursor-pointer focus:outline-none"
              title="Portfolio"
            >
              <div className="w-12 h-12 rounded-full bg-[#031d33] border-2 border-[#38b5ca] text-white flex items-center justify-center shadow-[0_0_15px_rgba(56,181,202,0.65)] group-hover:scale-105 active:scale-95 transition-all">
                <FaBriefcase className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-white mt-1.5 tracking-tight">Portfolio</span>
            </button>

          </div>
        </div>

        {/* ========================================================
            ABOUT ME: DARK GLASS CARD WITH "KNOW MORE →" BUTTON
            ======================================================== */}
        <div className="relative z-10 w-full px-5 py-3">
          <div className="bg-[#001f35]/80 backdrop-blur-md rounded-2xl p-4 border border-teal-500/20 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <FaBriefcase className="w-4 h-4 text-white" />
              <h3 className="text-sm font-bold text-white tracking-tight">
                About Me
              </h3>
            </div>
            <p className="text-xs sm:text-[13px] leading-relaxed text-slate-200">
              {profile.aboutText}
            </p>
            <button
              type="button"
              onClick={handleSaveContact}
              className="mt-3.5 px-4 py-1.5 rounded-full border border-slate-500/60 bg-[#002236]/90 hover:bg-[#002e47] text-white text-xs font-medium flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <span>Know More</span>
              <span className="text-teal-300">→</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            MY EXPERTISE: DIAMOND ICON + 4 DARK TRANSLUCENT PILLS
            ======================================================== */}
        <div className="relative z-10 w-full px-5 py-3">
          <div className="flex items-center gap-2 mb-2.5">
            <FaGem className="w-4 h-4 text-[#38c1c4]" />
            <h2 className="text-base font-bold text-white tracking-tight">
              My Expertise
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {expertiseList.map((skill, idx) => (
              <div 
                key={idx}
                className="py-1.5 px-2 rounded-full bg-[#00263f]/80 text-slate-200 text-xs font-medium text-center truncate border border-teal-500/25 shadow-xs backdrop-blur-xs"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            CITYSCAPE / MODERN SKYLINE BANNER
            ======================================================== */}
        <div className="relative z-10 w-full px-5 py-2">
          <div className="w-full aspect-[2.4/1] rounded-2xl overflow-hidden shadow-lg border border-teal-500/20 relative">
            <img 
              src={profile.bannerPhoto} 
              alt="City Skyline" 
              className="w-full h-full object-cover" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultCityBanner;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001428]/70 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ========================================================
            SAVE CONTACT TO PHONE (vCard CTA)
            ======================================================== */}
        <div className="relative z-10 w-full px-5 pt-3 pb-2">
          <button
            type="button"
            onClick={handleSaveContact}
            className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#38b556] via-[#38c1c4] to-[#38b5ca] hover:opacity-95 text-[#001428] font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(56,193,196,0.35)] transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaDownload className="w-4 h-4 text-[#001428]" />
            <span>Save Contact to Phone</span>
          </button>
        </div>

        {/* ========================================================
            SERVICES SHOWCASE (IF AVAILABLE)
            ======================================================== */}
        {isFieldAllowed('services') && profile.services && profile.services.length > 0 && (
          <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20 mt-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FaCogs className="w-4 h-4 text-[#38c1c4]" />
                <span>Featured Services</span>
              </h2>
              <span className="text-[11px] text-[#38c1c4] font-medium">
                {profile.services.length} available
              </span>
            </div>

            <div className="space-y-2.5">
              {profile.services.map((service, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 backdrop-blur-md hover:bg-[#00263f] transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#38c1c4]" />
                        <h4 className="text-xs font-bold text-white">{service.title}</h4>
                      </div>
                      {service.description && (
                        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed pl-4">
                          {service.description}
                        </p>
                      )}
                    </div>
                    {service.price && (
                      <span className="text-xs font-bold text-[#38b556] shrink-0">
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
          <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#001f35]/90 to-[#001628]/90 border border-[#38c1c4]/30 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <FaCalendarAlt className="w-4 h-4 text-[#38c1c4]" />
                <h3 className="text-sm font-bold text-white">
                  {profile.customerInquiry?.title || 'Book a Consultation'}
                </h3>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Select your required service and preferred time to connect directly with {profile.name}.
              </p>

              <div className="space-y-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                    Service Required *
                  </label>
                  <select
                    value={inquiryData.service}
                    onChange={(e) => setInquiryData({ ...inquiryData, service: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#001628] border border-teal-500/30 text-white focus:outline-none focus:border-[#38c1c4] cursor-pointer"
                  >
                    <option value="" className="bg-[#001628] text-slate-300">Select a service...</option>
                    {profile.services.map((s, idx) => (
                      <option key={idx} value={s.title} className="bg-[#001628] text-white">
                        {s.title}
                      </option>
                    ))}
                    <option value="General Consultation" className="bg-[#001628] text-white">General Consultation</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 mb-1 block">Preferred Date</label>
                    <input
                      type="date"
                      value={inquiryData.date}
                      onChange={(e) => setInquiryData({ ...inquiryData, date: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl bg-[#001628] border border-teal-500/30 text-white focus:outline-none focus:border-[#38c1c4]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 mb-1 block">Preferred Time</label>
                    <input
                      type="time"
                      value={inquiryData.time}
                      onChange={(e) => setInquiryData({ ...inquiryData, time: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl bg-[#001628] border border-teal-500/30 text-white focus:outline-none focus:border-[#38c1c4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 mb-1 block">
                    Your Contact (Phone or Email) *
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210 or name@example.com"
                    value={inquiryData.contact}
                    onChange={(e) => setInquiryData({ ...inquiryData, contact: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl bg-[#001628] border border-teal-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-[#38c1c4]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendInquiry}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#38b556] to-[#38c1c4] hover:opacity-95 text-[#001428] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer mt-1"
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
          <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              <FaVideo className="w-4 h-4 text-[#38c1c4]" />
              <span>Video Presentation</span>
            </h2>
            <VideoPlayer src={profile.profileVideo} title={`${profile.name} Presentation`} />
          </div>
        )}

        {/* ========================================================
            BUSINESS HOURS (IF CONFIGURED)
            ======================================================== */}
        {isFieldAllowed('businessHours') && profile.businessHours && profile.businessHours.length > 0 && (
          <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <FaRegClock className="w-4 h-4 text-[#38c1c4]" />
                <span>Working Hours</span>
              </h2>
              {businessStatus && (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  businessStatus.isOpen 
                    ? 'bg-emerald-500/20 text-[#38b556] border border-emerald-500/40' 
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}>
                  {businessStatus.text}
                </span>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 space-y-1.5">
              {profile.businessHours.map((slot, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                  <span className="font-medium text-slate-300 capitalize">{slot.day}</span>
                  <span className="text-slate-400">
                    {slot.isClosed ? (
                      <span className="text-rose-400 font-medium">Closed</span>
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
        <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20 space-y-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FaHeadset className="w-4 h-4 text-[#38c1c4]" />
            <span>Contact Directory</span>
          </h2>

          <div className="space-y-2">
            {/* Phones */}
            {profile.phones.map((p, idx) => (
              <div 
                key={idx}
                onClick={() => handleCall(p.number)}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 hover:bg-[#002844] cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-[#38b556]/40 text-[#38b556] flex items-center justify-center">
                    <FaPhoneAlt className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{p.number}</p>
                    <p className="text-[10px] text-slate-400 capitalize">{p.label || 'Direct Phone'}</p>
                  </div>
                </div>
                <FaExternalLinkAlt className="w-3 h-3 text-slate-500" />
              </div>
            ))}

            {/* Emails */}
            {profile.emails.map((e, idx) => (
              <div 
                key={idx}
                onClick={() => handleEmail(e.address)}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 hover:bg-[#002844] cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-[#38c1c4]/40 text-[#38c1c4] flex items-center justify-center">
                    <FaEnvelope className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{e.address}</p>
                    <p className="text-[10px] text-slate-400 capitalize">{e.label || 'Email Address'}</p>
                  </div>
                </div>
                <FaExternalLinkAlt className="w-3 h-3 text-slate-500 shrink-0" />
              </div>
            ))}

            {/* Addresses */}
            {profile.addresses && profile.addresses.map((addr, idx) => (
              <div 
                key={idx}
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(`${addr.street || ''} ${addr.city || ''} ${addr.state || ''}`)}`, '_blank')}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 hover:bg-[#002844] cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center">
                    <FaMapMarkerAlt className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      {[addr.street, addr.city, addr.state, addr.country].filter(Boolean).join(', ') || 'Office Location'}
                    </p>
                    <p className="text-[10px] text-slate-400 capitalize">{addr.label || 'Address'}</p>
                  </div>
                </div>
                <FaExternalLinkAlt className="w-3 h-3 text-slate-500" />
              </div>
            ))}
          </div>

          {/* Social Links Icons */}
          {profile.socialLinks && profile.socialLinks.length > 0 && (
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-400 mb-2">Connect Across Platforms</p>
              <div className="flex flex-wrap gap-2">
                {profile.socialLinks.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center text-slate-200 hover:text-white hover:bg-teal-500/20 hover:border-[#38c1c4] transition-all shadow-xs"
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
          <div className="relative z-10 w-full px-5 py-4 border-t border-teal-500/20">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <FaFilePdf className="w-4 h-4 text-rose-400" />
              <span>Brochures & Resources</span>
            </h2>

            <div className="space-y-2">
              {profile.downloads.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.url || doc.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#001f35]/70 border border-teal-500/20 hover:bg-[#002844] transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <FaFilePdf className="w-4 h-4 text-rose-400" />
                    <span className="text-xs text-white font-medium">{doc.title || doc.name || `Document #${idx + 1}`}</span>
                  </div>
                  <FaDownload className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            BOTTOM FOOTER: "Powered by Reva-Yah One"
            ======================================================== */}
        <div className="relative z-10 w-full py-6 px-5 border-t border-teal-500/20 text-center mt-auto bg-[#001122]">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300">
            <GoldenWheatEmblem className="w-4 h-4 shrink-0" color="#e5b858" />
            <span>
              Powered by <strong className="font-bold text-white">Reva-Yah One</strong>
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mt-2.5">
            <button
              type="button"
              onClick={handleNativeShare}
              className="text-xs font-semibold text-[#38c1c4] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <FaShareAlt className="w-3 h-3" />
              <span>Share</span>
            </button>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="text-xs font-semibold text-[#38c1c4] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <FaQrcode className="w-3 h-3" />
              <span>QR Code</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================
          QR CODE MODAL (DARK THEME)
          ======================================================== */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#001f35] border border-teal-500/30 rounded-3xl p-6 max-w-xs w-full shadow-2xl text-center relative text-white">
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white cursor-pointer"
            >
              <FaTimes className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-[#38c1c4]/40 text-[#38c1c4] flex items-center justify-center mx-auto mb-3">
              <FaQrcode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Scan & Connect</h3>
            <p className="text-xs text-slate-400 mb-4">
              Point your camera to instantly view and save {profile.name}'s digital card.
            </p>
            <div className="bg-white p-3 rounded-2xl inline-block mb-4 shadow-lg">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "https://www.revayah.one")}`}
                alt="QR Code"
                className="w-44 h-44 object-contain rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => handleCopy(window.location.href, 'qrModal')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#38b556] to-[#38c1c4] hover:opacity-95 text-[#001428] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {copiedItem === 'qrModal' ? (
                <>
                  <FaCheck className="w-3.5 h-3.5" />
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

export default DarkCard;
