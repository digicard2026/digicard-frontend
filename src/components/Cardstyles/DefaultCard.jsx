import React, { useState, useEffect } from 'react';
import {
  FaLinkedin, FaTwitter, FaInstagram, FaEnvelope,
  FaMapMarkerAlt, FaChevronRight, FaGlobe,
  FaPhoneAlt, FaWhatsapp, FaUserFriends,
  FaBuilding, FaVideo, FaImage, FaGem, FaStar,
  FaDownload, FaQrcode, FaShieldAlt, FaInfoCircle,
  FaCrown, FaBriefcase, FaCalendarAlt, FaHeadset,
  FaFilePdf, FaIdCard, FaTags, FaFileAlt,
  FaFileInvoice, FaRegClock, FaFileVideo, FaRobot,
  FaCommentDots, FaBullhorn, FaClipboardList,
  FaSuitcase, FaUsers, FaCogs, FaCheckCircle,
  FaAward, FaPaperPlane, FaExternalLinkAlt, FaClock,
  FaShareAlt, FaCopy, FaCheck, FaTimes
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
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
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

const DefaultCard = ({ cardData = {}, plan = 'BusinessPremium', isSnapshot = false, onShare }) => {
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
    if (cardData?.addons) {
      const lk = field.toLowerCase();
      if (lk === 'gallery' && (cardData.addons.gallery || cardData.addons.photogallery)) return true;
      if ((lk === 'catalog' || lk === 'catalogpdf' || lk === 'downloads') &&
        (cardData.addons.docsbuilder || cardData.addons.catalogbuilder || cardData.addons.brochurebuilder || cardData.addons.docsmanager)) return true;
      if ((lk === 'nfcsettings' || lk === 'nfccard') && (cardData.addons.nfccard || cardData.addons.nfc)) return true;
      if ((lk === 'profilevideo' || lk === 'productvideo') && (cardData.addons.profilebuilder || cardData.addons.portfoliobuilder)) return true;
    }
    const allowed = cardFieldsConfig[currentPlan] || cardFieldsConfig.BusinessPremium;
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

  // --- RESILIENT DATA MAPPING ---
  const profile = {
    prefix: cardData.prefix || '',
    firstName: cardData.firstName || '',
    lastName: cardData.lastName || '',
    name: `${cardData.prefix ? cardData.prefix + ' ' : ''}${cardData.firstName || ''} ${cardData.lastName || ''}`.trim() || 'Professional Contact',
    jobTitle: cardData.jobTitle || '',
    department: cardData.department || '',
    companyName: cardData.companyName || cardData.organization || '',
    companyLogo: cardData.companyLogo,
    profilePhoto: cardData.profilePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    tagline: cardData.tagline || '',
    bio: cardData.bio || '',
    aboutText: cardData.aboutText || '',
    foundedName: cardData.foundedName || '',
    organization: cardData.organization || '',
    serviceArea: cardData.serviceArea || '',
    serviceAvailability: cardData.serviceAvailability || '',

    phones: Array.isArray(cardData.phones) && cardData.phones.length > 0
      ? cardData.phones
      : cardData.phone ? [{ label: 'work', number: cardData.phone }] : [],
    emails: Array.isArray(cardData.emails) && cardData.emails.length > 0
      ? cardData.emails
      : cardData.email ? [{ label: 'work', address: cardData.email }] : [],
    websites: Array.isArray(cardData.websites) && cardData.websites.length > 0
      ? cardData.websites
      : cardData.website ? [{ label: 'company', url: cardData.website }] : [],
    addresses: cardData.addresses || [],
    socialLinks: cardData.socialLinks || [],

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

    brandLabel: cardData.brandLabel || 'Revayah One Verified',
    enableOneTapCall: cardData.enableOneTapCall !== undefined ? cardData.enableOneTapCall : true,
    enableWhatsApp: cardData.enableWhatsApp !== undefined ? cardData.enableWhatsApp : true,
    enableEmail: cardData.enableEmail !== undefined ? cardData.enableEmail : true
  };

  const primaryPhone = profile.phones.find(p => p.isPrimary)?.number || profile.phones[0]?.number || '';
  const primaryEmail = profile.emails.find(e => e.isPrimary)?.address || profile.emails[0]?.address || cardData.email || '';
  const primaryWebsite = profile.websites[0]?.url || '';
  const businessStatus = getBusinessStatus(profile.businessHours);

  // Dedicated Rich Snapshot Rendering for WhatsApp and Social Media Preview Unfurls
  if (isSnapshot) {
    const rawPhoto = profile.profilePhoto;
    const photoSrc = (rawPhoto && rawPhoto.startsWith('http') && !rawPhoto.includes('unsplash.com'))
      ? `${CARD_URL}/proxy-image?url=${encodeURIComponent(rawPhoto)}`
      : rawPhoto;

    return (
      <div className="w-[360px] max-w-full bg-white text-slate-800 flex flex-col items-center justify-start p-0 font-sans antialiased overflow-hidden rounded-[28px] border border-slate-200 shadow-xl">
        {/* EXECUTIVE HERO: Deep Midnight Navy Canvas */}
        <div className="relative w-full bg-[#0B1E36] px-5 pt-7 pb-6 text-center overflow-hidden">
          {/* Subtle Champagne Gold Accent Line */}
          <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D8B48D]/40 to-transparent pointer-events-none" />

          {/* Top Brand Pill & Digital ID Indicator */}
          <div className="relative z-10 flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/35 border border-[#D8B48D]/30 backdrop-blur-md">
              <FaShieldAlt className="w-2.5 h-2.5 text-[#D8B48D]" />
              <span className="text-[9px] font-semibold text-white uppercase tracking-wider">
                {profile.brandLabel || 'REVAYAH ONE'}
              </span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-slate-200 text-[9px] font-medium">
              <span>Digital ID Card</span>
            </div>
          </div>

          {/* Centered Avatar with Crisp White Ring Halo */}
          <div className="relative inline-block mx-auto mb-3">
            <div className="w-24 h-24 rounded-full p-1 bg-white/20 shadow-xl backdrop-blur-sm border-2 border-white">
              <img
                src={photoSrc}
                alt={profile.name}
                crossOrigin="anonymous"
                className="w-full h-full object-cover rounded-full bg-slate-100 shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600";
                }}
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#D8B48D] text-[#0B1E36] border-2 border-white flex items-center justify-center shadow-md">
                <FaCheckCircle className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Linear Typography Hierarchy */}
          <h1 className="text-xl font-bold tracking-tight text-white mb-0.5">
            {profile.name}
          </h1>
          {profile.jobTitle && (
            <p className="text-xs font-medium text-slate-200 mb-1">
              {profile.jobTitle}
            </p>
          )}
          {profile.companyName && (
            <p className="text-[11px] font-semibold text-[#D8B48D] tracking-wide">
              {profile.companyName} {profile.department ? `• ${profile.department}` : ''}
            </p>
          )}

          {/* Unified Champagne/Gold Quick Action Strip */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex-1 max-w-[95px] flex items-center justify-center gap-1 py-1.5 px-2 rounded-full bg-[#E5C39E] text-[#0B1E36] font-semibold text-[11px] shadow-sm">
              <FaPhoneAlt className="w-2.5 h-2.5" />
              <span>Call</span>
            </div>
            <div className="flex-1 max-w-[105px] flex items-center justify-center gap-1 py-1.5 px-2 rounded-full bg-[#E5C39E] text-[#0B1E36] font-semibold text-[11px] shadow-sm">
              <FaWhatsapp className="w-3 h-3" />
              <span>WhatsApp</span>
            </div>
            <div className="flex-1 max-w-[95px] flex items-center justify-center gap-1 py-1.5 px-2 rounded-full bg-[#E5C39E] text-[#0B1E36] font-semibold text-[11px] shadow-sm">
              <FaEnvelope className="w-2.5 h-2.5" />
              <span>Email</span>
            </div>
          </div>
        </div>

        {/* DOSSIER BODY: Clean White Canvas */}
        <div className="w-full px-5 py-4 space-y-3.5 bg-white text-left">
          {/* Section: About Me */}
          {(profile.aboutText || profile.bio) && (
            <div>
              <h2 className="text-[11px] font-bold text-[#0B1E36] uppercase tracking-wider mb-1 flex items-center gap-1">
                <FaBriefcase className="w-2.5 h-2.5 text-[#D8B48D]" />
                <span>About Me</span>
              </h2>
              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                {profile.aboutText || profile.bio}
              </p>
            </div>
          )}

          {/* Section: My Services (2x2 Modular Grid) */}
          {profile.services && profile.services.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold text-[#0B1E36] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <FaCogs className="w-2.5 h-2.5 text-[#D8B48D]" />
                <span>My Services</span>
              </h2>
              <div className="grid grid-cols-2 gap-1.5">
                {profile.services.slice(0, 4).map((srv, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1.5">
                    <span className="text-[#0B1E36] text-xs">🎯</span>
                    <span className="text-[10px] font-semibold text-slate-700 truncate">{srv.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Contact Secondary Action */}
          <div className="pt-1">
            <div className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold text-[11px] flex items-center justify-center gap-1.5 shadow-xs">
              <FaDownload className="w-3 h-3 text-slate-500" />
              <span>Save Contact to Phone</span>
            </div>
          </div>
        </div>

        {/* Footer Brand Watermark */}
        <div className="w-full py-2 text-center border-t border-slate-100 bg-slate-50">
          <span className="text-[9.5px] font-medium text-slate-500">
            Powered by <strong className="text-slate-800">Reva-Yah One</strong> • Smart Digital Identity
          </span>
        </div>
      </div>
    );
  }

  // Copy helper
  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedItem(key);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  // Direct contact actions
  const handleCall = (num) => {
    if (!num) return;
    window.location.href = `tel:${num.replace(/\s+/g, '')}`;
  };

  const handleWhatsApp = (num) => {
    const cleanNum = (num || primaryPhone).replace(/\D/g, '');
    if (!cleanNum) return;
    const greeting = encodeURIComponent(`Hello ${profile.name}, I connected with you via your Revayah One digital card.`);
    window.open(`https://wa.me/${cleanNum}?text=${greeting}`, '_blank');
  };

  const handleEmail = (email) => {
    if (!email) return;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Inquiry via Revayah One: ${profile.name}`)}`;
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

    const isMobile = typeof navigator !== "undefined" && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && !window.MSStream));

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
    const message = `Hello ${profile.name}!\n\nI would like to request a consultation via your Revayah One card:\n- Service: ${inquiryData.service}\n- Preferred Date: ${inquiryData.date || 'Flexible'}\n- Preferred Time: ${inquiryData.time || 'Flexible'}\n- Customer Contact: ${inquiryData.contact}`;

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
    if (p.includes('instagram')) return <FaInstagram className="w-4 h-4" />;
    if (p.includes('facebook')) return <FaFacebookF className="w-4 h-4" />;
    if (p.includes('youtube')) return <FaYoutube className="w-4 h-4" />;
    if (p.includes('whatsapp')) return <FaWhatsapp className="w-4 h-4" />;
    return <FaGlobe className="w-4 h-4" />;
  };

  return (
    <div className="w-full min-h-screen bg-[#0B1E36] text-slate-800 flex flex-col items-center justify-start p-0 font-sans antialiased selection:bg-[#0B1E36] selection:text-white relative overflow-x-hidden">

      {/* Executive Card Shell - Flush edge-to-edge layout matching Creative Card */}
      <div className="w-full max-w-md bg-white flex flex-col relative overflow-hidden min-h-screen">

        {/* ========================================================
            HERO HEADER: DEEP MIDNIGHT NAVY & CHAMPAGNE GOLD STAGE
            ======================================================== */}
        <div className="relative bg-[#0B1E36] px-6 pt-7 pb-7 text-center overflow-hidden">

          {/* Subtle Champagne Gold Accent Line */}
          <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D8B48D]/40 to-transparent pointer-events-none" />

          {/* Top Brand Pill & Share */}
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/35 border border-[#D8B48D]/30 backdrop-blur-md">
              <FaShieldAlt className="w-3 h-3 text-[#D8B48D]" />
              <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
                {isFieldAllowed('brandLabel') && profile.brandLabel ? profile.brandLabel : 'REVAYAH ONE'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleNativeShare}
              className="p-2 rounded-full bg-black/35 hover:bg-black/50 border border-white/20 text-white backdrop-blur-md transition-all active:scale-95 shadow-md cursor-pointer"
              title="Share Card"
            >
              {copiedItem === 'shareUrl' ? (
                <FaCheck className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <FaShareAlt className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          </div>

          {/* Centered Avatar with Crisp White Ring Halo */}
          <div className="relative inline-block mx-auto mb-3">
            <div className="relative w-28 h-28 rounded-full p-1 bg-white/20 shadow-xl backdrop-blur-sm border-2 border-white">
              <img
                src={profile.profilePhoto}
                alt={profile.name}
                crossOrigin="anonymous"
                className="w-full h-full object-cover rounded-full bg-slate-100 shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600";
                }}
              />
              {/* Verified Badge */}
              <div
                className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-[#D8B48D] text-[#0B1E36] border-2 border-white flex items-center justify-center shadow-md"
                title="Verified Identity"
              >
                <FaCheckCircle className="w-4 h-4" />
              </div>

              {/* Company Logo Badge if available */}
              {isFieldAllowed('companyLogo') && profile.companyLogo && (
                <div
                  className="absolute -top-1 -right-1 w-8 h-8 rounded-xl bg-white border border-slate-200 p-1 shadow-md flex items-center justify-center"
                  title={profile.companyName || "Company"}
                >
                  <img
                    src={profile.companyLogo}
                    alt="Company Logo"
                    crossOrigin="anonymous"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Linear Typography Hierarchy */}
          <h1 className="text-2xl font-bold tracking-tight text-white mb-0.5">
            {profile.name}
          </h1>

          {/* Job Title */}
          {profile.jobTitle && (
            <p className="text-sm font-medium text-slate-200 mb-1">
              {profile.jobTitle}
            </p>
          )}

          {/* Company & Department Details */}
          {isFieldAllowed('companyName') && profile.companyName && (
            <p className="text-xs font-semibold text-[#D8B48D] tracking-wide mb-2">
              {profile.companyName}
              {isFieldAllowed('department') && profile.department && (
                <span> • {profile.department}</span>
              )}
            </p>
          )}

          {/* Service Area & Availability Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
            {isFieldAllowed('businessHours') && businessStatus && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium border ${
                businessStatus.isOpen
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                  : 'bg-white/10 text-slate-300 border-white/15'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${businessStatus.isOpen ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                {businessStatus.text}
              </span>
            )}

            {isFieldAllowed('serviceArea') && profile.serviceArea && (
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-slate-200 border border-white/15">
                <FaMapMarkerAlt className="w-2.5 h-2.5 text-[#D8B48D]" />
                Serving: {profile.serviceArea}
              </span>
            )}
          </div>

          {/* Unified Champagne/Gold Quick Action Strip */}
          <div className="flex items-center justify-center gap-2.5 mt-5">
            {/* Call */}
            {profile.enableOneTapCall && primaryPhone && (
              <button
                type="button"
                onClick={() => handleCall(primaryPhone)}
                className="flex-1 max-w-[105px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#E5C39E] hover:bg-[#d8b48d] text-[#0B1E36] font-semibold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <FaPhoneAlt className="w-3 h-3" />
                <span>Call</span>
              </button>
            )}

            {/* WhatsApp */}
            {profile.enableWhatsApp && primaryPhone && (
              <button
                type="button"
                onClick={() => handleWhatsApp(primaryPhone)}
                className="flex-1 max-w-[110px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#E5C39E] hover:bg-[#d8b48d] text-[#0B1E36] font-semibold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <FaWhatsapp className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            )}

            {/* Email */}
            {profile.enableEmail && primaryEmail && (
              <button
                type="button"
                onClick={() => handleEmail(primaryEmail)}
                className="flex-1 max-w-[105px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#E5C39E] hover:bg-[#d8b48d] text-[#0B1E36] font-semibold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <FaEnvelope className="w-3 h-3" />
                <span>Email</span>
              </button>
            )}

            {/* Website / Portal / QR */}
            {primaryWebsite ? (
              <button
                type="button"
                onClick={() => handleWebsite(primaryWebsite)}
                className="flex-1 max-w-[105px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#E5C39E] hover:bg-[#d8b48d] text-[#0B1E36] font-semibold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <FaGlobe className="w-3 h-3" />
                <span>Portal</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="flex-1 max-w-[105px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#E5C39E] hover:bg-[#d8b48d] text-[#0B1E36] font-semibold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <FaQrcode className="w-3 h-3" />
                <span>QR Code</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================
            PROFESSIONAL DOSSIER: CRISP WHITE BODY CANVAS
            ======================================================== */}
        <div className="bg-white px-6 py-6 space-y-6 text-left">

          {/* 1. ABOUT ME & EXECUTIVE SUMMARY (Immediately below hero) */}
          {(profile.aboutText || profile.bio || profile.tagline) && (
            <div className="space-y-2">
              <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-1.5">
                <FaBriefcase className="w-3.5 h-3.5 text-[#D8B48D]" />
                <span>About Me</span>
              </h2>
              {profile.tagline && (
                <p className="text-xs font-medium italic text-slate-700">
                  "{profile.tagline}"
                </p>
              )}
              {profile.aboutText && (
                <p className="text-xs leading-relaxed text-slate-600 font-normal">
                  {profile.aboutText}
                </p>
              )}
              {profile.bio && profile.bio !== profile.aboutText && (
                <p className="text-xs leading-relaxed text-slate-500 font-normal">
                  {profile.bio}
                </p>
              )}
            </div>
          )}

          {/* 2. MY SERVICES (2x2 MODULAR GRID) */}
          {isFieldAllowed('services') && profile.services && profile.services.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-1.5">
                  <FaCogs className="w-3.5 h-3.5 text-[#D8B48D]" />
                  <span>My Services</span>
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {profile.services.length} Available
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {profile.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between p-3.5 rounded-2xl bg-slate-50/90 border border-slate-100 hover:border-[#D8B48D]/50 hover:bg-slate-50 transition-all shadow-xs group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[#0B1E36] text-sm">🎯</span>
                        {srv.price && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                            {srv.currency || '€'}{srv.price}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#0B1E36] line-clamp-1">
                        {srv.name}
                      </h3>
                      {srv.category && (
                        <span className="text-[9.5px] font-medium uppercase tracking-wider text-slate-400 block mt-0.5">
                          {srv.category}
                        </span>
                      )}
                      {srv.description && (
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                          {srv.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium">Direct Advisory</span>
                      <button
                        type="button"
                        onClick={() => {
                          setInquiryData(prev => ({ ...prev, service: srv.name }));
                          const funnel = document.getElementById('inquiry-funnel');
                          if (funnel) funnel.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-[11px] font-semibold text-[#0B1E36] hover:text-[#D8B48D] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Inquire</span>
                        <FaPaperPlane className="w-2.5 h-2.5 text-[#D8B48D]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. CONTACT INFORMATION DIRECTORY */}
          <div className="space-y-3 pt-2">
            <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-1.5">
              <FaHeadset className="w-3.5 h-3.5 text-[#D8B48D]" />
              <span>Contact Information</span>
            </h2>

            <div className="space-y-2.5">
              {/* Phone */}
              {profile.phones.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0B1E36] text-[#E5C39E] flex items-center justify-center shadow-xs">
                      <FaPhoneAlt className="w-3 h-3" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {p.label || 'Direct Phone'}
                      </span>
                      <p className="text-xs font-semibold text-slate-800">{p.number}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
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
                      className="p-1.5 rounded-lg text-[#0B1E36] hover:bg-slate-200 transition-colors cursor-pointer"
                      title="Call Direct"
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
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0B1E36] text-[#E5C39E] flex items-center justify-center shadow-xs">
                      <FaEnvelope className="w-3 h-3" />
                    </div>
                    <div className="max-w-[200px] truncate">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {e.label || 'Email Address'}
                      </span>
                      <p className="text-xs font-semibold text-slate-800 truncate">{e.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
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
                      className="p-1.5 rounded-lg text-[#0B1E36] hover:bg-slate-200 transition-colors cursor-pointer"
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
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0B1E36] text-[#E5C39E] flex items-center justify-center shadow-xs">
                        <FaMapMarkerAlt className="w-3 h-3" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {addr.label || 'Office Location'}
                        </span>
                        <p className="text-xs font-semibold text-slate-800">{fullText}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(fullText)}`, '_blank')}
                      className="p-1.5 rounded-lg text-[#0B1E36] hover:bg-slate-200 transition-colors cursor-pointer"
                      title="Open Maps"
                    >
                      <FaExternalLinkAlt className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. OPERATING SCHEDULE / BUSINESS HOURS */}
          {isFieldAllowed('businessHours') && profile.businessHours && profile.businessHours.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-1.5">
                  <FaRegClock className="w-3.5 h-3.5 text-[#D8B48D]" />
                  <span>Operating Schedule</span>
                </h2>
                {businessStatus && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    businessStatus.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {businessStatus.isOpen ? 'Open Now' : 'Closed Today'}
                  </span>
                )}
              </div>

              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-xs space-y-2">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                  const sched = profile.businessHours.find(h => h.day?.toLowerCase() === day);
                  const isToday = new Date().getDay() === ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day);
                  return (
                    <div
                      key={day}
                      className={`flex justify-between items-center py-1 px-2 rounded-lg ${
                        isToday ? 'bg-[#0B1E36]/10 font-semibold text-[#0B1E36]' : 'text-slate-600'
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

          {/* 5. DIRECT LEAD CAPTURE FUNNEL: CONSULTATION & INQUIRY */}
          {isFieldAllowed('customerInquiry') && (
            <div id="inquiry-funnel" className="pt-2">
              <div className="bg-gradient-to-br from-slate-50 to-amber-50/20 rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <FaCalendarAlt className="w-4 h-4 text-[#0B1E36]" />
                  <h2 className="text-sm font-bold text-[#0B1E36]">Request a Consultation</h2>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Schedule direct discussion with {profile.name} for strategic or technical advisory.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Required Service or Topic
                    </label>
                    <select
                      value={inquiryData.service}
                      onChange={(e) => setInquiryData(prev => ({ ...prev, service: e.target.value }))}
                      className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1E36]"
                    >
                      <option value="">Select a service / topic...</option>
                      {profile.services.map((s, idx) => (
                        <option key={idx} value={s.name}>{s.name}</option>
                      ))}
                      <option value="General Strategic Consultation">General Strategic Consultation</option>
                      <option value="Enterprise Architecture Review">Enterprise Architecture Review</option>
                      <option value="Other Inquiries">Other Inquiries</option>
                    </select>
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
                        className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1E36]"
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
                        className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1E36]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Your Contact Number / WhatsApp
                    </label>
                    <input
                      type="text"
                      placeholder="+91 98765 43210"
                      value={inquiryData.contact}
                      onChange={(e) => setInquiryData(prev => ({ ...prev, contact: e.target.value }))}
                      className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0B1E36]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSendInquiry}
                    className="w-full py-2.5 rounded-xl bg-[#0B1E36] hover:bg-[#132c4d] text-white font-semibold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  >
                    <FaPaperPlane className="w-3 h-3 text-[#D8B48D]" />
                    <span>Submit Consultation Request</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 6. PRODUCTS & MERCHANDISE (IF ANY) */}
          {isFieldAllowed('products') && profile.products && profile.products.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-1.5">
                  <FaGem className="w-3.5 h-3.5 text-[#D8B48D]" />
                  <span>Products & Solutions</span>
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {profile.products.length} Items
                </span>
              </div>

              <div className="space-y-3">
                {profile.products.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-start gap-3">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-slate-100" />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-slate-900 text-xs">{item.name}</h3>
                        {item.price && (
                          <span className="text-xs font-bold text-[#0B1E36]">{item.currency || '€'} {item.price}</span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. PROFILE VIDEO & MEDIA (IF ANY) */}
          {isFieldAllowed('profileVideo') && profile.profileVideo && (
            <div className="space-y-2 pt-2">
              <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-1.5">
                <FaVideo className="w-3.5 h-3.5 text-[#D8B48D]" />
                <span>Introductory Video</span>
              </h2>
              <VideoPlayer src={profile.profileVideo} title={`${profile.name} - Introduction`} />
            </div>
          )}

          {/* 8. SOCIAL NETWORKS */}
          {profile.socialLinks && profile.socialLinks.length > 0 && (
            <div className="space-y-3 pt-2">
              <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-1.5">
                <FaUsers className="w-3.5 h-3.5 text-[#D8B48D]" />
                <span>Social Networks</span>
              </h2>

              <div className="flex flex-wrap gap-2">
                {profile.socialLinks.map((s, idx) => {
                  if (!s.url) return null;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleWebsite(s.url)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-[#0B1E36]/5 border border-slate-200 hover:border-[#D8B48D]/50 text-slate-700 hover:text-[#0B1E36] transition-all text-xs font-semibold cursor-pointer"
                    >
                      {getSocialIcon(s.platform)}
                      <span className="capitalize">{s.platform}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 9. DOWNLOADS & CATALOGS (IF ANY) */}
          {isFieldAllowed('downloads') && profile.downloads && profile.downloads.length > 0 && (
            <div className="space-y-3 pt-2">
              <h2 className="text-base font-bold text-[#0B1E36] tracking-tight flex items-center gap-1.5">
                <FaDownload className="w-3.5 h-3.5 text-[#D8B48D]" />
                <span>Documents & Catalogs</span>
              </h2>

              <div className="space-y-2">
                {profile.downloads.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.fileUrl || doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors text-xs font-medium text-slate-800"
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

          {/* 10. SECONDARY ACTION: SAVE CONTACT TO PHONE (.vcf) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSaveContact}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <FaDownload className="w-3.5 h-3.5 text-slate-500" />
              <span>Save Contact to Phone (.vcf)</span>
            </button>
          </div>

          {/* 11. FOOTER: POWERED BY REVAYAH ONE */}
          <div className="pt-4 pb-2 text-center border-t border-slate-100">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 mb-1">
              <FaCrown className="w-3.5 h-3.5 text-[#D8B48D]" />
              <span>REVAYAH ONE</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Official Digital Identity & Service Portal
            </p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <button
                type="button"
                onClick={handleNativeShare}
                className="text-xs font-semibold text-slate-700 hover:text-[#0B1E36] flex items-center gap-1 cursor-pointer"
              >
                <FaShareAlt className="w-3 h-3 text-[#D8B48D]" />
                Share
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="text-xs font-semibold text-slate-700 hover:text-[#0B1E36] flex items-center gap-1 cursor-pointer"
              >
                <FaQrcode className="w-3 h-3 text-[#D8B48D]" />
                QR Code
              </button>
            </div>
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
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600"
            >
              <FaTimes className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#0B1E36] text-[#E5C39E] flex items-center justify-center mx-auto mb-3">
              <FaQrcode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Scan & Connect</h3>
            <p className="text-xs text-slate-500 mb-4">
              Point your camera to instantly view and save {profile.name}'s digital card.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 inline-block mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.href)}`}
                alt="QR Code"
                className="w-44 h-44 object-contain rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => handleCopy(window.location.href, 'qrModal')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedItem === 'qrModal' ? (
                <>
                  <FaCheck className="w-3.5 h-3.5 text-emerald-600" />
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

export default DefaultCard;