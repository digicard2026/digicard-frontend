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
    if (videoUrl.includes('v=')) {
      videoId = videoUrl.split('v=')[1]?.split('&')[0];
    } else if (videoUrl.includes('youtu.be/')) {
      videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
    } else {
      videoId = videoUrl.split('/').pop();
    }

    return (
      <div className={`relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg border border-slate-200/80 my-3 ${className}`}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
          title={title || "Video Player"}
          className="w-full h-full"
        />
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

const ModernCard = ({ cardData = {}, plan = 'BusinessPremium' }) => {
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
    // Check add-ons
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

  // --- STATE FOR INTERACTIVE FEATURES ---
  const [copiedItem, setCopiedItem] = useState(null);
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
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-start p-0 font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      
      {/* Modern Card Shell */}
      <div className="w-full max-w-md bg-white shadow-xl flex flex-col relative overflow-hidden min-h-screen sm:min-h-0 sm:rounded-[36px] sm:border sm:border-slate-200/80 my-0 sm:my-6">
        
        {/* ========================================================
            HERO HEADER: VIBRANT LUXURY ROSE & FUCHSIA MODERN GRADIENT
            ======================================================== */}
        <div className="relative h-28 bg-gradient-to-r from-rose-500 via-pink-600 to-fuchsia-600 px-3.5 pt-3 pb-2 shadow-inner flex flex-col justify-start">
          
          {/* Ambient Lighting & Soft Glow (strictly clipped inside banner) */}
          <div className="absolute inset-0 overflow-hidden opacity-25 pointer-events-none">
            <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white blur-2xl" />
            <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-rose-900 blur-2xl" />
            <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="modern-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 16 0 L 0 0 0 16" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#modern-grid)" />
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
            <div className="relative w-28 h-28 rounded-full p-1 bg-white shadow-xl shadow-rose-950/20 ring-4 ring-white">
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
                className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-rose-600 border-2 border-white flex items-center justify-center text-white shadow-md"
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
            <p className="text-sm font-semibold text-rose-600 mb-2">
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
                <span className={`w-1.5 h-1.5 rounded-full ${businessStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                {businessStatus.text}
              </span>
            )}

            {profile.serviceArea && isFieldAllowed('serviceArea') && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                <FaMapMarkerAlt className="w-2.5 h-2.5 text-rose-500" />
                <span>Serving: {profile.serviceArea}</span>
              </span>
            )}

            {profile.serviceAvailability && isFieldAllowed('serviceAvailability') && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-pink-50 text-pink-700 border border-pink-200">
                <span>{profile.serviceAvailability}</span>
              </span>
            )}
          </div>

          {/* Tagline */}
          {profile.tagline && isFieldAllowed('tagline') && (
            <div className="mt-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50/60 to-rose-50 border border-rose-200/80 text-rose-950 text-xs italic font-medium">
              "{profile.tagline}"
            </div>
          )}

        </div>

        {/* ========================================================
            CORE ACTIONS: SAVE CONTACT & QUICK ACTION DOCK
            ======================================================== */}
        <div className="px-6 pb-6 space-y-4">
          
          {/* PRIMARY CTA: Save Contact to Phone (vCard .vcf) in Signature Pink/Rose */}
          <button
            type="button"
            onClick={handleSaveContact}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-fuchsia-600 hover:from-rose-600 hover:to-fuchsia-700 text-white font-semibold text-sm shadow-lg shadow-pink-500/25 transition-all active:scale-98 cursor-pointer"
          >
            <FaDownload className="w-4 h-4 animate-bounce" />
            <span>Save Contact to Phone</span>
          </button>

          {/* QUICK ACTION DOCK (WhatsApp, Call, Email, Web) */}
          <div className="grid grid-cols-4 gap-2.5">
            {/* WhatsApp */}
            <button
              type="button"
              disabled={!primaryPhone || !profile.enableWhatsApp}
              onClick={() => handleWhatsApp(primaryPhone)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/80 hover:border-emerald-300 transition-all active:scale-95 disabled:opacity-40 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1.5 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <FaWhatsapp className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700">WhatsApp</span>
            </button>

            {/* Call */}
            <button
              type="button"
              disabled={!primaryPhone || !profile.enableOneTapCall}
              onClick={() => handleCall(primaryPhone)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-rose-50/60 hover:bg-rose-100/70 border border-rose-200/80 hover:border-rose-400 transition-all active:scale-95 disabled:opacity-40 group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-1.5 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <FaPhoneAlt className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-rose-900">Call</span>
            </button>

            {/* Email */}
            <button
              type="button"
              disabled={!primaryEmail || !profile.enableEmail}
              onClick={() => handleEmail(primaryEmail)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-pink-50/60 hover:bg-pink-100/70 border border-pink-200/80 hover:border-pink-400 transition-all active:scale-95 disabled:opacity-40 group"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-1.5 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-pink-900">Email</span>
            </button>

            {/* Web */}
            <button
              type="button"
              disabled={!primaryWebsite}
              onClick={() => handleWebsite(primaryWebsite)}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-fuchsia-50/60 hover:bg-fuchsia-100/70 border border-fuchsia-200/80 hover:border-fuchsia-400 transition-all active:scale-95 disabled:opacity-40 group"
            >
              <div className="w-10 h-10 rounded-xl bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center mb-1.5 group-hover:bg-fuchsia-600 group-hover:text-white transition-colors">
                <FaGlobe className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-semibold text-fuchsia-900">Portal</span>
            </button>
          </div>

        </div>

        {/* ========================================================
            MAIN BODY SECTIONS
            ======================================================== */}
        <div className="px-6 pb-12 space-y-6">

          {/* DIRECT CUSTOMER INQUIRY / LEAD CAPTURE FUNNEL */}
          {isFieldAllowed('customerInquiry') && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/70 to-slate-950 text-white shadow-xl border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center">
                    <FaPaperPlane className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                      Service Inquiry & Consultation
                    </h3>
                    <p className="text-[10px] text-rose-200/80">Direct booking with {profile.name}</p>
                  </div>
                </div>

                {profile.serviceAvailability && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-medium">
                    {profile.serviceAvailability}
                  </span>
                )}
              </div>

              {inquiryData.submitted ? (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-1.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <FaCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-emerald-300">Inquiry Transmitted</h4>
                  <p className="text-[11px] text-slate-300">
                    Connecting with {profile.name} via WhatsApp...
                  </p>
                  <button
                    type="button"
                    onClick={() => setInquiryData(prev => ({ ...prev, submitted: false }))}
                    className="text-[11px] text-rose-300 hover:text-white underline pt-1 inline-block"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5 pt-1">
                  <div>
                    <label className="block text-[10px] font-semibold text-rose-200/90 mb-1 uppercase tracking-wider">
                      Service Required <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={inquiryData.service}
                      onChange={(e) => setInquiryData(prev => ({ ...prev, service: e.target.value }))}
                      placeholder={profile.services[0]?.name || "e.g. Enterprise Cloud Architecture"}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950/80 border border-rose-900/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-rose-200/90 mb-1 uppercase tracking-wider">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={inquiryData.date}
                        onChange={(e) => setInquiryData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950/80 border border-rose-900/60 text-white focus:outline-none focus:border-rose-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-rose-200/90 mb-1 uppercase tracking-wider">
                        Preferred Time
                      </label>
                      <input
                        type="time"
                        value={inquiryData.time}
                        onChange={(e) => setInquiryData(prev => ({ ...prev, time: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950/80 border border-rose-900/60 text-white focus:outline-none focus:border-rose-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-rose-200/90 mb-1 uppercase tracking-wider">
                      Your Contact Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={inquiryData.contact}
                      onChange={(e) => setInquiryData(prev => ({ ...prev, contact: e.target.value }))}
                      placeholder="Your mobile phone or WhatsApp"
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-950/80 border border-rose-900/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-rose-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSendInquiry}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 hover:from-rose-500 hover:to-fuchsia-500 text-white font-semibold text-xs shadow-md shadow-rose-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                    <span>Send Inquiry via WhatsApp</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              SERVICES & CAPABILITIES (Fixing Screenshot 3)
              ======================================================== */}
          {profile.services.length > 0 && isFieldAllowed('services') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                    <FaAward className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    Services & Capabilities ({profile.services.length})
                  </h3>
                </div>
              </div>

              {/* ALL SERVICES RENDERED AS ELEVATED EXECUTIVE CARDS */}
              <div className="space-y-3">
                {profile.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-rose-300 transition-all space-y-2.5 text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {service.category && (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 text-[10px] font-bold uppercase tracking-wider mb-1">
                            {service.category}
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {service.name}
                        </h4>
                      </div>

                      {service.price && (
                        <div className="text-right shrink-0">
                          <span className="inline-block px-2.5 py-1 rounded-xl bg-slate-900 text-rose-300 text-xs font-bold tracking-tight shadow-sm">
                            {service.currency === 'EUR' ? '€' : service.currency === 'INR' ? '₹' : '$'}
                            {service.price}
                          </span>
                          {service.duration && (
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                              {service.duration}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {service.description && (
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {service.description}
                      </p>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                        <FaClock className="w-3 h-3 text-slate-400" />
                        <span>Professional Consultation</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          setInquiryData(prev => ({
                            ...prev,
                            service: service.name,
                            submitted: false
                          }));
                          window.scrollTo({ top: 350, behavior: 'smooth' });
                        }}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 group"
                      >
                        <span>Inquire</span>
                        <FaChevronRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABOUT & CORPORATE PROFILE */}
          {(profile.aboutText || profile.bio) && isFieldAllowed('aboutText') && (
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
                  <FaBuilding className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  About & Background
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-slate-600 text-xs leading-relaxed space-y-2.5">
                {profile.bio && (
                  <p className="font-medium text-slate-700">{profile.bio}</p>
                )}
                {profile.aboutText && profile.aboutText !== profile.bio && (
                  <div className="pt-2 border-t border-slate-100 text-slate-600">
                    <p className="whitespace-pre-line">{profile.aboutText}</p>
                  </div>
                )}
                {profile.foundedName && (
                  <div className="pt-1 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Founded by:</span> {profile.foundedName}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              BUSINESS HOURS (Fixing Screenshot 3 bottom)
              ======================================================== */}
          {profile.businessHours.length > 0 && isFieldAllowed('businessHours') && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                    <FaRegClock className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                    Business Hours
                  </h3>
                </div>

                {businessStatus && (
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    businessStatus.isOpen 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {businessStatus.text}
                  </span>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm divide-y divide-slate-100">
                {profile.businessHours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center py-2 text-xs first:pt-0 last:pb-0">
                    <span className="capitalize font-medium text-slate-700">{h.day}</span>
                    <span className={`font-semibold ${h.isClosed ? 'text-rose-500' : 'text-slate-800'}`}>
                      {h.isClosed ? 'Closed' : `${h.openingTime} - ${h.closingTime}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT INFORMATION HUB */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                <FaPhoneAlt className="w-3 h-3" />
              </div>
              <span>Contact Information</span>
            </h3>

            <div className="space-y-2">
              {/* Phones */}
              {profile.phones.map((phone, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <FaPhoneAlt className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {phone.label || 'Phone'}
                      </span>
                      <p className="text-xs font-semibold text-slate-900">{phone.number}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopy(phone.number, `phone_${idx}`)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                      title="Copy Number"
                    >
                      {copiedItem === `phone_${idx}` ? <FaCheck className="w-3 h-3 text-emerald-600" /> : <FaCopy className="w-3 h-3" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCall(phone.number)}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-colors"
                    >
                      Call
                    </button>
                  </div>
                </div>
              ))}

              {/* Emails */}
              {profile.emails.map((email, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                      <FaEnvelope className="w-3.5 h-3.5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {email.label || 'Email'}
                      </span>
                      <p className="text-xs font-semibold text-slate-900 truncate max-w-[190px]">{email.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(email.address, `email_${idx}`)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                      title="Copy Email"
                    >
                      {copiedItem === `email_${idx}` ? <FaCheck className="w-3 h-3 text-emerald-600" /> : <FaCopy className="w-3 h-3" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEmail(email.address)}
                      className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold shadow-sm transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              ))}

              {/* Websites */}
              {profile.websites.map((web, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-xl bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center shrink-0">
                      <FaGlobe className="w-3.5 h-3.5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {web.label === 'company' ? 'Company Portal' : web.label || 'Website'}
                      </span>
                      <p className="text-xs font-semibold text-slate-900 truncate max-w-[190px]">{web.url}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleWebsite(web.url)}
                    className="px-3 py-1.5 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-xs font-semibold flex items-center gap-1 shrink-0 shadow-sm transition-colors"
                  >
                    <span>Visit</span>
                    <FaExternalLinkAlt className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* PHYSICAL OFFICE LOCATION */}
          {profile.addresses.length > 0 && isFieldAllowed('addresses') && (
            <div className="space-y-2.5">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                  <FaMapMarkerAlt className="w-3.5 h-3.5" />
                </div>
                <span>Office Location</span>
              </h3>

              {profile.addresses.map((addr, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3"
                >
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {addr.label || 'Primary Office'}
                    </span>
                    <p className="text-xs font-semibold text-slate-900 mt-0.5">
                      {[addr.street, addr.city, addr.state, addr.postalCode, addr.country].filter(Boolean).join(', ')}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const mapUrl = addr.googleMapsLink || `https://maps.google.com/?q=${encodeURIComponent([addr.street, addr.city, addr.state, addr.country].filter(Boolean).join(' '))}`;
                      window.open(mapUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <FaMapMarkerAlt className="w-3 h-3 text-rose-500" />
                    <span>Open in Google Maps</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* MEDIA & VIDEO SHOWCASE */}
          {(profile.profileVideo?.url || profile.productVideo?.url) && isFieldAllowed('profileVideo') && (
            <div className="space-y-2.5">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                  <FaVideo className="w-3.5 h-3.5" />
                </div>
                <span>Video Showcase</span>
              </h3>

              {profile.profileVideo?.url && (
                <div>
                  <p className="text-[11px] font-semibold text-slate-600 mb-1">
                    {profile.profileVideo.title || "Introduction Video"}
                  </p>
                  <VideoPlayer src={profile.profileVideo.url} title={profile.profileVideo.title} />
                </div>
              )}

              {profile.productVideo?.url && (
                <div>
                  <p className="text-[11px] font-semibold text-slate-600 mb-1">
                    {profile.productVideo.title || "Product / Service Demonstration"}
                  </p>
                  <VideoPlayer src={profile.productVideo.url} title={profile.productVideo.title} />
                </div>
              )}
            </div>
          )}

          {/* VERIFIED PROFESSIONAL NETWORKS */}
          {profile.socialLinks.length > 0 && isFieldAllowed('socialLinks') && (
            <div className="space-y-2.5">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FaGlobe className="w-3.5 h-3.5" />
                </div>
                <span>Professional Networks</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {profile.socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url.startsWith('http') ? social.url : `https://${social.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all active:scale-95 capitalize"
                  >
                    {getSocialIcon(social.platform)}
                    <span>{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* DOWNLOADS & BROCHURES */}
          {profile.downloads.length > 0 && isFieldAllowed('downloads') && (
            <div className="space-y-2.5">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                  <FaFilePdf className="w-3.5 h-3.5" />
                </div>
                <span>Documents & Brochures</span>
              </h3>

              <div className="space-y-2">
                {profile.downloads.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.fileUrl}
                    download
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                        <FaFilePdf className="w-4 h-4 text-rose-500" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">{doc.name || 'Document'}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{doc.fileType || 'PDF'}</p>
                      </div>
                    </div>
                    <FaDownload className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ========================================================
            EXECUTIVE MODERN FOOTER
            ======================================================== */}
        <div className="mt-auto px-6 py-4 bg-slate-50 border-t border-slate-200/80 text-center space-y-1">
          <p className="text-xs font-semibold text-slate-700 tracking-wide">
            {profile.companyName || 'Revayah One'}
          </p>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">
            Verified Digital Identity • Powered by Revayah One
          </p>
        </div>

      </div>

    </div>
  );
};

export default ModernCard;