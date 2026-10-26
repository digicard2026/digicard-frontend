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

const DefaultCard = ({ cardData = {}, plan = 'BusinessPremium' }) => {
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

  const handleNativeShare = () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: `${profile.name} | Digital Identity Card`,
      text: `Connect with ${profile.name} (${profile.jobTitle || 'Professional'}) on Revayah One:`,
      url: shareUrl
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => handleCopy(shareUrl, 'shareUrl'));
    } else {
      handleCopy(shareUrl, 'shareUrl');
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
    <div className="w-full min-h-screen bg-slate-100/70 text-slate-800 flex flex-col items-center justify-start p-0 font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      
      {/* Executive Card Shell */}
      <div className="w-full max-w-md bg-white shadow-xl flex flex-col relative overflow-hidden min-h-screen sm:min-h-0 sm:rounded-[36px] sm:border sm:border-slate-200/80 my-0 sm:my-6">
        
        {/* ========================================================
            HERO HEADER: COBALT TECH BLUE & DEEP INDIGO GRADIENT
            ======================================================== */}
        <div className="relative h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-3.5 pt-3 pb-2 shadow-inner flex flex-col justify-start">
          
          {/* Ambient Lighting & Soft Glow (strictly contained) */}
          <div className="absolute inset-0 overflow-hidden opacity-25 pointer-events-none">
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white blur-2xl" />
            <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-blue-950 blur-2xl" />
            <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="default-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 16 0 L 0 0 0 16" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#default-grid)" />
            </svg>
          </div>

          {/* Top Brand Pill & Share */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 border border-white/30 backdrop-blur-md">
              <FaShieldAlt className="w-3 h-3 text-white" />
              <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
                {isFieldAllowed('brandLabel') && profile.brandLabel ? profile.brandLabel : 'REVAYAH ONE'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleNativeShare}
              className="p-1.5 rounded-full bg-black/25 hover:bg-black/40 border border-white/30 text-white backdrop-blur-md transition-all active:scale-95 shadow-md"
              title="Share Card"
            >
              {copiedItem === 'shareUrl' ? (
                <FaCheck className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <FaShareAlt className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* ========================================================
            PROFILE INFORMATION & IDENTITY
            ======================================================== */}
        <div className="relative z-10 px-6 pb-4 text-center">
          
          {/* Avatar Anchor - Perfectly overlapping banner without clipping */}
          <div className="relative -mt-14 mb-2 inline-block">
            <div className="relative w-28 h-28 rounded-full p-1 bg-white shadow-xl shadow-blue-950/20 ring-4 ring-white">
              <img
                src={profile.profilePhoto}
                alt={profile.name}
                className="w-full h-full object-cover rounded-full bg-slate-100"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600";
                }}
              />
              {/* Verified Badge */}
              <div 
                className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white shadow-md"
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
                    className="w-full h-full object-contain" 
                  />
                </div>
              )}
            </div>
          </div>

          {/* Full Name */}
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">
            {profile.name}
          </h1>

          {/* Job Title */}
          {profile.jobTitle && (
            <p className="text-sm font-semibold text-blue-600 mb-2">
              {profile.jobTitle}
            </p>
          )}

          {/* Company & Department Details */}
          {isFieldAllowed('companyName') && profile.companyName && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-3">
              <FaBuilding className="w-3 h-3 text-slate-500" />
              <span>{profile.companyName}</span>
              {isFieldAllowed('department') && profile.department && (
                <>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600">{profile.department}</span>
                </>
              )}
            </div>
          )}

          {/* Service Area & Availability Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            {isFieldAllowed('businessHours') && businessStatus && (
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                businessStatus.isOpen 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${businessStatus.isOpen ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                {businessStatus.text}
              </span>
            )}

            {isFieldAllowed('serviceArea') && profile.serviceArea && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                <FaMapMarkerAlt className="w-2.5 h-2.5 text-blue-500" />
                Serving: {profile.serviceArea}
              </span>
            )}
          </div>

          {isFieldAllowed('serviceAvailability') && profile.serviceAvailability && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/70 border border-blue-200/80 text-blue-800 text-xs font-medium mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span>{profile.serviceAvailability}</span>
            </div>
          )}

          {/* HERO CTA: SAVE CONTACT TO PHONE (vCard) */}
          <div className="mt-1">
            <button
              type="button"
              onClick={handleSaveContact}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm tracking-wide shadow-lg shadow-blue-500/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <FaDownload className="w-4 h-4" />
              <span>Save Contact to Phone</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            QUICK ACTION DOCK (4 CORE CHANNELS)
            ======================================================== */}
        <div className="px-6 py-2">
          <div className="grid grid-cols-4 gap-2.5">
            
            {/* Call */}
            {profile.enableOneTapCall && primaryPhone && (
              <button
                type="button"
                onClick={() => handleCall(primaryPhone)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-100 text-blue-700 transition-all active:scale-95 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-1.5 shadow-sm">
                  <FaPhoneAlt className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-semibold tracking-tight">Call</span>
              </button>
            )}

            {/* WhatsApp */}
            {profile.enableWhatsApp && primaryPhone && (
              <button
                type="button"
                onClick={() => handleWhatsApp(primaryPhone)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-100 text-emerald-700 transition-all active:scale-95 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-1.5 shadow-sm">
                  <FaWhatsapp className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold tracking-tight">WhatsApp</span>
              </button>
            )}

            {/* Email */}
            {profile.enableEmail && primaryEmail && (
              <button
                type="button"
                onClick={() => handleEmail(primaryEmail)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-100 text-indigo-700 transition-all active:scale-95 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-1.5 shadow-sm">
                  <FaEnvelope className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-semibold tracking-tight">Email</span>
              </button>
            )}

            {/* Website */}
            {primaryWebsite ? (
              <button
                type="button"
                onClick={() => handleWebsite(primaryWebsite)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-sky-50/70 hover:bg-sky-100/70 border border-sky-100 text-sky-700 transition-all active:scale-95 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-1.5 shadow-sm">
                  <FaGlobe className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-semibold tracking-tight">Portal</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all active:scale-95 shadow-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center mb-1.5 shadow-sm">
                  <FaQrcode className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-semibold tracking-tight">QR Code</span>
              </button>
            )}

          </div>
        </div>

        {/* ========================================================
            ABOUT & EXECUTIVE SUMMARY
            ======================================================== */}
        {(profile.aboutText || profile.bio || profile.tagline) && (
          <div className="px-6 py-4">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FaBriefcase className="w-3 h-3 text-blue-600" />
                Executive Summary
              </h2>
              {profile.tagline && (
                <p className="text-xs font-medium italic text-blue-800 mb-2">
                  "{profile.tagline}"
                </p>
              )}
              {profile.aboutText && (
                <p className="text-xs leading-relaxed text-slate-600 mb-2">
                  {profile.aboutText}
                </p>
              )}
              {profile.bio && profile.bio !== profile.aboutText && (
                <p className="text-xs leading-relaxed text-slate-500">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            FEATURED SERVICES & CAPABILITIES
            ======================================================== */}
        {isFieldAllowed('services') && profile.services && profile.services.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FaCogs className="w-4 h-4 text-blue-600" />
                <span>Services & Capabilities</span>
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                {profile.services.length} Available
              </span>
            </div>

            <div className="space-y-3">
              {profile.services.map((srv, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-semibold text-slate-900 text-sm">
                        {srv.name}
                      </h3>
                      {srv.price && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 whitespace-nowrap">
                          {srv.currency || '€'} {srv.price}
                        </span>
                      )}
                    </div>

                    {srv.category && (
                      <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded mb-2">
                        {srv.category}
                      </span>
                    )}

                    {srv.description && (
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {srv.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Direct Advisory
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setInquiryData(prev => ({ ...prev, service: srv.name }));
                        const funnel = document.getElementById('inquiry-funnel');
                        if (funnel) funnel.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
                    >
                      <span>Inquire</span>
                      <FaPaperPlane className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            DIRECT LEAD CAPTURE FUNNEL: CONSULTATION & INQUIRY
            ======================================================== */}
        {isFieldAllowed('customerInquiry') && (
          <div id="inquiry-funnel" className="px-6 py-4 border-t border-slate-100">
            <div className="bg-gradient-to-br from-blue-50/60 to-indigo-50/40 rounded-2xl p-5 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <FaCalendarAlt className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">Request a Consultation</h2>
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
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full text-xs rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendInquiry}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <FaPaperPlane className="w-3 h-3" />
                  <span>Submit Consultation Request</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PRODUCTS & MERCHANDISE (IF ANY)
            ======================================================== */}
        {isFieldAllowed('products') && profile.products && profile.products.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FaGem className="w-4 h-4 text-blue-600" />
                <span>Products & Solutions</span>
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
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
                        <span className="text-xs font-bold text-blue-600">{item.currency || '€'} {item.price}</span>
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

        {/* ========================================================
            PROFILE VIDEO & MEDIA (IF ANY)
            ======================================================== */}
        {isFieldAllowed('profileVideo') && profile.profileVideo && (
          <div className="px-6 py-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FaVideo className="w-4 h-4 text-blue-600" />
              <span>Introductory Video</span>
            </h2>
            <VideoPlayer src={profile.profileVideo} title={`${profile.name} - Introduction`} />
          </div>
        )}

        {/* ========================================================
            LIVE BUSINESS HOURS
            ======================================================== */}
        {isFieldAllowed('businessHours') && profile.businessHours && profile.businessHours.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FaRegClock className="w-4 h-4 text-blue-600" />
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
                const isToday = new Date().getDay() === ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'].indexOf(day);
                return (
                  <div 
                    key={day} 
                    className={`flex justify-between items-center py-1 px-2 rounded-lg ${
                      isToday ? 'bg-blue-50/80 font-semibold text-blue-900' : 'text-slate-600'
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
            CONTACT INFORMATION DIRECTORY
            ======================================================== */}
        <div className="px-6 py-4 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <FaHeadset className="w-4 h-4 text-blue-600" />
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
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
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
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                    title="Copy Number"
                  >
                    {copiedItem === `phone-${idx}` ? <FaCheck className="w-3 h-3 text-emerald-500" /> : <FaCopy className="w-3 h-3" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCall(p.number)}
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
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
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
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
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                    title="Copy Email"
                  >
                    {copiedItem === `email-${idx}` ? <FaCheck className="w-3 h-3 text-emerald-500" /> : <FaCopy className="w-3 h-3" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEmail(e.address)}
                    className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
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
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
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
                    className="p-1.5 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors"
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
            SOCIAL NETWORKS DOCK
            ======================================================== */}
        {profile.socialLinks && profile.socialLinks.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FaUsers className="w-4 h-4 text-blue-600" />
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
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-all text-xs font-semibold"
                  >
                    {getSocialIcon(s.platform)}
                    <span className="capitalize">{s.platform}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            DOWNLOADS & CATALOGS (IF ANY)
            ======================================================== */}
        {isFieldAllowed('downloads') && profile.downloads && profile.downloads.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FaDownload className="w-4 h-4 text-blue-600" />
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

        {/* ========================================================
            CARD FOOTER: REVAYAH ONE AUTHENTICITY
            ======================================================== */}
        <div className="mt-6 px-6 py-6 bg-slate-50 border-t border-slate-200 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-800 mb-1">
            <FaCrown className="w-3.5 h-3.5 text-blue-600" />
            <span>REVAYAH ONE</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Official Digital Identity & Service Portal
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <button
              type="button"
              onClick={handleNativeShare}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <FaShareAlt className="w-3 h-3" />
              Share
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <FaQrcode className="w-3 h-3" />
              QR Code
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
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600"
            >
              <FaTimes className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
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
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center justify-center gap-2"
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